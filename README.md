# EduTool-Dev

**English** | [简体中文](README.zh-CN.md)

Extract teaching demos from web pages into offline tools, or build new interactive demos from a teaching topic in the same visual style.

The repository ships an installable Codex skill, [`w-interactive-demo`](skills/w-interactive-demo/SKILL.md), thirteen complete tools, and one unified entry point for object-detection dataset viewers. The default deliverable is an `index.html` that runs with a double click: no framework to install, no server to start, no network required.

Double-click [`index.html`](index.html) in the repository root to open the tool homepage and enter any tool from its card.
The top-right button switches the homepage between English and 中文, covering navigation, categories, and tool descriptions, and remembers the choice when local storage is allowed. The homepage and the object-detection dataset viewer entry are bilingual; each demo keeps its original language inside.
This entry point needs no build step and can be published to GitHub Pages straight from the repository root.
The homepage is organised into Data tools, Machine learning, Deep learning, Large language models, Computer vision, Model evaluation, and Reinforcement learning. Machine learning and deep learning provide seven local teaching tools, computer vision provides the object-detection dataset viewer collection (YOLO, COCO, VOC), the large language model category adds two quantization versions plus two LoRA versions, four local demos, and the page also lists online interactive resources such as GeoGebra, TensorFlow Playground, LSTM Simulator, GAN Lab, CNN Explainer, Transformer Explainer, Arena, and LiveBench.

## What it does

### 1. Extract a specific demo from a web page

Give a page link and point at the target tool with a screenshot or text. The skill locates the real iframe or component entry, collects the scripts, styles, and data it needs, strips site navigation and analytics, then verifies local `file://` and offline behaviour.

```text
$w-interactive-demo Extract the demo shown in this screenshot from the page as an offline version: <page URL>
```

### 2. Create a new teaching demo

Give a topic, the parameters you want to control, or a reference tool. The skill shapes it into a "adjust parameters → watch the graphic → read the metrics" interactive tool using this repository's light teaching interface.

```text
$w-interactive-demo Build an interactive K-means clustering demo in the style of the existing tools.
```

## Install the skill

Ask Codex to use `skill-installer` with the GitHub directory below:

```text
https://github.com/AIHelper01/EduTool-Dev/tree/main/skills/w-interactive-demo
```

Alternatively, clone the repository and copy `skills/w-interactive-demo` into the Codex skills directory yourself. Windows PowerShell example:

```powershell
$codexRoot = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME ".codex" }
Copy-Item -Recurse -Force ".\skills\w-interactive-demo" (Join-Path $codexRoot "skills\w-interactive-demo")
```

After restarting your Codex task, call it with `$w-interactive-demo`. The skill can also match requests automatically.

## Tools

| Tool | Kind | Contents |
| --- | --- | --- |
| [Linear regression practice](examples/linear-regression/) | Extracted | Learning rate, training controls, weight and bias updates, L1/L2/MSE/RMSE |
| [Classification accuracy, precision and recall](examples/classification-accuracy-precision-recall/) | Extracted | Datasets, classification threshold, confusion matrix and the three metrics |
| [Neural network nodes and hidden layers](examples/neural-network-nodes-hidden-layers/) | Extracted | Input, hidden layer and output nodes, parameter editing, step-by-step maths |
| [Logistic regression demo](examples/logistic-regression/) | New tool | Sigmoid curve, weights, bias, threshold, training and classification metrics |
| [SVM visualiser](examples/svm/) | New tool | Linear and RBF kernels, C/gamma, decision boundaries, margins, support vectors, train/test metrics |
| [RNN and LSTM visualiser](examples/rnn-lstm/) | New tool | Sequence memory, gates, states and early-input sensitivity |
| [LoRA Illustrated, local version](examples/lora-illustrated/) | Extracted | Matrix editing, rank, scaling and hover relationships |
| [Model quantization visualiser](examples/quantization/) | New tool | S/E/M, FP16/BF16, quantization error and weight storage |
| [Model quantization visualiser v2](examples/quantization-v2/) | New tool | Full linear-quantization chain: staircase, per-group scales, error bins, bit-width sweep and storage cost |
| [LoRA low-rank adaptation visualiser](examples/lora/) | New tool | Low-rank matrices, frozen weights, training and merged output |
| [Object detection dataset viewer](examples/object-detection-dataset-viewer/) | Unified entry | Choose between the YOLO, COCO and Pascal VOC offline tools, bilingual navigation |
| [YOLO dataset viewer](examples/yolo-dataset-viewer/) | Extracted | Local images with TXT detection annotations, class indices, zoom and draggable canvas |
| [COCO dataset viewer](examples/coco-dataset-viewer/) | Extracted | JSON detection boxes, category names, Image ID search and JSON tree |
| [Pascal VOC dataset viewer](examples/voc-dataset-viewer/) | Extracted | XML detection boxes, category names, zoom and draggable canvas |

After cloning, double-click `index.html` in any tool directory. Each tool README documents its controls, provenance, and limits.

## Repository layout

```text
EduTool-Dev/
├─ index.html                   # Simple tool homepage
├─ skills/
│  └─ w-interactive-demo/       # Installable skill
│     ├─ SKILL.md               # Routing, default conventions, definition of done
│     ├─ agents/openai.yaml     # Codex interface metadata
│     └─ references/            # Extraction, generation, style and delivery rules
├─ examples/                    # Runnable tools
├─ scripts/check_repo.py        # Repository structure and offline-resource checks
├─ CONTRIBUTING.md
└─ THIRD_PARTY_NOTICES.md
```

## Design principles

- Get the teaching relationship clear before adding animation or controls.
- New tools prefer plain HTML, CSS, JavaScript and SVG.
- Extracted tools keep the original algorithm, data and interaction; never call a replica an official download.
- Before claiming offline support, block network requests and drive the main controls.
- The on-page credit defaults to "工具来源：AIHelper01"; real third-party authorship and licensing must still be preserved.

Run the repository check:

```bash
python scripts/check_repo.py
```

Project-owned code and documentation use the [MIT License](LICENSE). Tools extracted from third-party pages stay under their own source terms; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Every document in this repository ships in two files: `README.md`, `CONTRIBUTING.md` and `THIRD_PARTY_NOTICES.md` in English, with `*.zh-CN.md` holding the 简体中文 copy.
