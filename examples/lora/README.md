# LoRA Low-Rank Adaptation Visualiser

**English** | [中文](#中文说明)

A Chinese-language teaching demo independently developed by AIHelper01. Double-click `index.html` to use it offline with no dependencies to install. No code from previously found third-party tools was copied.

## Usage

1. Adjust rank r, alpha and the target task, and watch W₀, A, B, ΔW and W′. Click an A/B cell to edit it; click ΔW/W′ to expand the dot product.
2. Train step by step or automatically and watch the error fall while W₀ stays frozen. Auto-training can be paused and stops at 3000 steps; reset restores the fixed initialisation for the current rank and task.
3. Adjust the input vector and compare the output of the parallel branch with the merged weights.
4. Change large input/output dimensions to estimate the trainable parameters and FP32 adapter storage for that layer.

## Computation and limits

Standard convention: W₀ is d×k, A is r×k, B is d×r, ΔW=(α/r)BA. The update has rank at most r and is not guaranteed to be exactly r; neither W₀ nor W′ is assumed low rank. The parameter count is r(d+k), which does not necessarily save anything as r approaches the original dimensions.

This example uses d=k=8, with A fixed from a random draw and B initialised to zero. Training minimises `Σ(ΔW−T)²/64` with backtracking gradient descent; it is not real language-model training. The target T is diagonal with non-zero entries [1] or [1,0.8,0.6]; the optimal rank-r theoretical error is the sum of the discarded squared singular values divided by 64. Only this synthetic matrix task is compared, so it does not represent real fine-tuning results.

No dropout, bias, activation, quantization or Adam; computation uses JavaScript double precision. Merge verification covers this single layer with the fixed adapters. The storage estimate counts only the FP32 payload of A/B, excluding the base model, activations and training state. Heat maps share a ±2 colour scale, so read the actual numbers when colours saturate; display rounding does not affect internal computation.

References: [original paper](https://arxiv.org/abs/2106.09685), [official implementation](https://github.com/microsoft/LoRA). The page only links them; running does not depend on them.

Checks: `node scripts/check_lora.cjs`; add `--browser` to verify offline browser interactions (needs an existing Playwright / Chrome).

---

## 中文说明

AIHelper01 独立开发的中文教学演示。双击 `index.html` 即可离线使用，不需要安装依赖。没有复制此前检索到的第三方工具代码。

### 使用

1. 调整 rank r、α、目标任务，观察 W₀、A、B、ΔW 和 W′。点击 A/B 单元格编辑；点击 ΔW/W′ 拆解点积。
2. 单步或自动训练，看误差下降与 W₀ 冻结。自动训练可暂停，最多 3000 步；重置恢复当前 rank 和任务的固定初始化。
3. 调整输入向量，比较并行支路与合并权重的输出。
4. 调整大矩阵输入/输出维数，估算该层的可训练参数与 FP32 适配器存储。

### 计算与限制

标准约定：W₀ 为 d×k，A 为 r×k，B 为 d×r，ΔW=(α/r)BA。更新的秩至多为 r，不保证正好为 r；W₀ 和 W′ 不要求低秩。参数量为 r(d+k)，当 r 接近原维数时不一定节省。

本例 d=k=8。固定随机 A、零 B 初始化。训练通过带回溯的梯度下降最小化 `Σ(ΔW−T)²/64`，不是实际语言模型训练。目标 T 为对角矩阵，非零值是 [1] 或 [1,0.8,0.6]；最佳 rank-r 理论误差为被舍弃的奇异值平方和 / 64。只比较这个合成矩阵任务，不代表真实微调效果。

不使用 dropout、偏置、激活、量化或 Adam；计算为 JavaScript 双精度。合并验证仅针对固定适配器的这一层。存储估算只计 A/B 的 FP32 数值本体，基础模型、激活和训练状态不计入。热图共用 ±2 的颜色刻度，颜色饱和时请读实际数值；显示舍入不影响内部计算。

参考：[原论文](https://arxiv.org/abs/2106.09685)、[官方实现](https://github.com/microsoft/LoRA)。此页面只链接参考文献，运行不依赖它们。

检查：`node scripts/check_lora.cjs`；追加 `--browser` 验证离线浏览器交互（需已有 Playwright / Chrome）。
