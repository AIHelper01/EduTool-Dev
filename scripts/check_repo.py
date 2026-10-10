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
SWITCH_EN = "**English** | [简体中文](README.zh-CN.md)"
SWITCH_ZH = "[English](README.md) | **简体中文**"
CJK = re.compile(r"[\u3400-\u9fff]")
ENGLISH_CJK_LIMIT = 40  # on-page labels and source names stay in Chinese
CHINESE_CJK_MINIMUM = 100


class ResourceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.external: list[str] = []
        self.local_links: list[str] = []

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
        if tag == "a":
            href = values.get("href")
            if href and not re.match(r"^(?:https?://|mailto:|#)", href, flags=re.IGNORECASE):
                self.local_links.append(href)


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

    homepage = ROOT / "index.html"
    if not homepage.is_file():
        fail("Missing homepage: index.html")
    else:
        parser = ResourceParser()
        parser.feed(homepage.read_text(encoding="utf-8"))
        for url in parser.external:
            fail(f"External runtime resource in index.html: {url}")
        for target in parser.local_links:
            clean_target = target.split("#", 1)[0]
            if clean_target and not (ROOT / clean_target).exists():
                fail(f"Broken homepage link: {target}")

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
            for target in parser.local_links:
                clean_target = target.split("#", 1)[0]
                if clean_target and not (directory / clean_target).exists():
                    fail(f"Broken example link in {html.relative_to(ROOT)}: {target}")

    readme_dirs = [ROOT, EXAMPLES] + example_dirs
    readmes: list[Path] = []
    for directory in readme_dirs:
        english = directory / "README.md"
        chinese = directory / "README.zh-CN.md"
        relative_dir = directory.relative_to(ROOT)
        if not english.is_file():
            fail(f"Missing README.md: {relative_dir}")
        if not chinese.is_file():
            fail(f"Missing README.zh-CN.md: {relative_dir}")
            continue
        readmes += [english, chinese]
        texts = {english: english.read_text(encoding="utf-8"), chinese: chinese.read_text(encoding="utf-8")}
        if SWITCH_EN not in texts[english]:
            fail(f"README.md without a switch line to README.zh-CN.md: {relative_dir}")
        elif texts[english].index(SWITCH_EN) > 200:
            fail(f"README.md switch line must sit under the title: {relative_dir}")
        if SWITCH_ZH not in texts[chinese]:
            fail(f"README.zh-CN.md without a switch line back to README.md: {relative_dir}")
        english_cjk = len(CJK.findall(texts[english].replace(SWITCH_EN, "")))
        if english_cjk > ENGLISH_CJK_LIMIT:
            fail(f"README.md is not the English copy ({english_cjk} Chinese characters): {relative_dir}")
        if len(CJK.findall(texts[chinese])) < CHINESE_CJK_MINIMUM:
            fail(f"README.zh-CN.md is not the Chinese copy: {relative_dir}")
        for path, text in texts.items():
            for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", text):
                if "://" in target or target.startswith(("#", "mailto:")):
                    continue
                clean_target = target.split("#", 1)[0]
                if clean_target and not (path.parent / clean_target).exists():
                    fail(f"Broken README link in {path.relative_to(ROOT)}: {target}")
    forbidden_names = {"node_modules", ".verification", "playwright-report", "test-results"}
    for path in ROOT.rglob("*"):
        if ".git" not in path.parts and path.name in forbidden_names:
            fail(f"Temporary artifact present: {path.relative_to(ROOT)}")

    if errors:
        print("Repository check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Repository check passed: 1 skill, {len(example_dirs)} examples, {len(readmes)} READMEs in 2 languages, no external HTML resources.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
