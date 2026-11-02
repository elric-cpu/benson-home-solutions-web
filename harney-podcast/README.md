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

## Independent speech-to-script screening (2026-11-02)

`fidelity_qc.py` now provides **offline, independent ASR screening** of the
completed locked-script production package. It checks the original script SHA-256,
all segment WAV hashes and order, master WAV and distribution MP3 hashes, then
transcribes **every authored segment and the assembled MP3** with an unprimed
local faster-whisper model. It compares normalized spoken words with the locked
dialogue, reports word error rate and changed text, and detects reordered words
when the word inventory is otherwise unchanged. Speaker labels and nonspoken
metadata are excluded from the reference.

Run only on a **private machine** with the private Drive script and render
package; never commit them or upload ASR reports to public GitHub Actions:

    python -m pip install -r requirements-fidelity.txt
    python fidelity_qc.py /private/EP002_Locked_Script.md /private/EP002_render --model medium.en --max-wer 0.05

The first run downloads the model weights, so the initial installation requires
network access; transcription itself runs locally on CPU. For better recognition
quality, use a larger locally available model, allowing for slower processing.
The default 5% WER is a **screening threshold, not an approved delivery limit**.
The verifier writes `fidelity_report.json` inside the private package. Exit
code 0 means the automated ASR screen passed; 1 means detected mismatches;
2 means verification could not be completed. A passing screen still requires
a person to listen against the locked script, resolve discrepancies, approve
mastering targets, and confirm the episode-specific rights gate. **The report
always sets `publication_eligible: false`.**

The ASR model is independent of Gemini TTS but can itself misrecognize
names, dates, and local place names. The report is an audit aid, not a
replacement for listening. Do not prime the recognizer with the reference
script, since that would invalidate the independent comparison.

No full EP002 audio has been rendered or checked by this new component.
