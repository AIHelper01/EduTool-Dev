# Contributing

**English** | [简体中文](CONTRIBUTING.zh-CN.md)

Improvements to the skill and new teaching demos are welcome. Keep each change focused on one clear purpose, and run this before committing:

```bash
python scripts/check_repo.py
```

## Changing the skill

General routing, default conventions and the definition of done live in `skills/w-interactive-demo/SKILL.md`. Details needed only by the extraction flow go in `references/extract.md`, design and maths constraints for new tools go in `references/create.md`, and shared visual and delivery conventions go in `references/style-and-delivery.md`.

Do not turn an incidental choice from one tool into a rule every topic must follow. When you add a strict requirement, be able to name the concrete mistake it prevents.

## Adding a case

New cases go in `examples/<topic>/` and contain at least:

- `index.html`: opens directly over `file://`;
- `README.md` plus `README.zh-CN.md`: one file per language, English by default, each with a language switch line under its title; the content covers controls, provenance, changes and limits;
- `assets/` or `licenses/` only when actually needed.

Before committing, block HTTP(S) requests in a fresh browser context, drive the main controls, check the core numeric relationships, and review desktop and narrow-screen screenshots. If a case cannot run fully offline, its README must state the dependency accurately.

Extracted cases must not remove copyright notices that the original code requires to be kept. The MIT License at the repository root covers only this project's own content and never changes the licence of third-party material.