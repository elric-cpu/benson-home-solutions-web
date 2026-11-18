"""Adapt validated authored chunks for the existing TTS transport.

This module does not split, merge, or reorder the authored CHUNK boundaries.
"""
from pathlib import Path
from typing import Callable

from locked_script import parse_file


def build_render_plan(script_path: Path, prompt_builder: Callable | None = None):
    """Build one TTS prompt per authored chunk after strict editorial validation.

    Passing the runner's prompt builder avoids a circular import when runner.py
    is executed as __main__. The default preserves the existing adapter API.
    """
    if prompt_builder is None:
        from runner import render_chunk
        prompt_builder = render_chunk

    locked = parse_file(script_path)
    chunks = [list(chunk.turns) for chunk in locked.chunks]
    return {
        "manifest": locked.manifest(),
        "chunks": chunks,
        "prompts": [prompt_builder(chunk) for chunk in chunks],
        "publication_eligible": False,
    }
