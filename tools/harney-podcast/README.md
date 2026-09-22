# Harney County History Podcast — Production Runner v2

This runner turns the project operating rules into release gates. It does **not** let a script jump directly to TTS or publishing.

## What v2 fixes

1. Enforces the 13-stage production state machine.
2. Repairs Gemini multi-speaker TTS using the current Google Gen AI SDK (`models.generate_content`).
3. Produces 24 kHz / 16-bit / mono lossless WAV masters and 128 kbps mono MP3 distribution files.
4. Applies two-pass FFmpeg loudness normalization and verifies loudness, true peak, format, runtime, and long silence.
5. Runs Gemini 3.5 Transcribe with speaker diarization and word timestamps, then compares ASR output with the locked script using WER, token similarity, and speaker-sequence checks.
6. Blocks TTS until claim check and rights clearance are explicitly complete.
7. Gates READY TO PUBLISH on teacher, visual, social, metadata, fidelity, and master-QC artifacts.
8. Generates Apple-compatible RSS structure with stable GUIDs, enclosure length/type, artwork, Atom self-link, and RFC-compliant publication dates.
9. Requires **three consecutive successful live validation runs for the exact runner code hash** before `publish` is allowed after a major runner update.
10. Supports Vertex AI / ADC as the preferred production authentication path; API-key mode is retained for development.

## Install

Python 3.11+ and FFmpeg/ffprobe are required.

```bash
cd tools/harney-podcast
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

Preferred production auth:

```bash
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT='your-project'
export GOOGLE_CLOUD_LOCATION='global'
gcloud auth application-default login
```

Development fallback:

```bash
export GEMINI_API_KEY='...'
```

Set publishing URLs before the final publish gate:

```bash
export HARNEY_PODCAST_BASE_URL='https://example.com/audio'
export HARNEY_PODCAST_SITE_URL='https://example.com/podcast'
export HARNEY_PODCAST_FEED_URL='https://example.com/podcast/feed.xml'
export HARNEY_PODCAST_ARTWORK_URL='https://example.com/podcast/artwork.jpg'
```

## Episode workflow

```bash
python harney_podcast_runner.py scaffold EP002
python harney_podcast_runner.py advance EP002 'SOURCE LOCK'
python harney_podcast_runner.py advance EP002 'RESEARCH'
python harney_podcast_runner.py advance EP002 'CLAIM CHECK'
python harney_podcast_runner.py advance EP002 'SCRIPT DRAFT'
python harney_podcast_runner.py advance EP002 'SCRIPT LOCK'
python harney_podcast_runner.py advance EP002 'RIGHTS CLEAR'
python harney_podcast_runner.py render EP002
python harney_podcast_runner.py status EP002
python harney_podcast_runner.py publish EP002
```

Every `advance` is sequential and prerequisite-gated. `render` automatically advances through TTS RENDER, AUDIO FIDELITY QC, and MASTER QC only after the corresponding checks pass. `publish` can advance through the package and ready gates only when all required assets are marked ready.

## Required markers

- `00 Intake/EPxxx_Intake.md`: `STATUS: COMPLETE`
- `01 Source Library/EPxxx_Source_Lock.md`: `STATUS: LOCKED`
- `02 Research & Claim Ledgers/EPxxx_Ledger.md`: `RESEARCH STATUS: COMPLETE` and `CLAIM CHECK: PASS`
- `08 Rights, Releases & Permissions/EPxxx_Rights_Clearance.md`: `STATUS: CLEARED`
- Teacher, visual, and social package files: `STATUS: READY`
- `06 Publishing Packages/EPxxx_Metadata.json`: `"ready": true` with non-empty title/description

## Locked script requirements

Filename: `EPxxx_Locked_Script.md`

The file must contain `## LOCKED SCRIPT`, 4–5 numbered chunk headers, and only `HOST_A:` / `HOST_B:` dialogue inside chunks. Each chunk must be 375–550 words. Host B must remain at or below 25% of dialogue words.

## Fidelity thresholds

Defaults are intentionally conservative and can be overridden with environment variables:

- WER <= 0.10
- normalized text similarity >= 0.92
- speaker-sequence error <= 0.20
- integrated loudness -16 LUFS ±1
- master true peak <= -1 dBTP (normalizer targets -1.5 dBTP)
- no detected silence longer than 8 seconds

The 18–22 minute runtime remains a **warning**, not a hard fail, because the editorial policy explicitly prohibits padding weak stories or mutilating strong ones just to hit a duration target.

## Major-version live validation

Run this three times after a major runner change:

```bash
python harney_podcast_runner.py live-smoke
python harney_podcast_runner.py live-smoke
python harney_podcast_runner.py live-smoke
```

Each smoke run performs a real two-speaker Gemini TTS request, transcribes the result with Gemini 3.5 Transcribe, and checks words plus speaker sequence. The counter is tied to the SHA-256 hash of the runner package; editing the runner resets validation to zero. GitHub's `podcast-live-validation.yml` performs the same three-run validation and publishes `release_validation.json` as an artifact for the exact runner hash.
