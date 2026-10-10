# 工具索引

[English](README.md) | **简体中文**

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
| `quantization-v2` | 新建 | 一个张量走完整线性量化链路：量化阶梯、分组 scale、误差分箱、位宽扫描与存储开销 |
| `lora` | 新建 | 冻结权重、低秩矩阵、梯度训练、参数量与权重合并一致性 |
| `rnn-lstm` | 新建 | 时间步、门控、状态传递与早期输入敏感度 |
| `object-detection-dataset-viewer` | 新建统一入口 | 三种格式的离线跳转、中英文切换和窄屏布局 |
| `yolo-dataset-viewer` | 从网页提取 | 本地文件读取、检测框坐标、缩放、拖动与离线运行 |
| `coco-dataset-viewer` | 从网页提取 | 文件名与 Image ID 匹配、类别名称、检测框和 JSON 树 |
| `voc-dataset-viewer` | 从网页提取 | XML 类别与坐标解析、缩放、拖动与离线运行 |

新增工具时使用清楚、稳定的英文目录名。不要提交测试依赖、临时网页快照或生成的 ZIP；把第三方来源、离线化改动和许可边界写进工具 README。
