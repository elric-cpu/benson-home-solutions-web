from __future__ import annotations
import ipaddress, os, shutil, socket, tempfile, urllib.error, urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlparse
from .config import *
from .state import current,advance
from .release import status as validation_status

ITUNES="http://www.itunes.com/dtds/podcast-1.0.dtd"
ATOM="http://www.w3.org/2005/Atom"

def _host_is_public(host:str)->bool:
    h=(host or "").strip().rstrip(".").lower()
    if not h or h=="localhost" or h.endswith(".localhost") or h.endswith(".local"): return False
    try:
        return ipaddress.ip_address(h).is_global
    except ValueError:
        pass
    try:
        infos=socket.getaddrinfo(h,None,type=socket.SOCK_STREAM)
    except OSError:
        return False
    ips={x[4][0] for x in infos if x and x[4]}
    return bool(ips) and all(ipaddress.ip_address(x).is_global for x in ips)

def public(url):
    try:
        q=urlparse(url)
        return q.scheme in {"http","https"} and bool(q.hostname) and all(ord(c)<128 for c in url) and _host_is_public(q.hostname)
    except Exception:
        return False

def cfg():
    d={
      "base":os.getenv("HARNEY_PODCAST_BASE_URL",""),
      "site":os.getenv("HARNEY_PODCAST_SITE_URL",""),
      "feed":os.getenv("HARNEY_PODCAST_FEED_URL",""),
      "art":os.getenv("HARNEY_PODCAST_ARTWORK_URL",""),
      "author":os.getenv("HARNEY_PODCAST_AUTHOR","Harney County History Podcast"),
      "public_root":os.getenv("HARNEY_PODCAST_PUBLIC_ROOT",""),
      "gcs_bucket":os.getenv("HARNEY_PODCAST_GCS_BUCKET","").strip().replace("gs://","").strip("/"),
    }
    for k in ("base","site","feed","art"):
        if not public(d[k]): raise PipelineError(f"Publishing {k} must resolve to a public ASCII http(s) URL")
    if bool(d["public_root"])==bool(d["gcs_bucket"]): raise PipelineError("Set exactly one deployment backend: HARNEY_PODCAST_PUBLIC_ROOT or HARNEY_PODCAST_GCS_BUCKET")
    return d

def _safe_url_path(url:str)->PurePosixPath:
    p=PurePosixPath(unquote(urlparse(url).path).lstrip("/"))
    if not p.parts or any(x in {"",".",".."} for x in p.parts): raise PipelineError(f"Unsafe or empty publishing URL path: {url}")
    return p

def _target_for_url(c:dict,url:str):
    p=_safe_url_path(url)
    if c["public_root"]:
        root=Path(c["public_root"]).expanduser().resolve(); target=root.joinpath(*p.parts).resolve()
        if root not in target.parents and target!=root: raise PipelineError(f"Publishing path escaped public root: {url}")
        return ("file",target)
    return ("gcs",f"gs://{c['gcs_bucket']}/{p.as_posix()}")

def _atomic_copy(src:Path,dst:Path):
    dst.parent.mkdir(parents=True,exist_ok=True)
    tmp=dst.with_name(dst.name+f".tmp-{os.getpid()}")
    shutil.copy2(src,tmp); tmp.replace(dst)

def deploy_file(c:dict,src:Path,url:str):
    kind,target=_target_for_url(c,url)
    if kind=="file": _atomic_copy(src,target); return target
    if shutil.which("gcloud") is None: raise PipelineError("gcloud CLI required for HARNEY_PODCAST_GCS_BUCKET publishing")
    run(["gcloud","storage","cp","--quiet",str(src),target]); return target

def _backup_target(c:dict,url:str,tempdir:Path):
    kind,target=_target_for_url(c,url)
    if kind=="file":
        if not target.exists(): return (kind,target,None)
        b=tempdir/target.name; shutil.copy2(target,b); return (kind,target,b)
    if shutil.which("gcloud") is None: raise PipelineError("gcloud CLI required for GCS rollback")
    b=tempdir/"remote-feed-backup.xml"
    try: run(["gcloud","storage","cp","--quiet",target,str(b)])
    except PipelineError: return (kind,target,None)
    return (kind,target,b)

def _restore_target(backup):
    kind,target,b=backup
    try:
        if kind=="file":
            if b is None: Path(target).unlink(missing_ok=True)
            else: _atomic_copy(b,Path(target))
        else:
            if b is None: run(["gcloud","storage","rm","--quiet",target])
            else: run(["gcloud","storage","cp","--quiet",str(b),target])
    except Exception:
        pass

def verify_http(url:str,expected_size:int|None=None,require_range=False):
    headers={"User-Agent":f"harney-podcast-runner/{VERSION}","Cache-Control":"no-cache"}
    try:
        req=urllib.request.Request(url,method="HEAD",headers=headers)
        with urllib.request.urlopen(req,timeout=20) as r:
            if not 200<=getattr(r,"status",200)<400: raise PipelineError(f"Public URL HEAD failed: {url}")
            cl=r.headers.get("Content-Length")
            if expected_size is not None and cl is not None and int(cl)!=expected_size: raise PipelineError(f"Public Content-Length mismatch for {url}: {cl} != {expected_size}")
        if require_range:
            req=urllib.request.Request(url,headers={**headers,"Range":"bytes=0-0"})
            with urllib.request.urlopen(req,timeout=20) as r:
                if getattr(r,"status",200)!=206 and "bytes" not in (r.headers.get("Accept-Ranges","").lower()): raise PipelineError(f"Public media does not advertise/support byte ranges: {url}")
    except (urllib.error.URLError,TimeoutError,OSError,ValueError) as e:
        raise PipelineError(f"Public URL verification failed for {url}: {e}") from e
    return True

def _base_feed(c):
    ET.register_namespace("itunes",ITUNES); ET.register_namespace("atom",ATOM)
    rss=ET.Element("rss",version="2.0"); ch=ET.SubElement(rss,"channel")
    ET.SubElement(ch,"title").text="Harney County History Podcast"; ET.SubElement(ch,"link").text=c["site"]
    ET.SubElement(ch,"description").text="Documentary reconstruction of Harney County, Oregon, grounded in oral history and verified records."
    ET.SubElement(ch,"language").text="en-us"; ET.SubElement(ch,f"{{{ITUNES}}}author").text=c["author"]; ET.SubElement(ch,f"{{{ITUNES}}}explicit").text="false"
    ET.SubElement(ch,f"{{{ITUNES}}}image",href=c["art"]); ET.SubElement(ch,f"{{{ATOM}}}link",href=c["feed"],rel="self",type="application/rss+xml")
    im=ET.SubElement(ch,"image"); ET.SubElement(im,"url").text=c["art"]; ET.SubElement(im,"title").text="Harney County History Podcast"; ET.SubElement(im,"link").text=c["site"]
    return rss,ch

def _find_episode(ch,ep,guid):
    num=str(int(ep[2:]))
    by_guid=[]; by_episode=[]
    for it in ch.findall("item"):
        g=it.find("guid")
        if g is not None and (g.text or "")==guid: by_guid.append(it)
        e=it.find(f"{{{ITUNES}}}episode")
        if e is not None and (e.text or "").strip()==num: by_episode.append(it)
    if len(by_episode)>1: raise PipelineError(f"Feed contains duplicate stable episode number {num}")
    if by_episode and by_guid and by_episode[0] is not by_guid[0]: raise PipelineError(f"Feed identity conflict for {ep}")
    return by_episode[0] if by_episode else (by_guid[0] if by_guid else None)

def _write_feed(path:Path,rss):
    tree=ET.ElementTree(rss); ET.indent(tree,space="  ")
    tmp=path.with_suffix(path.suffix+".tmp"); path.parent.mkdir(parents=True,exist_ok=True); tree.write(tmp,encoding="utf-8",xml_declaration=True); ET.parse(tmp); tmp.replace(path)

def publish(paths:Paths,ep):
    a=artifacts(paths,ep); s=current(paths,ep)
    if s["stage"]=="MASTER QC": advance(paths,ep,"VISUAL/SCHOOL/SOCIAL PACKAGE","publish-preflight"); s=current(paths,ep)
    if s["stage"]=="VISUAL/SCHOOL/SOCIAL PACKAGE": advance(paths,ep,"READY TO PUBLISH","publish-preflight"); s=current(paths,ep)
    if s["stage"]!="READY TO PUBLISH": raise PipelineError(f"{ep} at {s['stage']}; requires READY TO PUBLISH")
    v=validation_status(paths)
    if not v["production_ready"]: raise PipelineError(f"Requires {LIVE_REQUIRED} consecutive live validations; current {v['consecutive_successes']}")
    from .state import gate_report
    gate=gate_report(paths,ep,"READY TO PUBLISH")
    if not gate["pass"]: raise PipelineError("Publish gate failed: "+" | ".join(x["name"] for x in gate["checks"] if not x["ok"]))
    c=cfg(); md=load_json(a["metadata"],{}) or {}; title=md.get("title","").strip(); desc=md.get("description","").strip(); guid=(md.get("guid") or f"urn:harney-county-history:{ep.lower()}").strip()
    if md.get("ready") is not True or not title or not desc or not guid: raise PipelineError("Publishing metadata incomplete")
    registry=load_json(paths.guid_registry,{}) or {}; prior_guid=registry.get(ep)
    if prior_guid and prior_guid!=guid: raise PipelineError(f"Refusing immutable GUID change for {ep}: {prior_guid} -> {guid}")
    media_url=f"{c['base'].rstrip('/')}/{a['mp3'].name}"; size=a["mp3"].stat().st_size; media_hash=sha256_file(a["mp3"])
    deployed=deploy_file(c,a["mp3"],media_url)
    if isinstance(deployed,Path) and sha256_file(deployed)!=media_hash: raise PipelineError("Deployed MP3 hash mismatch")
    verify_http(media_url,expected_size=size,require_range=True); verify_http(c["art"])
    if paths.feed.exists(): tree=ET.parse(paths.feed); rss=tree.getroot(); ch=rss.find("channel")
    else: rss,ch=_base_feed(c)
    if ch is None: raise PipelineError("RSS channel missing")
    old=_find_episode(ch,ep,guid)
    if old is not None:
        og=old.find("guid"); existing=(og.text or "").strip() if og is not None else ""
        if existing and existing!=guid: raise PipelineError(f"Refusing GUID change for stable episode {ep}: {existing} -> {guid}")
        ch.remove(old)
    it=ET.Element("item"); ET.SubElement(it,"title").text=title; ET.SubElement(it,"description").text=desc; ET.SubElement(it,"pubDate").text=format_datetime(datetime.now(timezone.utc)); g=ET.SubElement(it,"guid",isPermaLink="false"); g.text=guid
    ET.SubElement(it,f"{{{ITUNES}}}episode").text=str(int(ep[2:])); ET.SubElement(it,"enclosure",url=media_url,length=str(size),type="audio/mpeg"); ch.insert(0,it)
    with tempfile.TemporaryDirectory() as td:
        td=Path(td); old_local=td/"local-feed.xml" if paths.feed.exists() else None
        if old_local is not None: shutil.copy2(paths.feed,old_local)
        remote_backup=_backup_target(c,c["feed"],td)
        registry_backup=dict(registry)
        try:
            _write_feed(paths.feed,rss)
            deploy_file(c,paths.feed,c["feed"]); verify_http(c["feed"])
            registry[ep]=guid; write_json(paths.guid_registry,registry)
            advance(paths,ep,"PUBLISHED","publish")
        except Exception:
            if old_local is None: paths.feed.unlink(missing_ok=True)
            else: _atomic_copy(old_local,paths.feed)
            _restore_target(remote_backup); write_json(paths.guid_registry,registry_backup)
            raise
    return paths.feed
