# EduTool-Dev

[English](README.md) | **简体中文**

把网页里的教学演示提取成可离线使用的工具，或者从一个教学主题出发，制作同风格的新交互演示。

仓库包含可安装的 Codex skill [`w-interactive-demo`](skills/w-interactive-demo/SKILL.md)，以及十三个完整工具和一个目标检测数据集统一入口。默认成品是双击即可运行的 `index.html`，不要求学习者安装框架、启动服务器或联网。

双击仓库根目录的 [`index.html`](index.html) 可以打开工具主页，并从卡片进入现有工具。
主页右上角提供 English / 中文切换按钮，切换导航、分类和工具介绍，并在浏览器允许本地存储时记住语言选择。主页与目标检测数据集统一入口均支持中英文，各演示内部保持原有语言。
这个入口不依赖构建步骤，也可以直接从仓库根目录发布到 GitHub Pages。
主页按数据工具、机器学习、深度学习、大语言模型、计算机视觉、模型评测和强化学习组织；机器学习和深度学习分类提供七个本地教学工具，计算机视觉分类提供目标检测数据集查看器合集（YOLO、COCO、VOC），大语言模型分类新增量化与两个 LoRA 版本共三个本地演示，并收录 GeoGebra、TensorFlow Playground、LSTM Simulator、GAN Lab、CNN Explainer、Transformer Explainer、Arena、LiveBench 等在线互动资源。

## 能做什么

### 1. 提取网页中的指定演示

给出网页链接，并用截图或文字指出目标工具。skill 会定位真正的 iframe 或组件入口，收集必要脚本、样式和数据，移除站点导航与统计依赖，再验证本地 `file://` 和断网运行。

```text
$w-interactive-demo 把这个网页里截图所示的演示工具提取成离线版：<网页链接>
```

### 2. 创建新的教学演示

给出主题、希望操控的参数或参考工具。skill 会把它组织成“调节参数 → 图形变化 → 指标反馈”的互动工具，并沿用本仓库的浅色教学界面。

```text
$w-interactive-demo 按现有工具的风格，制作一个 K-means 聚类互动演示。
```

## 安装 skill

可以让 Codex 使用 `skill-installer` 从下面的 GitHub 目录安装：

```text
https://github.com/AIHelper01/EduTool-Dev/tree/main/skills/w-interactive-demo
```

也可以克隆仓库后，手动把 `skills/w-interactive-demo` 复制到 Codex 的 skills 目录。Windows PowerShell 示例：

```powershell
$codexRoot = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME ".codex" }
Copy-Item -Recurse -Force ".\skills\w-interactive-demo" (Join-Path $codexRoot "skills\w-interactive-demo")
```

重新打开 Codex 任务后，可直接通过 `$w-interactive-demo` 调用。skill 也允许根据请求自动匹配。

## 工具

| 工具 | 模式 | 内容 |
| --- | --- | --- |
| [线性回归参数练习](examples/linear-regression/) | 网页提取 | 学习率、训练控制、权重与偏置更新，以及 L1/L2/MSE/RMSE |
| [分类准确率、精确率与召回率](examples/classification-accuracy-precision-recall/) | 网页提取 | 数据集、分类阈值、混淆矩阵及三项指标 |
| [神经网络节点与隐藏层](examples/neural-network-nodes-hidden-layers/) | 网页提取 | 输入、隐藏层、输出节点、参数编辑与逐步计算 |
| [逻辑回归互动演示](examples/logistic-regression/) | 新建工具 | Sigmoid 曲线、权重、偏置、阈值、训练与分类指标 |
| [SVM 支持向量机可视化](examples/svm/) | 新建工具 | 线性与 RBF 核、C／γ、决策边界、间隔、支持向量与训练／测试指标 |
| [RNN 与 LSTM 可视化](examples/rnn-lstm/) | 新建工具 | 序列记忆、门控、状态与敏感度 |
| [LoRA Illustrated 本地版](examples/lora-illustrated/) | 网页提取 | 矩阵编辑、rank、缩放与悬停关联 |
| [模型量化可视化](examples/quantization/) | 新建工具 | S/E/M、FP16/BF16、量化误差与权重存储 |
| [LoRA 低秩适配可视化](examples/lora/) | 新建工具 | 低秩矩阵、冻结权重、训练与合并输出 |
| [目标检测数据集查看器](examples/object-detection-dataset-viewer/) | 统一入口 | 选择 YOLO、COCO、Pascal VOC 三个离线工具，中英文导航 |
| [YOLO 数据集查看器](examples/yolo-dataset-viewer/) | 网页提取 | 本地图片与 TXT 检测标注、类别编号、缩放与拖动画布 |
| [COCO 数据集查看器](examples/coco-dataset-viewer/) | 网页提取 | JSON 检测框、类别名称、Image ID 搜索与 JSON 树 |
| [Pascal VOC 数据集查看器](examples/voc-dataset-viewer/) | 网页提取 | XML 检测框、类别名称、缩放与拖动画布 |

克隆仓库后，直接双击任一工具目录中的 `index.html`。每个工具的 README 会说明控件、来源和限制。

## 仓库结构

```text
EduTool-Dev/
├─ index.html                   # 简洁的工具主页
├─ skills/
│  └─ w-interactive-demo/       # 可安装的 skill
│     ├─ SKILL.md               # 路由、默认约定和完成标准
│     ├─ agents/openai.yaml     # Codex 界面信息
│     └─ references/            # 提取、生成、风格与交付细则
├─ examples/                    # 可直接运行的工具
├─ scripts/check_repo.py        # 仓库结构和离线资源检查
├─ CONTRIBUTING.md
└─ THIRD_PARTY_NOTICES.md
```

## 设计原则

- 先保证教学关系清楚，再添加动画和控件。
- 新建工具优先使用原生 HTML、CSS、JavaScript 和 SVG。
- 提取工具保留原来的算法、数据和交互，不把仿制品称为原版下载。
- 宣称离线可用前，必须阻断网络请求并实际操作关键控件。
- 页面展示署名默认为“工具来源：AIHelper01”；第三方代码的真实出处与许可仍应保留。

运行仓库自检：

```bash
python scripts/check_repo.py
```

项目自有代码和文档采用 [MIT License](LICENSE)。从第三方页面提取的工具仍受各自来源条款约束，详见 [THIRD_PARTY_NOTICES.zh-CN.md](THIRD_PARTY_NOTICES.zh-CN.md)。

本仓库所有文档均为中英双语两个文件：英文 `README.md`／`CONTRIBUTING.md`／`THIRD_PARTY_NOTICES.md`，简体中文为对应的 `*.zh-CN.md`。
