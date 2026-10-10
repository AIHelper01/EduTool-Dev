# Object Detection Dataset Viewer

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html` in this directory and pick one of three offline viewers by annotation format:

| Viewer | Annotation format | Features |
| --- | --- | --- |
| [YOLO](../yolo-dataset-viewer/index.html) | TXT, normalised centre coordinates plus width and height | Class index and detection boxes |
| [COCO](../coco-dataset-viewer/index.html) | JSON, pixel-space `bbox` | Category names, detection boxes, Image ID search, JSON tree |
| [Pascal VOC](../voc-dataset-viewer/index.html) | XML, `bndbox` corner coordinates | Category names and detection boxes |

The entry point offers an English / 中文 switch and remembers the choice when the browser allows storage; each viewer keeps the Chinese interface of the original component. Files are processed inside the browser only, so the tools need no network and no server. One image is visualised at a time, with zoom and mouse dragging; there is no annotation editing.

This entry point is a native HTML/CSS/JavaScript page built by this project. The three viewers were extracted from 我是土堆; see the README in each directory for its source, licence and real limits.

## Full offline package

`examples/object-detection-dataset-viewer.zip` contains this entry point plus the three tool directories. Extract it completely, keep the relative position of the four folders, then open `object-detection-dataset-viewer/index.html`; do not extract only the entry page. Downloading the COCO, VOC or YOLO ZIP on its own also works with that viewer.

Verified in a fresh Chrome context with all HTTP(S) requests blocked: homepage → this entry → the three tools, the language switch, and the desktop and 390px narrow layouts. File loading and detection-box drawing are verified separately in each directory README.
