#!/usr/bin/env python3
"""Fail when presentation concerns leak into canonical `_data` content."""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN_KEYS = {
    "theme", "layout", "variant", "class", "style", "color", "font_size",
    "columns", "card_style", "image_crop", "button_variant", "featured",
    "loading", "target", "rel", "placeholder", "title_carousel",
}
FORBIDDEN_HTML = re.compile(r"<(?:[^>]+\s)?(?:class|style)=", re.IGNORECASE)


def walk(value, path: str, errors: list[str]) -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            if str(key) in FORBIDDEN_KEYS:
                errors.append(f"{path}: forbidden presentation key {key!r}")
            walk(child, f"{path}.{key}", errors)
    elif isinstance(value, list):
        for index, child in enumerate(value):
            walk(child, f"{path}[{index}]", errors)
    elif isinstance(value, str) and FORBIDDEN_HTML.search(value):
        errors.append(f"{path}: rich text contains class/style presentation markup")


def main() -> int:
    errors: list[str] = []
    for source in sorted((ROOT / "_data").glob("*.yml")):
        walk(yaml.safe_load(source.read_text(encoding="utf-8")), source.name, errors)
    if errors:
        print("\n".join(errors))
        return 1
    print("Canonical content schema is presentation-free.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
