from __future__ import annotations
import os, re, time
from contextlib import contextmanager
from .config import *
from .script import preflight

def marker(path,key,accepted):
    if not path.exists(): return False
    m=re.search(rf"(?im)^\s*{re.escape(key)}\s*:\s*([^\n]+)$",path.read_text(encoding="utf-8")); return bool(m and m.group(1).strip().upper() in accepted)

def scaffold(p:Paths,ep:str):
    a=artifacts(p,ep); templates={
      "intake":f"# {ep} Intake\n\nSTATUS: DRAFT\n\n## Episode assignment\n## Primary oral histories\n## Notes\n",
      "source":f"# {ep} Source Lock\n\nSTATUS: DRAFT\n\n## Full sources read\n## Partial/inaccessible sources\n## Source limitations\n",
      "ledger":f"# {ep} Claim Ledger\n\nRESEARCH STATUS: DRAFT\nCLAIM CHECK: NOT READY\n\n| Claim | Class | Source | Locator | Confidence | Conflict/limits |\n|---|---|---|---|---|---|\n| | DOCUMENTED FACT | | | | |\n",
      "rights":f"# {ep} Rights Clearance\n\nSTATUS: PENDING\n\n## Assets requiring permission\n## Public-domain/fair-use basis\n## Releases\n## Final clearance decision\n",
      "teacher":f"# {ep} Teacher Sheet\n\nSTATUS: DRAFT\n\n## Summary\n## Timeline\n## Map\n## Vocabulary\n## Discussion questions\n## Inquiry activity\n## Oregon standards alignment\n",
      "visual":f"# {ep} Visual Plan\n\nSTATUS: DRAFT\n\n## Shot/source list\n## Maps\n## Archival assets\n## Rights notes\n## Then-and-now locations\n",
      "social":f"# {ep} Social Clips\n\nSTATUS: DRAFT\n\n## I had no idea this happened here\n## You know this name\n## Documented blue-collar/funny moment\n"}
    for k,v in templates.items():
        if not a[k].exists(): a[k].parent.mkdir(parents=True,exist_ok=True); a[k].write_text(v,encoding="utf-8")
    if not a["metadata"].exists(): write_json(a["metadata"],{"episode_id":ep,"title":"","description":"","guid":f"urn:harney-county-history:{ep.lower()}","ready":False})
    if not a["state"].exists(): write_json(a["state"],{"episode_id":ep,"stage":"INTAKE","history":[{"stage":"INTAKE","at":now(),"actor":"scaffold"}],"runner_version":VERSION})

def current(p,ep):
    a=artifacts(p,ep); s=load_json(a["state"])
    if s is None: scaffold(p,ep); s=load_json(a["state"])
    return s

@contextmanager
def transition_lock(p:Paths,ep:str,timeout=60,stale=600):
    lock=p.states/f".{ep}.lock"; start=time.monotonic(); fd=None
    while fd is None:
        try: fd=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY); os.write(fd,f"{os.getpid()} {now()}\n".encode())
        except FileExistsError:
            try:
                if time.time()-lock.stat().st_mtime>stale: lock.unlink(missing_ok=True); continue
            except FileNotFoundError: continue
            if time.monotonic()-start>timeout: raise PipelineError(f"Timed out waiting for state lock: {lock}")
            time.sleep(.1)
    try: yield
    finally:
        if fd is not None: os.close(fd)
        lock.unlink(missing_ok=True)

def gate_report(p:Paths,ep,target):
    a=artifacts(p,ep); i=STAGES.index(target); c=[]
    def ck(n,o,d): c.append({"name":n,"ok":bool(o),"detail":str(d)})
    if i>=1: ck("intake complete",marker(a["intake"],"STATUS",{"COMPLETE"}),a["intake"]); ck("source lock",marker(a["source"],"STATUS",{"LOCKED"}),a["source"])
    if i>=2: ck("research complete",marker(a["ledger"],"RESEARCH STATUS",{"COMPLETE"}),a["ledger"])
    if i>=3: ck("claim check",marker(a["ledger"],"CLAIM CHECK",{"PASS","PASSED"}),a["ledger"])
    if i>=4: ck("script exists",a["draft"].exists() or a["script"].exists(),f"{a['draft']} or {a['script']}")
    if i>=5:
        pf=preflight(a["script"]) if a["script"].exists() else {"pass":False,"errors":["missing locked script"]}; ck("locked script preflight",pf["pass"],"; ".join(pf["errors"]) or a["script"])
    if i>=6: ck("rights clear",marker(a["rights"],"STATUS",{"CLEARED"}),a["rights"])
    if i>=7: ck("master WAV",a["wav"].exists(),a["wav"])
    if i>=8: ck("ASR fidelity",(load_json(a["fidelity"],{}) or {}).get("pass") is True,a["fidelity"])
    if i>=9: ck("master QC",(load_json(a["masterqc"],{}) or {}).get("pass") is True,a["masterqc"])
    if i>=10:
        ck("teacher ready",marker(a["teacher"],"STATUS",{"READY"}),a["teacher"]); ck("visual ready",marker(a["visual"],"STATUS",{"READY"}),a["visual"]); ck("social ready",marker(a["social"],"STATUS",{"READY"}),a["social"])
        md=load_json(a["metadata"],{}) or {}; ck("metadata ready",md.get("ready") is True and bool(md.get("title")) and bool(md.get("description")),a["metadata"])
    if i>=11:
        q=load_json(a["masterqc"],{}) or {}; expected=((q.get("mp3") or {}).get("sha256")); actual=sha256_file(a["mp3"]) if a["mp3"].exists() else None
        ck("distribution MP3 matches QC",bool(expected and actual==expected),f"{a['mp3']} sha256={actual or 'missing'} expected={expected or 'missing'}")
    if i>=12: ck("RSS feed",p.feed.exists(),p.feed)
    return {"episode_id":ep,"target_stage":target,"pass":all(x["ok"] for x in c),"checks":c}

def advance(p,ep,target,actor="runner"):
    with transition_lock(p,ep):
        s=current(p,ep); ci=STAGES.index(s["stage"]); ti=STAGES.index(target)
        if ti<ci: raise PipelineError(f"Refusing backwards transition {s['stage']} -> {target}")
        if ti>ci+1: raise PipelineError(f"Transitions must be sequential: current={s['stage']} requested={target}")
        if ti==ci: return s
        r=gate_report(p,ep,target)
        if not r["pass"]: raise PipelineError("Stage gate failed: "+" | ".join(f"{x['name']}: {x['detail']}" for x in r["checks"] if not x["ok"]))
        s["stage"]=target; s["runner_version"]=VERSION; s.setdefault("history",[]).append({"stage":target,"at":now(),"actor":actor}); write_json(artifacts(p,ep)["state"],s); return s
