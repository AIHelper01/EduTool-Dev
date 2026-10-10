# COCO 数据集查看器（离线提取版）

[English](README.md) | **简体中文**

双击 `index.html`，在 Chrome、Edge 等现代浏览器中使用。运行代码与样式全部内联，无需联网、服务器或安装依赖。文件只在浏览器中读取。

## 使用方法

1. 上传一张图片及 COCO 目标检测标注 JSON。JSON 应包含 `images`、`annotations` 和 `categories`。
2. 图片文件名必须与 `images[].file_name` 完全一致。点击“开始标注”，显示这张图片的检测框与类别名称。
3. 通过滑块缩放，按住鼠标拖动画布；“重置视图”恢复 1 倍缩放与初始位置。窄屏可横向滚动画布。
4. 输入 Image ID 并点击“搜索ID”，查看对应图片及标注记录。点击 JSON 树的三角标记展开结构。

`bbox` 使用像素坐标 `[x, y, width, height]`。例如 `[100, 75, 200, 150]` 的左上角是 (100, 75)，右下角是 (300, 225)。

## 来源与改动

- 原作者：我是土堆。
- 原页面：https://xiaotudui.com/labs/coco-dataset-viewer
- 提取日期：2026-10-08。
- 原组件：`https://xiaotudui.com/assets/js/d40b763b.62ab1b23.js`，模块 1391。
- React 运行时来自原站 `https://xiaotudui.com/assets/js/main.a03ec8b7.js`，React / React DOM 版本 19.2.0。
- 保留原组件的图片匹配、标注筛选、类别查询、检测框绘制、缩放、鼠标拖动、Image ID 搜索和 JSON 树；仅打包所需运行时模块，替换网站 Layout，移除广告、导航与无关纹理外链。
- 补充离线说明、来源署名、缩放与 Image ID 无障碍标签、键盘焦点及窄屏画布滚动；搜索控件在窄屏可换行。
- React 运行时采用 MIT 许可，见 `licenses/React-LICENSE.txt`。未确认原工具组件和站点样式的独立开放许可，不声明为本项目 MIT 自有代码。

## 限制与验证

- 一次可视化一张图片；不提供标注编辑、目录批量浏览或分割掩码绘制。
- 保留原文件名匹配方式，不自动处理 JSON 中的目录前缀；找不到对应图片时显示提示。
- 整份 JSON 读入内存，展开的数组或对象最多显示前 20 项；大型标注文件的性能取决于浏览器和电脑内存。
- 保留原解析行为，请使用格式正确的 COCO 检测标注；未新增完整的结构、数值或错误行校验。
- 缩放保持画布原始尺寸，放大后可拖动查看；已验证鼠标拖动，未实现手机触摸拖动。
- 原站与数据集下载链接需要联网；工具运行本身不需要。
- 已在全新 Chrome 上下文通过 `file://` 打开，阻断 HTTP(S)，验证文件上传、按文件名及 Image ID 筛选、两类检测框、已知坐标与绿色像素、缩放、拖动、重置、JSON 展开、ID 搜索成功和无匹配分支，无外部请求或运行错误；检查了桌面与 390px 窄屏截图。

统一入口位于 `../object-detection-dataset-viewer/index.html`。开发验证脚本为 `scripts/check_detection_viewers.cjs`，需 Playwright 与浏览器，可通过 `CHROME_PATH` 指定 Chrome；工具使用者无需安装这些依赖。
