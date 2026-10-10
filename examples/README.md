# Tool Index

**English** | [简体中文](README.zh-CN.md)

These tools also validate the extraction and generation flow of the skill. Every directory contains at least an `index.html` that opens directly in a browser and a `README.md` that documents usage, provenance and limits. Every tool README is bilingual and opens in English.

| Directory | Kind | What it verifies |
| --- | --- | --- |
| `linear-regression` | Extracted | Learning rate, training controls, weight and bias updates, loss convergence |
| `classification-accuracy-precision-recall` | Extracted | Datasets and threshold driving the confusion matrix and metrics |
| `neural-network-nodes-hidden-layers` | Extracted | Switching network structure, step-by-step computation, node parameter editing |
| `kmeans-clustering` | Extracted | Initialisation modes, stepwise assignment and centroid updates, centroids and Voronoi regions |
| `logistic-regression` | New | Parameters, threshold, training state, probability curve and metrics staying in sync |
| `svm` | New | Linear/RBF decision boundaries, support vectors, C/gamma, KKT conditions, held-out metrics |
| `quantization` | New | Bit width, scale, zero point, group scaling, error and weight storage estimates |
| `lora` | New | Frozen weights, low-rank matrices, gradient training, parameter counts, merge consistency |
| `rnn-lstm` | New | Time steps, gates, state passing, early-input sensitivity |
| `object-detection-dataset-viewer` | New unified entry | Offline links to the three formats, language switching, narrow-screen layout |
| `yolo-dataset-viewer` | Extracted | Local file loading, detection box coordinates, zoom, dragging, offline run |
| `coco-dataset-viewer` | Extracted | File name to Image ID matching, category names, detection boxes, JSON tree |
| `voc-dataset-viewer` | Extracted | XML category and coordinate parsing, zoom, dragging, offline run |

Use clear, stable English directory names for new tools. Do not commit test dependencies, temporary page snapshots, or generated ZIPs; record third-party sources, offline changes and licence boundaries in the tool README.
