import sys,tempfile,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; sys.path.insert(0,str(ROOT))
import harney_podcast_runner as r
from podcast_pipeline.config import Paths,artifacts,PipelineError
from podcast_pipeline.state import scaffold,advance
from podcast_pipeline.script import preflight,normalized_words,distance

def good():
    a="word "*300; b="word "*75
    return "# Test\n## LOCKED SCRIPT\n"+"\n".join(f"--- CHUNK {i} ---\nHOST_A: {a}\nHOST_B: {b}" for i in range(1,5))
class T(unittest.TestCase):
    def setUp(self): self.t=tempfile.TemporaryDirectory(); self.p=Paths(Path(self.t.name)); self.p.ensure(); self.ep="EP001"; scaffold(self.p,self.ep)
    def tearDown(self): self.t.cleanup()
    def test_dirs(self): self.assertTrue(self.p.archive.exists())
    def test_preflight(self):
        a=artifacts(self.p,self.ep); a["script"].write_text(good()); self.assertTrue(preflight(a["script"])["pass"])
    def test_bad_chunks(self):
        a=artifacts(self.p,self.ep); a["script"].write_text("#x\n## LOCKED SCRIPT\n--- CHUNK 1 ---\nHOST_A: hi"); self.assertFalse(preflight(a["script"])["pass"])
    def test_state_gate(self):
        a=artifacts(self.p,self.ep); a["intake"].write_text("STATUS: COMPLETE\n"); a["source"].write_text("STATUS: LOCKED\n"); self.assertEqual(advance(self.p,self.ep,"SOURCE LOCK")["stage"],"SOURCE LOCK"); self.assertRaises(PipelineError,advance,self.p,self.ep,"CLAIM CHECK")
    def test_words(self): self.assertEqual(distance(normalized_words("HOST_A: Road bad"),normalized_words("spk_1: Road bad")),0)
if __name__=="__main__": unittest.main()
