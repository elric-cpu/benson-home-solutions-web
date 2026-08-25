#!/usr/bin/env python3
import argparse, csv, hashlib, json, pathlib, sys, urllib.parse, urllib.request

API = "https://tnmaccess.nationalmap.gov/api/v1/products"
DATASET = "Lidar Point Cloud (LPC)"
UA = "Benson-Gold-Prospecting-LiDAR-Phase1/2026.08.25"

def fetch_page(bbox, offset, limit):
    params = {
        "datasets": DATASET,
        "bbox": bbox,
        "prodFormats": "LAS,LAZ",
        "outputFormat": "JSON",
        "max": limit,
        "offset": offset,
    }
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as resp:
        return json.load(resp), url

def as_int(value):
    try:
        if value in (None, ""): return None
        return int(float(value))
    except Exception:
        return None

def norm_bbox(value):
    if not isinstance(value, dict): return None
    aliases = {
        "minX": ("minX", "xmin", "west"), "maxX": ("maxX", "xmax", "east"),
        "minY": ("minY", "ymin", "south"), "maxY": ("maxY", "ymax", "north"),
    }
    out = {}
    for dst, keys in aliases.items():
        for k in keys:
            if k in value:
                try: out[dst] = float(value[k]); break
                except Exception: pass
    return out if len(out) == 4 else None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--bbox", required=True, help="west,south,east,north in WGS84")
    ap.add_argument("--project", default="OR_NRCSUSGS_2019_D19")
    ap.add_argument("--expected-count", type=int, default=171)
    ap.add_argument("--out", default="phase1_manifest")
    args = ap.parse_args()

    out = pathlib.Path(args.out); out.mkdir(parents=True, exist_ok=True)
    all_items, query_urls, offset, limit = [], [], 0, 1000
    while True:
        data, qurl = fetch_page(args.bbox, offset, limit)
        query_urls.append(qurl)
        items = data.get("items") or []
        all_items.extend(items)
        total = as_int(data.get("total"))
        if not items or len(items) < limit or (total is not None and len(all_items) >= total): break
        offset += len(items)
        if offset > 100000: raise RuntimeError("TNM pagination runaway guard tripped")

    project_key = args.project.lower()
    filtered = []
    seen = set()
    for it in all_items:
        hay = json.dumps(it, sort_keys=True).lower()
        if project_key not in hay: continue
        url = it.get("downloadURL") or it.get("downloadUrl") or it.get("url")
        if not url or url in seen: continue
        fmt = str(it.get("format") or "").upper()
        if not (url.lower().endswith((".laz", ".las")) or "LAZ" in fmt or "LAS" in fmt): continue
        seen.add(url)
        filtered.append({
            "title": it.get("title"),
            "download_url": url,
            "format": it.get("format"),
            "catalog_size_bytes": as_int(it.get("sizeInBytes") or it.get("size")),
            "source_id": it.get("sourceId") or it.get("id"),
            "bounding_box_wgs84": norm_bbox(it.get("boundingBox")),
            "date_created": it.get("dateCreated"),
            "last_updated": it.get("lastUpdated"),
        })

    filtered.sort(key=lambda x: x["download_url"])
    for i, item in enumerate(filtered): item["index"] = i

    manifest = {
        "manifest_version": 1,
        "source": "USGS The National Map TNMAccess",
        "dataset": DATASET,
        "project_filter": args.project,
        "aoi_bbox_wgs84": [float(v) for v in args.bbox.split(",")],
        "expected_tile_count_from_prior_inventory": args.expected_count,
        "resolved_tile_count": len(filtered),
        "count_matches_prior_inventory": len(filtered) == args.expected_count,
        "query_urls": query_urls,
        "tiles": filtered,
    }
    text = json.dumps(manifest, indent=2, sort_keys=True) + "\n"
    (out / "manifest.json").write_text(text)
    (out / "manifest.sha256").write_text(hashlib.sha256(text.encode()).hexdigest() + "  manifest.json\n")

    with (out / "manifest.csv").open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["index","title","format","catalog_size_bytes","source_id","download_url"])
        for t in filtered:
            w.writerow([t["index"], t["title"], t["format"], t["catalog_size_bytes"], t["source_id"], t["download_url"]])

    status = {
        "resolved_tile_count": len(filtered),
        "expected_tile_count": args.expected_count,
        "count_match": len(filtered) == args.expected_count,
    }
    (out / "resolution_status.json").write_text(json.dumps(status, indent=2) + "\n")
    print(json.dumps(status, indent=2))
    if not filtered:
        print("ERROR: authoritative TNM query resolved zero project LAZ/LAS products", file=sys.stderr)
        return 2
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
