#!/usr/bin/env python3
"""Check repository structure and obvious external runtime dependencies."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "w-interactive-demo"
EXAMPLES = ROOT / "examples"


class ResourceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.external: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        candidates: list[str | None] = []
        if tag in {"script", "img", "iframe", "audio", "video", "source"}:
            candidates.append(values.get("src"))
        if tag == "link" and values.get("rel", "").lower() in {"stylesheet", "modulepreload", "preload"}:
            candidates.append(values.get("href"))
        for value in candidates:
            if value and re.match(r"^https?://", value, flags=re.IGNORECASE):
                self.external.append(value)


def main() -> int:
    errors: list[str] = []

    def fail(message: str) -> None:
        errors.append(message)

    required_skill_files = [
        SKILL / "SKILL.md",
        SKILL / "agents" / "openai.yaml",
        SKILL / "references" / "extract.md",
        SKILL / "references" / "create.md",
        SKILL / "references" / "style-and-delivery.md",
    ]
    for path in required_skill_files:
        if not path.is_file():
            fail(f"Missing skill file: {path.relative_to(ROOT)}")

    skill_md = SKILL / "SKILL.md"
    if skill_md.is_file():
        text = skill_md.read_text(encoding="utf-8")
        if not re.match(r"^---\s*\nname:\s*w-interactive-demo\s*\ndescription:\s*.+?\n---", text, re.DOTALL):
            fail("SKILL.md has invalid or incomplete frontmatter")
        for target in re.findall(r"\]\(([^)]+)\)", text):
            if "://" not in target and not (skill_md.parent / target).is_file():
                fail(f"Broken SKILL.md reference: {target}")

    example_dirs = sorted(path for path in EXAMPLES.iterdir() if path.is_dir()) if EXAMPLES.is_dir() else []
    if not example_dirs:
        fail("No example directories found")
    for directory in example_dirs:
        for filename in ("index.html", "README.md"):
            if not (directory / filename).is_file():
                fail(f"Missing {filename}: {directory.relative_to(ROOT)}")
        html = directory / "index.html"
        if html.is_file():
            parser = ResourceParser()
            parser.feed(html.read_text(encoding="utf-8"))
            for url in parser.external:
                fail(f"External runtime resource in {html.relative_to(ROOT)}: {url}")

    forbidden_names = {"node_modules", ".verification", "playwright-report", "test-results"}
    for path in ROOT.rglob("*"):
        if ".git" not in path.parts and path.name in forbidden_names:
            fail(f"Temporary artifact present: {path.relative_to(ROOT)}")

    if errors:
        print("Repository check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Repository check passed: 1 skill, {len(example_dirs)} examples, no external HTML resources.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
