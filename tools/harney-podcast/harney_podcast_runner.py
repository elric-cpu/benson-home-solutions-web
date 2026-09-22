#!/usr/bin/env python3
from __future__ import annotations
import argparse, json, re, sys, tempfile
from pathlib import Path
from podcast_pipeline.config import *
from podcast_pipeline.script import parse,preflight,normalized_words,distance
from podcast_pipeline.state import scaffold,current,gate_report,advance
from podcast_pipeline.gemini_io import client,render_chunks,tts_pcm_failover,write_wav,transcribe
from podcast_pipeline.media import master,master_qc,fidelity,speaker_error
from podcast_pipeline.release import record, status as validation_status, code_hash
from podcast_pipeline.publish import publish

def episode(x):
    m=re.search(r"\bEP\d{3}\b",x,re.I)
    if not m: raise PipelineError("Episode must contain EP###")
    return m.group(0).upper()
def render(paths,ep):
    a=artifacts(paths,ep); s=current(paths,ep)
    if STAGES.index(s["stage"])<STAGES.index("RIGHTS CLEAR"): raise PipelineError(f"{ep} must reach RIGHTS CLEAR; current {s['stage']}")
    pf=preflight(a["script"])
    if not pf["pass"]: raise PipelineError("Script preflight: "+" | ".join(pf["errors"]))
    c=client(); chunks,_=parse(a["script"]); files=render_chunks(c,chunks,a["adir"],ep); master(files,a["wav"],a["mp3"])
    if current(paths,ep)["stage"]=="RIGHTS CLEAR": advance(paths,ep,"TTS RENDER","render")
    fq=fidelity(c,a["script"],a["wav"],a["adir"]); write_json(a["fidelity"],fq)
    if not fq["pass"]: raise PipelineError("Fidelity QC: "+" | ".join(fq["errors"]))
    if current(paths,ep)["stage"]=="TTS RENDER": advance(paths,ep,"AUDIO FIDELITY QC","asr-qc")
    mq=master_qc(a["wav"],a["mp3"]); mq["at"]=now(); write_json(a["masterqc"],mq)
    if not mq["pass"]: raise PipelineError("Master QC: "+" | ".join(mq["errors"]))
    if current(paths,ep)["stage"]=="AUDIO FIDELITY QC": advance(paths,ep,"MASTER QC","master-qc")
    return {"preflight":pf,"fidelity":fq,"master_qc":mq,"live_validation":validation_status(paths)}
def live_smoke(paths):
    c=client(); prompt="HOST_A: Harney County is large enough that distance changes ordinary work.\nHOST_B: Which is a polite way of saying a quick trip can eat half the day.\nHOST_A: Exactly. Geography stays attached to the people and the evidence."
    with tempfile.TemporaryDirectory() as td:
        w=Path(td)/"smoke.wav"; pcm,tts_model=tts_pcm_failover(c,prompt); write_wav(w,pcm); text,ann=transcribe(c,w); a=normalized_words(prompt); b=normalized_words(text); wer=distance(a,b)/max(len(a),1); import difflib; ratio=difflib.SequenceMatcher(None,a,b,autojunk=False).ratio(); se,got=speaker_error(["HOST_A","HOST_B","HOST_A"],ann); ok=wer<=MAX_WER and ratio>=MIN_RATIO and se<=MAX_SPK_ERR; rec=record(paths,ok); return {"pass":ok,"wer":round(wer,5),"text_similarity":round(ratio,5),"speaker_sequence_error":round(se,5),"actual_speaker_sequence":got,"tts_model":tts_model,"runner_version":VERSION,"code_hash":code_hash(),"validation_record":rec}
def report(paths,ep):
    s=current(paths,ep); ni=min(STAGES.index(s["stage"])+1,len(STAGES)-1); return {"runner_version":VERSION,"drive_root":str(paths.root),"episode":s,"next_gate":gate_report(paths,ep,STAGES[ni]),"live_validation":validation_status(paths)}
def main(argv=None):
    p=argparse.ArgumentParser(); p.add_argument("--root",type=Path,default=default_root()); sub=p.add_subparsers(dest="cmd",required=True)
    for n in ("scaffold","preflight","render","publish","status"): q=sub.add_parser(n); q.add_argument("episode")
    q=sub.add_parser("advance"); q.add_argument("episode"); q.add_argument("stage",choices=STAGES); sub.add_parser("live-smoke")
    x=p.parse_args(argv); paths=Paths(x.root.expanduser()); paths.ensure()
    try:
        if x.cmd=="live-smoke": out=live_smoke(paths); print(json.dumps(out,indent=2)); return 0 if out["pass"] else 2
        ep=episode(x.episode)
        if x.cmd=="scaffold": scaffold(paths,ep); out=report(paths,ep)
        elif x.cmd=="preflight": out=preflight(artifacts(paths,ep)["script"])
        elif x.cmd=="advance": out=advance(paths,ep,x.stage,"manual-approved")
        elif x.cmd=="render": out=render(paths,ep)
        elif x.cmd=="publish": print(publish(paths,ep)); return 0
        else: out=report(paths,ep)
        print(json.dumps(out,indent=2)); return 0 if not isinstance(out,dict) or out.get("pass",True) else 2
    except PipelineError as e: print(f"ERROR: {e}",file=sys.stderr); return 2
if __name__=="__main__": raise SystemExit(main())
