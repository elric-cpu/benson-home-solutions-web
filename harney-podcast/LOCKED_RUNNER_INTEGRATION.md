# Locked episode audio integration — current state

The production path in `runner.py` now calls `authored_chunk_adapter.build_render_plan`, which validates full scripts through `locked_script.parse_file` and preserves their original `--- CHUNK N ---` boundaries. Production scripts require 4–5 authored chunks of 375–550 spoken words each. Legacy turn-only probes require `--probe` and remain explicitly nonpublishable.

The CLI preflight word counter accepts the validated turn format, and the automation workflow runs `check-script examples/live_probe.txt --probe`. Regression tests cover both production and probe preflights.

**This is format/transport integration, not an audio-release signoff.** The historical 3/3 Gemini result exercised the short probe, not a five-chunk episode. `AUDIO_CONTAINER_PASS_FIDELITY_UNVERIFIED` is not a publication approval.

## Remaining gates

1. Validate an actual locked episode script from the Drive master, preserving its SHA-256 and the claim-ledger revision.
2. Add independent speech-to-script fidelity verification for each segment and the assembled episode; flag omissions, insertions, substitutions, and order changes.
3. Measure integrated loudness and true peak; define and enforce distribution targets.
4. Write outputs atomically, and reject or quarantine partial renders and failed QC artifacts.
5. Obtain explicit source/asset-specific reproduction permission before public distribution, including the Harney County Library material used in EP002.
6. Perform a complete 4–5-chunk end-to-end validation with saved reports and human editorial review.

**EP002 status: SCRIPT_LOCKED_RIGHTS_HOLD.** No automated publication is authorized.
