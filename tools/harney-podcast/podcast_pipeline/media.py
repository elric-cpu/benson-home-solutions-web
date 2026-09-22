from __future__ import annotations
import difflib, json, re, tempfile
from pathlib import Path
from .config import *
from .script import normalized_words,distance,compress,expected
from .gemini_io import transcribe

def loudness(path):
    r=run(["ffmpeg","-hide_banner","-nostats","-i",str(path),"-af",f"loudnorm=I={TARGET_LUFS}:TP={TARGET_TP}:LRA={TARGET_LRA}:print_format=json","-f","null","-"],capture=True)
    ms=re.findall(r'\{\s*"input_i".*?\}',r.stderr,re.S)
    if not ms: raise PipelineError("Cannot parse loudnorm JSON")
    d=json.loads(ms[-1]); return {k:float(d[k]) for k in ("input_i","input_tp","input_lra","input_thresh","target_offset")}
def master(chunks,wav,mp3):
    require_media_tools(); wav.parent.mkdir(parents=True,exist_ok=True); mp3.parent.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        td=Path(td); lst=td/"concat.txt"; raw=td/"raw.wav"; lst.write_text("".join(f"file '{x.resolve().as_posix()}'\n" for x in chunks),encoding="utf-8")
        run(["ffmpeg","-y","-hide_banner","-loglevel","error","-f","concat","-safe","0","-i",str(lst),"-ar",str(RATE),"-ac","1","-c:a","pcm_s16le",str(raw)])
        m=loudness(raw); f=f"loudnorm=I={TARGET_LUFS}:TP={TARGET_TP}:LRA={TARGET_LRA}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
        run(["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(raw),"-af",f,"-ar",str(RATE),"-ac","1","-c:a","pcm_s16le",str(wav)])
        run(["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(wav),"-ar",str(RATE),"-ac","1","-c:a","libmp3lame","-b:a","128k",str(mp3)])
def probe(path): return json.loads(run(["ffprobe","-v","error","-show_entries","format=duration:stream=codec_name,codec_type,sample_rate,channels,sample_fmt,bits_per_sample","-of","json",str(path)],capture=True).stdout)
def silences(path):
    r=run(["ffmpeg","-hide_banner","-nostats","-i",str(path),"-af","silencedetect=noise=-50dB:d=3","-f","null","-"],capture=True)
    return [float(x) for x in re.findall(r"silence_duration:\s*([0-9.]+)",r.stderr)]
def master_qc(wav,mp3):
    out={"pass":True,"errors":[],"warnings":[],"runner_version":VERSION}
    for label,path in (("master_wav",wav),("mp3",mp3)):
        if not path.exists(): out["pass"]=False; out["errors"].append(f"missing {path}"); continue
        pr=probe(path); s=next((x for x in pr["streams"] if x.get("codec_type")=="audio"),None)
        if not s: out["pass"]=False; out["errors"].append(f"{label}: no audio stream"); continue
        dur=float(pr.get("format",{}).get("duration",0)); lu=loudness(path); si=silences(path); out[label]={"probe":s,"duration_seconds":dur,"loudness":lu,"silence_durations":si}
        if int(s.get("channels",0))!=1: out["pass"]=False; out["errors"].append(f"{label}: not mono")
        if int(s.get("sample_rate",0))!=RATE: out["pass"]=False; out["errors"].append(f"{label}: not {RATE} Hz")
        if label=="master_wav" and s.get("codec_name")!="pcm_s16le": out["pass"]=False; out["errors"].append("master: not 16-bit PCM")
        if not TARGET_LUFS-1<=lu["input_i"]<=TARGET_LUFS+1: out["pass"]=False; out["errors"].append(f"{label}: {lu['input_i']} LUFS")
        if lu["input_tp"]>(-1 if label=="master_wav" else -.7): out["pass"]=False; out["errors"].append(f"{label}: true peak {lu['input_tp']} dBTP")
        if any(x>MAX_SILENCE for x in si): out["pass"]=False; out["errors"].append(f"{label}: long silence >{MAX_SILENCE}s")
        if dur and not 1080<=dur<=1320: out["warnings"].append(f"{label}: {dur/60:.1f} min outside 18-22 target; do not pad/cut solely for runtime")
    return out
def speaker_error(exp,ann):
    labels=compress(w["speaker"] for w in ann if w.get("speaker"))
    if not labels:return 1.0,[]
    uniq=[]
    for x in labels:
        if x not in uniq: uniq.append(x)
    mp={uniq[0]:exp[0] if exp else "HOST_A"}
    if len(uniq)>1: mp[uniq[1]]="HOST_B" if mp[uniq[0]]=="HOST_A" else "HOST_A"
    got=[mp.get(x,"UNKNOWN") for x in labels]; return distance(exp,got)/max(len(exp),1),got
def fidelity(c,script,wav,outdir):
    exptext,expspk=expected(script); text,ann=transcribe(c,wav); (outdir/f"{script.name[:5]}_asr.txt").write_text(text,encoding="utf-8")
    a=normalized_words(exptext); b=normalized_words(text); wer=distance(a,b)/max(len(a),1); ratio=difflib.SequenceMatcher(None,a,b,autojunk=False).ratio(); se,got=speaker_error(expspk,ann); errs=[]
    if wer>MAX_WER: errs.append(f"WER {wer:.3f}>{MAX_WER}")
    if ratio<MIN_RATIO: errs.append(f"similarity {ratio:.3f}<{MIN_RATIO}")
    if se>MAX_SPK_ERR: errs.append(f"speaker error {se:.3f}>{MAX_SPK_ERR}")
    return {"pass":not errs,"errors":errs,"model":ASR_MODEL,"wer":round(wer,5),"text_similarity":round(ratio,5),"speaker_sequence_error":round(se,5),"expected_speaker_sequence":expspk,"actual_speaker_sequence":got,"word_annotations":len(ann),"runner_version":VERSION,"at":now()}
