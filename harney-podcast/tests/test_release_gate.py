"""Offline release gate regression tests; no private media or external services."""
import hashlib
import json
import tempfile
import unittest
from pathlib import Path

from release_gate import check_release


class ReleaseGateTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.package = Path(self.temp.name)
        self.audio = self.package / "final.mp3"
        self.audio.write_bytes(b"test audio bytes")
        self.digest = hashlib.sha256(self.audio.read_bytes()).hexdigest()
        self.script_hash = "a" * 64
        self.qc = {
            "status": "DISTRIBUTION_TECHNICAL_SCREEN_PASS_RELEASE_HOLD",
            "candidate_technical_pass": True,
            "candidate_asr_pass": True,
            "publication_eligible": False,
            "candidate_filename": "final.mp3",
            "candidate_sha256": self.digest,
            "script_sha256": self.script_hash,
        }
        self.record = {
            "candidate_sha256": self.digest,
            "script_sha256": self.script_hash,
            "full_listening_approved": True,
            "historical_accuracy_approved": True,
            "mastering_policy_approved": True,
            "distribution_format_approved": True,
            "source_rights_approved": True,
            "reviewer": "Human reviewer",
            "approved_at": "2026-11-18T09:00:00-08:00",
            "rights_evidence_reference": "private-drive-record-id",
            "distribution_route": "RSS hosting",
            "release_decision": "APPROVED",
        }
        self.acceptance = self.package / "private_acceptance.json"

    def check(self):
        (self.package / "distribution_qc_report.json").write_text(json.dumps(self.qc))
        self.acceptance.write_text(json.dumps(self.record))
        return check_release(self.package, self.acceptance)

    def test_fully_approved_hash_bound_record(self):
        self.assertEqual(self.check(), [])

    def test_changed_audio_is_held(self):
        self.audio.write_bytes(b"changed")
        self.assertTrue(any("mismatch" in error for error in self.check()))

    def test_rights_hold_is_enforced(self):
        self.record["source_rights_approved"] = False
        self.assertTrue(any("source_rights_approved" in error for error in self.check()))

    def test_mismatched_script_is_held(self):
        self.record["script_sha256"] = "b" * 64
        self.assertTrue(any("script SHA-256" in error for error in self.check()))

    def test_qc_failure_is_held(self):
        self.qc["candidate_asr_pass"] = False
        self.assertTrue(any("candidate_asr_pass" in error for error in self.check()))

    def test_missing_acceptance_is_held(self):
        self.assertTrue(check_release(self.package, self.acceptance))

    def test_invalid_candidate_path_is_held(self):
        self.qc["candidate_filename"] = "../final.mp3"
        self.assertTrue(any("filename" in error for error in self.check()))


if __name__ == "__main__":
    unittest.main()
