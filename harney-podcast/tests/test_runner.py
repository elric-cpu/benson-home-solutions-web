import base64
import json
import struct
import wave
from pathlib import Path
from types import SimpleNamespace

import pytest

import runner


def pcm(seconds=0.1):
    frames = int(runner.SAMPLE_RATE * seconds)
    return b"\x00\x00" * frames


def fake_interaction(raw):
    return SimpleNamespace(
        output_audio=SimpleNamespace(data=base64.b64encode(raw).decode("ascii"))
    )


class FakeInteractions:
    def __init__(self, behavior):
        self.behavior = behavior
        self.calls = []

    def create(self, **kwargs):
        self.calls.append(kwargs)
        result = self.behavior(kwargs, len(self.calls))
        if isinstance(result, BaseException):
            raise result
        return result


class FakeClient:
    def __init__(self, behavior):
        self.interactions = FakeInteractions(behavior)


class HttpError(RuntimeError):
    def __init__(self, code):
        super().__init__(f"HTTP {code}")
        self.code = code


def test_parse_script_accepts_only_locked_labels():
    turns = runner.parse_script("HOST_A: One\n\nHOST_B: Two")
    assert [t.speaker for t in turns] == ["HOST_A", "HOST_B"]
    with pytest.raises(runner.RunnerError):
        runner.parse_script("NARRATOR: nope")


def test_chunker_preserves_all_turns_and_order():
    turns = [
        runner.Turn("HOST_A" if i % 2 == 0 else "HOST_B", "word " * 90)
        for i in range(12)
    ]
    chunks = runner.chunk_turns(turns, min_words=200, target_words=300, max_words=380)
    flattened = [t for chunk in chunks for t in chunk]
    assert flattened == turns
    assert len(chunks) >= 2


def test_block_unapproved_model():
    client = FakeClient(lambda kwargs, n: fake_interaction(pcm()))
    with pytest.raises(runner.RunnerError):
        runner._call_model(client, "gemini-2.5-pro-preview-tts", "x")


def test_primary_success_no_fallback():
    client = FakeClient(lambda kwargs, n: fake_interaction(pcm()))
    raw, model, attempts, fallback = runner.generate_pcm(client, "x", sleep_fn=lambda _: None)
    assert raw == pcm()
    assert model == runner.PRIMARY_MODEL
    assert attempts == 1
    assert fallback is False
    assert client.interactions.calls[0]["generation_config"]["speech_config"] == [
        {"speaker": "HOST_A", "voice": "Charon"},
        {"speaker": "HOST_B", "voice": "Puck"},
    ]


def test_transient_primary_retries_then_succeeds():
    def behavior(kwargs, n):
        if n < 3:
            return HttpError(429)
        return fake_interaction(pcm())

    client = FakeClient(behavior)
    _, model, attempts, fallback = runner.generate_pcm(
        client, "x", max_attempts_per_model=3, sleep_fn=lambda _: None
    )
    assert model == runner.PRIMARY_MODEL
    assert attempts == 3
    assert fallback is False


def test_primary_exhaustion_falls_back_only_to_approved_flash():
    def behavior(kwargs, n):
        if kwargs["model"] == runner.PRIMARY_MODEL:
            return HttpError(503)
        return fake_interaction(pcm())

    client = FakeClient(behavior)
    _, model, attempts, fallback = runner.generate_pcm(
        client, "x", max_attempts_per_model=2, sleep_fn=lambda _: None
    )
    assert model == runner.FALLBACK_MODEL
    assert attempts == 3
    assert fallback is True
    assert {c["model"] for c in client.interactions.calls} <= runner.ALLOWED_MODELS


def test_wav_validation_and_sha(tmp_path):
    path = tmp_path / "test.wav"
    runner.write_pcm_wav(path, pcm(0.25))
    info = runner.validate_wav(path)
    assert info.valid
    assert info.sample_rate == 24000
    assert info.channels == 1
    assert info.bit_depth == 16
    assert info.duration_seconds == pytest.approx(0.25, abs=0.002)
    assert len(info.sha256) == 64


def test_invalid_riff_rejected(tmp_path):
    path = tmp_path / "bad.wav"
    path.write_bytes(b"not a wave file" * 10)
    with pytest.raises(runner.RunnerError):
        runner.validate_wav(path)


def test_live_failure_resets_counter_and_stops(monkeypatch, tmp_path):
    successes = [
        {"master_wav": {"bytes": 100, "duration_seconds": 1.0, "sha256": "a" * 64},
         "segments": [{"model": runner.PRIMARY_MODEL, "attempts": 1, "fallback_used": False}]},
        {"master_wav": {"bytes": 100, "duration_seconds": 1.0, "sha256": "b" * 64},
         "segments": [{"model": runner.PRIMARY_MODEL, "attempts": 1, "fallback_used": False}]},
    ]
    calls = {"n": 0}

    def fake_produce(script, out, *, probe=False):
        calls["n"] += 1
        if calls["n"] <= 2:
            return successes[calls["n"] - 1]
        raise runner.RunnerError("real API failed")

    monkeypatch.setattr(runner, "produce", fake_produce)
    script = tmp_path / "probe.txt"
    script.write_text("HOST_A: x\nHOST_B: y\n")

    with pytest.raises(runner.RunnerError):
        runner.validate_live(script, tmp_path / "live", required=3)

    state = json.loads((tmp_path / "live/live_validation_status.json").read_text())
    assert state["consecutive_successes"] == 0
    assert state["validated"] is False
    assert state["history"][-1]["success"] is False


def test_live_three_consecutive_successes(monkeypatch, tmp_path):
    counter = {"n": 0}

    def fake_produce(script, out, *, probe=False):
        counter["n"] += 1
        n = counter["n"]
        return {
            "master_wav": {
                "bytes": 100 + n,
                "duration_seconds": 1.0 + n,
                "sha256": str(n) * 64,
            },
            "segments": [
                {"model": runner.PRIMARY_MODEL, "attempts": 1, "fallback_used": False}
            ],
        }

    monkeypatch.setattr(runner, "produce", fake_produce)
    script = tmp_path / "probe.txt"
    script.write_text("HOST_A: x\nHOST_B: y\n")

    state = runner.validate_live(script, tmp_path / "live", required=3)
    assert state["validated"] is True
    assert state["consecutive_successes"] == 3
    assert len(state["history"]) == 3



def test_produce_records_mp3_audio_measurements_without_release(monkeypatch, tmp_path):
    import shutil
    import audio_qc

    script = tmp_path / "locked.md"
    script.write_text("dummy input")
    monkeypatch.setattr(
        runner, "build_plan",
        lambda path, probe=False: {
            "prompts": ["test prompt"],
            "manifest": {"status": "EDITORIAL_FORMAT_VALID_ONLY"},
        },
    )
    monkeypatch.setattr(
        runner, "generate_pcm",
        lambda client, prompt: (pcm(0.2), runner.PRIMARY_MODEL, 1, False),
    )
    monkeypatch.setattr(
        runner, "assemble_wavs",
        lambda segments, master: shutil.copyfile(segments[0], master),
    )
    monkeypatch.setattr(
        runner, "export_mp3",
        lambda master, mp3: mp3.write_bytes(b"mock mp3 bytes"),
    )
    monkeypatch.setattr(
        audio_qc, "measure_audio",
        lambda path: {
            "integrated_lufs": -17.0,
            "true_peak_dbtp": -2.0,
            "loudness_gate": "MEASURED_TARGET_NOT_APPROVED",
            "publication_eligible": False,
        },
    )

    report = runner.produce(script, tmp_path / "out", client=object())
    assert report["audio_qc"]["integrated_lufs"] == -17.0
    assert report["publication_eligible"] is False
    assert report["status"] == "AUDIO_CONTAINER_PASS_FIDELITY_UNVERIFIED"
    saved = json.loads((tmp_path / "out/qc_report.json").read_text())
    assert saved["audio_qc"]["true_peak_dbtp"] == -2.0



def test_produce_failure_removes_staging_and_does_not_publish(monkeypatch, tmp_path):
    script = tmp_path / "locked.md"
    script.write_text("dummy")
    monkeypatch.setattr(
        runner, "build_plan",
        lambda path, probe=False: {"prompts": ["one"], "manifest": {}},
    )
    monkeypatch.setattr(
        runner, "generate_pcm",
        lambda client, prompt: (_ for _ in ()).throw(runner.RunnerError("TTS failure")),
    )
    output = tmp_path / "episode"
    with pytest.raises(runner.RunnerError, match="TTS failure"):
        runner.produce(script, output, client=object())
    assert not output.exists()
    assert not list(tmp_path.glob(".episode.staging-*"))


def test_produce_does_not_overwrite_existing_package(monkeypatch, tmp_path):
    script = tmp_path / "locked.md"
    script.write_text("dummy")
    output = tmp_path / "episode"
    output.mkdir()
    sentinel = output / "keep.txt"
    sentinel.write_text("original")
    monkeypatch.setattr(
        runner, "build_plan",
        lambda path, probe=False: {"prompts": ["one"], "manifest": {}},
    )
    with pytest.raises(runner.RunnerError, match="Refusing to overwrite"):
        runner.produce(script, output, client=object())
    assert sentinel.read_text() == "original"
