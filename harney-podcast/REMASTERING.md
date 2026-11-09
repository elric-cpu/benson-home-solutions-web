# Private corrective mastering (opt-in)

This tool is an **optional post-render correction**, not part of the production
runner and **not a publication approval**. Use it only on a private machine,
after a complete locked-script render. Do not upload EP002 audio, transcripts,
source recordings, or ASR reports to the public repository or public Actions.

## Command

From `harney-podcast/`, with FFmpeg installed:

```bash
python remaster.py /private/EP002_render/final.mp3 /private/EP002_render/final_remastered.mp3 > /private/EP002_render/remaster_report.json
```

It runs FFmpeg's **two-pass** `loudnorm` filter, targeting -16 LUFS with
-1.5 dBTP processing headroom and LRA 11 LU. The LRA value is a filter
parameter, **not an approved LRA release ceiling**. It retains the original
MP3 unchanged, encodes a new 24 kHz mono 128 kbps MP3, and remeasures the
**actual encoded output**. It accepts that output only if it meets the
existing nonpublishing technical reference (-16 LUFS +/-1, peak <= -1 dBTP).
It does not assume the filter's internal output measurements equal final
post-MP3 measurements.

The destination must **not exist**. Temporary files are cleaned on failure.
A passing candidate is committed with a no-overwrite hard link. If the
post-encode result is still out of range, the candidate is discarded and
the original remains untouched. Exit 0 = candidate created and measured
against the reference; exit 2 = correction failed. The JSON stdout report
contains SHA-256 hashes and post-encode measurements; store it privately.
If the command fails, the redirected report may be empty; inspect stderr.

## Required follow-up

1. Run `fidelity_qc.py` again on the **actual distribution candidate**.
   The current verifier is designed around the original `final.mp3` and
   package hashes; a separately remastered MP3 is **not automatically
   incorporated into that report**. Do not treat the original fidelity
   report as verification of the remastered file.
2. Have a human listen to the remastered candidate against the locked
   script, particularly names, dates, speaker transitions, and chunk joins.
3. Confirm the intended distribution route supports 24 kHz mono MP3.
4. Record mastering approval and rights clearance separately. EP002 remains
   `SCRIPT_LOCKED_RIGHTS_HOLD` until source-specific clearance is documented.

The mastering values are drawn from a public **technical recommendation**,
not a project-approved policy. `publication_eligible` stays false in every
generated report. This tool never contacts Gemini or publishes an episode.

Reference: https://podcasters.apple.com/support/893-audio-requirements
