# SVM Support Vector Machine Visualiser

**English** | [简体中文](README.zh-CN.md)

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
