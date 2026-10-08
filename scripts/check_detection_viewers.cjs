// Requires Playwright; optionally set CHROME_PATH to an installed Chrome executable.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const os = require('node:os');
const fileURL = relative => pathToFileURL(path.resolve(__dirname, '..', relative)).href;
const image = { name: 'sample.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="white"/></svg>') };
const coco = {
  images: [{ id: 7, file_name: 'sample.svg', width: 400, height: 300 }, { id: 8, file_name: 'other.svg' }],
  categories: [{ id: 1, name: 'cat' }, { id: 2, name: 'dog' }],
  annotations: [
    { id: 1, image_id: 7, category_id: 1, bbox: [100, 75, 200, 150] },
    { id: 2, image_id: 7, category_id: 2, bbox: [40, 30, 50, 60] },
    { id: 3, image_id: 8, category_id: 1, bbox: [1, 1, 5, 5] }
  ]
};
const voc = '<annotation><object><name>cat</name><bndbox><xmin>100</xmin><ymin>75</ymin><xmax>300</xmax><ymax>225</ymax></bndbox></object><object><name>dog</name><bndbox><xmin>40</xmin><ymin>30</ymin><xmax>90</xmax><ymax>90</ymax></bndbox></object></annotation>';

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    for (const format of ['coco', 'voc']) {
      const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, serviceWorkers: 'block' });
      const errors = [], requests = [];
      await context.route(/^https?:\/\//, route => { requests.push(route.request().url()); return route.abort(); });
      await context.addInitScript(() => {
        window.drawCalls = [];
        for (const name of ['strokeRect', 'fillText', 'translate', 'scale']) {
          const original = CanvasRenderingContext2D.prototype[name];
          CanvasRenderingContext2D.prototype[name] = function (...args) {
            window.drawCalls.push([name, ...args]);
            return original.apply(this, args);
          };
        }
      });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(fileURL('index.html'));
      await page.locator('a[href="./examples/object-detection-dataset-viewer/index.html"]').click();
      assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), '目标检测数据集查看器');
      assert.equal(await page.locator('article .open').count(), 3);
      for (const name of ['yolo', 'coco', 'voc']) {
        await page.locator(`a[href="../${name}-dataset-viewer/index.html"]`).click();
        await page.getByRole('heading', { level: 1 }).waitFor();
        assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), name.toUpperCase() + '数据集查看器');
        await page.goBack();
      }
      await page.getByRole('button', { name: 'Switch to English' }).click();
      assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Object detection dataset viewer');
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      await page.screenshot({ path: path.join(os.tmpdir(), 'detection-hub-en.png'), fullPage: true });
      await page.getByRole('button', { name: '切换到中文' }).click();
      await page.screenshot({ path: path.join(os.tmpdir(), 'detection-hub-desktop.png'), fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 390);
      await page.screenshot({ path: path.join(os.tmpdir(), 'detection-hub-mobile.png'), fullPage: true });
      await page.setViewportSize({ width: 1280, height: 1000 });
      await page.locator(`a[href="../${format}-dataset-viewer/index.html"]`).click();

      await page.getByRole('button', { name: '开始标注', exact: true }).click();
      await page.getByText('请先上传图片和标注文件！', { exact: true }).waitFor();
      await page.locator('#imageUpload').setInputFiles(image);
      await page.waitForFunction(() => document.querySelector('canvas').width === 400);
      await page.locator('#annotationUpload').setInputFiles({
        name: format === 'coco' ? 'instances.json' : 'sample.xml',
        mimeType: format === 'coco' ? 'application/json' : 'text/xml',
        buffer: Buffer.from(format === 'coco' ? JSON.stringify(coco) : voc)
      });
      if (format === 'coco') await page.getByRole('heading', { name: '标注文件结构' }).waitFor();
      await page.getByRole('button', { name: '开始标注', exact: true }).click();
      await page.getByText('标注处理成功！可以使用滑块调节缩放，按住鼠标拖动画布。', { exact: true }).waitFor();
      const calls = await page.evaluate(() => window.drawCalls);
      assert.ok(calls.some(call => JSON.stringify(call) === JSON.stringify(['strokeRect', 100, 75, 200, 150])));
      assert.ok(calls.some(call => JSON.stringify(call) === JSON.stringify(['strokeRect', 40, 30, 50, 60])));
      assert.ok(calls.some(call => call[0] === 'fillText' && call[1] === 'cat'));
      assert.ok(calls.some(call => call[0] === 'fillText' && call[1] === 'dog'));
      assert.ok(!calls.some(call => JSON.stringify(call) === JSON.stringify(['strokeRect', 1, 1, 5, 5])));
      assert.deepEqual(await page.evaluate(() => Array.from(document.querySelector('canvas').getContext('2d').getImageData(100, 100, 1, 1).data)), [0, 255, 0, 255]);

      const slider = page.getByRole('slider', { name: '缩放' });
      await slider.focus();
      await slider.press('ArrowRight');
      await page.waitForFunction(() => window.drawCalls.some(call => call[0] === 'scale' && call[1] === 1.1));
      const box = await page.locator('canvas').boundingBox();
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 90, box.y + 80, { steps: 5 });
      await page.mouse.up();
      await page.waitForFunction(() => window.drawCalls.some(call => call[0] === 'translate' && call[1] === 40 && call[2] === 30));
      await page.getByRole('button', { name: '重置视图', exact: true }).click();
      await page.waitForFunction(() => { const call = window.drawCalls.filter(call => call[0] === 'translate').at(-1); return call[1] === 0 && call[2] === 0; });
      assert.equal(await slider.inputValue(), '1');
      const lastTransform = await page.evaluate(() => window.drawCalls.filter(call => call[0] === 'translate').at(-1));
      assert.deepEqual(lastTransform, ['translate', 0, 0]);

      if (format === 'coco') {
        await page.getByText('▶ Object', { exact: true }).click();
        await page.getByText('images:', { exact: true }).waitFor();
        await page.getByText('▶ Array[2]', { exact: true }).first().click();
        await page.getByText('▶ Object', { exact: true }).first().click();
        await page.getByText('"sample.svg"', { exact: true }).waitFor();
        await page.getByRole('spinbutton', { name: 'Image ID' }).fill('8');
        await page.getByRole('button', { name: '搜索ID', exact: true }).click();
        await page.getByText('找到ID为 8 的相关信息', { exact: true }).waitFor();
        assert.equal(await page.getByText('▶ Array[1]', { exact: true }).count(), 2);
        await page.getByRole('spinbutton', { name: 'Image ID' }).fill('999');
        await page.getByRole('button', { name: '搜索ID', exact: true }).click();
        await page.getByText('未找到ID为 999 的相关信息', { exact: true }).waitFor();
        assert.equal(await page.getByRole('heading', { name: '搜索结果：' }).count(), 0);
      }
      await page.screenshot({ path: path.join(os.tmpdir(), `${format}-desktop.png`), fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 390);
      await page.screenshot({ path: path.join(os.tmpdir(), `${format}-mobile.png`), fullPage: true });
      assert.deepEqual(errors, []);
      assert.deepEqual(requests, []);
      console.log(`${format.toUpperCase()} passed: offline navigation, uploads, coordinates, pixels, classes, zoom, drag, reset, and narrow layout${format === 'coco' ? ', JSON tree and ID search' : ''}.`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
