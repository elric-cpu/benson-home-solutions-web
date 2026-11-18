from authored_chunk_adapter import build_render_plan


def test_four_authored_chunks(tmp_path):
    path = tmp_path / 'ep.md'
    chunk = 'HOST_A: ' + ('word ' * 400) + '\n'
    path.write_text(''.join('--- CHUNK %d ---\n%s' % (i, chunk) for i in range(1, 5)))
    plan = build_render_plan(path)
    assert len(plan['chunks']) == 4
    assert len(plan['prompts']) == 4
