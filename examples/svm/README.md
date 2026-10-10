# SVM Support Vector Machine Visualiser

**English** | [中文](#中文说明)

This is a newly built teaching demo using native HTML, CSS, JavaScript, SVG and an offscreen Canvas. All code and data generation live in `index.html`; double-click it to run offline in a modern browser such as Chrome or Edge, with no dependencies to install and no server. The page credit reads "工具来源：AIHelper01" and the code is provided under this project's MIT License.

## What you can do

- Switch between four fixed synthetic datasets: linearly separable, overlapping, concentric circles, XOR. Each provides 48 training samples and 64 independent test samples with equal class counts; retraining or reopening never changes the data.
- Switch between the linear kernel and the RBF Gaussian kernel. C ranges over 0.01-100 and gamma over roughly 0.05-10, both on base-10 logarithmic sliders; gamma is only available with the RBF kernel.
- Retraining runs automatically after a parameter change, and you can also click "Retrain" or "Restore defaults". The default is the linearly separable dataset, linear kernel, C = 1.
- Tick "Show test samples" to overlay the 64 hollow test points. The test set never participates in training, and training and test accuracy are always computed separately.
- Click a training sample, or focus it with Tab and press Enter / Space, to see its coordinates, true and predicted class, decision value, functional margin, alpha coefficient and slack.

## How to read the plot

- Purple dots are the positive class `+1`, orange squares the negative class `−1`; solid markers are training points, hollow ones test points.
- Light purple and light orange backgrounds show the predicted class, the solid blue line is `f(x) = 0`, the dashed lines are `f(x) = ±1`. Background shading is not a probability.
- A black ring marks a support vector with numerically `α > 10⁻⁷`; the blue selection ring marks the training sample currently inspected.
- A red × only means the true and predicted classes differ, and the rule is `f(x) ≥ 0` for the positive class. A margin violation `ξ = max(0, 1 − y f(x))` above zero does not necessarily mean a misclassification.
- "Samples inside the margin" counts `y f(x) < 1 − 10⁻³` so that borderline points near the solver tolerance are not included.
- Geometric margin width `2 / ‖w‖` is shown only for the linear kernel; with RBF the margin curves in the input plane are not equidistant, so no 2D margin width is reported.

Suggested path: first watch C on the default data, then switch concentric circles or XOR from the linear kernel to RBF. The overlapping dataset is good for comparing train/test accuracy against the number of support vectors, and shows that a more complex boundary does not always improve test performance.

## Algorithm and limits

This is a binary soft-margin C-SVM minimising `½‖w‖² + CΣξ`, with dual variables satisfying `0 ≤ αᵢ ≤ C` and `Σαᵢyᵢ = 0`. The decision function is `Σαᵢyᵢ K(xᵢ,x) + b`, with the linear kernel as the inner product and the RBF kernel as `exp(−γ‖x−z‖²)`.

The implementation is a simplified SMO solver with pairwise analytic updates, handling zero curvature from duplicate coordinates, and it reports the maximum KKT violation plus the primal/dual objective gap. Solver tolerance is `10⁻³` with at most 1500 rounds; some high-C combinations may not reach the tolerance, in which case the page explicitly says "approximate solution" instead of claiming convergence. Support vectors and sample types use a numeric threshold of `10⁻⁷`.

The image is sampled on an 80×80 grid over `[-3,3]²`; decision boundaries and margin lines are interpolated contours, while sample values and metrics use the full model. Very thin curves are limited by display resolution. On narrow screens the chart scrolls horizontally on its own.

The tool is limited to 2D fixed synthetic data: no large imports, no multiclass, no production modelling, and no probability calibration; the accuracy on the page is for a teaching example.

Mathematics and algorithm references: [LIBSVM C-SVC formulation](https://www.csie.ntu.edu.tw/~cjlin/papers/libsvm.pdf), [John Platt's SMO paper](https://www.microsoft.com/en-us/research/publication/sequential-minimal-optimization-a-fast-algorithm-for-training-support-vector-machines/). The code here is implemented from scratch and bundles none of those libraries.

## Verification

`node scripts/check_svm.cjs` runs numeric checks with the Node standard library: hand-computable two-point linear/RBF solutions, soft-margin bounds, duplicate coordinates, invalid parameters, data reproducibility, and across 48 dataset/kernel/parameter combinations the alpha bounds, dual equality constraint, KKT violation and weak-duality relation.

`node scripts/check_svm.cjs --browser` additionally verifies browser interaction and needs Playwright plus a browser in the development environment; `CHROME_PATH` can point at Chrome. It was validated in a fresh Chrome context over `file://` with HTTP(S) blocked, actually driving datasets, kernels, sliders, the test-point toggle, mouse and keyboard sample selection, retraining and reset, with desktop and 390px screenshots reviewed and no required external requests or runtime errors. Tool users need none of these test dependencies.

---

## 中文说明

本工具是新制作的教学演示，采用原生 HTML、CSS、JavaScript、SVG 和离屏 Canvas。全部代码与数据生成逻辑都在 `index.html` 中，双击即可在 Chrome、Edge 等现代浏览器离线使用，无需安装依赖或启动服务器。展示署名为“工具来源：AIHelper01”，代码按本项目 MIT License 提供。

### 可以操作什么

- 切换四个固定合成数据集：线性可分、重叠数据、同心圆、XOR。每组包含 48 个训练样本与 64 个独立测试样本，两类数量相同；重新训练与重新打开不会改变数据。
- 切换线性核与 RBF 高斯核。C 范围为 0.01–100，γ 范围约为 0.05–10，滑块均为以 10 为底的对数刻度；γ 仅在 RBF 核下可用。
- 参数变化后自动重新训练，也可点击“重新训练”或“恢复默认”。默认是线性可分数据、线性核、C = 1。
- 勾选“显示测试样本”叠加 64 个空心测试点。测试集不参与训练，训练集与测试集准确率始终分别计算。
- 点击训练样本，或用 Tab 聚焦样本后按 Enter / 空格，查看坐标、真实与预测类别、决策值、函数间隔、α 系数和松弛量。

### 如何读图

- 紫色圆点为正类 `+1`，橙色方点为负类 `−1`；训练点实心、测试点空心。
- 淡紫与淡橙背景表示模型预测的类别，蓝色实线是 `f(x) = 0`，虚线是 `f(x) = ±1`。背景深浅不是概率。
- 黑圈表示数值上 `α > 10⁻⁷` 的支持向量；蓝色选择圈表示当前查看的训练样本。
- 红色 × 仅表示真实与预测类别不同，预测规则为 `f(x) ≥ 0` 判正类。间隔违反量 `ξ = max(0, 1 − y f(x))` 大于零不一定意味着分错。
- “间隔内样本”按 `y f(x) < 1 − 10⁻³` 计数，避免将求解容差附近的边界点误计入。
- 在线性核下显示几何间隔宽度 `2 / ‖w‖`；RBF 的输入平面间隔曲线不等宽，因此不显示二维间隔宽度。

建议先在默认数据观察 C，再将同心圆或 XOR 从线性核切换为 RBF。重叠数据适合比较训练／测试准确率和支持向量数量，观察复杂边界并不一定改善测试表现。

### 算法与限制

这是二分类软间隔 C-SVM，求解目标为 `½‖w‖² + CΣξ`，对偶变量满足 `0 ≤ αᵢ ≤ C` 和 `Σαᵢyᵢ = 0`。决策函数为 `Σαᵢyᵢ K(xᵢ,x) + b`，线性核为内积，RBF 核为 `exp(−γ‖x−z‖²)`。

实现采用成对解析更新的简化 SMO 求解器，处理重复坐标导致的零曲率情况，并显示最大 KKT 违反量与原始／对偶目标差。求解容差为 `10⁻³`，最多 1500 轮；某些高 C 组合可能未达到容差，此时明确显示“近似解”，不宣称已收敛。支持向量和样本类型以 `10⁻⁷` 为数值阈值。

图像在 `[-3,3]²` 范围以 80×80 网格采样；决策边界和间隔线使用插值等高线显示，样本值与指标使用完整模型计算。细小曲线可能受显示分辨率限制。窄屏图表可以独立横向滚动。

工具限于二维固定合成数据，不支持导入大数据、多分类或生产建模，也没有概率校准；页面上的准确率用于教学示例。

数学与算法参考：[LIBSVM 的 C-SVC 公式](https://www.csie.ntu.edu.tw/~cjlin/papers/libsvm.pdf)、[John Platt 的 SMO 论文](https://www.microsoft.com/en-us/research/publication/sequential-minimal-optimization-a-fast-algorithm-for-training-support-vector-machines/)。本工具代码为自行实现，没有打包这些库。

### 验证

`node scripts/check_svm.cjs` 使用 Node 标准库执行数值检查：可手算的两点线性／RBF 解、软间隔上界、重复坐标、无效参数、数据可重复性，以及 48 组数据／核／参数组合中的 α 边界、对偶等式约束、KKT 违反量与弱对偶关系。

`node scripts/check_svm.cjs --browser` 额外验证浏览器交互，需要开发环境提供 Playwright 与浏览器；可用 `CHROME_PATH` 指定 Chrome。已在新的 Chrome 上下文用 `file://` 打开并阻断 HTTP(S)，实际操作数据集、核函数、滑块、测试点勾选、鼠标与键盘样本选择、重新训练和重置；检查桌面及 390px 窄屏截图，无必需外部请求或运行错误。工具使用者无需这些测试依赖。
