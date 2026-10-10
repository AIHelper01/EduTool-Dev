# Linear Regression Parameter Practice (Offline)

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html` and open it in a modern browser such as Edge or Chrome. No software to install, no server to start, no network required.

Adjust the **Learning rate** and drive parameter training with **Start**, **Pause**, **Step** and **Reset**. The chart keeps weight, bias, fitted line, L1 Loss, L2 Loss, MSE, RMSE and the most recent loss change in sync, which makes it easy to watch the parameters approach a better solution step by step.

## Source and offline notes

- Original page: [Google Machine Learning Crash Course: Linear regression practice problem on gradient descent](https://developers.google.cn/machine-learning/crash-course/linear-regression/gradient-descent-exercise?hl=zh-cn)
- Original iframe: `https://developers.google.cn/frame/machine-learning/crash-course/linear-regression/gradient-descent-exercise_0446e1476b2aabf177500ba8e132ae28b508f7a0b1dc1689d624f1be0f146419.frame?hl=zh-cn`
- Extracted: 2026-09-23
- Kept: the original tool algorithm, the 20 fuel-efficiency records, the controls, the drawing code and the in-code copyright notices
- Removed: Google Developer site navigation, external fonts, the page loader and analytics forwarding

The course [content reuse policy](https://support.google.com/machinelearningeducation/answer/7652594?hl=en) and the original page terms still apply. Before republishing or redistributing, re-check the source site terms plus the copyright and SPDX notices preserved in `index.html`.

## Reference results

The course states that with a learning rate of `0.03`, training converges after about 30 seconds, MSE lands near `2.67`, the weight near `-1.14` and the bias near `20.389`. Actual timing varies with browser scheduling.
