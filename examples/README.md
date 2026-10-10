# Tool Index

**English** | [中文](#中文说明)

These tools also validate the extraction and generation flow of the skill. Every directory contains at least an `index.html` that opens directly in a browser and a `README.md` that documents usage, provenance and limits. Every tool README is bilingual and opens in English.

| Directory | Kind | What it verifies |
| --- | --- | --- |
| `linear-regression` | Extracted | Learning rate, training controls, weight and bias updates, loss convergence |
| `classification-accuracy-precision-recall` | Extracted | Datasets and threshold driving the confusion matrix and metrics |
| `neural-network-nodes-hidden-layers` | Extracted | Switching network structure, step-by-step computation, node parameter editing |
| `kmeans-clustering` | Extracted | Initialisation modes, stepwise assignment and centroid updates, centroids and Voronoi regions |
| `logistic-regression` | New | Parameters, threshold, training state, probability curve and metrics staying in sync |
| `svm` | New | Linear/RBF decision boundaries, support vectors, C/gamma, KKT conditions, held-out metrics |
| `quantization` | New | Bit width, scale, zero point, group scaling, error and weight storage estimates |
| `lora` | New | Frozen weights, low-rank matrices, gradient training, parameter counts, merge consistency |
| `rnn-lstm` | New | Time steps, gates, state passing, early-input sensitivity |
| `object-detection-dataset-viewer` | New unified entry | Offline links to the three formats, language switching, narrow-screen layout |
| `yolo-dataset-viewer` | Extracted | Local file loading, detection box coordinates, zoom, dragging, offline run |
| `coco-dataset-viewer` | Extracted | File name to Image ID matching, category names, detection boxes, JSON tree |
| `voc-dataset-viewer` | Extracted | XML category and coordinate parsing, zoom, dragging, offline run |

Use clear, stable English directory names for new tools. Do not commit test dependencies, temporary page snapshots, or generated ZIPs; record third-party sources, offline changes and licence boundaries in the tool README.

---

## 中文说明

这些工具同时用于验证 skill 的提取与生成流程。每个目录至少包含一个可直接用浏览器打开的 `index.html`，以及记录用法、来源和限制的 `README.md`。

| 目录 | 类型 | 验证重点 |
| --- | --- | --- |
| `linear-regression` | 从网页提取 | 学习率、训练控制、权重与偏置更新以及损失收敛 |
| `classification-accuracy-precision-recall` | 从网页提取 | 数据集和阈值改变混淆矩阵与指标 |
| `neural-network-nodes-hidden-layers` | 从网页提取 | 网络结构切换、逐步计算和节点参数编辑 |
| `kmeans-clustering` | 从网页提取 | 初始化方式、逐步分配与更新中心、质心与 Voronoi 区域 |
| `logistic-regression` | 新建 | 参数、阈值、训练状态、概率曲线和指标保持联动 |
| `svm` | 新建 | 线性／RBF 决策边界、支持向量、C／γ、KKT 条件与独立测试指标 |
| `quantization` | 新建 | 位宽、scale、零点、分组缩放、误差与权重存储估算 |
| `lora` | 新建 | 冻结权重、低秩矩阵、梯度训练、参数量与权重合并一致性 |
| `rnn-lstm` | 新建 | 时间步、门控、状态传递与早期输入敏感度 |
| `object-detection-dataset-viewer` | 新建统一入口 | 三种格式的离线跳转、中英文切换和窄屏布局 |
| `yolo-dataset-viewer` | 从网页提取 | 本地文件读取、检测框坐标、缩放、拖动与离线运行 |
| `coco-dataset-viewer` | 从网页提取 | 文件名与 Image ID 匹配、类别名称、检测框和 JSON 树 |
| `voc-dataset-viewer` | 从网页提取 | XML 类别与坐标解析、缩放、拖动与离线运行 |

新增工具时使用清楚、稳定的英文目录名。不要提交测试依赖、临时网页快照或生成的 ZIP；把第三方来源、离线化改动和许可边界写进工具 README。
