"""Fail-closed, offline release-record checker for a private podcast package.

This checker does not upload or publish. It requires an independently signed
human acceptance record for the exact QC-screened candidate MP3.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

APPROVALS = (
    "full_listening_approved",
    "historical_accuracy_approved",
    "mastering_policy_approved",
    "distribution_format_approved",
    "source_rights_approved",
)
REQUIRED_TEXT = ("reviewer", "approved_at", "rights_evidence_reference", "distribution_route")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def check_release(package: Path, acceptance: Path) -> list[str]:
    """Return reasons for HOLD. No external side effects."""
    errors = []
    try:
        qc = json.loads((package / "distribution_qc_report.json").read_text(encoding="utf-8"))
        record = json.loads(acceptance.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        return [f"Missing or invalid private evidence: {exc}"]
    if not isinstance(qc, dict) or not isinstance(record, dict):
        return ["Evidence documents must be JSON objects"]
    if qc.get("status") != "DISTRIBUTION_TECHNICAL_SCREEN_PASS_RELEASE_HOLD":
        errors.append("Distribution QC status is not a technical screen pass")
    for field in ("candidate_technical_pass", "candidate_asr_pass"):
        if qc.get(field) is not True:
            errors.append(f"QC {field} is not true")
    if qc.get("publication_eligible") is not False:
        errors.append("Unexpected QC publication eligibility state")
    filename = qc.get("candidate_filename")
    expected = qc.get("candidate_sha256")
    if not isinstance(filename, str) or filename not in ("final.mp3", "final_remastered.mp3"):
        errors.append("Invalid candidate filename")
    else:
        candidate = package / filename
        if not candidate.is_file() or not isinstance(expected, str) or sha256(candidate) != expected:
            errors.append("Candidate MP3 missing or SHA-256 mismatch")
    if record.get("candidate_sha256") != expected or not isinstance(expected, str):
        errors.append("Acceptance is not bound to candidate SHA-256")
    if record.get("script_sha256") != qc.get("script_sha256") or not qc.get("script_sha256"):
        errors.append("Acceptance is not bound to locked script SHA-256")
    for field in APPROVALS:
        if record.get(field) is not True:
            errors.append(f"Human approval missing: {field}")
    for field in REQUIRED_TEXT:
        if not isinstance(record.get(field), str) or not record[field].strip():
            errors.append(f"Acceptance evidence missing: {field}")
    if record.get("release_decision") != "APPROVED":
        errors.append("Explicit human release decision is not APPROVED")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("private_package", type=Path)
    parser.add_argument("private_acceptance_json", type=Path)
    args = parser.parse_args()
    problems = check_release(args.private_package, args.private_acceptance_json)
    if problems:
        print("RELEASE HOLD")
        for problem in problems:
            print("- " + problem)
        return 1
    print("RELEASE RECORD VALIDATED — manual publication still required")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
