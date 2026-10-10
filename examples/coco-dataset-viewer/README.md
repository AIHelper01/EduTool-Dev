# COCO Dataset Viewer (Offline Extraction)

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html` and use it in a modern browser such as Chrome or Edge. All runtime code and styles are inlined: no network, no server, no dependencies. Files are read inside the browser only.

## Usage

1. Upload one image and its COCO object-detection annotation JSON. The JSON must contain `images`, `annotations` and `categories`.
2. The image file name must match `images[].file_name` exactly. Click "开始标注" to show that image's detection boxes with category names.
3. Zoom with the slider and hold the mouse button to drag the canvas; "重置视图" returns to 1x zoom and the initial position. On narrow screens the canvas scrolls horizontally.
4. Enter an Image ID and click "搜索ID" to jump to the matching image and its annotation records. Click the triangles in the JSON tree to expand the structure.

`bbox` uses pixel coordinates `[x, y, width, height]`. For example `[100, 75, 200, 150]` has its top-left corner at (100, 75) and its bottom-right corner at (300, 225).

## Source and changes

- Original author: 我是土堆.
- Original page: https://xiaotudui.com/labs/coco-dataset-viewer
- Extracted: 2026-10-08.
- Original component: `https://xiaotudui.com/assets/js/d40b763b.62ab1b23.js`, module 1391.
- React runtime comes from the original site's `https://xiaotudui.com/assets/js/main.a03ec8b7.js`, React / React DOM version 19.2.0.
- Kept the original component's image matching, annotation filtering, category lookup, detection-box drawing, zoom, mouse dragging, Image ID search and JSON tree; only the required runtime modules were bundled, the site Layout was replaced, and ads, navigation and unrelated texture links were removed.
- Added offline usage notes, source attribution, accessible labels for zoom and Image ID, keyboard focus and narrow-screen canvas scrolling; the search controls wrap on narrow screens.
- The React runtime is MIT licensed, see `licenses/React-LICENSE.txt`. No independent open licence was confirmed for the original tool component or the site styles, so they are not claimed as project-owned MIT code.

## Limits and verification

- One image is visualised at a time; no annotation editing, no batch folder browsing, no segmentation mask rendering.
- The original file-name matching is preserved and directory prefixes inside the JSON are not handled automatically; a notice appears when no image matches.
- The whole JSON is loaded into memory and expanded arrays or objects show at most the first 20 items; performance on large annotation files depends on the browser and machine memory.
- Original parser behaviour is preserved: use well-formed COCO detection annotations, since no extra structure, numeric or per-line validation was added.
- Zoom keeps the canvas at its original size and you can drag while zoomed in; mouse dragging is verified, touch dragging on phones is not implemented.
- The original site and dataset download links do need network access; the tool itself does not.
- Verified in a fresh Chrome context over `file://` with HTTP(S) blocked: file upload, filtering by file name and Image ID, two classes of detection boxes, known coordinates and green pixels, zoom, dragging, reset, JSON expansion, successful ID search and the no-match branch, with no external requests or runtime errors; desktop and 390px screenshots reviewed.

The unified entry point lives at `../object-detection-dataset-viewer/index.html`. The development check script is `scripts/check_detection_viewers.cjs`, which needs Playwright plus a browser; `CHROME_PATH` can point at Chrome. Tool users need none of these dependencies.
