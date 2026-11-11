"""Locked episode production entry point."""
from locked_script import parse_file


def check_locked(path):
    return parse_file(path).manifest()
