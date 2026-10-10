# 目标检测数据集查看器

[English](README.md) | **简体中文**

双击本目录的 `index.html`，根据标注格式选择三个离线查看器：

| 查看器 | 标注格式 | 功能 |
| --- | --- | --- |
| [YOLO](../yolo-dataset-viewer/index.html) | TXT，归一化中心坐标与宽高 | 显示类别编号和检测框 |
| [COCO](../coco-dataset-viewer/index.html) | JSON，像素坐标 `bbox` | 类别名称、检测框、Image ID 搜索、JSON 树 |
| [Pascal VOC](../voc-dataset-viewer/index.html) | XML，`bndbox` 角点坐标 | 类别名称和检测框 |

入口支持 English / 中文切换，并在浏览器允许时记住语言选择；各查看器保留原组件的中文界面。文件仅在浏览器中处理，工具运行无需联网或服务器。每次可视化一张图片，可以缩放和鼠标拖动，不提供标注编辑。

该入口是本项目新制作的原生 HTML/CSS/JavaScript 页面，三个查看器提取自“我是土堆”，各自的来源、许可和实际限制见对应目录 README。

## 完整离线包

`examples/object-detection-dataset-viewer.zip` 包含本入口及三个工具目录。请完整解压并保持四个文件夹的相对位置，再打开 `object-detection-dataset-viewer/index.html`，不要只解压入口页面。单独下载 COCO、VOC 或 YOLO 的 ZIP 也可以直接使用对应查看器。

已在新 Chrome 上下文阻断 HTTP(S) 请求，验证主页 → 本入口 → 三个工具的实际跳转、中英文切换、桌面与 390px 窄屏布局。工具的文件读取和检测框绘制等行为另有浏览器验证，详见各目录 README。
