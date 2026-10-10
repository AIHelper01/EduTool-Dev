# Neural Network Nodes and Hidden Layers (Offline)

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html` and open it in a modern browser such as Edge or Chrome. No software to install, no server to start, no network required.

Press the play button first to run the node-by-node computation. Use **Problem Type** to switch between `Linear model` and `Hidden Layers`; click an input node to change its value, or click a hidden/output node to inspect and edit its weight, bias and activation function. The network diagram and the computation trace below stay in sync.

## Source and offline notes

- Original page: [Google Machine Learning Crash Course: Neural networks - nodes and hidden layers](https://developers.google.cn/machine-learning/crash-course/neural-networks/nodes-hidden-layers?hl=zh-cn)
- Exercise 1 iframe: `https://developers.google.cn/frame/machine-learning/crash-course/neural-networks/nodes-hidden-layers_674425a25c7df937f6e9b109e162a76b6bf55147a77a4b0681ceb90c89a26437.frame?hl=zh-cn`
- Exercise 2 iframe: `https://developers.google.cn/frame/machine-learning/crash-course/neural-networks/nodes-hidden-layers_e3550dad75280767b04a19c69aa3b4d9a38fe7ddead67418c7b5fcd2ed06e966.frame?hl=zh-cn`
- Extracted: 2026-09-23
- Kept: the original network model, random parameter initialisation, node editing, step-by-step computation, weight and bias editing, activation functions and in-code copyright notices
- Offline changes: both original exercise configurations merged into one model selector; Google Developer site shell, external fonts and analytics code removed; Material Icons font glyphs replaced with local Unicode symbols

The course [content reuse policy](https://support.google.com/machinelearningeducation/answer/7652594?hl=en) and the original page terms still apply. Before republishing or redistributing, re-check the source site terms plus the copyright and SPDX notices preserved in `index.html`.

## Reference structure

- `Linear model`: 3 input nodes and 1 output node, 4 parameters in total.
- `Hidden Layers`: 3 input nodes, 4 hidden nodes and 1 output node, 21 parameters in total.
- Initial parameter values are generated randomly by the original tool, so concrete outputs can differ between openings.

On narrow screens the network diagram keeps its original size; swipe horizontally inside the tool area to see all of it.
