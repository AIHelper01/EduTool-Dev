# 神经网络节点与隐藏层（离线版）

双击 `index.html`，使用 Edge、Chrome 等现代浏览器打开。无需安装软件、启动服务器或联网。

先点击播放按钮完成逐节点计算。通过 **Problem Type** 在 `Linear model` 与 `Hidden Layers` 之间切换；点击输入节点可以修改输入值，点击隐藏层或输出节点可以查看并修改权重、偏置以及激活函数。网络图和下方计算过程会同步更新。

## 来源与离线化说明

- 原页面：[Google 机器学习速成课程：神经网络——节点和隐藏层](https://developers.google.cn/machine-learning/crash-course/neural-networks/nodes-hidden-layers?hl=zh-cn)
- 练习 1 iframe：`https://developers.google.cn/frame/machine-learning/crash-course/neural-networks/nodes-hidden-layers_674425a25c7df937f6e9b109e162a76b6bf55147a77a4b0681ceb90c89a26437.frame?hl=zh-cn`
- 练习 2 iframe：`https://developers.google.cn/frame/machine-learning/crash-course/neural-networks/nodes-hidden-layers_e3550dad75280767b04a19c69aa3b4d9a38fe7ddead67418c7b5fcd2ed06e966.frame?hl=zh-cn`
- 提取日期：2026-09-23
- 保留内容：原工具的网络模型、随机参数初始化、节点编辑、逐步计算、权重与偏置编辑、激活函数和代码内版权声明
- 离线化改动：把两个原始练习配置合并到同一模型选择器；移除 Google 开发者网站外壳、外部字体和统计相关代码；把 Material Icons 字体图标替换为本地 Unicode 符号

原课程的[内容复用说明](https://support.google.com/machinelearningeducation/answer/7652594?hl=en)及原页面条款仍适用。准备再次发布或分发时，请先核对原站条款以及 `index.html` 中保留的版权和 SPDX 声明。

## 参考结构

- `Linear model`：3 个输入节点和 1 个输出节点，共 4 个参数。
- `Hidden Layers`：3 个输入节点、4 个隐藏节点和 1 个输出节点，共 21 个参数。
- 参数初始值由原工具随机生成，因此每次打开后的具体输出可能不同。

窄屏设备会保留原网络图尺寸，可在工具区域左右滑动查看完整内容。
