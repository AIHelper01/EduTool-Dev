# Pascal VOC 数据集查看器（离线提取版）

[English](README.md) | **简体中文**

双击 `index.html`，在 Chrome、Edge 等现代浏览器中使用。运行代码与样式全部内联，无需联网、服务器或安装依赖。文件只在浏览器中读取。

## 使用方法

1. 上传一张图片及对应的 Pascal VOC XML 标注文件。
2. 点击“开始标注”，显示 XML 中各个 `object` 的类别名称和检测框。
3. 通过滑块缩放，按住鼠标拖动画布；“重置视图”恢复 1 倍缩放与初始位置。窄屏可横向滚动画布。

每个 `object` 包含 `name` 和 `bndbox`，后者包含 `xmin`、`ymin`、`xmax`、`ymax`。保留原组件的坐标算法：左上角为 `(xmin, ymin)`，宽高为 `(xmax-xmin, ymax-ymin)`。例如 (100, 75, 300, 225) 绘制宽 200、高 150 的框。

## 来源与改动

- 原作者：我是土堆。
- 原页面：https://xiaotudui.com/labs/voc-dataset-viewer
- 提取日期：2026-10-08。
- 原组件：`https://xiaotudui.com/assets/js/5658c468.c8f121ba.js`，模块 1487。
- React 运行时来自原站 `https://xiaotudui.com/assets/js/main.a03ec8b7.js`，React / React DOM 版本 19.2.0。
- 保留原组件的 XML 读取、类别名称、坐标解析、绘制、缩放与鼠标拖动；仅打包所需运行时模块，替换网站 Layout，移除广告、导航与无关纹理外链。
- 补充离线说明、来源署名、缩放无障碍标签、键盘焦点及窄屏画布滚动。
- React 运行时采用 MIT 许可，见 `licenses/React-LICENSE.txt`。未确认原工具组件和站点样式的独立开放许可，不声明为本项目 MIT 自有代码。

## 限制与验证

- 一次查看一张图片和一个 XML；不提供标注编辑、批量浏览或分割可视化。
- 原组件直接使用 XML 中的整数框坐标，不根据 XML 的图片尺寸自动缩放标注；请上传与标注对应的原始图片。
- 保留原解析行为，请使用格式正确的 VOC 检测标注；未新增完整的 XML 结构和数值校验。
- 缩放保持画布原始尺寸，放大后可拖动查看；已验证鼠标拖动，未实现手机触摸拖动。
- 原站、数据集下载和官网链接需要联网；工具运行本身不需要。
- 已在全新 Chrome 上下文通过 `file://` 打开，阻断 HTTP(S)，验证缺少文件提示、文件上传、两个类别名称、已知框坐标与绿色像素、缩放、鼠标拖动及重置，无外部请求或运行错误；检查了桌面与 390px 窄屏截图。

统一入口位于 `../object-detection-dataset-viewer/index.html`。开发验证脚本为 `scripts/check_detection_viewers.cjs`，需 Playwright 与浏览器，可通过 `CHROME_PATH` 指定 Chrome；工具使用者无需安装这些依赖。
