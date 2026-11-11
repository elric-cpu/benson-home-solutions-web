from pathlib import Path
from types import SimpleNamespace

import pytest

import audio_qc


SAMPLE = """
[Parsed_loudnorm_0 @ 0x123]
{
    "input_i" : "-17.40",
    "input_tp" : "-2.30",
    "input_lra" : "5.10",
    "input_thresh" : "-27.50",
    "output_i" : "-16.00"
}
"""


def test_measure_audio_parses_input_metrics(monkeypatch, tmp_path):
    path = tmp_path / "audio.wav"
    path.write_bytes(b"fake audio")
    captured = {}

    def fake_run(cmd, **kwargs):
        captured["cmd"] = cmd
        return SimpleNamespace(returncode=0, stderr=SAMPLE)

    monkeypatch.setattr(audio_qc.subprocess, "run", fake_run)
    result = audio_qc.measure_audio(path)
    assert result["integrated_lufs"] == -17.4
    assert result["true_peak_dbtp"] == -2.3
    assert result["loudness_range_lu"] == 5.1
    assert result["publication_eligible"] is False
    assert result["normalization_applied"] is False
    assert "loudnorm=" in " ".join(captured["cmd"])


def test_missing_audio_rejected(tmp_path):
    with pytest.raises(audio_qc.AudioQCError, match="Missing or empty"):
        audio_qc.measure_audio(tmp_path / "missing.wav")


@pytest.mark.parametrize("stderr", [
    "No loudnorm output",
    SAMPLE.replace("-17.40", "-inf"),
    SAMPLE.replace('"input_tp" : "-2.30"', '"input_tp" : "oops"'),
])
def test_unmeasurable_audio_rejected(monkeypatch, tmp_path, stderr):
    path = tmp_path / "audio.wav"
    path.write_bytes(b"audio")
    monkeypatch.setattr(
        audio_qc.subprocess, "run",
        lambda *args, **kwargs: SimpleNamespace(returncode=0, stderr=stderr),
    )
    with pytest.raises(audio_qc.AudioQCError):
        audio_qc.measure_audio(path)


def test_ffmpeg_error_rejected(monkeypatch, tmp_path):
    path = tmp_path / "audio.wav"
    path.write_bytes(b"audio")
    monkeypatch.setattr(
        audio_qc.subprocess, "run",
        lambda *args, **kwargs: SimpleNamespace(returncode=1, stderr="bad input"),
    )
    with pytest.raises(audio_qc.AudioQCError, match="FFmpeg analysis failed"):
        audio_qc.measure_audio(path)
