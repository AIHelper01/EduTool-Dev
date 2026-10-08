# Third-party notices

仓库中的 skill、说明文档以及新制作的工具代码由本项目按 MIT License 提供。下面三个工具包含从 Google 机器学习速成课程页面提取并封装的脚本、数据或组件，因此仍受原内容条款及代码中保留的第三方声明约束：

| 工具 | 原始页面 |
| --- | --- |
| `examples/linear-regression` | [Linear regression: Gradient descent exercise](https://developers.google.cn/machine-learning/crash-course/linear-regression/gradient-descent-exercise?hl=zh-cn) |
| `examples/classification-accuracy-precision-recall` | [Classification: Accuracy, recall, precision, and related metrics](https://developers.google.cn/machine-learning/crash-course/classification/accuracy-precision-recall?hl=zh-cn) |
| `examples/neural-network-nodes-hidden-layers` | [Neural networks: Nodes and hidden layers](https://developers.google.cn/machine-learning/crash-course/neural-networks/nodes-hidden-layers?hl=zh-cn) |

Google 机器学习教育内容的复用说明见 [Can I reuse content from Machine Learning Crash Course?](https://support.google.com/machinelearningeducation/answer/7652594?hl=en)。具体文件中出现的版权与 SPDX 声明应一并保留。

`examples/logistic-regression` 是本项目新制作的演示，数据为固定种子生成的合成示例。

## 目标检测数据集查看器

以下三个离线工具提取自“我是土堆”，提取日期为 2026-10-08：

| 工具 | 原始页面 |
| --- | --- |
| `examples/yolo-dataset-viewer` | [YOLO 数据集查看器](https://xiaotudui.com/labs/yolo-dataset-viewer) |
| `examples/coco-dataset-viewer` | [COCO 数据集查看器](https://xiaotudui.com/labs/coco-dataset-viewer) |
| `examples/voc-dataset-viewer` | [Pascal VOC 数据集查看器](https://xiaotudui.com/labs/voc-dataset-viewer) |

保留原工具组件与所需 React 运行时，离线化改动与限制见各工具 README。原组件和站点样式未确认独立开放许可，仍受原作者条款约束，不纳入本项目自有代码的 MIT 授权。React / React DOM / Scheduler / JSX 运行时许可保留在各目录的 `licenses/React-LICENSE.txt`。

`examples/object-detection-dataset-viewer` 是本项目新制作的统一导航入口，按 MIT License 提供。
