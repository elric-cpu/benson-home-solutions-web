"""Adapt validated authored chunks for the existing TTS transport."""
from pathlib import Path
from locked_script import parse_file
from runner import Turn, render_chunk


def build_render_plan(script_path: Path):
    locked = parse_file(script_path)
    chunks = [
        [Turn(t.speaker, t.text) for t in c.turns]
        for c in locked.chunks
    ]
    return {
        "manifest": locked.manifest(),
        "chunks": chunks,
        "prompts": [render_chunk(chunk) for chunk in chunks],
        "publication_eligible": False,
    }
