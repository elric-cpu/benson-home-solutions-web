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

    def fake_produce(script, out):
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

    def fake_produce(script, out):
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
