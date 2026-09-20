#!/usr/bin/env python3
"""Harney County History Podcast deterministic Gemini TTS production runner."""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
import random
import re
import shutil
import subprocess
import sys
import time
import wave
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Callable, Iterable, Sequence

PRIMARY_MODEL = "gemini-3.1-flash-tts-preview"
FALLBACK_MODEL = "gemini-2.5-flash-preview-tts"
ALLOWED_MODELS = {PRIMARY_MODEL, FALLBACK_MODEL}
HOST_VOICES = {"HOST_A": "Charon", "HOST_B": "Puck"}

SAMPLE_RATE = 24_000
CHANNELS = 1
SAMPLE_WIDTH = 2
BIT_DEPTH = SAMPLE_WIDTH * 8

MIN_CHUNK_WORDS = 360
TARGET_CHUNK_WORDS = 465
MAX_CHUNK_WORDS = 620

LABEL_RE = re.compile(r"^(HOST_A|HOST_B):\s*(.+?)\s*$")


class RunnerError(RuntimeError):
    pass


@dataclass(frozen=True)
class Turn:
    speaker: str
    text: str

    @property
    def words(self) -> int:
        return len(self.text.split())

    def render(self) -> str:
        return f"{self.speaker}: {self.text}"


@dataclass
class WavInfo:
    path: str
    bytes: int
    duration_seconds: float
    sample_rate: int
    channels: int
    bit_depth: int
    frames: int
    sha256: str
    valid: bool


@dataclass
class SegmentReport:
    segment: int
    model: str
    attempts: int
    fallback_used: bool
    wav: WavInfo


def parse_script(text: str) -> list[Turn]:
    turns: list[Turn] = []
    for line_no, raw in enumerate(text.splitlines(), start=1):
        line = raw.strip()
        if not line:
            continue
        match = LABEL_RE.match(line)
        if not match:
            raise RunnerError(
                f"Line {line_no} is not a valid speaker turn. "
                "Every nonblank line must start with HOST_A: or HOST_B:."
            )
        speaker, body = match.groups()
        if not body.strip():
            raise RunnerError(f"Line {line_no} has an empty speaker turn.")
        turns.append(Turn(speaker=speaker, text=body.strip()))
    if not turns:
        raise RunnerError("Script contains no HOST_A/HOST_B turns.")
    return turns


def chunk_turns(
    turns: Sequence[Turn],
    min_words: int = MIN_CHUNK_WORDS,
    target_words: int = TARGET_CHUNK_WORDS,
    max_words: int = MAX_CHUNK_WORDS,
) -> list[list[Turn]]:
    if not (0 < min_words <= target_words <= max_words):
        raise ValueError("Chunk word thresholds must satisfy 0 < min <= target <= max.")

    chunks: list[list[Turn]] = []
    current: list[Turn] = []
    current_words = 0

    for turn in turns:
        turn_words = max(1, turn.words)

        if current and current_words >= min_words and current_words + turn_words > max_words:
            chunks.append(current)
            current = []
            current_words = 0

        current.append(turn)
        current_words += turn_words

        if current_words >= target_words:
            chunks.append(current)
            current = []
            current_words = 0

    if current:
        if chunks and current_words < min_words:
            previous_words = sum(max(1, t.words) for t in chunks[-1])
            if previous_words + current_words <= max_words:
                chunks[-1].extend(current)
            else:
                chunks.append(current)
        else:
            chunks.append(current)

    return chunks


def render_chunk(turns: Sequence[Turn]) -> str:
    transcript = "\n".join(turn.render() for turn in turns)
    return (
        "Perform the following locked podcast transcript exactly as written. "
        "Do not add, remove, paraphrase, summarize, censor, or reorder words. "
        "HOST_A is precise, dry, skeptical, and controlled. "
        "HOST_B is quicker, curious, animated, and easily distracted. "
        "Keep the delivery conversational and natural; do not add sound effects.\n\n"
        + transcript
    )


def write_pcm_wav(path: Path, pcm: bytes) -> None:
    if not pcm:
        raise RunnerError("Gemini returned empty audio.")
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(SAMPLE_WIDTH)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(pcm)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for block in iter(lambda: fh.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def validate_wav(path: Path) -> WavInfo:
    if not path.exists() or path.stat().st_size <= 44:
        raise RunnerError(f"WAV is missing or empty: {path}")

    header = path.read_bytes()[:12]
    if len(header) < 12 or header[:4] != b"RIFF" or header[8:12] != b"WAVE":
        raise RunnerError(f"Invalid RIFF/WAVE header: {path}")

    try:
        with wave.open(str(path), "rb") as wf:
            channels = wf.getnchannels()
            sample_width = wf.getsampwidth()
            sample_rate = wf.getframerate()
            frames = wf.getnframes()
    except wave.Error as exc:
        raise RunnerError(f"Unreadable WAV {path}: {exc}") from exc

    if channels != CHANNELS:
        raise RunnerError(f"Expected mono WAV, got {channels} channels: {path}")
    if sample_width != SAMPLE_WIDTH:
        raise RunnerError(f"Expected 16-bit WAV, got {sample_width * 8}-bit: {path}")
    if sample_rate != SAMPLE_RATE:
        raise RunnerError(f"Expected 24000 Hz WAV, got {sample_rate}: {path}")
    if frames <= 0:
        raise RunnerError(f"WAV has no audio frames: {path}")

    duration = frames / sample_rate
    if duration <= 0:
        raise RunnerError(f"WAV duration is not positive: {path}")

    return WavInfo(
        path=str(path),
        bytes=path.stat().st_size,
        duration_seconds=round(duration, 3),
        sample_rate=sample_rate,
        channels=channels,
        bit_depth=sample_width * 8,
        frames=frames,
        sha256=sha256_file(path),
        valid=True,
    )


def _status_code(exc: BaseException) -> int | None:
    for name in ("code", "status_code", "status"):
        value = getattr(exc, name, None)
        if isinstance(value, int):
            return value
        try:
            if value is not None and str(value).isdigit():
                return int(str(value))
        except Exception:
            pass
    match = re.search(r"\b(429|5\d\d)\b", str(exc))
    return int(match.group(1)) if match else None


def is_transient(exc: BaseException) -> bool:
    code = _status_code(exc)
    return code == 429 or (code is not None and 500 <= code <= 599)


def sleep_backoff(attempt: int) -> None:
    delay = min(20.0, 1.5 * (2 ** (attempt - 1))) + random.uniform(0.0, 0.35)
    time.sleep(delay)


def _call_model(client, model: str, prompt: str) -> bytes:
    if model not in ALLOWED_MODELS:
        raise RunnerError(f"Blocked model: {model}")
    interaction = client.interactions.create(
        model=model,
        input=prompt,
        response_format={"type": "audio"},
        generation_config={
            "speech_config": [
                {"speaker": "HOST_A", "voice": HOST_VOICES["HOST_A"]},
                {"speaker": "HOST_B", "voice": HOST_VOICES["HOST_B"]},
            ]
        },
    )
    output_audio = getattr(interaction, "output_audio", None)
    data = getattr(output_audio, "data", None) if output_audio is not None else None
    if not data:
        raise RunnerError(f"{model} returned no output_audio.data")
    try:
        return base64.b64decode(data, validate=True)
    except Exception as exc:
        raise RunnerError(f"{model} returned invalid base64 audio") from exc


def generate_pcm(
    client,
    prompt: str,
    max_attempts_per_model: int = 3,
    sleep_fn: Callable[[int], None] = sleep_backoff,
) -> tuple[bytes, str, int, bool]:
    total_attempts = 0
    last_error: BaseException | None = None

    for model_index, model in enumerate((PRIMARY_MODEL, FALLBACK_MODEL)):
        for attempt in range(1, max_attempts_per_model + 1):
            total_attempts += 1
            try:
                pcm = _call_model(client, model, prompt)
                return pcm, model, total_attempts, model_index == 1
            except BaseException as exc:
                last_error = exc
                if is_transient(exc) and attempt < max_attempts_per_model:
                    sleep_fn(attempt)
                    continue
                break

    raise RunnerError(
        f"Both approved TTS models failed after {total_attempts} attempts. "
        f"Last error: {last_error}"
    )


def require_ffmpeg() -> tuple[str, str]:
    ffmpeg = shutil.which("ffmpeg")
    ffprobe = shutil.which("ffprobe")
    if not ffmpeg or not ffprobe:
        raise RunnerError("ffmpeg and ffprobe must both be installed and on PATH.")
    return ffmpeg, ffprobe


def assemble_wavs(segment_paths: Sequence[Path], master_wav: Path) -> None:
    ffmpeg, _ = require_ffmpeg()
    if not segment_paths:
        raise RunnerError("No WAV segments to assemble.")

    concat_file = master_wav.parent / "segments.ffconcat"
    concat_file.parent.mkdir(parents=True, exist_ok=True)
    lines = ["ffconcat version 1.0"]
    for path in segment_paths:
        escaped = str(path.resolve()).replace("'", "'\\''")
        lines.append(f"file '{escaped}'")
    concat_file.write_text("\n".join(lines) + "\n", encoding="utf-8")

    cmd = [
        ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
        "-f", "concat", "-safe", "0", "-i", str(concat_file),
        "-ar", str(SAMPLE_RATE), "-ac", str(CHANNELS), "-c:a", "pcm_s16le",
        str(master_wav),
    ]
    subprocess.run(cmd, check=True)


def export_mp3(master_wav: Path, mp3_path: Path) -> None:
    ffmpeg, _ = require_ffmpeg()
    cmd = [
        ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(master_wav),
        "-codec:a", "libmp3lame", "-b:a", "128k", "-ar", str(SAMPLE_RATE), "-ac", "1",
        str(mp3_path),
    ]
    subprocess.run(cmd, check=True)


def build_client():
    if not os.environ.get("GEMINI_API_KEY"):
        raise RunnerError("GEMINI_API_KEY is not set.")
    from google import genai
    return genai.Client()


def produce(script_path: Path, output_dir: Path, client=None) -> dict:
    script_text = script_path.read_text(encoding="utf-8")
    turns = parse_script(script_text)
    chunks = chunk_turns(turns)

    output_dir.mkdir(parents=True, exist_ok=True)
    segment_dir = output_dir / "segments"
    segment_dir.mkdir(parents=True, exist_ok=True)

    client = client or build_client()
    reports: list[SegmentReport] = []
    segment_paths: list[Path] = []

    for idx, chunk in enumerate(chunks, start=1):
        pcm, model, attempts, fallback_used = generate_pcm(client, render_chunk(chunk))
        wav_path = segment_dir / f"segment_{idx:03d}.wav"
        write_pcm_wav(wav_path, pcm)
        wav_info = validate_wav(wav_path)
        reports.append(
            SegmentReport(
                segment=idx,
                model=model,
                attempts=attempts,
                fallback_used=fallback_used,
                wav=wav_info,
            )
        )
        segment_paths.append(wav_path)

    master_wav = output_dir / "master.wav"
    final_mp3 = output_dir / "final.mp3"
    assemble_wavs(segment_paths, master_wav)
    master_info = validate_wav(master_wav)
    export_mp3(master_wav, final_mp3)

    report = {
        "status": "PASS",
        "script": str(script_path),
        "approved_models": [PRIMARY_MODEL, FALLBACK_MODEL],
        "voices": HOST_VOICES,
        "audio_target": {
            "sample_rate": SAMPLE_RATE,
            "bit_depth": BIT_DEPTH,
            "channels": CHANNELS,
        },
        "segments": [asdict(r) for r in reports],
        "master_wav": asdict(master_info),
        "final_mp3": {
            "path": str(final_mp3),
            "bytes": final_mp3.stat().st_size,
            "sha256": sha256_file(final_mp3),
        },
    }
    (output_dir / "qc_report.json").write_text(
        json.dumps(report, indent=2) + "\n", encoding="utf-8"
    )
    return report


def validate_live(script_path: Path, output_dir: Path, required: int = 3) -> dict:
    output_dir.mkdir(parents=True, exist_ok=True)
    state_path = output_dir / "live_validation_status.json"
    consecutive = 0
    history: list[dict] = []
    run_number = 0

    while consecutive < required:
        run_number += 1
        run_dir = output_dir / f"run_{run_number:03d}"
        try:
            report = produce(script_path, run_dir)
            master = report["master_wav"]
            models = sorted({s["model"] for s in report["segments"]})
            attempts = sum(s["attempts"] for s in report["segments"])
            fallback = any(s["fallback_used"] for s in report["segments"])
            consecutive += 1
            entry = {
                "run_number": run_number,
                "success": True,
                "consecutive_successes": consecutive,
                "models_used": models,
                "wav_bytes": master["bytes"],
                "duration_seconds": master["duration_seconds"],
                "sha256": master["sha256"],
                "wav_validation": "PASS",
                "attempt_count": attempts,
                "fallback_used": fallback,
            }
        except Exception as exc:
            consecutive = 0
            entry = {
                "run_number": run_number,
                "success": False,
                "consecutive_successes": 0,
                "error": f"{type(exc).__name__}: {exc}",
            }

        history.append(entry)
        state = {
            "required_consecutive_successes": required,
            "consecutive_successes": consecutive,
            "validated": consecutive >= required,
            "history": history,
        }
        state_path.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")

        if not entry["success"]:
            raise RunnerError(
                "Live validation failed; consecutive count reset to 0. "
                "Fix the failure before starting a new validation sequence."
            )

    return state


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command", required=True)

    p_check = sub.add_parser("check-script")
    p_check.add_argument("script", type=Path)

    p_produce = sub.add_parser("produce")
    p_produce.add_argument("script", type=Path)
    p_produce.add_argument("output_dir", type=Path)

    p_live = sub.add_parser("validate-live")
    p_live.add_argument("script", type=Path)
    p_live.add_argument("output_dir", type=Path)
    p_live.add_argument("--required", type=int, default=3)

    args = parser.parse_args(argv)

    if args.command == "check-script":
        turns = parse_script(args.script.read_text(encoding="utf-8"))
        chunks = chunk_turns(turns)
        print(json.dumps({
            "turns": len(turns),
            "chunks": len(chunks),
            "chunk_words": [sum(t.words for t in c) for c in chunks],
        }, indent=2))
        return 0

    if args.command == "produce":
        print(json.dumps(produce(args.script, args.output_dir), indent=2))
        return 0

    if args.command == "validate-live":
        print(json.dumps(validate_live(args.script, args.output_dir, args.required), indent=2))
        return 0

    return 2


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RunnerError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
