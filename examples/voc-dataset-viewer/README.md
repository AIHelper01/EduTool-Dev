# Pascal VOC Dataset Viewer (Offline Extraction)

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html` and use it in a modern browser such as Chrome or Edge. All runtime code and styles are inlined: no network, no server, no dependencies. Files are read inside the browser only.

## Usage

1. Upload one image and its matching Pascal VOC XML annotation.
2. Click "开始标注" to show the category name and detection box of every `object` in the XML.
3. Zoom with the slider and hold the mouse button to drag the canvas; "重置视图" returns to 1x zoom and the initial position. On narrow screens the canvas scrolls horizontally.

Each `object` contains `name` and `bndbox`, and `bndbox` contains `xmin`, `ymin`, `xmax`, `ymax`. The original component's coordinate convention is kept: top-left corner `(xmin, ymin)` and size `(xmax-xmin, ymax-ymin)`. For example (100, 75, 300, 225) draws a box of width 200 and height 150.

## Source and changes

- Original author: 我是土堆.
- Original page: https://xiaotudui.com/labs/voc-dataset-viewer
- Extracted: 2026-10-08.
- Original component: `https://xiaotudui.com/assets/js/5658c468.c8f121ba.js`, module 1487.
- React runtime comes from the original site's `https://xiaotudui.com/assets/js/main.a03ec8b7.js`, React / React DOM version 19.2.0.
- Kept the original component's XML loading, category names, coordinate parsing, drawing, zoom and mouse dragging; only the required runtime modules were bundled, the site Layout was replaced, and ads, navigation and unrelated texture links were removed.
- Added offline usage notes, source attribution, an accessible label for zoom, keyboard focus and narrow-screen canvas scrolling.
- The React runtime is MIT licensed, see `licenses/React-LICENSE.txt`. No independent open licence was confirmed for the original tool component or the site styles, so they are not claimed as project-owned MIT code.

## Limits and verification

- One image and one XML at a time; no annotation editing, no batch browsing, no segmentation visualisation.
- The original component uses the integer box coordinates straight from the XML and never rescales annotations to the XML image size; upload the original image that matches the annotation.
- Original parser behaviour is preserved: use well-formed VOC detection annotations, since no extra XML structure or numeric validation was added.
- Zoom keeps the canvas at its original size and you can drag while zoomed in; mouse dragging is verified, touch dragging on phones is not implemented.
- The original site, dataset downloads and official-site links do need network access; the tool itself does not.
- Verified in a fresh Chrome context over `file://` with HTTP(S) blocked: missing-file warnings, file upload, two category names, known box coordinates and green pixels, zoom, mouse dragging and reset, with no external requests or runtime errors; desktop and 390px screenshots reviewed.

The unified entry point lives at `../object-detection-dataset-viewer/index.html`. The development check script is `scripts/check_detection_viewers.cjs`, which needs Playwright plus a browser; `CHROME_PATH` can point at Chrome. Tool users need none of these dependencies.
