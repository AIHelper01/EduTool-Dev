# LLM architecture explorer

**English** | [简体中文](README.zh-CN.md)

Double-click `index.html`. No network, install or build step is required; the page was verified in a fresh browser context with every HTTP(S) request blocked.

Newly made for this repository from a static architecture diagram supplied by the user (`llm_architecture_full.html`), restyled to the light teaching-tool shell used by the other cases. It is not an extracted web tool.

## Controls

- **Preset**: Transformer 2017 (decoder approximation), GPT-2 124M, LLaMA-3 8B, Mixtral 8x7B (MoE), MLA + MoE teaching sample, plus a custom state that nothing overwrites.
- **Branch selects**: positional encoding (sinusoidal / learned / RoPE), attention (MHA / MQA / GQA / MLA), normalisation (LayerNorm / RMSNorm), feed-forward kind (Dense / MoE), FFN form (2-matrix / SwiGLU 3-matrix), LM-head tying.
- **Scale sliders**: layers, `d_model`, heads, `d_ff`, vocabulary, context length.
- **Variant sliders**, enabled only where they apply: KV heads (GQA), `r_q` and `r_kv` (MLA), experts and Top-K (MoE). Greyed-out controls are explained under the group.
- Click an MHA / MQA / GQA / MLA chip inside the diagram to switch attention. The three buttons above the bar chart switch between KV cache per token per layer, attention parameters per layer and feed-forward parameters per layer.

Diagram labels, bar chart, metric list and formula list all render from one state object, so they can never disagree.

On screens wider than 1200 px the controls occupy the left column while the diagram stays pinned on the right with its own scrollbar, so both stay on screen together while you adjust parameters. Below 1200 px the page collapses into a single column in the order controls → diagram → chart → metrics.

## Estimation rules

Decoder-only, Pre-Norm stack, weight matrices only (biases and anything beyond the `d×E` router are ignored).

- Attention, MHA / MQA / GQA: `2·d·(H·d_h) + 2·d·(H_kv·d_h)` with `d_h = d/H`.
- Attention, MLA: `d·r_q + r_q·H·(d_c+d_r) + d·r_kv + r_kv·H·(d_c+d_r) + H·d_c·d`, with `d_c = 128` and `d_r = 64` fixed.
- KV cache per token per layer: `2·H_kv·d_h` elements, or `r_kv + H·d_r` for MLA, at 2 bytes per element (FP16 / BF16).
- Feed-forward: `2·d·d_ff`, or `3·d·d_ff` for SwiGLU. MoE multiplies one expert by `E`, adds a `d×E` router, and reports the active figure over Top-K experts.
- Learned positional embeddings add `L×d`; sinusoidal and RoPE add nothing.
- Total: `V·d + position + N·(attn + ffn + 2·norm) + norm + LM head`, and forward FLOPs per token as `2 × active parameters`.

## Limits

- Totals are estimates from the formulas above and can differ from published figures. Measured in the page: GPT-2 124.4M, LLaMA-3 8B 8.03B, Mixtral 8x7B 46.70B total with 12.88B active, LLaMA-3 KV cache 4.0 KB per token per layer (256.0 MB at 2,048 tokens).
- The 2017 preset keeps only the decoder trunk, so it is smaller than the paper's 65M encoder-decoder count.
- The MLA preset borrows DeepSeek-V2 attention and MoE settings with fewer layers and no shared experts; it is a teaching sample, not a released configuration, and its cache assumes one shared latent plus per-head rotary keys.
- No training, no inference, and no memory or latency model: activation memory, expert-parallelism cost, quantised caches and accuracy differences between variants are out of scope.
