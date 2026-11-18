from authored_chunk_adapter import build_render_plan


def test_adapter_is_callable():
    assert callable(build_render_plan)
