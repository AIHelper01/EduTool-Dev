# LoRA Illustrated, Local Version

**English** | [简体中文](README.zh-CN.md)

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
