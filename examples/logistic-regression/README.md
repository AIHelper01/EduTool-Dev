# Logistic Regression Interactive Demo

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html` and open it in a modern browser such as Edge or Chrome. All code and data live in this single HTML file: no installation, no server, no network.

- Choose one of three example datasets to see clearly separable classes, overlapping classes, and imbalanced classes.
- Drag Weight and Bias and watch how the S-shaped probability curve and the mean cross-entropy respond.
- Drag the Classification threshold and watch the decision boundary, confusion matrix, accuracy, precision, recall and F1. Moving the threshold alone never changes cross-entropy.
- Click "Train one step" or "Auto train" to update weight and bias with gradient descent; "Reset parameters" restores the defaults.

Purple dots are actual positives, orange dots are actual negatives, and a black × marks a misclassified point; the blue line is the model's predicted positive probability and the dashed orange line is the classification threshold. The three datasets are fixed built-in examples and stay identical across reloads.

This is a newly built logistic regression demo whose visual style follows the linear regression and classification-metric offline tools in this workspace. The page credit reads "工具来源：AIHelper01".
