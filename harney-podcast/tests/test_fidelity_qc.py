"""No paid TTS or ASR downloads in CI: fidelity checks use injected transcriber."""
import hashlib
import json

import pytest

from fidelity_qc import FidelityError, compare_text, verify_package


def test_normalization_does_not_penalize_punctuation_or_case():
    result = compare_text("Oregon's Gold, 1878!", "OREGON'S gold 1878")
    assert result["screen_pass"]
    assert result["word_errors"] == 0


def test_missing_and_substituted_words_fail():
    result = compare_text("the old road went north", "the road turned north", max_wer=0.05)
    assert not result["screen_pass"]
    assert result["word_errors"] >= 2
    assert result["differences"]


def test_reordered_words_are_not_silently_accepted():
    result = compare_text("red gold black sand", "gold red black sand", max_wer=0)
    assert not result["screen_pass"]
    assert result["order_changed_with_same_word_inventory"]


def build_fixture(tmp_path):
    script = tmp_path / "EP_TEST.md"
    script.write_text("".join(
        f"--- CHUNK {i} ---\nHOST_A: " + "alpha " * 200
        + "\nHOST_B: " + "beta " * 200 + "\n"
        for i in range(1, 5)
    ), encoding="utf-8")
    package = tmp_path / "package"
    (package / "segments").mkdir(parents=True)
    segments = []
    for i in range(1, 5):
        path = package / "segments" / f"segment_{i:03d}.wav"
        path.write_bytes(f"fake segment {i}".encode())
        segments.append({
            "segment": i,
            "wav": {"sha256": hashlib.sha256(path.read_bytes()).hexdigest()},
        })
    master = package / "master.wav"
    master.write_bytes(b"fake master")
    mp3 = package / "final.mp3"
    mp3.write_bytes(b"fake mp3")
    manifest = {
        "status": "AUDIO_CONTAINER_PASS_FIDELITY_UNVERIFIED",
        "script_manifest": {
            "script_sha256": hashlib.sha256(script.read_bytes()).hexdigest(),
            "authored_chunk_count": 4,
        },
        "segments": segments,
        "master_wav": {"sha256": hashlib.sha256(master.read_bytes()).hexdigest()},
        "final_mp3": {"sha256": hashlib.sha256(mp3.read_bytes()).hexdigest()},
    }
    (package / "qc_report.json").write_text(json.dumps(manifest), encoding="utf-8")
    reference_chunk = " ".join(["alpha"] * 200 + ["beta"] * 200)
    def transcribe(path):
        return " ".join([reference_chunk] * 4) if path.suffix == ".mp3" else reference_chunk
    return script, package, transcribe


def test_all_segments_and_master_are_checked(tmp_path):
    script, package, transcribe = build_fixture(tmp_path)
    called = []
    def counting(path):
        called.append(path.name)
        return transcribe(path)
    report = verify_package(script, package, transcriber=counting)
    assert report["status"] == "ASR_SCREEN_PASS_HUMAN_REVIEW_REQUIRED"
    assert report["publication_eligible"] is False
    assert called == [f"segment_{i:03d}.wav" for i in range(1, 5)] + ["final.mp3"]
    assert (package / "fidelity_report.json").exists()


def test_master_mismatch_fails_even_if_segments_match(tmp_path):
    script, package, transcribe = build_fixture(tmp_path)
    def missing_end(path):
        result = transcribe(path)
        return result[:-300] if path.suffix == ".mp3" else result
    report = verify_package(script, package, transcriber=missing_end)
    assert report["status"] == "ASR_SCREEN_FAIL"
    assert all(x["screen_pass"] for x in report["segments"])
    assert not report["assembled_mp3"]["screen_pass"]


def test_modified_audio_or_script_cannot_reuse_old_report(tmp_path):
    script, package, transcribe = build_fixture(tmp_path)
    (package / "segments" / "segment_002.wav").write_bytes(b"tampered")
    with pytest.raises(FidelityError, match="SHA-256"):
        verify_package(script, package, transcriber=transcribe)
    assert not (package / "fidelity_report.json").exists()


def test_script_manifest_mismatch_is_rejected(tmp_path):
    script, package, transcribe = build_fixture(tmp_path)
    script.write_text(script.read_text().replace("alpha", "gamma", 1))
    with pytest.raises(FidelityError, match="Script SHA-256"):
        verify_package(script, package, transcriber=transcribe)
