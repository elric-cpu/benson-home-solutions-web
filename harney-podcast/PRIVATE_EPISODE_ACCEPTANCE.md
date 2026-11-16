# Private full-episode acceptance protocol (2026-11-16)

This document is a **procedure**, not evidence that EP002 has been rendered, reviewed, cleared, or published. The repository is public: **never commit private scripts, oral-history transcripts, audio, rights correspondence, or QC reports**.

## 1. Preflight (private workstation only)

- Retrieve the locked script and source-specific rights register from the private Google Drive master. Verify the script is the editorially approved version; do not change historical claims to satisfy TTS.
- Confirm exactly 4–5 authored chunks, each 375–550 spoken words, with only HOST_A and HOST_B speaker labels.
- Run `python runner.py check-script /private/EP002_Locked_Script.md`; record exit status and script SHA-256 in private production notes.
- Confirm the intended render directory does **not** already exist. Never overwrite a previous package. Use a fresh episode/run-specific directory.
- Confirm API credentials are injected as environment secrets and never logged. Confirm adequate disk space and local FFmpeg.
- Record the source IDs, oral-history citations, script revision, production date, and responsible reviewer in the private episode record.

## 2. Render (private workstation only)

```bash
python runner.py produce /private/EP002_Locked_Script.md /private/EP002_render_YYYYMMDD
```

The production script uses authored chunk boundaries (do not use `--probe`). Confirm all expected segment WAV files, the master WAV, final.mp3, manifest, and audio QC report exist. Check segment count/order, sample format, durations, and hashes. A failed or partial render is not a distribution candidate. Never upload it as a public GitHub Actions artifact.

## 3. Independent final-file screen

Install the private ASR dependencies according to `requirements-fidelity.txt`. On the same secured workstation:

```bash
python distribution_qc.py /private/EP002_Locked_Script.md /private/EP002_render_YYYYMMDD --model medium.en --max-wer 0.05
```

Use `--remaster-if-needed` only after explicitly authorizing corrective processing. It can create `final_remastered.mp3` while preserving `final.mp3`. Run the command **once per new package**: it writes no-overwrite evidence (`fidelity_report.json` and `distribution_qc_report.json`). For a repeat, use a new isolated copy/run and preserve the original evidence.

Inspect `distribution_qc_report.json`: require `candidate_technical_pass=true` and `candidate_asr_pass=true`. Verify `candidate_filename`, `candidate_sha256`, script hash, original MP3 hash, loudness and true peak. These are automated **screening** results, not authorization to publish. The -16 LUFS +/-1 and <= -1 dBTP values are an external technical reference, not yet a formally approved project mastering policy. The 5% WER default is a screening tolerance, not permission to omit or alter historical words.

## 4. Human acceptance (record in private Drive)

A named reviewer must listen to the **exact hash-bound candidate MP3** from start to finish against the locked script. Record timestamped discrepancies and their disposition, with special attention to names, dates, quotations, family relationships, place names, speaker changes, omissions, duplicate phrases, abrupt joins, clipping, silences, pronunciation, and background artifacts. Independently review historical statements against the cited archive. Corrections require a new render and a new QC evidence set, not editing an already-accepted candidate in place.

Record a project mastering decision and check the intended distribution route's codec/sample-rate/channel requirements. RSS-compatible export settings are not necessarily compatible with direct subscriber-upload requirements.

## 5. Rights and release decision

For each source used, record the rights holder, the precise permitted use (including reproduction/public distribution and commercial use if relevant), permission evidence or applicable legal basis, and reviewer decision. **EP002 remains on publication hold unless its source-specific rights requirement is resolved.** Do not equate private research ingestion with public reproduction permission.

Only a human release owner may sign off on: (a) historical accuracy, (b) listening, (c) mastering, (d) route format, (e) source-specific rights, and (f) exact candidate SHA-256. Keep the signed checklist and source evidence in the private Drive master. Never infer publication approval from `publication_eligible: false` reports.

## 6. Archive and publication

Archive original locked script, source index, original WAVs, original MP3, any remastered MP3, immutable manifests, all QC reports, reviewer notes, rights decision, and signed release record together in the existing episode folder in the Drive master. Do not create a parallel source library. Publish only after the release decision, through an authenticated distribution channel. Record the real platform URL and date after actual publication; never invent them.

## Failure states

- Script or hash mismatch: stop; preserve evidence; investigate.
- Missing chunk, failed ASR, or mastering failure: hold; correct and rerun in a fresh package.
- Rights uncertain or absent: private archival/research use only; publication hold.
- No human listening or no signed release decision: publication hold.
- Connector, model, or API unavailable: record blocked step; do not claim validation.
