from __future__ import annotations
import os, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import format_datetime
from urllib.parse import urlparse
from .config import *
from .state import current,advance
from .release import status as validation_status

def public(url):
    try: q=urlparse(url); return q.scheme in {"http","https"} and bool(q.netloc) and all(ord(c)<128 for c in url)
    except Exception:return False
def cfg():
    d={"base":os.getenv("HARNEY_PODCAST_BASE_URL",""),"site":os.getenv("HARNEY_PODCAST_SITE_URL",""),"feed":os.getenv("HARNEY_PODCAST_FEED_URL",""),"art":os.getenv("HARNEY_PODCAST_ARTWORK_URL",""),"author":os.getenv("HARNEY_PODCAST_AUTHOR","Harney County History Podcast")}
    for k in ("base","site","feed","art"):
        if not public(d[k]): raise PipelineError(f"Publishing {k} must be public ASCII http(s) URL")
    return d
def publish(paths:Paths,ep):
    a=artifacts(paths,ep); s=current(paths,ep)
    if s["stage"]=="MASTER QC": advance(paths,ep,"VISUAL/SCHOOL/SOCIAL PACKAGE","publish-preflight"); s=current(paths,ep)
    if s["stage"]=="VISUAL/SCHOOL/SOCIAL PACKAGE": advance(paths,ep,"READY TO PUBLISH","publish-preflight"); s=current(paths,ep)
    if s["stage"]!="READY TO PUBLISH": raise PipelineError(f"{ep} at {s['stage']}; requires READY TO PUBLISH")
    v=validation_status(paths)
    if not v["production_ready"]: raise PipelineError(f"Requires {LIVE_REQUIRED} consecutive live validations; current {v['consecutive_successes']}")
    c=cfg(); md=load_json(a["metadata"],{}) or {}; title=md.get("title","").strip(); desc=md.get("description","").strip(); guid=md.get("guid") or f"urn:harney-county-history:{ep.lower()}"
    if md.get("ready") is not True or not title or not desc: raise PipelineError("Publishing metadata incomplete")
    url=f"{c['base'].rstrip('/')}/{a['mp3'].name}"; size=a["mp3"].stat().st_size
    ET.register_namespace("itunes","http://www.itunes.com/dtds/podcast-1.0.dtd"); ET.register_namespace("atom","http://www.w3.org/2005/Atom")
    if paths.feed.exists(): tree=ET.parse(paths.feed); rss=tree.getroot(); ch=rss.find("channel")
    else:
        rss=ET.Element("rss",version="2.0"); ch=ET.SubElement(rss,"channel"); ET.SubElement(ch,"title").text="Harney County History Podcast"; ET.SubElement(ch,"link").text=c["site"]; ET.SubElement(ch,"description").text="Documentary reconstruction of Harney County, Oregon, grounded in oral history and verified records."; ET.SubElement(ch,"language").text="en-us"; ET.SubElement(ch,"{http://www.itunes.com/dtds/podcast-1.0.dtd}author").text=c["author"]; ET.SubElement(ch,"{http://www.itunes.com/dtds/podcast-1.0.dtd}explicit").text="false"; ET.SubElement(ch,"{http://www.itunes.com/dtds/podcast-1.0.dtd}image",href=c["art"]); ET.SubElement(ch,"{http://www.w3.org/2005/Atom}link",href=c["feed"],rel="self",type="application/rss+xml"); im=ET.SubElement(ch,"image"); ET.SubElement(im,"url").text=c["art"]; ET.SubElement(im,"title").text="Harney County History Podcast"; ET.SubElement(im,"link").text=c["site"]
    old=None
    for it in ch.findall("item"):
        g=it.find("guid")
        if g is not None and g.text==guid: old=it; break
        if g is not None and g.text and ep.lower() in g.text.lower() and g.text!=guid: raise PipelineError("Refusing immutable GUID change")
    if old is not None: ch.remove(old)
    it=ET.Element("item"); ET.SubElement(it,"title").text=title; ET.SubElement(it,"description").text=desc; ET.SubElement(it,"pubDate").text=format_datetime(datetime.now(timezone.utc)); g=ET.SubElement(it,"guid",isPermaLink="false"); g.text=guid; ET.SubElement(it,"enclosure",url=url,length=str(size),type="audio/mpeg"); ch.insert(0,it)
    tree=ET.ElementTree(rss); ET.indent(tree,space="  "); tree.write(paths.feed,encoding="utf-8",xml_declaration=True); ET.parse(paths.feed); advance(paths,ep,"PUBLISHED","publish"); return paths.feed
