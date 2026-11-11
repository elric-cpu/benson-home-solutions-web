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

1. Use the new private `distribution_qc.py` command below to bind independent
   ASR screening and mastering measurements to the **exact MP3 candidate**.
   A previously generated fidelity report for `final.mp3` is not evidence
   that `final_remastered.mp3` contains the same spoken words.
2. Have a human listen to the remastered candidate against the locked
   script, particularly names, dates, speaker transitions, and chunk joins.
3. Confirm the intended distribution route supports 24 kHz mono MP3.
4. Record mastering approval and rights clearance separately. EP002 remains
   `SCRIPT_LOCKED_RIGHTS_HOLD` until source-specific clearance is documented.

The mastering values are drawn from a public **technical recommendation**,
not a project-approved policy. `publication_eligible` stays false in every
generated report. This tool never contacts Gemini or publishes an episode.

Reference: https://podcasters.apple.com/support/893-audio-requirements


## Preferred end-to-end private QC (2026-11-11)

After a full locked-script render, run this on a **private** machine with
FFmpeg and the local ASR dependencies installed:

```bash
python -m pip install -r requirements-fidelity.txt
python distribution_qc.py /private/EP002_Locked_Script.md /private/EP002_render --remaster-if-needed --model medium.en --max-wer 0.05
```

This command verifies the original authored segments, master WAV and original
MP3 against the locked script and their SHA-256 hashes **before** considering
normalization. It independently measures the original MP3. If it already meets
the documented technical reference, it is not re-encoded. Otherwise, the
explicit opt-in flag allows `remaster.py` to produce
`final_remastered.mp3`, preserving `final.mp3` untouched.

**Critically:** after remastering, the new candidate is measured again and
independently transcribed against the locked script. The private
`distribution_qc_report.json` binds the **actual candidate filename
and SHA-256** to its mastering and ASR results. The report is committed
atomically and never overwrites an existing report. It is deliberately
nonpublishable even if all automated screens pass.

Without `--remaster-if-needed`, an out-of-range original MP3
is recorded as a failed technical screen; no new audio is generated.
Exit 0 = both automated screens passed, **release still held**.
Exit 1 = a candidate failed an automated screen.
Exit 2 = the verification could not be completed.
For a new run, use a new private render package; do not overwrite evidence.

No episode audio, scripts, source transcripts, or QC reports should be uploaded
to the public GitHub repository or public GitHub Actions artifacts. A human
must still listen against the locked script, approve the mastering profile,
verify the historical content, and document rights clearance.
