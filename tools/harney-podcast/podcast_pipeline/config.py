from __future__ import annotations
import os, shutil, subprocess, json, hashlib
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

VERSION="2.0.0"
TTS_MODEL=os.getenv("HARNEY_TTS_MODEL","gemini-3.1-flash-tts-preview")
TTS_FALLBACK=os.getenv("HARNEY_TTS_FALLBACK_MODEL","gemini-2.5-flash-preview-tts")
ASR_MODEL=os.getenv("HARNEY_TRANSCRIBE_MODEL","gemini-3.5-transcribe")
VOICE_A=os.getenv("HARNEY_VOICE_HOST_A","Charon"); VOICE_B=os.getenv("HARNEY_VOICE_HOST_B","Puck")
RATE=24000; CHANNELS=1; WIDTH=2
TARGET_LUFS=float(os.getenv("HARNEY_TARGET_LUFS","-16")); TARGET_TP=float(os.getenv("HARNEY_TARGET_TRUE_PEAK","-1.5")); TARGET_LRA=11.0
MAX_WER=float(os.getenv("HARNEY_MAX_WER","0.10")); MIN_RATIO=float(os.getenv("HARNEY_MIN_TEXT_RATIO","0.92")); MAX_SPK_ERR=float(os.getenv("HARNEY_MAX_SPEAKER_SEQUENCE_ERROR","0.20")); MAX_SILENCE=float(os.getenv("HARNEY_MAX_LONG_SILENCE_SECONDS","8"))
LIVE_REQUIRED=3
STAGES=["INTAKE","SOURCE LOCK","RESEARCH","CLAIM CHECK","SCRIPT DRAFT","SCRIPT LOCK","RIGHTS CLEAR","TTS RENDER","AUDIO FIDELITY QC","MASTER QC","VISUAL/SCHOOL/SOCIAL PACKAGE","READY TO PUBLISH","PUBLISHED"]

class PipelineError(RuntimeError): pass

def now(): return datetime.now(timezone.utc).isoformat()
def load_json(p:Path, default=None): return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default
def write_json(p:Path,d:Any):
    p.parent.mkdir(parents=True,exist_ok=True); t=p.with_suffix(p.suffix+".tmp"); t.write_text(json.dumps(d,indent=2,ensure_ascii=False)+"\n",encoding="utf-8"); t.replace(p)
def sha256_file(path:Path):
    h=hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda:f.read(1024*1024),b""): h.update(block)
    return h.hexdigest()

def run(cmd:list[str],capture=False):
    try:
        return subprocess.run(cmd,check=True,text=True,stdout=subprocess.PIPE if capture else subprocess.DEVNULL,stderr=subprocess.PIPE if capture else subprocess.DEVNULL)
    except FileNotFoundError as e: raise PipelineError(f"Required executable not found: {cmd[0]}") from e
    except subprocess.CalledProcessError as e: raise PipelineError(f"Command failed: {' '.join(cmd)}\n{(e.stderr or e.stdout or '')[-4000:]}") from e
def require_media_tools():
    m=[x for x in ("ffmpeg","ffprobe") if shutil.which(x) is None]
    if m: raise PipelineError("Missing tools: "+", ".join(m))

@dataclass(frozen=True)
class Paths:
    root:Path
    @property
    def admin(self): return self.root/"00A Admin & Operating System"
    @property
    def intake(self): return self.root/"00 Intake"
    @property
    def sources(self): return self.root/"01 Source Library"
    @property
    def ledgers(self): return self.root/"02 Research & Claim Ledgers"
    @property
    def scripts(self): return self.root/"03 Scripts"
    @property
    def audio(self): return self.root/"04 Audio Masters"
    @property
    def video(self): return self.root/"05 YouTube & Video Masters"
    @property
    def publishing(self): return self.root/"06 Publishing Packages"
    @property
    def education(self): return self.root/"07 Education & Schools"
    @property
    def rights(self): return self.root/"08 Rights, Releases & Permissions"
    @property
    def social(self): return self.root/"09 Social Clips"
    @property
    def archive(self): return self.root/"10 Archive"
    @property
    def states(self): return self.admin/"state"
    @property
    def validation(self): return self.admin/"live_validation_record.json"
    @property
    def feed(self): return self.publishing/"podcast_feed.xml"\n    @property\n    def guid_registry(self): return self.admin/"published_guids.json"
    def ensure(self):
        for p in (self.admin,self.intake,self.sources,self.ledgers,self.scripts,self.audio,self.video,self.publishing,self.education,self.rights,self.social,self.archive,self.states): p.mkdir(parents=True,exist_ok=True)

def default_root(): return Path(os.getenv("HARNEY_DRIVE_ROOT",str(Path.home()/"Google Drive"/"Harney County History Podcast — MASTER"))).expanduser()
def artifacts(p:Paths,ep:str):
    return {"intake":p.intake/f"{ep}_Intake.md","source":p.sources/f"{ep}_Source_Lock.md","ledger":p.ledgers/f"{ep}_Ledger.md","draft":p.scripts/f"{ep}_Draft_Script.md","script":p.scripts/f"{ep}_Locked_Script.md","rights":p.rights/f"{ep}_Rights_Clearance.md","teacher":p.education/f"{ep}_Teacher_Sheet.md","visual":p.video/f"{ep}_Visual_Plan.md","social":p.social/f"{ep}_Social_Clips.md","metadata":p.publishing/f"{ep}_Metadata.json","state":p.states/f"{ep}.json","adir":p.audio/ep,"wav":p.audio/ep/f"{ep}_master.wav","mp3":p.publishing/f"{ep}.mp3","fidelity":p.audio/ep/f"{ep}_fidelity_qc.json","masterqc":p.audio/ep/f"{ep}_master_qc.json"}
