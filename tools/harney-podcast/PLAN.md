# Production hardening plan — September 22, 2026

This change set converts every non-green item in the September 22 system report into an implemented release gate.

| Previously non-green | Correction in v2 | Verification |
|---|---|---|
| School/visual layer | Teacher sheet, visual plan, and three social-clip artifacts are scaffolded and must each be `STATUS: READY` before package release. | Unit-gated state machine + publish prerequisite report |
| Drive/state machine | All canonical `00`–`10` directories plus per-episode machine-readable state history; transitions are sequential and prerequisite-gated. | Unit tests reject skipped transitions |
| Gemini TTS | Current `google-genai` `models.generate_content` multi-speaker configuration; Charon/Puck; 3.1 primary and 2.5 fallback; raw PCM wrapped as 24 kHz mono WAV. | Live TTS→ASR smoke workflow |
| Audio assembly | Re-encode concat to canonical PCM, two-pass `loudnorm`, 24 kHz/16-bit/mono master, 128 kbps MP3, ffprobe/loudness/silence checks. | Local FFmpeg round-trip + CI availability check |
| Script fidelity/ASR | Gemini 3.5 Transcribe verbatim mode with diarization/timestamps; WER, token similarity, and speaker-sequence gates. | Live smoke + per-episode fidelity JSON |
| Rights clearance | TTS is blocked until `EPxxx_Rights_Clearance.md` says `STATUS: CLEARED`. | State transition gate |
| Automated publishing | RSS 2.0 + iTunes/Atom metadata, immutable GUID, enclosure length/type, public URL validation, artwork, RFC date formatting. | XML reparse + publish gates |
| Production readiness | Exact-runner-hash validation counter; three consecutive successful live TTS→ASR validations required before publish. | GitHub live-validation workflow / local live-smoke |

## Research basis

- Google Gemini TTS: current multi-speaker `gemini-3.1-flash-tts-preview`, two-speaker mapping, raw 24 kHz PCM output.
- Google Gemini 3.5 Transcribe: non-streaming transcription, diarization, and word timestamps for files under the documented diarization duration limit.
- Apple Podcasts RSS requirements: public feed/media, stable GUIDs, enclosure URL/length/type, RSS 2.0, artwork, and RFC-compliant dates.
- FFmpeg/ITU-style loudness measurement: target -16 LUFS integrated, with the normalizer set to -1.5 dBTP to preserve headroom before lossy MP3 encoding.
