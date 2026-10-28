# Harney County History Podcast — Production Automation

## Validation status

**TTS transport probe validated: 3/3 consecutive real Gemini generations PASS on 2026-09-20. This was not a locked full-episode or publication validation.**

All three runs used `gemini-3.1-flash-tts-preview`, passed WAV QC, required one attempt, and did not use fallback. The complete validation archive is preserved in Google Drive under `00A Admin & Operating System/Gemini TTS Validation Evidence`.

GitHub Actions run: https://github.com/elric-cpu/benson-home-solutions-web/actions/runs/35543373426

This branch contains the deterministic production path for the Harney County History Podcast.

## Locked production rules

- Production input is a locked two-host script with 4–5 authored `--- CHUNK N ---` boundaries, each containing 375–550 spoken words and only `HOST_A:` / `HOST_B:` turns. Probe input may be plain turns but requires `--probe`.
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

    python runner.py check-script examples/live_probe.txt --probe

Validate a production locked script (does not call Gemini):

    python runner.py check-script path/to/EP002_Locked_Script.md

A production render requires the same authored-chunk format, but remains nonpublishable until independent fidelity, audio QC, and rights gates pass.

Produce one real package:

    GEMINI_API_KEY=... python runner.py produce examples/live_probe.txt out/one --probe

Run the official live validation:

    GEMINI_API_KEY=... python runner.py validate-live examples/live_probe.txt validation/live

The probe validation is complete only when `validation/live/live_validation_status.json` reports three consecutive successful real generations. A separate full-episode test is still required. Neither check establishes script-to-audio fidelity, loudness/true-peak compliance, rights clearance, or permission to publish.

## GitHub Actions

The workflow in `.github/workflows/harney-podcast.yml` runs unit tests on changes to this automation branch.

Live validation is intentionally gated. It runs only when a commit message contains `[live-validate]`. The repository must have an Actions secret named `GEMINI_API_KEY`. The key is never printed by the runner.

After the secret is configured, update `harney-podcast/validation/TRIGGER` and commit with a message containing `[live-validate]`. The workflow uploads the complete validation output as an Actions artifact.

## Audio QC and public-repository safety (2026-10-28)

The runner now measures the **final MP3** with FFmpeg's read-only loudnorm
analysis pass. Its QC report includes integrated LUFS, true peak (dBTP),
loudness range (LU), and explicit flags showing that no mastering target or
script-to-audio fidelity gate has been approved. Measurement is **not**
normalization, a pass against a distribution standard, or publication approval.
A corrupt or unmeasurable MP3 fails the render. Output files are now staged in a temporary sibling directory and moved into place only after container and measurement QC complete. Failed renders clean up their staging directory, and existing output packages are not overwritten.

The public-repository workflow `.github/workflows/harney-production.yml` is
now a **manual locked-script format preflight only**. It no longer attempts
to render the old Diaz and Camp Harney turn-only scripts, requires no API key,
and produces no public audio artifact. Use its `script_path` input only for
nonconfidential scripts already in this repository, relative to
`harney-podcast/` (for example `episodes/example/script_locked.md`).
**Do not commit EP002's private or rights-held script, source transcripts,
or audio to this public repository.** Full episode rendering must use a
separately secured environment after the editorial and rights checks.

Outstanding: define and approve delivery loudness limits, implement independent
speech-to-script fidelity verification, extend atomic output handling with failure-evidence quarantine,
run a complete five-chunk episode test, and resolve the EP002 rights hold.
## Spotify

The connected Spotify integration is used for verification/discovery only. Publishing remains a Spotify for Creators action unless an authenticated Creator upload API becomes available. Never fabricate a publication URL.

## Google Drive

The Drive master remains the archival system of record for source material, scripts, audio masters, publishing packages, education material, and rights/permissions. Generated masters should be copied into the corresponding episode folder only after QC passes.

## Security

Do not hard-code `GEMINI_API_KEY`. Do not print it. Do not commit it. Rotate any key that has previously been pasted into chat after the pipeline is stable.
