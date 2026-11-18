"""Strict reader for Harney County authored two-host episode scripts.

This module does not render audio or authorize publication. It validates
editorial chunk boundaries before a TTS transport layer consumes the text.
"""
from __future__ import annotations

import hashlib
import json
import re
from dataclasses import dataclass
from pathlib import Path

CHUNK = re.compile(r"^--- CHUNK ([1-9][0-9]*) ---$")
TURN = re.compile(r"^(HOST_A|HOST_B):[ \t]*(.+?)\s*$")
OTHER_LABEL = re.compile(r"^[A-Z][A-Z0-9_]*:")
PLACEHOLDER = re.compile(r"\b(?:TODO|TBD|PLACEHOLDER)\b|\{\{|<<", re.I)


class LockedScriptError(ValueError):
    """The source is not a valid locked production script."""


@dataclass(frozen=True)
class Turn:
    speaker: str
    text: str

    @property
    def word_count(self) -> int:
        return len(self.text.split())


@dataclass(frozen=True)
class Chunk:
    number: int
    turns: tuple[Turn, ...]

    @property
    def word_count(self) -> int:
        return sum(t.word_count for t in self.turns)


@dataclass(frozen=True)
class LockedScript:
    sha256: str
    chunks: tuple[Chunk, ...]

    @property
    def spoken_text(self) -> str:
        return "\n".join(
            f"{turn.speaker}: {turn.text}"
            for chunk in self.chunks for turn in chunk.turns
        )

    def manifest(self) -> dict:
        return {
            "script_sha256": self.sha256,
            "authored_chunk_count": len(self.chunks),
            "authored_chunks": [
                {"id": chunk.number, "words": chunk.word_count,
                 "turns": len(chunk.turns)}
                for chunk in self.chunks
            ],
            "spoken_turns": sum(len(c.turns) for c in self.chunks),
            "status": "EDITORIAL_FORMAT_VALID_ONLY",
            "publication_eligible": False,
        }


def parse_locked_script(source: str) -> LockedScript:
    if PLACEHOLDER.search(source):
        raise LockedScriptError("Unresolved placeholder detected.")
    chunks: list[Chunk] = []
    turns: list[Turn] = []
    active: int | None = None

    def flush() -> None:
        if active is None:
            return
        chunk = Chunk(active, tuple(turns))
        if not 375 <= chunk.word_count <= 550:
            raise LockedScriptError(
                f"CHUNK {active} has {chunk.word_count} spoken words; "
                "required range is 375–550."
            )
        chunks.append(chunk)

    for line_number, raw in enumerate(source.splitlines(), 1):
        line = raw.strip()
        marker = CHUNK.fullmatch(line)
        if marker:
            next_id = int(marker.group(1))
            expected = len(chunks) + (1 if active is None else 2)
            if next_id != expected:
                raise LockedScriptError(
                    f"Line {line_number}: expected CHUNK {expected}, got {next_id}."
                )
            flush()
            active = next_id
            turns = []
            continue
        if active is None:
            # Branded HTML, episode title and metadata are never spoken.
            continue
        if not line:
            continue
        match = TURN.fullmatch(line)
        if match:
            turns.append(Turn(*match.groups()))
        elif OTHER_LABEL.match(line):
            raise LockedScriptError(
                f"Line {line_number}: unknown speaker label."
            )
        else:
            raise LockedScriptError(
                f"Line {line_number}: nonspoken text inside CHUNK {active}."
            )

    flush()
    if len(chunks) not in (4, 5):
        raise LockedScriptError(
            f"Expected 4 or 5 authored chunks; found {len(chunks)}."
        )
    return LockedScript(
        hashlib.sha256(source.encode("utf-8")).hexdigest(),
        tuple(chunks),
    )


def parse_file(path: Path) -> LockedScript:
    return parse_locked_script(path.read_text(encoding="utf-8"))


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("script", type=Path)
    args = parser.parse_args()
    print(json.dumps(parse_file(args.script).manifest(), indent=2))
