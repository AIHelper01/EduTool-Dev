# RNN and LSTM: How Memory Travels

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html` to use it offline. Independently developed by AIHelper01, with no third-party runtime libraries and no online model.

## Reading and controls

1. Choose the pulse, reverse-signal or alternating sequence, play step by step or click a time step; the current input is editable.
2. Tune the recurrent weight of the plain RNN and the forget/input/output gates of the LSTM to follow what is kept, written and read out.
3. Compare the RNN h curve, the LSTM C/h curves and the per-step numeric table.
4. Read the exact scalar derivative of the current h with respect to the first input to see how early-input influence propagates.

## Mathematical conventions

Initial h=C=0; the plain RNN uses `h=tanh(x+u*h_prev)`. The LSTM uses `g=tanh(x)`, `C=f*C_prev+i*g`, `h=o*tanh(C)`.

Manual mode: f/i/o are user-supplied constants, ideal boundary values 0/1 allowed, so each gate can be isolated. Fixed-weight mode: `f=σ(x+0.5h_prev+3)`, `i=σ(2x+0.4h_prev)`, `o=σ(x+0.5h_prev)`. The candidate's weight on the previous h is 0, which is a special case of the standard cell rather than a trained weight. The fixed-gate mode and the plain RNN are not a fair model-performance comparison.

Sensitivity is computed with the chain rule and includes the previous-h dependency of the automatic gates; the product of f along the cell-state path is not the derivative of the whole network. Sequence curves only show time steps already visited. Changing parameters or inputs recomputes the whole sequence instead of continuing from a stale state.

This demos forward computation for a single input and a single hidden unit only. It does not train weights and does not generate text; real models use vectors and matrices. LSTM does not guarantee that long-range dependencies are learned, nor that gradients never vanish or explode.

References: [Understanding LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/), [PyTorch LSTM definition](https://docs.pytorch.org/docs/stable/generated/torch.nn.LSTM.html). Linked only; their figures are not copied.

Checks: `node scripts/check_rnn_lstm.cjs`; add `--browser` (needs an existing Playwright / Chrome) to verify the offline interactions.
