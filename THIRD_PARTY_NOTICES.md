# Third-party notices

**English** | [简体中文](THIRD_PARTY_NOTICES.zh-CN.md)

The skill, the documentation and the newly built tool code in this repository are provided by this project under the MIT License. The three tools below contain scripts, data or components extracted and packaged from Google Machine Learning Crash Course pages, so they remain under the original content terms and the third-party notices kept in the code:

| Tool | Original page |
| --- | --- |
| `examples/linear-regression` | [Linear regression: Gradient descent exercise](https://developers.google.cn/machine-learning/crash-course/linear-regression/gradient-descent-exercise?hl=zh-cn) |
| `examples/classification-accuracy-precision-recall` | [Classification: Accuracy, recall, precision, and related metrics](https://developers.google.cn/machine-learning/crash-course/classification/accuracy-precision-recall?hl=zh-cn) |
| `examples/neural-network-nodes-hidden-layers` | [Neural networks: Nodes and hidden layers](https://developers.google.cn/machine-learning/crash-course/neural-networks/nodes-hidden-layers?hl=zh-cn) |

Reuse terms for Google machine-learning education content are in [Can I reuse content from Machine Learning Crash Course?](https://support.google.com/machinelearningeducation/answer/7652594?hl=en). Copyright and SPDX notices that appear in individual files must also be kept.

`examples/logistic-regression` is a demo newly built by this project, with data from fixed-seed synthetic examples.

## Object detection dataset viewers

The three offline viewers below were extracted from 我是土堆 on 2026-10-08:

| Tool | Original page |
| --- | --- |
| `examples/yolo-dataset-viewer` | [YOLO dataset viewer](https://xiaotudui.com/labs/yolo-dataset-viewer) |
| `examples/coco-dataset-viewer` | [COCO dataset viewer](https://xiaotudui.com/labs/coco-dataset-viewer) |
| `examples/voc-dataset-viewer` | [Pascal VOC dataset viewer](https://xiaotudui.com/labs/voc-dataset-viewer) |

The original tool components and the React runtime they need are preserved; offline changes and limits are documented in each tool README. No independent open licence was confirmed for the original components or the site styles, so they stay under the original author's terms and are not covered by this project's MIT licence. The React / React DOM / Scheduler / JSX runtime licences stay in each directory's `licenses/React-LICENSE.txt`.

`examples/object-detection-dataset-viewer` is a unified navigation entry newly built by this project and provided under the MIT License.

## K-Means clustering, step by step

`examples/kmeans-clustering` was extracted from Naftali Harris's blog post on 2026-10-10:

| Tool | Original page |
| --- | --- |
| `examples/kmeans-clustering` | [Visualizing K-Means Clustering](https://www.naftaliharris.com/blog/visualizing-k-means-clustering/) |

The original page footer reads © Naftali Harris, 2012-2023 and states no separate open licence, so the original scripts in that directory remain the author's work under its own terms and are not covered by this project's MIT licence. The inlined d3.v3 is Mike Bostock's work under ISC/BSD-3-Clause, see `examples/kmeans-clustering/licenses/d3-LICENSE.txt`. Offline changes and attribution notes are in that tool's README.