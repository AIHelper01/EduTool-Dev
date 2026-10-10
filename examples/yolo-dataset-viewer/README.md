# YOLO Dataset Viewer (Offline Extraction)

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html` and use it in a modern browser such as Chrome or Edge. All runtime code and styles are inlined: no server, no dependencies, no network. Images and annotations are read inside the browser only.

## Usage

1. Upload one image (JPG, PNG, ...) and its matching YOLO detection annotation TXT.
2. Click "开始标注" to show green detection boxes with class indices such as `class 0`.
3. Use the zoom slider (0.1x-3x) and hold the mouse button to drag the canvas; "重置视图" returns to 1x and the original position. On narrow screens the canvas scrolls horizontally.

Each annotation line is `class_id x_center y_center width height` with coordinates normalised to the image size. For example, on a 400×300 image `0 0.5 0.5 0.5 0.5` is a box with top-left corner (100, 75), width 200 and height 150.

## Source and changes

- Original author: 我是土堆.
- Original page: https://xiaotudui.com/labs/yolo-dataset-viewer
- Extracted: 2026-10-08.
- Original tool component: `https://xiaotudui.com/assets/js/d628c65a.88c08004.js`, module 2684.
- React runtime code comes from the site's `https://xiaotudui.com/assets/js/main.a03ec8b7.js`, React / React DOM version 19.2.0.
- Kept the original component's file loading, YOLO coordinate conversion, canvas drawing, zoom and mouse-drag logic; only the required runtime modules were bundled, the site Layout was replaced, and ad components, navigation and unrelated texture links were removed.
- Added offline usage notes, source attribution, an accessible label for zoom and keyboard focus; corrected the original page's description of the class file, and added horizontal scrolling for the narrow-screen canvas.
- React and its runtime are MIT licensed, see `licenses/React-LICENSE.txt`. No independent open licence was confirmed for the site's tool component and styles, so they are not claimed as project-owned MIT code.

## Limits and verification

- One image and one annotation file at a time; no batch folder browsing, no annotation editing, no export.
- The original component has no `classes.txt` upload and always shows class indices; other YOLO formats such as segmentation polygons are unsupported.
- Original parser behaviour is preserved: use well-formed detection annotations with finite numbers, since no extra per-line validation was added.
- Zoom keeps the canvas at its original size and you can drag while zoomed in; touch dragging on phones is not implemented, mouse dragging is verified.
- The COCO128 download and the source links to the original site do need network access; the tool itself does not.
- Verified in a fresh Chrome context over `file://` with HTTP(S) blocked: missing-file warnings, file upload, two classes of detection boxes, known box coordinates and green pixels, keyboard zoom, mouse dragging and reset, with no external requests or runtime errors; desktop and 390px screenshots reviewed.

The unified entry point lives at `../object-detection-dataset-viewer/index.html`. The development check script is `scripts/check_yolo_viewer.cjs`, which needs Playwright plus a browser in the development environment; `CHROME_PATH` can point at Chrome. Tool users need none of these dependencies.
