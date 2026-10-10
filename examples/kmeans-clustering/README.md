# K-Means Clustering, Step by Step (Offline)

**English** | [中文](#中文说明)

Double-click `index.html` and open it in a modern browser such as Edge or Chrome. Every script from the original site is inlined: no software to install, no server to start, no network.

## What you can do

- Step one picks where the initial centroids come from: `I'll Choose` (then click on the plot to place them one by one, up to 10, i.e. the number of clusters k), `Randomly` (each click on `Add Centroid` drops one at random), `Farthest Point` (each step takes the sample furthest from the existing centroids).
- Step two picks the data distribution: `Uniform Points` 250 points, `Gaussian Mixture` 250 points, `Smiley Face` 500 points, `Density Bars` 500 points, `Packed Circles` 500 points, `Pimpled Smiley` 500 points, `DBSCAN Rings` 105 points, `Example A` 9 points.
- Once 2 centroids are placed, `GO!` appears, after which `Reassign Points` (assign each sample to its nearest centroid) and `Update Centroids` (move each centroid to the mean of its samples) alternate as single steps until the colours stop changing; `Restart` returns to step one at any time.
- Reading the plot: small dots are coloured by the cluster a sample currently belongs to, large circles are centroids, and the pale regions are each centroid's Voronoi territory.

## Source and offline notes

- Original page: Naftali Harris, [Visualizing K-Means Clustering](https://www.naftaliharris.com/blog/visualizing-k-means-clustering/), footer copyright © Naftali Harris, 2012-2023.
- Extracted: 2026-10-10.
- Inlined verbatim, implementation untouched: `/static/js/d3.v3.min.js`, `/blog/cluster-lib/choose.js`, `/blog/cluster-lib/generate.js`, `/blog/cluster-lib/config.js`, `/blog/visualizing-k-means-clustering/kmeans.js`, `/blog/visualizing-k-means-clustering/main.js`. The `shuffle()` in `generate.js` keeps Jonas Raoni Soares Silva's jsfromhell source comment.
- Removed: site header, footer and navigation, Google fonts, the Twitter share widget, Google Analytics scripts, and the original page's long commentary and figures (only the link to the original page is kept).
- Page-shell changes: added a title, the workflow, reading tips and a footer credit; scoped the original page's global `input { font-size: 40px; }` rule to `#button_area input`, plus button spacing, a 26px font size on narrow screens, and `#svg_area svg { min-width: 680px; }` so the plot scrolls horizontally on narrow screens. The demo algorithm, data generation and SVG interaction are unchanged.

## Licence and attribution

- The original page states no separate open licence for Naftali Harris's demo code. This directory only repackages it as a single offline file; copyright and terms of use remain with the original author and the repository's root MIT License does not cover that content. Get the author's permission before redistributing elsewhere, or rebuild it as your own implementation.
- The inlined d3.v3 is Mike Bostock's work under ISC/BSD-3-Clause; the notice is in `licenses/d3-LICENSE.txt` and preserved in the comment at the top of the inlined script in `index.html`.
- The "工具来源：AIHelper01" line at the bottom of the page only marks the offline packaging and does not change the authorship above.

## Known limits

- The choice cards, centroids and buttons are SVG/native inputs and respond to mouse clicks only; there is no keyboard operation or focus order (same as the original).
- Data and random initialisation differ every run, and the page reports no numeric metrics such as SSE; compute those separately if you need them.
- At most 10 clusters; `Farthest Point` is furthest-point initialisation and is not equivalent to K-Means++.
- On narrow screens the plot scrolls horizontally at 680px width while the page itself does not overflow.

## Verification

Verified by hand on 2026-10-10 with Edge (Playwright, fresh context, all HTTP(S) requests blocked): loaded point counts for all 8 datasets match the original generators (250/250/500/500/500/500/105/9); click placement on the canvas is accurate to better than 0.2 data units; after `GO!` every sample belongs to its nearest centroid and after `Update Centroids` every centroid equals the mean of its samples (error below 1e-9), with the within-cluster sum of squares monotonically non-increasing and eventually converging; centroids from `Randomly` and `Farthest Point` both land on real samples, and the second farthest-point centroid equals the brute-force maximum distance; the 10-cluster cap holds; `Restart` clears the plot back to step one; no horizontal overflow at 1280px or 390px, no console errors, zero network requests. `scripts/check_kmeans.cjs` in the repository reproduces those key relations: `node scripts/check_kmeans.cjs` runs the attribution and style checks followed by the offline browser checks (needs Playwright, with `CHROME_PATH` pointing at a local Edge/Chrome), while `node scripts/check_kmeans.cjs --structure-only` runs only the browser-free checks on third-party attribution, the d3 licence file and button style scoping, and it is wired into CI. The Playwright dependency itself is not committed.

---

## 中文说明

双击 `index.html`，用 Edge、Chrome 等现代浏览器打开。原站脚本已全部内联，无需安装软件、启动服务器或联网。

### 可以操作什么

- 第一步选初始质心来源：`I'll Choose`（之后在图上依次点击放置，最多 10 个，即簇数 k）、`Randomly`（每点一次 `Add Centroid` 随机撒一个）、`Farthest Point`（每次取离已有质心最远的样本点）。
- 第二步选数据分布：`Uniform Points` 250 点、`Gaussian Mixture` 250 点、`Smiley Face` 500 点、`Density Bars` 500 点、`Packed Circles` 500 点、`Pimpled Smiley` 500 点、`DBSCAN Rings` 105 点、`Example A` 9 点。
- 放好 2 个质心后出现 `GO!`，之后 `Reassign Points`（按最近质心重新分配样本）与 `Update Centroids`（质心移到所属样本的均值）交替单步执行，直到配色不再变化；`Restart` 随时回到第一步。
- 读图：小圆点配色表示样本当前属于哪一簇，大圆是质心，淡色底块是每个质心的 Voronoi 势力范围。

### 来源与离线化说明

- 原页面：Naftali Harris, [Visualizing K-Means Clustering](https://www.naftaliharris.com/blog/visualizing-k-means-clustering/)，页面页脚版权为 © Naftali Harris, 2012-2023。
- 提取日期：2026-10-10。
- 原样内联、未改动实现：`/static/js/d3.v3.min.js`、`/blog/cluster-lib/choose.js`、`/blog/cluster-lib/generate.js`、`/blog/cluster-lib/config.js`、`/blog/visualizing-k-means-clustering/kmeans.js`、`/blog/visualizing-k-means-clustering/main.js`。`generate.js` 里的 `shuffle()` 保留 Jonas Raoni Soares Silva 的 jsfromhell 出处注释。
- 移除内容：站点页头页脚与导航、Google 字体、Twitter 分享组件、Google Analytics 统计脚本、原页面的长文讲解与配图（只保留原页面链接）。
- 外层改动：新增中文标题、操作流程、看图要点和页脚署名；原页面的全局 `input { font-size: 40px; }` 限定为 `#button_area input`，另加按钮间距、窄屏 26px 字号，以及 `#svg_area svg { min-width: 680px; }` 让图区在窄屏改为横向滚动。演示算法、数据生成和 SVG 交互本身没有改动。

### 许可与署名

- Naftali Harris 的演示代码没有在原页面标注独立的开放许可。本目录只是把它整理成可离线运行的单文件，著作权与使用条款仍归原作者，仓库根目录的 MIT License 不覆盖这部分内容。若要在其他平台再次分发，请先取得原作者许可，或改为自己实现的版本。
- 内联的 d3.v3 为 Mike Bostock 作品，ISC／BSD-3-Clause，声明见 `licenses/d3-LICENSE.txt`，同时保留在 `index.html` 内联脚本开头的注释里。
- 页面底部"工具来源：AIHelper01"只表示离线打包整理，不改变上述作者归属。

### 已知限制

- 选择卡片、质心和按钮都是 SVG／原生 input，只支持鼠标点击，没有键盘操作与焦点顺序（与原版一致）。
- 数据与随机初始化每次不同，页面不显示 SSE 等数值指标，需要指标请另行计算。
- 簇数上限 10；`Farthest Point` 只是最远点初始化，不等价于 K-Means++。
- 窄屏下图区按 680px 宽度横向滚动，页面本身不横向溢出。

### 验证

2026-10-10 用 Edge（Playwright，全新上下文并阻断全部 HTTP(S) 请求）实际操作验证：8 种数据的加载点数与原版生成器一致（250／250／500／500／500／500／105／9）；画布点击落点误差小于 0.2 个数据单位；`GO!` 之后每个样本都落在最近质心，`Update Centroids` 之后每个质心等于所属样本均值（误差小于 1e-9），逐步迭代的簇内平方和单调不增并最终收敛；`Randomly` 与 `Farthest Point` 的质心都落在真实样本上，且最远点方式的第 2 个质心等于暴力搜索的最远距离；10 个簇的上限生效；`Restart` 清空图面回到第一步；1280px 与 390px 均无横向溢出，控制台无报错，零网络请求。仓库内的 `scripts/check_kmeans.cjs` 复现了上述关键关系：`node scripts/check_kmeans.cjs` 依次做署名与样式检查和离线浏览器实操检查（需要 Playwright，用 `CHROME_PATH` 指向本机 Edge／Chrome），`node scripts/check_kmeans.cjs --structure-only` 只跑不需要浏览器的第三方署名、d3 许可文件和按钮样式作用域检查，并已接入 CI。Playwright 依赖本身不随仓库提交。
