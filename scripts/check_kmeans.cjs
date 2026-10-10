const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{pathToFileURL}=require('node:url');
const dir=path.resolve(__dirname,'../examples/kmeans-clustering'),file=path.join(dir,'index.html'),html=fs.readFileSync(file,'utf8');

const blocks=['/blog/cluster-lib/choose.js','/blog/cluster-lib/generate.js','/blog/cluster-lib/config.js','/blog/visualizing-k-means-clustering/kmeans.js','/blog/visualizing-k-means-clustering/main.js'];
for(const block of blocks)assert.ok(html.includes('Source file: '+block),block);
assert.equal((html.match(/\(c\) Naftali Harris/g)||[]).length,blocks.length);
assert.ok(html.includes('//@ http://jsfromhell.com/array/shuffle [v1.0]'));
assert.ok(fs.existsSync(path.join(dir,'licenses/d3-LICENSE.txt')));
assert.match(html,/d3\.v3 \(bundled below\) is \(c\) Mike Bostock/);
assert.equal(/^\s*input\s*\{/m.test(html),false);
assert.ok(html.includes('#button_area input { font-size: 40px;'));
console.log('K-Means structure passed: five attribution blocks, shuffle credit, d3 license file, original input rule scoped to #button_area.');

const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,a+' vs '+b);

async function browserCheck(){const{chromium}=require('playwright');const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
try{const context=await browser.newContext({viewport:{width:1280,height:1000},serviceWorkers:'block'}),requests=[],errors=[];
await context.route(/^https?:\/\//,r=>{requests.push(r.request().url());return r.abort()});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
await page.goto(pathToFileURL(file).href);
const stage=page.locator('#svg_area'),pick=name=>stage.getByText(name,{exact:true}).click();
const next=page.locator('#next_button'),add=page.locator('#next_centroid'),restart=page.locator('[name=restart_button]');
const waitButton=value=>page.waitForFunction(v=>document.querySelector('#next_button')?.value.trim()===v,value,{timeout:15000});
const signature=()=>page.evaluate(()=>JSON.stringify(centroids.slice(1).map(c=>[+c.x.toFixed(12),+c.y.toFixed(12)])));
const state=()=>page.evaluate(()=>{const cents=centroids.slice(1),seen=new Set();let worst=0,err=0,sse=0;if(!cents.length)return{count:data.length,worst:0,err:0,sse:0,clusters:0};
 for(const p of data){let best=cents[0].cluster,bd=Infinity;for(const c of cents){const d=(p.x-c.x)**2+(p.y-c.y)**2;if(d<bd){bd=d;best=c.cluster}}seen.add(p.cluster);if(best!==p.cluster)worst+=1}
 for(const c of cents){const m=data.filter(p=>p.cluster===c.cluster);if(m.length){const mx=m.reduce((s,p)=>s+p.x,0)/m.length,my=m.reduce((s,p)=>s+p.y,0)/m.length;err=Math.max(err,Math.hypot(mx-c.x,my-c.y))}}
 data.forEach(p=>{const c=cents[p.cluster-1];if(c)sse+=(p.x-c.x)**2+(p.y-c.y)**2});
 return{count:data.length,worst,err,sse,clusters:seen.size}});
const reset=async()=>{await restart.click();await page.waitForFunction(()=>centroids.length===0&&data.length===0)};

assert.equal((await page.locator('.choice_title').textContent()).trim(),'How to pick the initial centroids?');
const sets=[['Uniform Points',250],['Gaussian Mixture',250],['Smiley Face',500],['Density Bars',500],['Packed Circles',500],['Pimpled Smiley',500],['DBSCAN Rings',105],['Example A',9]];
for(const[name,count]of sets){await reset();await pick('Randomly');await pick(name);
 const s=await state();assert.equal(s.count,count,name);assert.ok(Number.isFinite(s.sse),name);
 assert.equal(await page.evaluate(()=>new Set(data.map(p=>p.x+'|'+p.y)).size),count,name);
 assert.ok(await page.evaluate(()=>data.every(p=>Math.abs(p.x)<=xlim&&Math.abs(p.y)<=10)),name);}

await reset();await pick('Randomly');await pick('Gaussian Mixture');
await add.click();await add.click();
assert.equal(await page.evaluate(()=>centroids.length),3);
for(const i of[1,2])assert.ok(await page.evaluate(i=>data.some(p=>p.x===centroids[i].x&&p.y===centroids[i].y),i),'random centroids must land on real samples');
await next.click();await waitButton('Update Centroids');
let s=await state();assert.equal(s.worst,0,'GO! must assign every point to its nearest centroid');assert.equal(s.clusters,2);
let previous=s.sse,steps=0,converged=false;
while(steps<30){const before=await signature();
 await next.click();await waitButton(steps%2===0?'Reassign Points':'Update Centroids');
 s=await state();assert.ok(s.sse<=previous+1e-9,'SSE grew at step '+steps+': '+previous+' -> '+s.sse);
 if(steps%2===0){assert.ok(s.err<1e-9,'updated centroids must equal the mean of their cluster');previous=s.sse;steps+=1;
  if(before===(await signature())){converged=true;break}continue}
 assert.equal(s.worst,0,'no point may stay in a non-nearest cluster after reassignment');previous=s.sse;steps+=1;}
assert.ok(converged,'Lloyd iterations did not converge within 30 steps');
assert.ok(steps>=4,'expected several Lloyd steps before convergence, got '+steps);
const iterations=steps;

await reset();await pick('Farthest Point');await pick('Smiley Face');
await add.click();await add.click();
const far=await page.evaluate(()=>{let best=-1,pair=data[0];for(const p of data){const d=dist(p,centroids[1]);if(d>best){best=d;pair=p}}return{best,x:pair.x,y:pair.y}});
assert.ok(await page.evaluate(()=>data.some(p=>p.x===centroids[1].x&&p.y===centroids[1].y)&&data.some(p=>p.x===centroids[2].x&&p.y===centroids[2].y)),'farthest centroids must land on real samples');
near(await page.evaluate(()=>dist(centroids[1],centroids[2])),far.best);
near(await page.evaluate(([fx,fy])=>Math.hypot(centroids[2].x-fx,centroids[2].y-fy),[far.x,far.y]),0);

await reset();await pick("I'll Choose");await pick('Uniform Points');
const svgElement=page.locator('#svg_area svg');await svgElement.scrollIntoViewIfNeeded();
const box=await svgElement.boundingBox(),fractions=[[0.34,0.38],[0.7,0.63]];
for(const[fx,fy]of fractions)await page.mouse.click(box.x+box.width*fx,box.y+box.height*fy);
const click=await page.evaluate(f=>{const el=document.querySelector('#svg_area svg'),ctm=el.getScreenCTM().inverse(),rect=el.getBoundingClientRect();
 return f.map(([fx,fy])=>{const point=el.createSVGPoint();point.x=rect.left+rect.width*fx;point.y=rect.top+rect.height*fy;
  const user=point.matrixTransform(ctm);return{ux:user.x-margin.left,uy:user.y-margin.top}});},fractions);
const drawn=await page.evaluate(()=>Array.from(document.querySelectorAll('circle.centroid')).map(c=>[+c.getAttribute('cx'),+c.getAttribute('cy')]));
for(const[i,want]of click.entries())assert.ok(Math.abs(drawn[i][0]-want.ux)<5&&Math.abs(drawn[i][1]-want.uy)<5,'clicked centroid must render under the cursor: '+JSON.stringify(drawn[i])+' vs '+JSON.stringify(want));
assert.ok(drawn[1][0]>drawn[0][0]&&drawn[1][1]>drawn[0][1],'the second click must drop a centroid to the lower right of the first');
assert.ok(await page.evaluate(()=>centroids.slice(1).every(c=>Math.abs(c.x)<=xlim&&Math.abs(c.y)<=10)),'clicked centroids must stay inside the visible domain');
assert.equal(await page.evaluate(()=>centroids.length),3);

await reset();await pick('Randomly');await pick('Uniform Points');
for(let i=0;i<10;i++)await add.click();
assert.equal(await page.evaluate(()=>centroids.length),11);
assert.equal(await page.locator('#next_centroid').count(),0);

await restart.click();
assert.equal(await page.evaluate(()=>centroids.length+data.length),0);
assert.equal((await page.locator('.choice_title').textContent()).trim(),'How to pick the initial centroids?');
await page.screenshot({path:path.join(os.tmpdir(),'kmeans-clustering-desktop.png'),fullPage:true});
await page.setViewportSize({width:390,height:844});
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);
assert.ok(await page.evaluate(()=>document.querySelector('#svg_area').scrollWidth>=680));
await page.screenshot({path:path.join(os.tmpdir(),'kmeans-clustering-mobile.png'),fullPage:true});
assert.deepEqual(requests,[]);assert.deepEqual(errors,[]);
console.log('K-Means browser passed: offline file://, 8 dataset sizes, nearest assignment, mean centroids, monotone SSE and convergence in '+iterations+' single steps, farthest-point and click placement, 10-centroid cap, restart, 390px layout, zero requests, zero page errors.');}finally{await browser.close()}}

if(!process.argv.includes('--structure-only'))browserCheck().catch(e=>{console.error(e);process.exitCode=1});
