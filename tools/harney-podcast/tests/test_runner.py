import sys,tempfile,threading,unittest
import xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; sys.path.insert(0,str(ROOT))
import harney_podcast_runner as r
from podcast_pipeline.config import Paths,artifacts,PipelineError,sha256_file,write_json
from podcast_pipeline.state import scaffold,advance,gate_report
from podcast_pipeline.script import preflight,normalized_words,distance
from podcast_pipeline.gemini_io import retry_delay
from podcast_pipeline.publish import public,_find_episode,ITUNES

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
    def test_state_transition_is_serialized(self):
        a=artifacts(self.p,self.ep); a["intake"].write_text("STATUS: COMPLETE\n"); a["source"].write_text("STATUS: LOCKED\n")
        errors=[]
        def go():
            try: advance(self.p,self.ep,"SOURCE LOCK","thread")
            except Exception as e: errors.append(e)
        ts=[threading.Thread(target=go) for _ in range(2)]
        [x.start() for x in ts]; [x.join() for x in ts]
        self.assertFalse(errors); st=r.current(self.p,self.ep); self.assertEqual(st["stage"],"SOURCE LOCK"); self.assertEqual(sum(x["stage"]=="SOURCE LOCK" for x in st["history"]),1)
    def test_words(self): self.assertEqual(distance(normalized_words("HOST_A: Road bad"),normalized_words("spk_1: Road bad")),0)
    def test_retry_delay(self):
        class E(Exception): status_code=429
        self.assertAlmostEqual(retry_delay(E("Please retry in 37.1s"),0),39.1)
    def test_ready_gate_rejects_changed_mp3(self):
        a=artifacts(self.p,self.ep)
        a["intake"].write_text("STATUS: COMPLETE\n"); a["source"].write_text("STATUS: LOCKED\n"); a["ledger"].write_text("RESEARCH STATUS: COMPLETE\nCLAIM CHECK: PASS\n")
        a["script"].write_text(good()); a["rights"].write_text("STATUS: CLEARED\n"); a["teacher"].write_text("STATUS: READY\n"); a["visual"].write_text("STATUS: READY\n"); a["social"].write_text("STATUS: READY\n")
        a["wav"].parent.mkdir(parents=True,exist_ok=True); a["wav"].write_bytes(b"wav"); a["mp3"].write_bytes(b"approved-mp3")
        write_json(a["fidelity"],{"pass":True}); write_json(a["masterqc"],{"pass":True,"mp3":{"sha256":sha256_file(a["mp3"])}}); write_json(a["metadata"],{"ready":True,"title":"T","description":"D","guid":"custom-guid"})
        self.assertTrue(gate_report(self.p,self.ep,"READY TO PUBLISH")["pass"])
        a["mp3"].write_bytes(b"changed")
        self.assertFalse(gate_report(self.p,self.ep,"READY TO PUBLISH")["pass"])
    def test_private_publish_hosts_rejected(self):
        self.assertFalse(public("http://127.0.0.1/audio.mp3")); self.assertFalse(public("http://localhost/audio.mp3")); self.assertFalse(public("http://10.0.0.4/audio.mp3")); self.assertTrue(public("https://8.8.8.8/audio.mp3"))
    def test_episode_number_stabilizes_custom_guid(self):
        ch=ET.Element("channel"); it=ET.SubElement(ch,"item"); ET.SubElement(it,"guid").text="old-custom-guid"; ET.SubElement(it,f"{{{ITUNES}}}episode").text="1"
        found=_find_episode(ch,"EP001","new-custom-guid"); self.assertIs(found,it)
if __name__=="__main__": unittest.main()
