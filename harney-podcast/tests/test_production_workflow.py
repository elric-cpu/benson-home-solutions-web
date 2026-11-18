"""Safety regression tests for the public-repository production workflow."""
from pathlib import Path


def test_public_workflow_is_preflight_only():
    workflow = (
        Path(__file__).resolve().parents[2]
        / ".github" / "workflows" / "harney-production.yml"
    ).read_text(encoding="utf-8")

    assert "workflow_dispatch:" in workflow
    assert "runner.py" in workflow and "check-script" in workflow
    assert "runner.py produce" not in workflow
    assert "GEMINI_API_KEY" not in workflow
    assert "2026-09-15-diaz" not in workflow
    assert "2026-09-18-camp-harney" not in workflow
    assert "candidate.is_relative_to(allowed)" in workflow
    assert "publication" in workflow.lower()
