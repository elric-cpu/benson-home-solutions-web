from __future__ import annotations
import hashlib, os
from pathlib import Path
from .config import *

def code_hash():
    base=Path(__file__).resolve().parents[1]; h=hashlib.sha256()
    for p in sorted([base/"harney_podcast_runner.py",base/"requirements.txt",*list((base/"podcast_pipeline").glob("*.py"))]): h.update(str(p.relative_to(base)).encode()); h.update(p.read_bytes())
    return h.hexdigest()
def record(paths:Paths,passed:bool,label="LIVE-SMOKE"):
    r=load_json(paths.validation,{}) or {}; ch=code_hash()
    if r.get("runner_version")!=VERSION or r.get("code_hash")!=ch: r={"runner_version":VERSION,"code_hash":ch,"consecutive_successes":0,"history":[]}
    r["consecutive_successes"]=r.get("consecutive_successes",0)+1 if passed else 0; r.setdefault("history",[]).append({"episode_id":label,"pass":passed,"at":now()}); r["history"]=r["history"][-50:]; r["production_ready"]=r["consecutive_successes"]>=LIVE_REQUIRED; write_json(paths.validation,r); return r
def status(paths:Paths):
    ch=code_hash(); local=load_json(paths.validation,{}) or {}
    if local.get("runner_version")==VERSION and local.get("code_hash")==ch and local.get("consecutive_successes",0)>=LIVE_REQUIRED: return {**local,"required":LIVE_REQUIRED,"source":"local-drive"}
    rf=Path(__file__).resolve().parents[1]/"release_validation.json"; ci=load_json(rf,{}) or {}
    if ci.get("runner_version")==VERSION and ci.get("code_hash")==ch and ci.get("consecutive_successes",0)>=LIVE_REQUIRED and ci.get("production_ready") is True: return {**ci,"required":LIVE_REQUIRED,"source":"ci-release-validation"}
    return {"runner_version":VERSION,"code_hash":ch,"consecutive_successes":0,"required":LIVE_REQUIRED,"production_ready":False,"source":"unvalidated"}
