const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),os=require('node:os'),{pathToFileURL}=require('node:url');
const file=path.resolve(__dirname,'../examples/quantization-v2/index.html'),html=fs.readFileSync(file,'utf8');
const context={Math,Number,Array,Object,String,Infinity,isFinite,console};
vm.createContext(context);
vm.runInContext(html.match(/<script id="quant-math">([\s\S]*?)<\/script>/)[1],context);
const Q=context.QUANT,near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,a+' vs '+b);

assert.ok(html.includes('#9334e6')&&html.includes('#f9ab00')&&html.includes('tabular-nums'),'quantization-v2 lost the shared teaching palette');
const fetched=html.replace(/http:\/\/www\.w3\.org\/2000\/svg/g,'');assert.ok(!/https?:\/\//.test(fetched),'quantization-v2 must not fetch external resources');

near(Q.roundReal(0.5,'halfEven'),0);near(Q.roundReal(1.5,'halfEven'),2);near(Q.roundReal(2.5,'halfEven'),2);near(Q.roundReal(-0.5,'halfEven'),0);near(Q.roundReal(-1.5,'halfEven'),-2);
near(Q.roundReal(0.5,'halfAway'),1);near(Q.roundReal(-0.5,'halfAway'),-1);near(Q.roundReal(2.4999,'halfAway'),2);
near(Q.roundReal(0.9,'floor'),0);near(Q.roundReal(-0.1,'floor'),-1);
assert.deepEqual({...Q.codeRange(8,'symmetric')},{min:-127,max:127,levels:256});
assert.deepEqual({...Q.codeRange(4,'asymmetric')},{min:0,max:15,levels:16});
assert.deepEqual(Q.makeWeights('normal',6,7),Q.makeWeights('normal',6,7),'same seed must reproduce weights');
assert.notDeepEqual(Q.makeWeights('uniform',12,7),Q.makeWeights('normal',12,7));
assert.ok(Q.makeWeights('outlier',96,3).some(v=>Math.abs(v)>0.8),'outlier shape must contain an outlier');

const values=Q.makeWeights('outlier',48,20261010);
for(const mode of ['symmetric','asymmetric'])for(const bits of [2,3,4,5,6,8])for(const groupSize of [0,4,8,16]){
  const result=Q.quantizeAll(values,{bits,mode,groupSize,gain:1,roundMode:'halfEven'}),range=Q.codeRange(bits,mode);
  assert.equal(result.restored.length,values.length);
  assert.equal(result.groups.length,groupSize?Math.ceil(values.length/groupSize):1);
  for(const group of result.groups){
    assert.ok(group.scale>0&&isFinite(group.scale),'scale must stay positive');
    assert.ok(Math.abs(group.zeroPoint-Math.round(group.zeroPoint))<1e-12&&group.zeroPoint>=range.min&&group.zeroPoint<=range.max,'zero point must be an in-range integer');
    if(groupSize)assert.ok(group.scale<=Q.paramsFor(values,bits,mode,1,'halfEven').scale+1e-12,'a group scale must not exceed the whole-tensor scale');
  }
  let worst=0;
  values.forEach((x,index)=>{
    const code=result.codes[index],restored=result.restored[index],group=result.groups[Math.floor(index/(groupSize||values.length))];
    assert.ok(code>=range.min&&code<=range.max,'code out of range');
    near(restored,(code-group.zeroPoint)*group.scale,1e-9);
    const lattice=Math.abs(restored/group.scale+group.zeroPoint-Math.round(restored/group.scale+group.zeroPoint));
    assert.ok(lattice<1e-6,'restored value must sit on the quantization lattice');
    if(!result.clipped[index])worst=Math.max(worst,Math.abs(restored-x));
  });
  assert.ok(worst<=groupScaleMax(result)+1e-9,'unclipped error must stay within half a step: '+worst);
}
function groupScaleMax(result){return Math.max.apply(null,result.groups.map(group=>group.scale))/2;}

const symmetric=Q.quantizeAll(values,{bits:8,mode:'symmetric',groupSize:0,gain:1,roundMode:'halfEven'});
const peak=values.reduce((a,b)=>Math.abs(b)>Math.abs(a)?b:a,0),peakIndex=values.indexOf(peak);
near(symmetric.restored[peakIndex],peak,1e-9);near(symmetric.groups[0].scale,Math.abs(peak)/127,1e-12);
const narrow=Q.quantizeAll(values,{bits:4,mode:'symmetric',groupSize:0,gain:0.5,roundMode:'halfEven'});
assert.ok(narrow.clipped.filter(Boolean).length>0,'a 0.5x calibration range must clip the outlier');
const endpoint=(Q.codeRange(4,'symmetric').max)*narrow.groups[0].scale;
narrow.restored.forEach((restored,index)=>{if(narrow.clipped[index])near(Math.abs(restored),endpoint,1e-9);});
const wide=Q.quantizeAll(values,{bits:4,mode:'symmetric',groupSize:0,gain:1.5,roundMode:'halfEven'});
assert.equal(wide.clipped.filter(Boolean).length,0);
assert.ok(Q.metrics(values,wide.restored,0).mse>Q.metrics(values,symmetric.restored,0).mse);

const asymmetric=Q.quantizeAll(values,{bits:8,mode:'asymmetric',groupSize:0,gain:1,roundMode:'halfEven'});
const lo=Math.min.apply(null,values),hi=Math.max.apply(null,values),aParams=asymmetric.groups[0];
near(aParams.scale,(hi-lo)/255,1e-12);
const minIndex=values.indexOf(lo);
assert.ok(Math.abs(asymmetric.restored[minIndex]-lo)<=aParams.scale/2+1e-12,'the most negative weight must stay within half a step under asymmetric quantization');
assert.ok(Math.max.apply(null,asymmetric.restored.map(r=>Math.abs(r-(Math.round(r/aParams.scale))*aParams.scale)))<1e-9);

assert.deepEqual([...Q.quantizeAll([0,0,0,0],{bits:4,mode:'symmetric',groupSize:2,gain:1,roundMode:'halfEven'}).restored],[0,0,0,0]);
assert.equal(Q.metrics([0,0],[0,0],0).sqnr,Infinity);
const two=Q.quantizeAll([0.5,-0.5],{bits:8,mode:'symmetric',groupSize:0,gain:1,roundMode:'halfEven'});
near(Q.metrics([0.5,-0.5],two.restored,0).mse,0);
const sample=[0.21,-0.77,0.03];const restoredSample=Q.quantizeAll(sample,{bits:4,mode:'symmetric',groupSize:0,gain:1,roundMode:'halfEven'}).restored;
const stats=Q.metrics(sample,restoredSample,0),manual=sample.reduce((s,x,i)=>s+(restoredSample[i]-x)**2,0)/sample.length;
near(stats.mse,manual,1e-15);near(stats.mae,sample.reduce((s,x,i)=>s+Math.abs(restoredSample[i]-x),0)/3,1e-15);
near(stats.maxError,Math.max.apply(null,sample.map((x,i)=>Math.abs(restoredSample[i]-x))),1e-15);

const store=Q.storage(4,48,8,'asymmetric');
near(store.payload,24);assert.equal(store.groups,6);assert.equal(store.scaleBytes,24);assert.equal(store.zeroBytes,6);
near(store.total,54);near(store.perParam,54/48);near(store.ratio,4/(54/48));
assert.equal(Q.storage(8,48,0,'symmetric').zeroBytes,0);
const sweep=Q.sweep(values,{mode:'symmetric',groupSize:4,gain:1,roundMode:'halfEven'});
assert.deepEqual([...sweep].map(row=>row.bits),[2,3,4,5,6,8]);
assert.ok(sweep.every((row,index)=>index===0||row.perParam>sweep[index-1].perParam),'more bits must cost more bytes');
assert.ok(sweep[sweep.length-1].mse<sweep[0].mse,'8 bit must beat 2 bit on MSE');
console.log('Quantization v2 math passed: rounding rules, code ranges, lattice and half-step error bound, clipping and calibration tradeoff, asymmetric scale and zero point, zero groups, metrics, storage accounting and bit sweep.');

async function browserCheck(){const{chromium}=require('playwright');const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
try{const context2=await browser.newContext({viewport:{width:1280,height:1000},serviceWorkers:'block'}),requests=[],errors=[];
await context2.route(/^https?:\/\//,route=>{requests.push(route.request().url());return route.abort()});
const page=await context2.newPage();page.on('pageerror',error=>errors.push(error.message));
await page.goto(pathToFileURL(file).href);
const metric=async label=>(await page.evaluate(label=>{for(const row of document.querySelectorAll('#metrics div'))if(row.querySelector('dt').textContent===label)return row.querySelector('dd').textContent;},label));
const readout=async id=>page.locator('#'+id).textContent();
const assertNumbersRendered=async label=>{const text=await page.evaluate(()=>['#metrics','#storage','#chain','#plotParams','#status'].map(sel=>{const el=document.querySelector(sel);return el?el.textContent:''}).join(' '));assert.ok(!/NaN|undefined|Infinity/.test(text),label+' rendered a broken number: '+text.slice(0,220))};
const setGain=value=>page.evaluate(v=>{const slider=document.getElementById('gain');slider.value=v;slider.dispatchEvent(new Event('input',{bubbles:true}))},value);
assert.equal((await readout('bitsOut')).trim(),'4 bit');
assert.equal((await readout('groupOut')).trim(),'整张量');
assert.ok(parseInt((await readout('plotParams')).match(/截断 (\d+)/)[1],10)===0,'default gain must not clip');
const mse4=await metric('均方误差 MSE'),bytes4=await metric('字节 / 参数');
await page.selectOption('#bits','8');
const mse8=await metric('均方误差 MSE');
assert.ok(parseFloat(mse8)<parseFloat(mse4),'more bits must lower MSE: '+mse4+' -> '+mse8);
assert.ok(parseFloat(await metric('字节 / 参数'))>parseFloat(bytes4));
await page.selectOption('#bits','4');
await page.selectOption('#group','4');
assert.ok((await readout('plotParams')).includes('scale 组数 12'),'48 weights in groups of 4 must give 12 scales');
await setGain('0.5');
assert.ok(parseInt((await readout('plotParams')).match(/截断 (\d+)/)[1],10)>0,'a 0.5x range must clip the outlier');
await setGain('1');
assert.ok(parseInt((await readout('plotParams')).match(/截断 (\d+)/)[1],10)===0);
await page.locator('#gain').focus();
await page.keyboard.press('End');
assert.equal((await readout('gainOut')).trim(),'1.50×','the slider must be keyboard operable');
assert.ok(parseInt((await readout('plotParams')).match(/截断 (\d+)/)[1],10)===0,'a wide calibration range must not clip');
await setGain('1');
await page.selectOption('#mode','asymmetric');
assert.equal((await readout('modeOut')).trim(),'非对称');
assert.ok((await readout('storage')).includes('零点 × 12 组'));
    await assertNumbersRendered('grouped asymmetric');
await page.selectOption('#mode','symmetric');await page.selectOption('#group','0');
await page.selectOption('#shape','uniform');
assert.equal((await readout('shapeOut')).trim(),'均匀分布');
await page.selectOption('#shape','outlier');
const chainBefore=await readout('chain');
const outlierIndex=await page.evaluate(()=>{const dots=[...document.querySelectorAll('#stairs .weight')];let best=0,size=0;dots.forEach((dot,i)=>{const value=Math.abs(parseFloat(dot.getAttribute('aria-label').match(/原始 (-?[\d.]+)/)[1]));if(value>size){size=value;best=i}});return best;});
assert.ok(outlierIndex>=0,'the plot must expose readable weight labels');
await page.locator('#stairs .weight').nth(outlierIndex).click();
assert.notEqual(await readout('chain'),chainBefore,'clicking a weight must change the calculation chain');
assert.ok((await readout('chain')).includes('x̂ = (q − z) × s ='),'the chain must show the dequantization step');
assert.ok((await readout('chainTitle')).includes('第 '+(outlierIndex+1)+' 个'),'the clicked weight must become the selected one');
await page.click('#nextWeight');
assert.ok((await readout('chainTitle')).includes('第 '+(outlierIndex+2)+' 个'),'next-weight must advance the selection');
await page.click('#resample');
const statusResampled=await readout('status');
assert.ok(/48 个权重/.test(statusResampled));
    await assertNumbersRendered('resampled weights');
await page.locator('#stairs .weight').nth(3).press('Enter');
assert.ok(/第 4 个/.test(await readout('chainTitle')),'keyboard activation must select a weight');
await page.click('#reset');
assert.equal((await readout('bitsOut')).trim(),'4 bit');
assert.equal((await readout('gainOut')).trim(),'1.00×');
assert.equal((await readout('groupOut')).trim(),'整张量');
assert.equal(await page.locator('#shape').inputValue(),'outlier');
await page.screenshot({path:path.join(os.tmpdir(),'quantization-v2-desktop.png'),fullPage:true});
await page.setViewportSize({width:390,height:844});
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390,'page must not overflow at 390px');
assert.ok(await page.evaluate(()=>document.querySelector('.plot-scroll').scrollWidth>=700),'the chart must scroll horizontally instead of shrinking');
assert.ok(await page.evaluate(()=>getComputedStyle(document.querySelector('.chart-hint')).display!=='none'),'narrow screens must show the scroll hint');
await page.screenshot({path:path.join(os.tmpdir(),'quantization-v2-mobile.png'),fullPage:true});
assert.deepEqual(requests,[]);assert.deepEqual(errors,[]);
console.log('Quantization v2 browser passed: offline file://, bits/group/mode/gain/shape controls, clipping counts, weight selection by mouse and keyboard, reset, 390px layout, zero requests, zero page errors.');}finally{await browser.close()}}

if(!process.argv.includes('--math-only'))browserCheck().catch(error=>{console.error(error);process.exitCode=1});
