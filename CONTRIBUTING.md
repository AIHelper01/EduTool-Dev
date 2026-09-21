# 参与贡献

欢迎改进 skill 或添加新的教学演示。请让每次修改保持一个清楚的目的，并在提交前运行：

```bash
python scripts/check_repo.py
```

## 修改 skill

通用路由、默认约定和完成标准放在 `skills/w-interactive-demo/SKILL.md`。只有提取流程需要的细节放在 `references/extract.md`，新建工具的设计与数学约束放在 `references/create.md`，共同的视觉与交付约定放在 `references/style-and-delivery.md`。

避免把某一个案例的偶然实现写成所有主题必须遵守的规则。加入严格要求时，应能说明它防止了什么具体错误。

## 添加案例

新案例放在 `examples/<topic>/`，至少包含：

- `index.html`：可直接通过 `file://` 打开；
- `README.md`：说明操作方法、来源、改动和限制；
- 仅在实际需要时加入 `assets/` 或 `licenses/`。

提交前应在新的浏览器上下文中阻断 HTTP(S) 请求，实际操作主要控件，核对核心数值关系，并查看桌面和窄屏截图。若案例无法完全离线，README 必须准确说明依赖。

从网页提取的案例不得移除原代码中必须保留的版权声明。仓库根目录的 MIT License 只覆盖本项目自有内容，不会改变第三方内容的许可。
