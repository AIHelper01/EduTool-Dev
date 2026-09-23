# 工具索引

这些工具同时用于验证 skill 的提取与生成流程。每个目录至少包含一个可直接用浏览器打开的 `index.html`，以及记录用法、来源和限制的 `README.md`。

| 目录 | 类型 | 验证重点 |
| --- | --- | --- |
| `linear-regression` | 从网页提取 | 学习率、训练控制、权重与偏置更新以及损失收敛 |
| `classification-accuracy-precision-recall` | 从网页提取 | 数据集和阈值改变混淆矩阵与指标 |
| `neural-network-nodes-hidden-layers` | 从网页提取 | 网络结构切换、逐步计算和节点参数编辑 |
| `logistic-regression` | 新建 | 参数、阈值、训练状态、概率曲线和指标保持联动 |

新增工具时使用清楚、稳定的英文目录名。不要提交测试依赖、临时网页快照或生成的 ZIP；把第三方来源、离线化改动和许可边界写进工具 README。
