"""Independent, nonpublishing technical mastering assessment for final MP3s.

The default comparison uses Apple Podcasts' published *recommendation*:
-16 LKFS +/- 1 and true peak <= -1 dB FS (ITU-R BS.1770).
This is not a project-approved release policy. It never grants publication.
https://podcasters.apple.com/support/893-audio-requirements
"""
from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

from audio_qc import AudioQCError, measure_audio

PROFILE_ID = "apple-podcasts-recommended-2026"
PROFILE_SOURCE = "https://podcasters.apple.com/support/893-audio-requirements"
TARGET_LUFS = -16.0
TOLERANCE_LU = 1.0
MAX_TRUE_PEAK_DBTP = -1.0


class MasteringQCError(ValueError):
    """Missing, invalid, or untrustworthy audio measurements."""


def evaluate_mastering(measurements: dict) -> dict:
    """Compare final-file measurements with a documented technical reference.

    A technical pass is not a release approval: no rights, editorial,
    fidelity, or human-listening gate is affected by this function.
    """
    if not isinstance(measurements, dict):
        raise MasteringQCError("Expected a measurement dictionary.")
    if measurements.get("measurement_engine") != "ffmpeg loudnorm input analysis":
        raise MasteringQCError("Measurements must come from the FFmpeg analysis pass.")
    if measurements.get("normalization_applied") is not False:
        raise MasteringQCError("Expected read-only, post-encode measurements.")

    values = {}
    for key in ("integrated_lufs", "true_peak_dbtp", "loudness_range_lu"):
        raw = measurements.get(key)
        if isinstance(raw, bool) or not isinstance(raw, (int, float)):
            raise MasteringQCError(f"Missing or invalid {key}.")
        value = float(raw)
        if not math.isfinite(value):
            raise MasteringQCError(f"Nonfinite {key}.")
        values[key] = value
    if values["loudness_range_lu"] < 0:
        raise MasteringQCError("Loudness range cannot be negative.")

    issues = []
    low, high = TARGET_LUFS - TOLERANCE_LU, TARGET_LUFS + TOLERANCE_LU
    if not low <= values["integrated_lufs"] <= high:
        issues.append(
            f"Integrated loudness {values['integrated_lufs']:.2f} LUFS outside "
            f"[{low:.1f}, {high:.1f}] LUFS."
        )
    if values["true_peak_dbtp"] > MAX_TRUE_PEAK_DBTP:
        issues.append(
            f"True peak {values['true_peak_dbtp']:.2f} dBTP exceeds "
            f"{MAX_TRUE_PEAK_DBTP:.1f} dBTP."
        )

    passed = not issues
    return {
        "status": (
            "TECHNICAL_REFERENCE_PASS_RELEASE_HOLD"
            if passed else "TECHNICAL_REFERENCE_FAIL_RELEASE_HOLD"
        ),
        "technical_pass": passed,
        "profile_id": PROFILE_ID,
        "source": PROFILE_SOURCE,
        "target_lufs": TARGET_LUFS,
        "tolerance_lu": TOLERANCE_LU,
        "maximum_true_peak_dbtp": MAX_TRUE_PEAK_DBTP,
        "loudness_range_lu": values["loudness_range_lu"],
        "lra_limit_defined": False,
        "issues": issues,
        "project_profile_approved": False,
        "human_mastering_approval_required": True,
        "publication_eligible": False,
    }


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("final_mp3", type=Path)
    args = parser.parse_args(argv)
    try:
        measurements = measure_audio(args.final_mp3)
        result = evaluate_mastering(measurements)
    except (AudioQCError, MasteringQCError, OSError) as exc:
        print(f"Mastering assessment failed: {exc}", file=sys.stderr)
        return 2
    print(json.dumps({"measurements": measurements, "assessment": result}, indent=2))
    return 0 if result["technical_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
