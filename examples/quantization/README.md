# 模型量化可视化

直接双击 `index.html`，无需网络或安装依赖。

阅读顺序：S/E/M 表示 → 格式与显存 → FP16/BF16 对比 → 整组量化实验 → 单个数的计算过程。

## 操作

- 调整 S 符号、E 实际指数、M 四位小数部分，观察二进制科学计数法与数值联动。
- 并排比较 FP16 / BF16 的位宽与同一区间的真实刻度；输入数字，比较最近偶数舍入、溢出与非规范化小数。
- 切换 2 / 4 / 8 bit、对称 / 非对称量化、共享 / 每 4 个权重一组 scale。
- 调节校准范围，观察阶梯、还原误差、截断数量和存储估算。
- 输入小数或点击权重，查看缩放、舍入、整数编码与还原过程。
- 切换浮点格式，比较符号 / 指数 / 尾数分配及理论权重占用。

## 计算约定与限制

均匀线性量化：`q = clip(roundEven(x / scale) + zeroPoint)`，`x̂ = (q − zeroPoint) × scale`。中点舍入到偶数。

对称模式用 `Q = 2^(bit−1)−1`，编码范围 `−Q…Q`，`scale = maxAbs × 范围倍率 / Q`，零点为 0；最负的补码编码不用。非对称模式用无符号 `0…2^bit−1`，校准范围包含零，scale 为范围宽度 / 最大编码，零点舍入后限制到编码范围。零点舍入会使可还原端点略有偏移。全零组使用 scale=1，仍可精确还原零。

示例存储：打包整数载荷加每组 4 字节 FP32 scale；非对称另加每组 4 字节整数零点。这是教学格式的估算，浏览器并没有实际保存打包权重。计算使用 JavaScript 数值；不模拟浮点格式的完整编码、真实模型准确度或推理速度。格式示意中的字段长度按比例展示，未逐位编码。

权重显存按十进制 GB，只计所选格式数值本体。NVFP4 使用每 16 个数一个 FP8 scale 的示例开销（0.5625 字节 / 参数），不含 tensor FP32 scale。真实显存还受元数据、激活、KV cache、缓冲等影响。TF32 是 FP32 的计算模式，按 4 字节存储。

## 来源

AIHelper01 新制作的教学工具，参考用户提供的《Untitled 1.md》中精度、范围、scale 与显存的讲解；没有复制文稿配图，也不是微信原站工具的提取版本。

- [ONNX QuantizeLinear](https://onnx.ai/onnx/operators/onnx__QuantizeLinear.html)
- [ONNX DequantizeLinear](https://onnx.ai/onnx/operators/onnx__DequantizeLinear.html)
- [NVIDIA NVFP4 说明](https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/)
- [NVIDIA 浮点范围与精度表](https://docs.nvidia.com/cuda/archive/13.1.0/cuda-programming-guide/05-appendices/mathematical-functions.html)

FP16 / BF16 对比转换从浏览器双精度输入直接舍入到目标格式，不模拟先转 FP32、硬件 flush-to-zero 或完整训练过程。S/E/M 演示固定 4 位小数部分，用于解释字段作用，不对应某个实际格式。

术语：M 是存储的小数位字段；规范化二进制数的完整有效数为 `1 + 小数部分`。页面动态展开二进制位权，并用 FP16 的 `E = 实际指数 + 15` 解释偏置。十进制 −12345 是独立类比，不是下方控件的输入值。下标 ₂ 表示二进制，上标表示幂；特殊值和非规范化数不适用隐含 1 的规范化公式。

数值检查：`node scripts/check_quantization.cjs`；浏览器离线检查：追加 `--browser`（需可用 Playwright 和 Chrome）。
