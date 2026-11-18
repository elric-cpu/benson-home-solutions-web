import pytest

from locked_script import LockedScriptError, parse_locked_script


def turn(speaker="HOST_A", count=200):
    return f"{speaker}: " + " ".join(["word"] * count)


def episode(chunks=4, words_a=200, words_b=200, header=True):
    preface = (
        '<div style="background:#722F37;color:#F5F1E8;">Brand</div>\n'
        '# EP099 — Test only\n**Editorial status:** locked\n'
        '## LOCKED SCRIPT\n\n'
    ) if header else ""
    return preface + "\n".join(
        f"--- CHUNK {n} ---\n\n"
        + turn("HOST_A", words_a) + "\n\n"
        + turn("HOST_B", words_b) + "\n"
        for n in range(1, chunks + 1)
    )


def test_branded_metadata_ignored_and_authored_chunks_preserved():
    source = episode(5)
    parsed = parse_locked_script(source)
    assert [c.number for c in parsed.chunks] == [1, 2, 3, 4, 5]
    assert [c.word_count for c in parsed.chunks] == [400] * 5
    assert len(parsed.sha256) == 64
    assert parsed.manifest()["publication_eligible"] is False
    assert parsed.spoken_text.startswith("HOST_A: word")
    assert "Editorial status" not in parsed.spoken_text


@pytest.mark.parametrize("count", [3, 6])
def test_wrong_chunk_count_rejected(count):
    with pytest.raises(LockedScriptError, match="4 or 5"):
        parse_locked_script(episode(count))


@pytest.mark.parametrize("a,b", [(100, 200), (300, 300)])
def test_chunk_word_bounds_rejected(a, b):
    with pytest.raises(LockedScriptError, match="375"):
        parse_locked_script(episode(words_a=a, words_b=b))


def test_missing_or_reordered_marker_rejected():
    source = episode().replace("--- CHUNK 2 ---", "--- CHUNK 3 ---")
    with pytest.raises(LockedScriptError, match="expected CHUNK 2"):
        parse_locked_script(source)


def test_unknown_speaker_rejected():
    source = episode().replace("HOST_B:", "NARRATOR:", 1)
    with pytest.raises(LockedScriptError, match="unknown speaker"):
        parse_locked_script(source)


def test_nonspoken_line_in_chunk_rejected():
    source = episode().replace("--- CHUNK 2 ---", "Production note\n--- CHUNK 2 ---")
    with pytest.raises(LockedScriptError, match="nonspoken"):
        parse_locked_script(source)


def test_placeholder_rejected():
    source = episode().replace("word", "TODO", 1)
    with pytest.raises(LockedScriptError, match="placeholder"):
        parse_locked_script(source)


def test_plain_turn_only_script_is_not_locked():
    with pytest.raises(LockedScriptError, match="4 or 5"):
        parse_locked_script("HOST_A: Hello\nHOST_B: World")
