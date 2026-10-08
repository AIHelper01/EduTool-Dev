// Run: node scripts/check_svm.cjs [--browser]
// Browser checks require Playwright; optionally set CHROME_PATH.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const htmlPath = path.resolve(__dirname, '../examples/svm/index.html');
const source = fs.readFileSync(htmlPath, 'utf8').match(/<script id="svm-math">([\s\S]*?)<\/script>/)[1];
const { trainSVM, makeDataset, kernelValue } = vm.runInNewContext(source + ';({trainSVM,makeDataset,kernelValue});');
const near = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
const two = [{ x: [-1, 0], y: -1 }, { x: [1, 0], y: 1 }];

// Analytic two-point solutions provide independent ground truth.
let model = trainSVM(two, 'linear', 1, 1);
near(model.alpha[0], .5); near(model.alpha[1], .5);
near(model.weights[0], 1); near(model.weights[1], 0); near(model.bias, 0);
near(model.norm2, 1); near(model.primal, .5); near(model.dual, .5);
near(model.score([-1, 0]), -1); near(model.score([1, 0]), 1);
model = trainSVM(two, 'linear', .1, 1);
near(model.alpha[0], .1); near(model.weights[0], .2);
near(model.primal, .18); near(model.dual, .18);
const expectedAlpha = 1 / (1 - Math.exp(-4));
model = trainSVM(two, 'rbf', 2, 1);
near(model.alpha[0], expectedAlpha); near(model.alpha[1], expectedAlpha);
near(model.score([-1, 0]), -1); near(model.score([1, 0]), 1);
near(model.primal, model.dual);
near(kernelValue([0, 0], [0, 0], 'rbf', 1), 1);
model = trainSVM([{ x: [0, 0], y: -1 }, { x: [0, 0], y: 1 }], 'linear', .25, 1);
near(model.alpha[0], .25); near(model.alpha[1], .25);
near(model.norm2, 0); near(model.primal, .5); near(model.dual, .5); near(model.kkt, 0);
assert.throws(() => trainSVM(two, 'linear', 0, 1));
assert.throws(() => trainSVM(two, 'rbf', 1, NaN));
assert.throws(() => trainSVM([{ x: [0, 0], y: 1 }, { x: [1, 1], y: 1 }], 'linear', 1, 1));

const accuracy = (data, model) => data.filter(p => (model.score(p.x) >= 0 ? 1 : -1) === p.y).length / data.length;
let checked = 0;
for (const dataset of ['separated', 'overlap', 'circles', 'xor']) {
  const seed = [...dataset].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const train = makeDataset(dataset, 48, 12000 + seed), test = makeDataset(dataset, 64, 90000 + seed);
  assert.equal(train.length, 48); assert.equal(test.length, 64);
  assert.equal(train.filter(p => p.y === 1).length, 24);
  assert.equal(test.filter(p => p.y === 1).length, 32);
  assert.equal(JSON.stringify(train), JSON.stringify(makeDataset(dataset, 48, 12000 + seed)));
  assert.ok(!train.some(p => test.some(q => JSON.stringify(p.x) === JSON.stringify(q.x))));
  for (const kind of ['linear', 'rbf']) for (const C of [.01, 1, 100]) for (const gamma of kind === 'linear' ? [1] : [10 ** -1.3, 1, 10]) {
    model = trainSVM(train, kind, C, gamma);
    assert.ok(model.alpha.every(a => a >= -1e-8 && a <= C + 1e-8));
    near(model.alpha.reduce((sum, a, i) => sum + a * train[i].y, 0), 0, 1e-7);
    let independentKKT = 0;
    for (let i = 0; i < train.length; i++) {
      const margin = train[i].y * model.score(train[i].x);
      if (model.alpha[i] < C - 1e-7) independentKKT = Math.max(independentKKT, 1 - margin);
      if (model.alpha[i] > 1e-7) independentKKT = Math.max(independentKKT, margin - 1);
    }
    near(model.kkt, independentKKT, 1e-7);
    assert.equal(model.converged, independentKKT <= 1e-3 + 1e-10);
    assert.ok(model.primal >= model.dual - 1e-6);
    assert.ok([model.primal, model.dual, model.norm2, model.bias, model.kkt].every(Number.isFinite));
    if (dataset === 'separated' && C === 1) near(accuracy(train, model), 1);
    if (['circles', 'xor'].includes(dataset) && C === 1 && gamma === 1) {
      if (kind === 'rbf') { near(accuracy(train, model), 1); assert.ok(accuracy(test, model) >= .95); }
      else assert.ok(accuracy(test, model) < .75);
    }
    checked++;
  }
}
console.log(`SVM math passed: analytic solutions, zero-curvature pair, invalid inputs, deterministic train/test sets, and ${checked} parameter combinations with box constraints, dual feasibility, KKT residuals, and weak duality.`);

async function checkBrowser() {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 1100 }, serviceWorkers: 'block' });
    const requests = [], errors = [];
    await context.route(/^https?:\/\//, route => { requests.push(route.request().url()); return route.abort(); });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(pathToFileURL(htmlPath).href);
    const ready = () => page.waitForFunction(() => document.getElementById('demo').getAttribute('aria-busy') === 'false');
    await ready();
    assert.equal(await page.locator('#train-accuracy').textContent(), '100.0%');
    assert.equal(await page.locator('#test-accuracy').textContent(), '100.0%');
    assert.equal(await page.locator('[data-index]').count(), 48);
    assert.equal(await page.locator('#gamma').isDisabled(), true);
    assert.ok((await page.locator('.boundary').getAttribute('d')).length > 0);
    const defaultBoundary = await page.locator('.boundary').getAttribute('d');
    const index = await page.evaluate(() => {
      const distances = state.data.train.map((p, i) => Math.min(...state.data.train.filter((_, j) => j !== i).map(q => Math.hypot(p.x[0] - q.x[0], p.x[1] - q.x[1]))));
      return distances.indexOf(Math.max(...distances));
    });
    await page.locator(`[data-index="${index}"]`).click();
    assert.ok((await page.locator('#sample-title').textContent()).includes(`#${index + 1} ·`));
    await page.locator('[data-index="0"]').focus();
    await page.locator('[data-index="0"]').press('Enter');
    assert.ok((await page.locator('#sample-title').textContent()).includes('#1 ·'));
    assert.equal(await page.locator('[data-index="0"]').getAttribute('aria-pressed'), 'true');
    await page.screenshot({ path: path.join(os.tmpdir(), 'svm-linear-desktop.png'), fullPage: true });
    await page.locator('#dataset').selectOption('circles'); await ready();
    assert.ok(parseFloat(await page.locator('#test-accuracy').textContent()) < 75);
    await page.locator('#kernel').selectOption('rbf'); await ready();
    assert.equal(await page.locator('#gamma').isDisabled(), false);
    assert.equal(await page.locator('#train-accuracy').textContent(), '100.0%');
    assert.ok(parseFloat(await page.locator('#test-accuracy').textContent()) >= 95);
    assert.notEqual(await page.locator('.boundary').getAttribute('d'), defaultBoundary);
    assert.equal(await page.locator('#margin-width').textContent(), '—（RBF）');
    await page.screenshot({ path: path.join(os.tmpdir(), 'svm-rbf-desktop.png'), fullPage: true });
    const beforeC = await page.locator('.boundary').getAttribute('d');
    await page.locator('#c').focus(); await page.locator('#c').press('Home'); await ready();
    assert.equal(await page.locator('#c-value').textContent(), '0.01');
    assert.equal(await page.locator('#support-count').textContent(), '48 / 48');
    assert.notEqual(await page.locator('.boundary').getAttribute('d'), beforeC);
    const beforeGamma = await page.locator('.boundary').getAttribute('d');
    await page.locator('#gamma').focus(); await page.locator('#gamma').press('End'); await ready();
    assert.equal(await page.locator('#gamma-value').textContent(), '10.00');
    assert.notEqual(await page.locator('.boundary').getAttribute('d'), beforeGamma);
    await page.locator('#show-test').check();
    assert.equal(await page.locator('.test-point').count(), 64);
    await page.locator('#train').click(); await ready();
    assert.equal(await page.locator('.test-point').count(), 64);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 390);
    await page.screenshot({ path: path.join(os.tmpdir(), 'svm-mobile.png'), fullPage: true });
    await page.getByRole('button', { name: '恢复默认', exact: true }).click(); await ready();
    assert.equal(await page.locator('#dataset').inputValue(), 'separated');
    assert.equal(await page.locator('#kernel').inputValue(), 'linear');
    assert.equal(await page.locator('#c-value').textContent(), '1.00');
    assert.equal(await page.locator('#gamma').isDisabled(), true);
    assert.equal(await page.locator('#show-test').isChecked(), false);
    assert.equal(await page.locator('.test-point').count(), 0);
    assert.equal(await page.locator('.boundary').getAttribute('d'), defaultBoundary);
    assert.deepEqual(errors, []); assert.deepEqual(requests, []);
    console.log('SVM browser passed: offline file://, visible dataset/kernel/slider controls, sample mouse and keyboard selection, test points, reset, boundaries, and 390px layout; no external requests or runtime errors.');
  } finally { await browser.close(); }
}
if (process.argv.includes('--browser')) checkBrowser().catch(error => { console.error(error); process.exitCode = 1; });
