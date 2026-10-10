# LoRA Low-Rank Adaptation Visualiser

**English** | [简体中文](README.zh-CN.md)

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
