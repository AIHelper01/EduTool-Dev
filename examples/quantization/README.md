# Model Quantization Visualiser

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html`; no network and no dependencies.

Suggested reading order: S/E/M meaning → formats and memory → FP16/BF16 comparison → whole-group quantization experiment → how a single number is computed.

## Controls

- Adjust the S sign, the E true exponent and the 4-bit fractional M, and watch binary scientific notation and the value update together.
- Compare FP16 / BF16 bit widths side by side with the real ticks over the same interval; enter a number to compare round-to-nearest-even, overflow and subnormal fractions.
- Switch between 2 / 4 / 8 bit, symmetric / asymmetric quantization, and shared / per-4-weight group scales.
- Adjust the calibration range and watch the quantization steps, reconstruction error, clipping counts and storage estimate.
- Enter a decimal or click a weight to see scaling, rounding, integer encoding and reconstruction.
- Switch floating-point formats to compare sign / exponent / mantissa allocation and theoretical weight footprint.

## Conventions and limits

Uniform linear quantization: `q = clip(roundEven(x / scale) + zeroPoint)`, `x̂ = (q − zeroPoint) × scale`. Midpoints round to even.

Symmetric mode uses `Q = 2^(bit−1)−1`, encoding range `−Q…Q`, `scale = maxAbs × range factor / Q`, zero point 0; the most negative two's-complement code is unused. Asymmetric mode uses unsigned `0…2^bit−1`, the calibration range includes zero, scale is the range width divided by the maximum code, and the zero point is rounded then clamped into the code range. Rounding the zero point shifts the representable endpoints slightly. All-zero groups use scale=1 and still reconstruct zero exactly.

Storage example: packed integer payload plus a 4-byte FP32 scale per group; asymmetric adds a 4-byte integer zero point per group. These are teaching-format estimates, and the browser never actually stores packed weights. Calculations use JavaScript numbers; they do not simulate full encodings of the floating-point formats, real model accuracy, or inference speed. Field lengths in the format diagrams are proportional and not bit-exact encodings.

Weight memory is reported in decimal GB and counts only the selected format's payload. NVFP4 uses an example overhead of one FP8 scale per 16 values (0.5625 bytes per parameter), excluding the tensor-level FP32 scale. Real memory also depends on metadata, activations, KV cache, buffers and more. TF32 is an FP32 compute mode stored in 4 bytes.

## Source

A teaching tool newly built by AIHelper01, informed by the explanation of precision, ranges, scale and memory in the user-supplied 《Untitled 1.md》; no figures were copied from that document, and this is not an extraction of the original WeChat tool.

- [ONNX QuantizeLinear](https://onnx.ai/onnx/operators/onnx__QuantizeLinear.html)
- [ONNX DequantizeLinear](https://onnx.ai/onnx/operators/onnx__DequantizeLinear.html)
- [NVIDIA NVFP4 announcement](https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/)
- [NVIDIA floating-point range and precision table](https://docs.nvidia.com/cuda/archive/13.1.0/cuda-programming-guide/05-appendices/mathematical-functions.html)

FP16 / BF16 comparison conversions round the browser's double-precision input straight into the target format; they do not simulate a prior FP32 conversion, hardware flush-to-zero, or a full training run. The S/E/M demo fixes four fractional bits to explain the fields and does not correspond to one specific real format.

Terminology: M is the stored fractional field; the full significand of a normalised binary number is `1 + fraction`. The page expands binary place values dynamically and explains the bias with FP16's `E = true exponent + 15`. The decimal −12345 is a separate analogy, not an input for the controls below. A subscript ₂ marks binary and a superscript marks a power; special values and subnormal numbers do not follow the implicit-1 normalisation formula.

Numeric checks: `node scripts/check_quantization.cjs`; for the offline browser check add `--browser` (needs a working Playwright and Chrome).
