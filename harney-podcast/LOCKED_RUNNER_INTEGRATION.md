# Locked episode audio integration

The production episode path must parse the full authored script with `locked_script.parse_file` and preserve its `--- CHUNK N ---` boundaries. The existing `runner.py` currently uses a different legacy segmentation algorithm. Its short `examples/live_probe.txt` tests TTS transport only and must not be represented as full-episode or publication validation.

Before releasing an episode, add audio-to-text fidelity checking, loudness and true-peak checks, atomic output handling, and explicit rights clearance. Keep EP002 on publication hold until these gates pass.
