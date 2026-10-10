# RNN 与 LSTM：记忆怎样传递

[English](README.md) | **简体中文**

双击 `index.html`，可直接离线使用。AIHelper01 独立开发，不依赖第三方运行库或在线模型。

## 阅读与操作

1. 选择脉冲、反向信号、交替序列，逐步播放或点击时间步；可编辑当前输入。
2. 调节普通 RNN 的循环权重，以及 LSTM 的遗忘/输入/输出门，查看保留、写入和读出过程。
3. 对比 RNN h、LSTM C/h 曲线和逐步数值表。
4. 查看当前 h 对第一个输入的精确标量导数，理解早期输入的影响如何传播。

## 数学约定

初始 h=C=0；普通 RNN 为 `h=tanh(x+u*h旧)`。LSTM 为 `g=tanh(x)`，`C=f*C旧+i*g`，`h=o*tanh(C)`。

手动模式：f/i/o 是用户给定常量，允许理想边界 0/1，用于隔离门的作用。固定权重模式：`f=σ(x+0.5h旧+3)`，`i=σ(2x+0.4h旧)`，`o=σ(x+0.5h旧)`。候选值对旧 h 的权重为 0，这是标准单元的一个特例，不是训练所得权重。固定门模式和普通 RNN 不代表公平的模型性能评测。

敏感度通过链式法则计算，包含自动门的旧 h 依赖；细胞状态直接路径的 f 连乘不等于完整网络总导数。序列曲线只显示已查看的时间步。修改参数或输入会重算整段，不是继续使用旧状态。

只演示单输入、单隐藏单元的前向计算，不训练权重，也不预测文本。真实模型通常使用向量与矩阵。LSTM 不保证长期依赖总能学会，也不能保证梯度永不消失/爆炸。

参考：[Understanding LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)、[PyTorch LSTM 定义](https://docs.pytorch.org/docs/stable/generated/torch.nn.LSTM.html)。只链接参考，不复制配图。

验证：`node scripts/check_rnn_lstm.cjs`；追加 `--browser`（需已有 Playwright / Chrome）验证离线交互。
