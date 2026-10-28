"""Read-only audio loudness and true-peak measurement for podcast QC.

Uses FFmpeg's loudnorm analysis pass; this does not modify or normalize audio.
Measured values alone never authorize publication or certify script fidelity.
"""
from __future__ import annotations

import json
import math
import re
import subprocess
from pathlib import Path


class AudioQCError(RuntimeError):
    """Audio could not be measured reliably."""


def measure_audio(path: Path, *, ffmpeg: str = "ffmpeg") -> dict:
    """Return integrated LUFS, true peak (dBTP), and LRA (LU).

    A full decoding/analysis pass is required. Silent, corrupt, or unmeasurable
    audio fails closed rather than being reported as compliant.
    """
    path = Path(path)
    if not path.is_file() or path.stat().st_size == 0:
        raise AudioQCError(f"Missing or empty audio file: {path}")

    command = [
        ffmpeg, "-hide_banner", "-nostats", "-i", str(path),
        "-af", "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json",
        "-f", "null", "-",
    ]
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=False)
    except (OSError, subprocess.SubprocessError) as exc:
        raise AudioQCError(f"FFmpeg analysis could not start: {exc}") from exc
    if result.returncode != 0:
        raise AudioQCError(
            f"FFmpeg analysis failed (exit {result.returncode}): "
            f"{result.stderr[-400:]}"
        )

    blocks = re.findall(r'\{[^{}]*"input_i"[^{}]*\}', result.stderr, re.S)
    if not blocks:
        raise AudioQCError("FFmpeg did not report loudnorm input measurements.")
    try:
        values = json.loads(blocks[-1])
        integrated = float(values["input_i"])
        true_peak = float(values["input_tp"])
        lra = float(values["input_lra"])
    except (ValueError, KeyError, TypeError) as exc:
        raise AudioQCError("Invalid loudnorm measurement JSON.") from exc
    if not all(math.isfinite(value) for value in (integrated, true_peak, lra)):
        raise AudioQCError("Nonfinite loudness measurement (possibly silent audio).")

    return {
        "integrated_lufs": integrated,
        "true_peak_dbtp": true_peak,
        "loudness_range_lu": lra,
        "measurement_engine": "ffmpeg loudnorm input analysis",
        "normalization_applied": False,
        "loudness_target_approved": False,
        "loudness_gate": "MEASURED_TARGET_NOT_APPROVED",
        "script_fidelity_gate": "NOT_TESTED",
        "publication_eligible": False,
    }
