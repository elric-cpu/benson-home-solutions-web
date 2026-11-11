"""Remaster is opt-in, no-overwrite, and cannot authorize publication."""
import json
import subprocess
from pathlib import Path

import pytest

import remaster


def _first_pass():
    return json.dumps({
        "input_i": "-22.3",
        "input_tp": "-4.5",
        "input_lra": "4.1",
        "input_thresh": "-32.1",
        "target_offset": "0.2",
    })


def _post(lufs=-16.0, peak=-1.7):
    return {
        "integrated_lufs": lufs,
        "true_peak_dbtp": peak,
        "loudness_range_lu": 4.0,
        "measurement_engine": "ffmpeg loudnorm input analysis",
        "normalization_applied": False,
    }


def _fake_ffmpeg(monkeypatch, *, first_pass=None):
    calls = []
    def run(command, **kwargs):
        calls.append(command)
        if "-f" in command and "null" in command:
            return subprocess.CompletedProcess(command, 0, "", first_pass or _first_pass())
        Path(command[-1]).write_bytes(b"MP3 candidate")
        return subprocess.CompletedProcess(command, 0, "", "")
    monkeypatch.setattr(remaster.subprocess, "run", run)
    return calls


def test_successful_remaster_is_atomic_and_nonpublishing(tmp_path, monkeypatch):
    source = tmp_path / "original.mp3"
    source.write_bytes(b"original audio")
    output = tmp_path / "new.mp3"
    calls = _fake_ffmpeg(monkeypatch)
    monkeypatch.setattr(remaster, "measure_audio", lambda path, **kwargs: _post())

    result = remaster.remaster(source, output)
    assert source.read_bytes() == b"original audio"
    assert output.read_bytes() == b"MP3 candidate"
    assert len(calls) == 2
    assert "measured_I=-22.3" in calls[1][calls[1].index("-af") + 1]
    assert "measured_thresh=-32.1" in calls[1][calls[1].index("-af") + 1]
    assert result["publication_eligible"] is False
    assert result["fidelity_recheck_required"] is True
    assert result["mastering_assessment"]["technical_pass"] is True
    assert not list(tmp_path.glob(".*.remaster-*.mp3"))


def test_rejects_existing_output_without_running_ffmpeg(tmp_path, monkeypatch):
    source, output = tmp_path / "a.mp3", tmp_path / "b.mp3"
    source.write_bytes(b"source")
    output.write_bytes(b"do not replace")
    monkeypatch.setattr(remaster.subprocess, "run", lambda *a, **k: pytest.fail("called FFmpeg"))
    with pytest.raises(remaster.RemasterError, match="overwrite"):
        remaster.remaster(source, output)
    assert output.read_bytes() == b"do not replace"


@pytest.mark.parametrize("first_pass", [
    "not json",
    '{"input_i":"-inf","input_tp":"-4","input_lra":"4","input_thresh":"-30","target_offset":"0"}',
    '{"input_i":"-20"}',
])
def test_invalid_analysis_fails_closed(tmp_path, monkeypatch, first_pass):
    source, output = tmp_path / "a.mp3", tmp_path / "b.mp3"
    source.write_bytes(b"source")
    _fake_ffmpeg(monkeypatch, first_pass=first_pass)
    with pytest.raises(remaster.RemasterError):
        remaster.remaster(source, output)
    assert not output.exists()
    assert not list(tmp_path.glob(".*.remaster-*.mp3"))


def test_post_encode_out_of_range_is_not_committed(tmp_path, monkeypatch):
    source, output = tmp_path / "a.mp3", tmp_path / "b.mp3"
    source.write_bytes(b"source")
    _fake_ffmpeg(monkeypatch)
    monkeypatch.setattr(remaster, "measure_audio", lambda path, **kwargs: _post(-20, -0.2))
    with pytest.raises(remaster.RemasterError, match="outside"):
        remaster.remaster(source, output)
    assert not output.exists()
    assert source.read_bytes() == b"source"


def test_second_pass_failure_does_not_leave_output(tmp_path, monkeypatch):
    source, output = tmp_path / "a.mp3", tmp_path / "b.mp3"
    source.write_bytes(b"source")
    def run(command, **kwargs):
        if "-f" in command and "null" in command:
            return subprocess.CompletedProcess(command, 0, "", _first_pass())
        return subprocess.CompletedProcess(command, 1, "", "encode failed")
    monkeypatch.setattr(remaster.subprocess, "run", run)
    with pytest.raises(remaster.RemasterError, match="FFmpeg failed"):
        remaster.remaster(source, output)
    assert not output.exists()


def test_rejects_missing_input_and_same_file(tmp_path):
    with pytest.raises(remaster.RemasterError, match="Missing"):
        remaster.remaster(tmp_path / "missing.mp3", tmp_path / "new.mp3")
    source = tmp_path / "a.mp3"
    source.write_bytes(b"source")
    with pytest.raises(remaster.RemasterError, match="overwrite"):
        remaster.remaster(source, source)
