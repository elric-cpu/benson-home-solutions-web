"""Regression coverage for production/probe CLI preflight compatibility."""

import json

import pytest

import runner


def _locked_episode():
    return "".join(
        f"--- CHUNK {i} ---\n"
        + "HOST_A: " + "word " * 200 + "\n"
        + "HOST_B: " + "word " * 200 + "\n"
        for i in range(1, 5)
    )


def test_check_script_counts_validated_authored_turns(tmp_path, capsys):
    path = tmp_path / "episode.md"
    path.write_text(_locked_episode(), encoding="utf-8")

    assert runner.main(["check-script", str(path)]) == 0
    report = json.loads(capsys.readouterr().out)
    assert report["chunks"] == 4
    assert report["turns"] == 8
    assert report["chunk_words"] == [400, 400, 400, 400]
    assert report["manifest"]["authored_chunk_count"] == 4
    assert report["manifest"]["publication_eligible"] is False


def test_check_script_probe_requires_explicit_flag(tmp_path, capsys):
    path = tmp_path / "probe.txt"
    path.write_text("HOST_A: hello\nHOST_B: world\n", encoding="utf-8")

    with pytest.raises(runner.RunnerError, match="Locked-script validation failed"):
        runner.main(["check-script", str(path)])

    assert runner.main(["check-script", str(path), "--probe"]) == 0
    report = json.loads(capsys.readouterr().out)
    assert report["chunks"] == 1
    assert report["chunk_words"] == [2]
    assert report["manifest"]["status"] == "PROBE_ONLY"
    assert report["manifest"]["publication_eligible"] is False
