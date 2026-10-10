# Model Quantization Visualiser v2

**English** | [简体中文](README.zh-CN.md)

A rebuilt take on `examples/quantization`: instead of spreading every format side by side, it walks one weight tensor through linear quantization end to end — `q = clamp(round(x / s) + z)`, `x̂ = (q − z) × s` — and shows the staircase, the error distribution, the bit-width sweep and the storage bill at the same time.

Double-click `index.html` and open it in a modern browser such as Edge or Chrome. All code and data live in this single file: no dependencies, no server, no network. Newly built by AIHelper01; the page credit reads "工具来源：AIHelper01".

## Controls

- **Bit width**: 2, 3, 4, 5, 6 or 8 bit. Codes span `-127…127` when symmetric and `0…2^bits−1` when asymmetric.
- **Mode**: symmetric shares one scale with zero as the fixed centre; asymmetric adds a zero point and keeps zero representable.
- **Group size**: one scale for the whole tensor, or a scale per 4 / 8 / 16 weights.
- **Calibration range**: 0.50×–1.50× of the observed extreme. Narrower means finer steps but clipped outliers; wider means no clipping but coarser steps.
- **Weight shape**: uniform, normal, or long-tailed with an outlier (default) — the outlier is what makes the tradeoff visible.
- **Weight count** and **rounding rule**: round-half-to-even (default), round-half-away, or floor.
- Buttons: **resample weights**, **restore defaults**, **select the next weight**. Click a point in the staircase chart, or focus it with Tab and press Enter, to read its full calculation chain.

## How to read it

- The blue staircase is the mapping from `x` to `x̂`; the dashed diagonal is the no-error reference `x̂ = x`.
- Each weight is a purple dot at its true value on the diagonal and an orange square at its restored value; the connector is exactly that weight's error.
- The staircase of the group that owns the selected weight is drawn solid, the others faintly, so per-group scaling is visible.
- Clipped weights draw a dark dashed connector and land on the code endpoint instead of their own value.
- The error chart bins weights across their value range and reports the mean absolute error per bin; the sweep chart re-runs every bit width under the current settings, with bytes per parameter as bars and MSE as a line.

## Conventions and limits

- Symmetric: `Q = 2^(bits−1) − 1`, `scale = maxAbs × gain / Q`, zero point 0, codes `-Q…Q`; the most negative two's-complement code is unused. Asymmetric: unsigned codes `0…2^bits−1`, calibration bounds include zero, `scale = (hi − lo) / (2^bits − 1)`, zero point rounded and then clamped.
- Midpoints round to even by default. Every restored value lies on the lattice `(q − z) × scale`, so an unclipped error never exceeds half a step.
- A group of all-zero weights uses `scale = 1` and still reconstructs zero exactly.
- Storage: packed integer payload plus a 4-byte FP32 scale per group, and 1 byte per group for the integer zero point when asymmetric. This estimates a teaching format; the browser never packs weights, and real tensors also carry tensor-level scales, metadata, activations and KV cache.
- No float bit-field encoding, no quantization-aware training, no activation or KV-cache quantization, and no claim about real model accuracy or inference speed.

## Verification

`node scripts/check_quantization_v2.cjs --math-only` runs the maths in the page through Node with no browser: rounding rules, code ranges, lattice membership and the half-step error bound across 2/3/4/5/6/8 bit × symmetric/asymmetric × 1/4/8/16 grouping, the exact reconstruction of the peak weight, the clipping endpoint and the calibration tradeoff, asymmetric scale and zero point, all-zero groups, metric arithmetic, storage accounting and the bit sweep.

Adding `--browser` (needs Playwright plus a browser; `CHROME_PATH` can point at Edge or Chrome) additionally verifies the offline `file://` build: bit-width and grouping changes, MSE falling while bytes rise, clipping appearing at 0.50× and disappearing at 1.00×, keyboard operation of the slider, weight selection by mouse and by Enter, reset, no horizontal page overflow at 390px with the charts scrolling instead, zero network requests and zero page errors. Tool users need none of these dependencies.

The previous tool stays untouched at `examples/quantization`; it covers float formats (S/E/M, FP16/BF16, NVFP4, TF32) in more depth, while this version concentrates on the linear-quantization cause-and-effect chain.
