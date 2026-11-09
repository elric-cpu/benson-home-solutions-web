"""Opt-in, private two-pass MP3 remastering. Never changes the source or releases an episode.

FFmpeg loudnorm analyzes the *source* first, then uses measured values for the
second pass. The encoded candidate is measured again; only a technical-reference
pass is retained. Editorial, rights, ASR, and listening gates remain separate.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from audio_qc import AudioQCError, measure_audio
from mastering_qc import MasteringQCError, evaluate_mastering

TARGET_I = -16.0
TARGET_TP = -1.5  # Encoding headroom; final technical ceiling is -1 dBTP.
TARGET_LRA = 11.0


class RemasterError(RuntimeError):
    """A safe remaster could not be produced or verified."""


def _hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _ffmpeg(command: list[str]) -> str:
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=False)
    except (OSError, subprocess.SubprocessError) as exc:
        raise RemasterError(f"FFmpeg could not run: {exc}") from exc
    if result.returncode != 0:
        raise RemasterError(
            f"FFmpeg failed (exit {result.returncode}): {result.stderr[-350:]}"
        )
    return result.stderr


def _analysis(stderr: str) -> dict[str, float]:
    blocks = re.findall(r'\{[^{}]*"input_i"[^{}]*\}', stderr, re.S)
    if not blocks:
        raise RemasterError("First pass returned no loudnorm analysis.")
    try:
        raw = json.loads(blocks[-1])
        fields = {
            "measured_I": "input_i",
            "measured_TP": "input_tp",
            "measured_LRA": "input_lra",
            "measured_thresh": "input_thresh",
            "offset": "target_offset",
        }
        data = {key: float(raw[value]) for key, value in fields.items()}
    except (KeyError, TypeError, ValueError) as exc:
        raise RemasterError("Malformed loudnorm first-pass measurements.") from exc
    if not all(math.isfinite(value) for value in data.values()):
        raise RemasterError("Nonfinite first-pass measurements (silence or corrupt input).")
    if data["measured_LRA"] < 0:
        raise RemasterError("Negative loudness range.")
    return data


def remaster(source: Path, destination: Path, *, ffmpeg: str = "ffmpeg") -> dict:
    """Produce an independently checked MP3 without overwriting any existing file.

    A failed normalization leaves the original untouched and no output candidate.
    The caller must keep the source, output, and stdout report in private storage.
    """
    source, destination = Path(source), Path(destination)
    if not source.is_file() or source.stat().st_size == 0:
        raise RemasterError(f"Missing or empty source: {source}")
    if source.suffix.lower() != ".mp3" or destination.suffix.lower() != ".mp3":
        raise RemasterError("Both input and output must be MP3 paths.")
    if destination.exists() or destination.is_symlink():
        raise RemasterError(f"Refusing to overwrite: {destination}")
    if source.resolve() == destination.resolve():
        raise RemasterError("Source and destination must be different.")

    destination.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(
        prefix=f".{destination.stem}.remaster-", suffix=".mp3",
        dir=destination.parent,
    )
    os.close(fd)
    candidate = Path(temporary)
    candidate.unlink()  # FFmpeg -n must create it, never overwrite it.
    try:
        common = f"loudnorm=I={TARGET_I:g}:TP={TARGET_TP:g}:LRA={TARGET_LRA:g}"
        first = _ffmpeg([
            ffmpeg, "-hide_banner", "-nostats", "-i", str(source),
            "-af", common + ":print_format=json", "-f", "null", "-",
        ])
        measured = _analysis(first)
        settings = ":".join(f"{key}={value:.8g}" for key, value in measured.items())
        _ffmpeg([
            ffmpeg, "-hide_banner", "-loglevel", "error", "-nostdin", "-n",
            "-i", str(source),
            "-af", common + ":" + settings + ":linear=true:print_format=json",
            "-codec:a", "libmp3lame", "-b:a", "128k",
            "-ar", "24000", "-ac", "1", str(candidate),
        ])
        if not candidate.is_file() or candidate.stat().st_size == 0:
            raise RemasterError("FFmpeg did not produce a nonempty candidate.")
        try:
            post = measure_audio(candidate, ffmpeg=ffmpeg)
            assessment = evaluate_mastering(post)
        except (AudioQCError, MasteringQCError) as exc:
            raise RemasterError(f"Post-encode verification failed: {exc}") from exc
        if not assessment["technical_pass"]:
            raise RemasterError(
                "Encoded MP3 remains outside the technical reference: "
                + "; ".join(assessment["issues"])
            )
        report = {
            "status": "REMASTER_TECHNICAL_REFERENCE_PASS_RELEASE_HOLD",
            "source_sha256": _hash(source),
            "output_sha256": _hash(candidate),
            "first_pass": measured,
            "post_encode_measurements": post,
            "mastering_assessment": assessment,
            "normalization_applied": True,
            "project_profile_approved": False,
            "human_listening_required": True,
            "fidelity_recheck_required": True,
            "rights_clearance_required": True,
            "publication_eligible": False,
        }
        # Same-directory hard link is an atomic, no-overwrite commit.
        try:
            os.link(candidate, destination)
        except FileExistsError as exc:
            raise RemasterError(f"Destination appeared during render: {destination}") from exc
        return report
    finally:
        candidate.unlink(missing_ok=True)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source_mp3", type=Path)
    parser.add_argument("new_mp3", type=Path)
    args = parser.parse_args(argv)
    try:
        report = remaster(args.source_mp3, args.new_mp3)
    except (RemasterError, OSError) as exc:
        print(f"Remaster failed: {exc}", file=sys.stderr)
        return 2
    print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
