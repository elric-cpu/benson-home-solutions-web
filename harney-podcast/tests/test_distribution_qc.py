"""Private distribution candidate QC; no paid TTS, FFmpeg, or ASR downloads in CI."""
import hashlib
import json

import pytest

import distribution_qc as qc
from test_fidelity_qc import build_fixture


def measurements(lufs=-16.0, peak=-1.6):
    return {
        "integrated_lufs": lufs,
        "true_peak_dbtp": peak,
        "loudness_range_lu": 4.0,
        "measurement_engine": "ffmpeg loudnorm input analysis",
        "normalization_applied": False,
    }


def test_original_passing_export_is_checked_and_not_reencoded(tmp_path, monkeypatch):
    script, package, transcribe = build_fixture(tmp_path)
    calls = []

    def checked_transcriber(path):
        calls.append(path.name)
        return transcribe(path)

    monkeypatch.setattr(qc, "measure_audio", lambda path: measurements())
    monkeypatch.setattr(
        qc, "remaster", lambda *a: pytest.fail("should not remaster a passing export")
    )
    report = qc.finalize_distribution(
        script, package, remaster_if_needed=True, transcriber=checked_transcriber
    )
    assert report["status"] == "DISTRIBUTION_TECHNICAL_SCREEN_PASS_RELEASE_HOLD"
    assert report["candidate_filename"] == "final.mp3"
    assert report["candidate_sha256"] == hashlib.sha256(b"fake mp3").hexdigest()
    assert report["normalization_applied_to_candidate"] is False
    assert report["publication_eligible"] is False
    assert calls == [f"segment_{i:03d}.wav" for i in range(1, 5)] + ["final.mp3"]
    saved = json.loads((package / "distribution_qc_report.json").read_text())
    assert saved["candidate_sha256"] == report["candidate_sha256"]


def test_opt_in_remaster_rechecks_actual_candidate_asr(tmp_path, monkeypatch):
    script, package, transcribe = build_fixture(tmp_path)
    calls = []

    def transcriber(path):
        calls.append(path.name)
        return transcribe(path)

    monkeypatch.setattr(
        qc, "measure_audio",
        lambda path: measurements() if path.name == "final_remastered.mp3"
        else measurements(-21.0, -3.0),
    )

    def fake_remaster(source, destination):
        destination.write_bytes(b"remastered audio")
        return {
            "source_sha256": qc.sha256_file(source),
            "output_sha256": qc.sha256_file(destination),
            "publication_eligible": False,
        }

    monkeypatch.setattr(qc, "remaster", fake_remaster)
    report = qc.finalize_distribution(
        script, package, remaster_if_needed=True, transcriber=transcriber
    )
    assert report["status"] == "DISTRIBUTION_TECHNICAL_SCREEN_PASS_RELEASE_HOLD"
    assert report["candidate_filename"] == "final_remastered.mp3"
    assert report["candidate_sha256"] == qc.sha256_file(package / "final_remastered.mp3")
    assert report["candidate_technical_pass"] and report["candidate_asr_pass"]
    assert report["normalization_applied_to_candidate"] is True
    assert calls[-2:] == ["final.mp3", "final_remastered.mp3"]
    assert (package / "final.mp3").read_bytes() == b"fake mp3"
    assert report["publication_eligible"] is False


def test_remastered_file_with_missing_words_fails_closed(tmp_path, monkeypatch):
    script, package, transcribe = build_fixture(tmp_path)
    monkeypatch.setattr(
        qc, "measure_audio",
        lambda path: measurements() if path.name == "final_remastered.mp3"
        else measurements(-20.0),
    )

    def fake_remaster(source, destination):
        destination.write_bytes(b"remastered")
        return {
            "source_sha256": qc.sha256_file(source),
            "output_sha256": qc.sha256_file(destination),
        }

    monkeypatch.setattr(qc, "remaster", fake_remaster)
    report = qc.finalize_distribution(
        script, package, remaster_if_needed=True,
        transcriber=lambda path: (
            "" if path.name == "final_remastered.mp3" else transcribe(path)
        ),
    )
    assert report["candidate_technical_pass"] is True
    assert report["candidate_asr_pass"] is False
    assert report["status"] == "DISTRIBUTION_SCREEN_FAIL_RELEASE_HOLD"
    assert report["publication_eligible"] is False


def test_out_of_range_without_opt_in_is_reported_not_remastered(tmp_path, monkeypatch):
    script, package, transcribe = build_fixture(tmp_path)
    monkeypatch.setattr(qc, "measure_audio", lambda path: measurements(-22.0))
    monkeypatch.setattr(
        qc, "remaster", lambda *a: pytest.fail("remaster must be opt in")
    )
    report = qc.finalize_distribution(script, package, transcriber=transcribe)
    assert report["candidate_filename"] == "final.mp3"
    assert report["candidate_technical_pass"] is False
    assert report["candidate_asr_pass"] is True
    assert report["publication_eligible"] is False


def test_original_asr_failure_blocks_remaster(tmp_path, monkeypatch):
    script, package, transcribe = build_fixture(tmp_path)
    monkeypatch.setattr(qc, "measure_audio", lambda path: measurements(-22.0))
    monkeypatch.setattr(
        qc, "remaster", lambda *a: pytest.fail("source ASR failed")
    )
    with pytest.raises(qc.DistributionQCError, match="Original render failed ASR"):
        qc.finalize_distribution(
            script, package, remaster_if_needed=True,
            transcriber=lambda path: "" if path.name == "final.mp3" else transcribe(path),
        )
    assert not (package / "distribution_qc_report.json").exists()
    assert json.loads((package / "fidelity_report.json").read_text())["status"] == "ASR_SCREEN_FAIL"


def test_remaster_hash_mismatch_rejected(tmp_path, monkeypatch):
    script, package, transcribe = build_fixture(tmp_path)
    monkeypatch.setattr(qc, "measure_audio", lambda path: measurements(-22.0))

    def bad_remaster(source, destination):
        destination.write_bytes(b"candidate")
        return {
            "source_sha256": qc.sha256_file(source),
            "output_sha256": "0" * 64,
        }

    monkeypatch.setattr(qc, "remaster", bad_remaster)
    with pytest.raises(qc.FidelityError, match="SHA-256"):
        qc.finalize_distribution(
            script, package, remaster_if_needed=True, transcriber=transcribe
        )
    assert not (package / "distribution_qc_report.json").exists()


def test_existing_report_cannot_be_overwritten(tmp_path, monkeypatch):
    script, package, transcribe = build_fixture(tmp_path)
    report = package / "distribution_qc_report.json"
    report.write_text("DO NOT REPLACE")
    monkeypatch.setattr(
        qc, "measure_audio", lambda path: pytest.fail("preflight should stop")
    )
    with pytest.raises(qc.DistributionQCError, match="overwrite"):
        qc.finalize_distribution(script, package, transcriber=transcribe)
    assert report.read_text() == "DO NOT REPLACE"


def test_modified_source_manifest_fails_before_mastering(tmp_path, monkeypatch):
    script, package, transcribe = build_fixture(tmp_path)
    (package / "final.mp3").write_bytes(b"tampered")
    monkeypatch.setattr(
        qc, "measure_audio", lambda path: pytest.fail("tampered source")
    )
    with pytest.raises(qc.FidelityError, match="SHA-256"):
        qc.finalize_distribution(script, package, transcriber=transcribe)
    assert not (package / "distribution_qc_report.json").exists()
