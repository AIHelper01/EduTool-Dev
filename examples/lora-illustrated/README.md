# LoRA Illustrated, Local Version

**English** | [中文](#中文说明)

Double-click `index.html` to use it offline. The original English interface is kept, and it is stored separately from the independently developed `../lora/` version by AIHelper01.

Original author: Pavithran Ramachandran (Pavi). Original page: https://pavithranrao.github.io/AI/LoRA/lora-illustration.html . Local packaging date: 2026-10-08.

## Interactions and conventions

- Choose rank 1-4, tune alpha, edit an A/B cell, then press Enter or move focus away.
- Hover a cell of ΔW / W′ to highlight the related row and column plus the arrows.
- Randomize All regenerates every matrix; Reset randomly regenerates the matrices for the current rank and restores alpha=1.5, rather than restoring one fixed initial set.
- On this page A is 8×r and B is r×8, so ΔW=AB and W′=W+αΔW. The original page uses a direct α multiplier, not α/r, and is only a manual matrix-update illustration: it performs no training.

## Local changes

Removed Google Fonts in favour of system fonts; added the original author and source, local usage notes and input labels. Fixed the wording at the top of the page where BA disagreed with the actual AB computation; the ΔW heat map actually renders the unscaled product, so its label now says unscaled update. The original matrix generation, multiplication, editing, colour mapping and hover-linking algorithms are unchanged.

The original page randomises the initial values; displayed values are rounded and colours follow the numeric range across all matrices. This is not the same scaling, initialisation or training flow as this repository's LoRA training tool.

## Licence status

Neither the original page nor the public repositories inspected carry a reuse licence that clearly covers this demo. The local packaging grants no licence to the original work and does not claim MIT or any other open licence; author and source are retained. For republication or commercial reuse, confirm permission with the original author first.

---

## 中文说明

双击 `index.html` 即可离线使用。保留原英文界面，与 AIHelper01 独立开发的 `../lora/` 版本分别保存。

原作者：Pavithran Ramachandran（Pavi）。原始页面：https://pavithranrao.github.io/AI/LoRA/lora-illustration.html 。本地整理日期：2026-10-08。

### 交互与约定

- 选择 rank 1–4，调节 α，编辑 A/B 单元格后按 Enter 或移开焦点。
- 悬停 ΔW / W′ 的单元格，查看关联行列与箭头。
- Randomize All 重新生成所有矩阵；Reset 重新随机生成当前 rank 的矩阵并恢复 α=1.5，不恢复某一组固定初始值。
- 本页 A 为 8×r，B 为 r×8，因此 ΔW=AB；W′=W+αΔW。原页使用直接倍率 α，不使用 α/r，且只是手动矩阵更新展示，不执行训练。

### 本地改动

移除 Google Fonts，使用系统字体；补充原作者与来源、本地操作说明、输入标签。修正原页顶部 BA 与实际 AB 计算不一致的文字；ΔW 热图实际显示未缩放乘积，因此将其标签改为未缩放更新。保留原矩阵生成、乘法、编辑、颜色映射和悬停关联算法。

原页随机生成初值；显示值经过舍入，颜色随全部矩阵的数值范围变化。不是与本仓库中文 LoRA 训练工具相同的缩放、初始化或训练流程。

### 许可状态

原页及所检查的公开仓库未发现明确覆盖此演示的复用许可证。本地整理不为原作品另行授予许可，也不声明 MIT 等开源授权；保留作者与出处。若要再发布或商业复用，请先向原作者确认授权。
