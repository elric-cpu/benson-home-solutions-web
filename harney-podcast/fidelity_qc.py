"""Independent ASR screening of locked-script audio; never a publication approval.

Run only in a private production environment. This module reads local rights-held
scripts and audio; it does not send them to a hosted transcription service.
The default faster-whisper backend is loaded lazily and is not installed in CI.
"""
from __future__ import annotations

import argparse
from collections import Counter
from difflib import SequenceMatcher
import hashlib
import json
import os
from pathlib import Path
import re
import sys
import unicodedata

from locked_script import parse_file


class FidelityError(RuntimeError):
    """A package is incomplete, inconsistent, or cannot be independently checked."""


def tokens(text: str) -> list[str]:
    normalized = unicodedata.normalize("NFKC", text).casefold().replace("’", "'")
    return re.findall(r"[^\W_]+(?:'[^\W_]+)?", normalized, re.UNICODE)


def edit_distance(expected: list[str], observed: list[str]) -> int:
    """Levenshtein word distance using bounded memory."""
    if len(observed) > len(expected):
        expected, observed = observed, expected
    previous = list(range(len(observed) + 1))
    for i, word in enumerate(expected, 1):
        current = [i]
        for j, other in enumerate(observed, 1):
            current.append(min(
                current[-1] + 1, previous[j] + 1,
                previous[j - 1] + (word != other),
            ))
        previous = current
    return previous[-1]


def compare_text(expected: str, observed: str, *, max_wer: float = 0.05) -> dict:
    if not 0 <= max_wer <= 1:
        raise ValueError("max_wer must be between 0 and 1.")
    reference, hypothesis = tokens(expected), tokens(observed)
    if not reference:
        raise FidelityError("Reference has no spoken words.")
    errors = edit_distance(reference, hypothesis)
    matcher = SequenceMatcher(None, reference, hypothesis, autojunk=False)
    changes = []
    for op, a, b, c, d in matcher.get_opcodes():
        if op != "equal":
            changes.append({
                "operation": op,
                "reference_position": a,
                "expected": " ".join(reference[a:b][:12]),
                "heard": " ".join(hypothesis[c:d][:12]),
            })
    wer = errors / len(reference)
    order_mismatch = reference != hypothesis and Counter(reference) == Counter(hypothesis)
    return {
        "reference_words": len(reference),
        "recognized_words": len(hypothesis),
        "word_errors": errors,
        "word_error_rate": round(wer, 6),
        "max_wer": max_wer,
        "order_changed_with_same_word_inventory": order_mismatch,
        "differences": changes[:25],
        "additional_differences_omitted": max(0, len(changes) - 25),
        "screen_pass": wer <= max_wer and not order_mismatch,
    }


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def require_hash(path: Path, expected: str) -> str:
    if not path.is_file() or not path.stat().st_size:
        raise FidelityError(f"Missing or empty audio file: {path}")
    actual = sha256_file(path)
    if not expected or actual != expected:
        raise FidelityError(f"Audio SHA-256 does not match render manifest: {path}")
    return actual


def make_local_transcriber(model_name: str):
    """Load an independent, offline ASR model once; never prime it with script text."""
    try:
        from faster_whisper import WhisperModel
    except ImportError as exc:
        raise FidelityError(
            "Install private ASR dependencies: pip install -r requirements-fidelity.txt"
        ) from exc
    model = WhisperModel(model_name, device="cpu", compute_type="int8")

    def transcribe(path: Path) -> str:
        segments, _ = model.transcribe(
            str(path), language="en", beam_size=5,
            vad_filter=False, condition_on_previous_text=False,
        )
        return " ".join(segment.text.strip() for segment in segments)
    return transcribe


def verify_package(
    script_path: Path,
    package_dir: Path,
    *,
    model_name: str = "medium.en",
    max_wer: float = 0.05,
    transcriber=None,
) -> dict:
    """Screen every authored WAV and the assembled MP3 against the locked script.

    A passing ASR screen is a triage result only. Independent human listening,
    historical review, audio mastering approval, and rights clearance remain
    mandatory. The caller may inject a transcriber for deterministic unit tests.
    """
    script_path, package_dir = Path(script_path), Path(package_dir)
    locked = parse_file(script_path)
    report_path = package_dir / "qc_report.json"
    if not report_path.is_file():
        raise FidelityError("Missing original qc_report.json.")
    report = json.loads(report_path.read_text(encoding="utf-8"))
    manifest = report.get("script_manifest") or {}
    if manifest.get("script_sha256") != locked.sha256:
        raise FidelityError("Script SHA-256 differs from the render manifest.")
    if manifest.get("authored_chunk_count") != len(locked.chunks):
        raise FidelityError("Authored chunk count differs from the render manifest.")
    if report.get("status") != "AUDIO_CONTAINER_PASS_FIDELITY_UNVERIFIED":
        raise FidelityError("Not a completed locked production render.")
    segments = report.get("segments") or []
    if len(segments) != len(locked.chunks):
        raise FidelityError("Rendered segment count differs from locked script.")

    paths = []
    hashes = []
    for i, item in enumerate(segments, 1):
        if item.get("segment") != i:
            raise FidelityError(f"Segment ordering mismatch at chunk {i}.")
        path = package_dir / "segments" / f"segment_{i:03d}.wav"
        hashes.append(require_hash(path, (item.get("wav") or {}).get("sha256")))
        paths.append(path)
    master = package_dir / "master.wav"
    require_hash(master, (report.get("master_wav") or {}).get("sha256"))
    final_mp3 = package_dir / "final.mp3"
    mp3_hash = require_hash(final_mp3, (report.get("final_mp3") or {}).get("sha256"))

    local_asr = transcriber is None
    if local_asr:
        transcriber = make_local_transcriber(model_name)

    results = []
    for chunk, path, audio_hash in zip(locked.chunks, paths, hashes):
        reference = " ".join(turn.text for turn in chunk.turns)
        comparison = compare_text(reference, transcriber(path), max_wer=max_wer)
        results.append({
            "chunk": chunk.number, "audio_sha256": audio_hash, **comparison,
        })
    reference_full = " ".join(
        turn.text for chunk in locked.chunks for turn in chunk.turns
    )
    master_result = compare_text(
        reference_full, transcriber(final_mp3), max_wer=max_wer
    )
    passed = all(x["screen_pass"] for x in results) and master_result["screen_pass"]
    output = {
        "status": "ASR_SCREEN_PASS_HUMAN_REVIEW_REQUIRED" if passed else "ASR_SCREEN_FAIL",
        "publication_eligible": False,
        "human_listening_required": True,
        "rights_clearance_required": True,
        "mastering_approval_required": True,
        "script_sha256": locked.sha256,
        "master_mp3_sha256": mp3_hash,
        "asr_engine": "faster-whisper (local, unprimed)" if local_asr else "injected transcriber (test/externally supplied)",
        "asr_model": model_name,
        "segments": results,
        "assembled_mp3": master_result,
    }
    destination = package_dir / "fidelity_report.json"
    temporary = package_dir / ".fidelity_report.json.tmp"
    try:
        temporary.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
        os.replace(temporary, destination)
    finally:
        temporary.unlink(missing_ok=True)
    return output


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("script", type=Path)
    parser.add_argument("package_dir", type=Path)
    parser.add_argument("--model", default="medium.en")
    parser.add_argument("--max-wer", type=float, default=0.05)
    args = parser.parse_args()
    try:
        report = verify_package(
            args.script, args.package_dir, model_name=args.model,
            max_wer=args.max_wer,
        )
    except (FidelityError, OSError, ValueError) as exc:
        print(f"Fidelity verification failed: {exc}", file=sys.stderr)
        return 2
    print(json.dumps({
        "status": report["status"],
        "segment_wer": [s["word_error_rate"] for s in report["segments"]],
        "assembled_wer": report["assembled_mp3"]["word_error_rate"],
        "publication_eligible": False,
    }, indent=2))
    return 0 if report["status"] == "ASR_SCREEN_PASS_HUMAN_REVIEW_REQUIRED" else 1


if __name__ == "__main__":
    raise SystemExit(main())
