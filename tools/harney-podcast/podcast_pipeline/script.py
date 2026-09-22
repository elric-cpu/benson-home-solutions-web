from __future__ import annotations
import re
from pathlib import Path
from .config import PipelineError
CHUNK=re.compile(r"(?m)^---\s*CHUNK\s*(\d+)\s*---\s*$",re.I); SPEAKER=re.compile(r"^\s*(HOST_A|HOST_B)\s*:\s*(.+?)\s*$",re.I)
def wc(s): return len(re.findall(r"\b[\w’'-]+\b",s,re.UNICODE))
def parse(path:Path):
    raw=path.read_text(encoding="utf-8")
    if "## LOCKED SCRIPT" not in raw: raise PipelineError(f"{path.name}: missing ## LOCKED SCRIPT")
    body=raw.split("## LOCKED SCRIPT",1)[1].strip(); ms=list(CHUNK.finditer(body))
    if not ms: raise PipelineError(f"{path.name}: no chunk headers")
    chunks=[body[m.end():(ms[i+1].start() if i+1<len(ms) else len(body))].strip() for i,m in enumerate(ms)]
    turns=[]
    for c in chunks:
        for x in c.splitlines():
            x=x.strip()
            if not x or x.startswith("<!--"): continue
            m=SPEAKER.match(x)
            if not m: raise PipelineError(f"Non-speaker line: {x[:120]!r}")
            turns.append((m.group(1).upper(),m.group(2).strip()))
    return chunks,turns
def preflight(path:Path):
    chunks,turns=parse(path); errors=[]; warnings=[]; counts=[wc(c) for c in chunks]
    if not 4<=len(chunks)<=5: errors.append(f"Expected 4-5 chunks; found {len(chunks)}")
    for i,n in enumerate(counts,1):
        if not 375<=n<=550: errors.append(f"Chunk {i}: {n} words; required 375-550")
    total=sum(wc(t) for _,t in turns); bw=sum(wc(t) for s,t in turns if s=="HOST_B"); share=bw/max(total,1)
    if share>.25: errors.append(f"HOST_B share {share:.1%}; max 25%")
    if share<.10: warnings.append(f"HOST_B share {share:.1%}; verify audience-surrogate role")
    if not 1500<=total<=2750: warnings.append(f"{total} words; verify 18-22 min target without padding/cutting")
    return {"pass":not errors,"errors":errors,"warnings":warnings,"chunk_count":len(chunks),"chunk_words":counts,"total_words":total,"host_b_share":round(share,4)}
def normalized_words(text):
    text=re.sub(r"(?im)^\s*(HOST_A|HOST_B|spk_\d+)\s*:\s*"," ",text); text=re.sub(r"\[[^\]]+\]"," ",text)
    return re.findall(r"[a-z0-9]+(?:'[a-z0-9]+)?",text.lower())
def compress(seq):
    out=[]
    for x in seq:
        if not out or out[-1]!=x: out.append(x)
    return out
def distance(a,b):
    prev=list(range(len(b)+1))
    for i,x in enumerate(a,1):
        cur=[i]
        for j,y in enumerate(b,1): cur.append(min(cur[-1]+1,prev[j]+1,prev[j-1]+(x!=y)))
        prev=cur
    return prev[-1]
def expected(path):
    _,turns=parse(path); return " ".join(t for _,t in turns),compress(s for s,_ in turns)
