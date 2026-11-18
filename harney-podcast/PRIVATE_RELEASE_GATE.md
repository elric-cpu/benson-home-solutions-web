# Private release gate — 2026-11-18

The offline `release_gate.py` validates a **human-created private acceptance JSON** against the exact MP3 identified by `distribution_qc_report.json`. It never publishes audio and never creates or infers approvals.

After successful `distribution_qc.py`, the release owner must review the entire candidate, historical sourcing, project mastering policy, actual delivery format, and source-specific reproduction/publication rights. Store the acceptance record **only in the private Drive episode folder**, not this public repository.

Example structure (placeholder values; **not** an approval):

```json
{
  "candidate_sha256": "REPLACE_WITH_QC_CANDIDATE_HASH",
  "script_sha256": "REPLACE_WITH_LOCKED_SCRIPT_HASH",
  "full_listening_approved": false,
  "historical_accuracy_approved": false,
  "mastering_policy_approved": false,
  "distribution_format_approved": false,
  "source_rights_approved": false,
  "reviewer": "",
  "approved_at": "",
  "rights_evidence_reference": "",
  "distribution_route": "",
  "release_decision": "HOLD"
}
```

Once actual evidence supports every decision, the human reviewer can update the private record and run:

```bash
python release_gate.py /private/EP002_render_YYYYMMDD /private/EP002_acceptance.json
```

Exit 0 means the **record and candidate hashes are consistent and all required human decisions are explicitly present**. It does not independently prove that rights exist, historical claims are accurate, or the human actually listened. The responsible human must verify the underlying evidence. Exit 1 means HOLD. Publication remains a separate authenticated manual action.

**EP002 remains SCRIPT_LOCKED_RIGHTS_HOLD** until actual permission evidence and the other approvals exist. Never populate approval flags merely to make a test pass.
