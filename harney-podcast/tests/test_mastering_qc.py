"""Technical mastering thresholds do not override the episode release hold."""
import math

import pytest

from mastering_qc import MasteringQCError, evaluate_mastering


def measurements(lufs=-16.0, peak=-1.5, lra=5.0):
    return {
        "integrated_lufs": lufs,
        "true_peak_dbtp": peak,
        "loudness_range_lu": lra,
        "measurement_engine": "ffmpeg loudnorm input analysis",
        "normalization_applied": False,
    }


@pytest.mark.parametrize("lufs,peak", [
    (-16.0, -1.5), (-17.0, -1.0), (-15.0, -2.0),
])
def test_reference_boundaries_pass_without_releasing(lufs, peak):
    result = evaluate_mastering(measurements(lufs, peak))
    assert result["technical_pass"] is True
    assert result["publication_eligible"] is False
    assert result["project_profile_approved"] is False
    assert result["human_mastering_approval_required"] is True


@pytest.mark.parametrize("lufs,peak", [
    (-17.01, -1.5), (-14.99, -1.5), (-16.0, -0.99),
    (-20.0, 0.0),
])
def test_out_of_range_fails_closed(lufs, peak):
    result = evaluate_mastering(measurements(lufs, peak))
    assert result["technical_pass"] is False
    assert result["issues"]
    assert result["publication_eligible"] is False


@pytest.mark.parametrize("field,value", [
    ("integrated_lufs", float("nan")),
    ("true_peak_dbtp", float("inf")),
    ("loudness_range_lu", -0.1),
    ("integrated_lufs", "-16.0"),
    ("true_peak_dbtp", True),
])
def test_invalid_metrics_are_rejected(field, value):
    data = measurements()
    data[field] = value
    with pytest.raises(MasteringQCError):
        evaluate_mastering(data)


def test_rejects_missing_measurement_provenance():
    data = measurements()
    data.pop("measurement_engine")
    with pytest.raises(MasteringQCError):
        evaluate_mastering(data)


def test_rejects_claimed_normalized_measurement():
    data = measurements()
    data["normalization_applied"] = True
    with pytest.raises(MasteringQCError):
        evaluate_mastering(data)
