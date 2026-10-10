# K-Means Clustering, Step by Step (Offline)

**English** | [简体中文](README.zh-CN.md)

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
