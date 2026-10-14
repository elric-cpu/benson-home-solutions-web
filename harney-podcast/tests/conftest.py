import sys
from pathlib import Path

# Ensure the production runner module is importable when pytest is launched
# from GitHub Actions or another environment that does not prepend cwd.
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
