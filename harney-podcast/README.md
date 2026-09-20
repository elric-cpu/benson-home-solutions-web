# Harney County History Podcast — Production Automation

## Validation status

**Production TTS path validated: 3/3 consecutive real Gemini generations PASS on 2026-09-20.**

All three runs used `gemini-3.1-flash-tts-preview`, passed WAV QC, required one attempt, and did not use fallback. The complete validation archive is preserved in Google Drive under `00A Admin & Operating System/Gemini TTS Validation Evidence`.

GitHub Actions run: https://github.com/elric-cpu/benson-home-solutions-web/actions/runs/35543373426

This branch contains the deterministic production path for the Harney County History Podcast.

## Locked production rules

- Input is a locked two-host script using only `HOST_A:` and `HOST_B:`.
- Host A voice: **Charon**.
- Host B voice: **Puck**.
- Primary TTS model: `gemini-3.1-flash-tts-preview`.
- Only fallback: `gemini-2.5-flash-preview-tts`.
- No Pro TTS model is permitted.
- Audio master: 24 kHz, 16-bit, mono WAV.
- Final distribution export: MP3.
- Every WAV is checked for RIFF/WAVE structure, sample rate, channel count, bit depth, nonzero duration, and SHA-256.
- FFmpeg performs deterministic segment assembly and final MP3 encoding.
- A failed live validation run resets the consecutive-success count to zero.

## Commands

Install:

    python -m pip install -r requirements.txt

Validate a script without calling Gemini:

    python runner.py check-script examples/live_probe.txt

Produce one real package:

    GEMINI_API_KEY=... python runner.py produce examples/live_probe.txt out/one

Run the official live validation:

    GEMINI_API_KEY=... python runner.py validate-live examples/live_probe.txt validation/live

The official validation is complete only when `validation/live/live_validation_status.json` reports three consecutive successful real generations.

## GitHub Actions

The workflow in `.github/workflows/harney-podcast.yml` runs unit tests on changes to this automation branch.

Live validation is intentionally gated. It runs only when a commit message contains `[live-validate]`. The repository must have an Actions secret named `GEMINI_API_KEY`. The key is never printed by the runner.

After the secret is configured, update `harney-podcast/validation/TRIGGER` and commit with a message containing `[live-validate]`. The workflow uploads the complete validation output as an Actions artifact.

## Spotify

The connected Spotify integration is used for verification/discovery only. Publishing remains a Spotify for Creators action unless an authenticated Creator upload API becomes available. Never fabricate a publication URL.

## Google Drive

The Drive master remains the archival system of record for source material, scripts, audio masters, publishing packages, education material, and rights/permissions. Generated masters should be copied into the corresponding episode folder only after QC passes.

## Security

Do not hard-code `GEMINI_API_KEY`. Do not print it. Do not commit it. Rotate any key that has previously been pasted into chat after the pipeline is stable.
