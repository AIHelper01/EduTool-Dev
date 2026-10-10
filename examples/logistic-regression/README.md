# Logistic Regression Interactive Demo

**English** | [中文](#中文说明)

Double-click `index.html` and open it in a modern browser such as Edge or Chrome. All code and data live in this single HTML file: no installation, no server, no network.

- Choose one of three example datasets to see clearly separable classes, overlapping classes, and imbalanced classes.
- Drag Weight and Bias and watch how the S-shaped probability curve and the mean cross-entropy respond.
- Drag the Classification threshold and watch the decision boundary, confusion matrix, accuracy, precision, recall and F1. Moving the threshold alone never changes cross-entropy.
- Click "Train one step" or "Auto train" to update weight and bias with gradient descent; "Reset parameters" restores the defaults.

Purple dots are actual positives, orange dots are actual negatives, and a black × marks a misclassified point; the blue line is the model's predicted positive probability and the dashed orange line is the classification threshold. The three datasets are fixed built-in examples and stay identical across reloads.

This is a newly built logistic regression demo whose visual style follows the linear regression and classification-metric offline tools in this workspace. The page credit reads "工具来源：AIHelper01".

---

## 中文说明

双击 `index.html`，用 Edge、Chrome 等现代浏览器打开。所有代码和数据都在这一个 HTML 文件中，无需安装软件、启动服务器或联网。

- 选择三个示例数据集，观察类别容易区分、有重叠、类别不平衡时的差异。
- 拖动 Weight（权重）和 Bias（偏置），观察 S 形概率曲线及平均交叉熵如何变化。
- 拖动 Classification threshold（分类阈值），观察分类边界、混淆矩阵、准确率、精确率、召回率和 F1 的变化。仅调整阈值不会改变交叉熵。
- 点击“训练一步”或“自动训练”，用梯度下降更新权重和偏置；“重置参数”恢复默认值。

图中紫色点表示实际正类，橙色点表示实际负类，黑色 × 标记预测错误；蓝线是模型预测的正类概率，橙色虚线是分类阈值。三个数据集是内置的固定示例，重复打开时保持一致。

本工具是新制作的逻辑回归演示，视觉风格参考了工作区里的线性回归和分类指标离线工具。页面标注“工具来源：AIHelper01”。
