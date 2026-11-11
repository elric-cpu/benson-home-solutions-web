"""Private final-distribution QC: bind mastering and ASR to the exact MP3.

This command never publishes or approves an episode. It verifies the original
locked render first, optionally remasters only an out-of-range export, then
independently screens the actual distribution candidate. All assets stay local.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile
from pathlib import Path

from audio_qc import AudioQCError, measure_audio
from fidelity_qc import (
    FidelityError, compare_text, make_local_transcriber, require_hash,
    sha256_file, verify_package,
)
from locked_script import LockedScriptError, parse_file
from mastering_qc import MasteringQCError, evaluate_mastering
from remaster import RemasterError, remaster


class DistributionQCError(RuntimeError):
    """The package cannot be safely finalized or independently checked."""


def _write_once(path: Path, payload: dict) -> None:
    """Atomic no-overwrite JSON report, even if another process races us."""
    fd, name = tempfile.mkstemp(prefix=".distribution-qc-", suffix=".json", dir=path.parent)
    temporary = Path(name)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            json.dump(payload, stream, indent=2)
            stream.write("\n")
            stream.flush()
            os.fsync(stream.fileno())
        try:
            os.link(temporary, path)
        except FileExistsError as exc:
            raise DistributionQCError(f"Refusing to overwrite existing report: {path}") from exc
    finally:
        temporary.unlink(missing_ok=True)


def finalize_distribution(
    script_path: Path,
    package_dir: Path,
    *,
    remaster_if_needed: bool = False,
    model_name: str = "medium.en",
    max_wer: float = 0.05,
    transcriber=None,
) -> dict:
    """Screen a private production render and write a hash-bound release HOLD.

    All original segments, the master WAV, and the original final.mp3 are
    checked by verify_package. A normalized MP3 receives its own unprimed ASR
    pass; the original ASR result is never reused for a changed audio file.
    """
    script_path, package_dir = Path(script_path), Path(package_dir)
    if not 0 <= max_wer <= 1:
        raise DistributionQCError("max_wer must be between 0 and 1.")
    if not package_dir.is_dir():
        raise DistributionQCError(f"Missing private render package: {package_dir}")
    destination = package_dir / "distribution_qc_report.json"
    if destination.exists() or destination.is_symlink():
        raise DistributionQCError(f"Refusing to overwrite existing report: {destination}")

    locked = parse_file(script_path)
    local_asr = transcriber is None
    if local_asr:
        transcriber = make_local_transcriber(model_name)

    # Fails closed on changed script, missing segments, changed audio hashes,
    # or incomplete production status. Writes private fidelity_report.json.
    original_fidelity = verify_package(
        script_path, package_dir, model_name=model_name,
        max_wer=max_wer, transcriber=transcriber,
    )
    if original_fidelity["status"] != "ASR_SCREEN_PASS_HUMAN_REVIEW_REQUIRED":
        raise DistributionQCError(
            "Original render failed ASR screening; see private fidelity_report.json."
        )

    source = package_dir / "final.mp3"
    source_hash = require_hash(source, original_fidelity["master_mp3_sha256"])
    source_measurements = measure_audio(source)
    source_assessment = evaluate_mastering(source_measurements)

    candidate = source
    remaster_report = None
    if not source_assessment["technical_pass"] and remaster_if_needed:
        candidate = package_dir / "final_remastered.mp3"
        if candidate.exists() or candidate.is_symlink():
            raise DistributionQCError(f"Refusing to overwrite: {candidate}")
        remaster_report = remaster(source, candidate)
        if remaster_report.get("source_sha256") != source_hash:
            raise DistributionQCError("Remaster source hash differs from verified original.")
        if remaster_report.get("output_sha256") != require_hash(
            candidate, remaster_report.get("output_sha256")
        ):
            raise DistributionQCError("Remaster output hash verification failed.")

    # Independently remeasure the *actual* candidate after all encoding.
    candidate_measurements = (
        measure_audio(candidate) if candidate != source else source_measurements
    )
    candidate_assessment = evaluate_mastering(candidate_measurements)
    candidate_hash = sha256_file(candidate)

    if candidate == source:
        candidate_fidelity = original_fidelity["assembled_mp3"]
    else:
        spoken = " ".join(
            turn.text for chunk in locked.chunks for turn in chunk.turns
        )
        candidate_fidelity = compare_text(
            spoken, transcriber(candidate), max_wer=max_wer
        )

    technical_pass = candidate_assessment["technical_pass"]
    asr_pass = candidate_fidelity["screen_pass"]
    report = {
        "status": (
            "DISTRIBUTION_TECHNICAL_SCREEN_PASS_RELEASE_HOLD"
            if technical_pass and asr_pass
            else "DISTRIBUTION_SCREEN_FAIL_RELEASE_HOLD"
        ),
        "publication_eligible": False,
        "human_listening_required": True,
        "historical_review_required": True,
        "project_mastering_approval_required": True,
        "source_specific_rights_clearance_required": True,
        "distribution_route_format_check_required": True,
        "script_sha256": locked.sha256,
        "original_mp3_sha256": source_hash,
        "original_fidelity_report_sha256": sha256_file(
            package_dir / "fidelity_report.json"
        ),
        "original_mastering_assessment": source_assessment,
        "candidate_filename": candidate.name,
        "candidate_sha256": candidate_hash,
        "candidate_bytes": candidate.stat().st_size,
        "candidate_mastering_measurements": candidate_measurements,
        "candidate_mastering_assessment": candidate_assessment,
        "candidate_asr_comparison": candidate_fidelity,
        "candidate_technical_pass": technical_pass,
        "candidate_asr_pass": asr_pass,
        "asr_engine": (
            "faster-whisper (local, unprimed)"
            if local_asr else "injected transcriber (test/externally supplied)"
        ),
        "asr_model": model_name,
        "normalization_applied_to_candidate": candidate != source,
        "remaster_report": remaster_report,
    }
    _write_once(destination, report)
    return report


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("locked_script", type=Path)
    parser.add_argument("private_render_package", type=Path)
    parser.add_argument(
        "--remaster-if-needed", action="store_true",
        help="Opt in to two-pass remaster only when original MP3 fails technical reference",
    )
    parser.add_argument("--model", default="medium.en")
    parser.add_argument("--max-wer", type=float, default=0.05)
    args = parser.parse_args(argv)
    try:
        report = finalize_distribution(
            args.locked_script, args.private_render_package,
            remaster_if_needed=args.remaster_if_needed,
            model_name=args.model, max_wer=args.max_wer,
        )
    except (
        DistributionQCError, FidelityError, LockedScriptError, AudioQCError,
        MasteringQCError, RemasterError, OSError, ValueError,
    ) as exc:
        print(f"Private distribution QC failed: {exc}", file=sys.stderr)
        return 2
    print(json.dumps({
        "status": report["status"],
        "candidate_filename": report["candidate_filename"],
        "candidate_sha256": report["candidate_sha256"],
        "candidate_technical_pass": report["candidate_technical_pass"],
        "candidate_asr_pass": report["candidate_asr_pass"],
        "publication_eligible": False,
    }, indent=2))
    return 0 if report["candidate_technical_pass"] and report["candidate_asr_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
