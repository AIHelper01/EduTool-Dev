# YOLO Dataset Viewer (Offline Extraction)

**English** | [中文](#中文说明)

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

---

## 中文说明

双击 `index.html`，在 Chrome、Edge 等现代浏览器中使用。所有运行代码和样式均已内联，不需要服务器、安装依赖或联网。图片与标注只在浏览器中读取。

### 使用方法

1. 上传一张图片（例如 JPG、PNG）和对应的 YOLO 检测标注 TXT。
2. 点击“开始标注”，显示绿色检测框与 `class 0` 等类别编号。
3. 使用缩放滑块（0.1–3 倍），按住鼠标拖动画布；点击“重置视图”恢复 1 倍及原始位置。窄屏可横向滚动画布。

每条标注为 `class_id x_center y_center width height`，坐标归一化到图片尺寸。例如 400×300 图片中的 `0 0.5 0.5 0.5 0.5` 对应左上角 (100, 75)、宽 200、高 150 的检测框。

### 来源与改动

- 原作者：我是土堆。
- 原页面：https://xiaotudui.com/labs/yolo-dataset-viewer
- 提取日期：2026-10-08。
- 原工具组件：`https://xiaotudui.com/assets/js/d628c65a.88c08004.js`，模块 2684。
- React 运行时代码来自该站 `https://xiaotudui.com/assets/js/main.a03ec8b7.js`，React / React DOM 版本 19.2.0。
- 保留原组件的文件读取、YOLO 坐标换算、画布绘制、缩放和鼠标拖动逻辑；仅打包所需运行时模块，替换网站 Layout，移除广告组件、导航及无关纹理外链。
- 补充离线使用提示、来源署名、缩放无障碍标签和键盘焦点；修正原页面关于类别文件的说明，并给窄屏画布增加横向滚动。
- React 及其运行时采用 MIT 许可，见 `licenses/React-LICENSE.txt`。未确认原站工具组件与样式的独立开放许可，不将其声明为本项目 MIT 自有代码。

### 限制与验证

- 一次查看一张图片和一个标注文件，不提供目录批量浏览、标注编辑或导出。
- 原组件没有 `classes.txt` 上传功能，始终显示类别编号；不支持分割多边形等其他 YOLO 格式。
- 保留原解析器的行为，使用格式正确、有限数值的检测标注；没有新增完整的错误行校验。
- 缩放保持画布原始尺寸，放大后可以拖动查看；手机触摸拖动未实现，鼠标拖动已验证。
- COCO128 下载与原站来源链接需要联网；工具运行本身无需联网。
- 已在全新 Chrome 上下文通过 `file://` 打开，阻断 HTTP(S)，验证缺少文件提示、文件上传、两类检测框、已知框坐标与绿色像素、键盘缩放、鼠标拖动及重置，无外部请求与运行错误；检查了桌面与 390px 窄屏截图。

统一入口位于 `../object-detection-dataset-viewer/index.html`。开发验证脚本为 `scripts/check_yolo_viewer.cjs`，需要开发环境提供 Playwright 与浏览器；可用 `CHROME_PATH` 指定 Chrome。工具使用者无需这些依赖。
