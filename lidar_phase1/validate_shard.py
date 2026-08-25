#!/usr/bin/env python3
import argparse, hashlib, json, math, os, pathlib, shlex, shutil, subprocess, sys, time

PROJECT_META = {
    "project": "Central Oregon 3DEP 2019 / OR_NRCSUSGS_2019_D19",
    "horizontal_datum": "NAD 1983 (2011)",
    "projection": "Oregon Statewide Lambert Feet Intl",
    "vertical_datum": "NAVD88",
    "geoid_model": "GEOID12B",
    "vertical_units": "feet",
    "acquisition_window": "2019-10-10 through 2020-07-29",
    "reported_average_first_return_density_pts_m2": 11.89,
}

PDAL = shlex.split(os.environ.get("PDAL_EXEC", "pdal"))

def run(cmd, **kwargs):
    return subprocess.run(cmd, check=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, **kwargs)

def walk(obj):
    if isinstance(obj, dict):
        yield obj
        for v in obj.values(): yield from walk(v)
    elif isinstance(obj, list):
        for v in obj: yield from walk(v)

def find_bounds(summary):
    for d in walk(summary):
        keys = ("minx","maxx","miny","maxy")
        if all(k in d for k in keys):
            try:
                b = {k: float(d[k]) for k in keys}
                if b["maxx"] > b["minx"] and b["maxy"] > b["miny"]: return b
            except Exception: pass
    return None

def find_point_count(summary):
    vals = []
    for d in walk(summary):
        for k in ("num_points","count","points"):
            v = d.get(k)
            if isinstance(v, (int,float)) and v > 0: vals.append(int(v))
    return max(vals) if vals else None

def parse_enum_value(v):
    try: return str(int(float(v)))
    except Exception: return str(v)

def enum_counts(node):
    out = {}
    def add(k, v):
        try: out[parse_enum_value(k)] = out.get(parse_enum_value(k), 0) + int(v)
        except Exception: pass
    def consume(raw):
        if isinstance(raw, dict):
            if raw.get("value") is not None and raw.get("count") is not None:
                add(raw["value"], raw["count"]); return
            for k, v in raw.items():
                if isinstance(v, (int,float)):
                    try: float(k); add(k, v); continue
                    except Exception: pass
                consume(v)
        elif isinstance(raw, list):
            for x in raw: consume(x)
        elif isinstance(raw, str):
            s = raw.strip()
            for sep in ("/", ":", "="):
                if sep in s:
                    a, b = s.rsplit(sep, 1)
                    try: add(a.strip(), int(float(b.strip()))); return
                    except Exception: pass
    for key in ("enumeration","counts","bins"):
        if key in node: consume(node[key])
    return out

def dimension_counts(stats, name):
    best = {}
    for d in walk(stats):
        if str(d.get("name")) == name:
            c = enum_counts(d)
            if sum(c.values()) > sum(best.values()): best = c
    return best

def extract_crs(metadata):
    text = json.dumps(metadata)
    wkt = None
    for d in walk(metadata):
        for k, v in d.items():
            if isinstance(v, str) and any(tok in v for tok in ("PROJCRS[","PROJCS[","COMPOUNDCRS[","COMPD_CS[")):
                if wkt is None or len(v) > len(wkt): wkt = v
    upper = text.upper()
    vertical_in_header = "NAVD88" in upper or "VERTCRS" in upper or "VERT_CS" in upper
    geoid_in_header = "GEOID12B" in upper
    return {
        "header_wkt": wkt,
        "header_mentions_navd88_or_vertical_crs": vertical_in_header,
        "header_mentions_geoid12b": geoid_in_header,
        "vertical_datum_resolution": "header" if vertical_in_header else "authoritative_project_metadata",
        "resolved_vertical_datum": PROJECT_META["vertical_datum"],
        "resolved_geoid_model": PROJECT_META["geoid_model"],
    }

def download(url, dest):
    cmd = ["curl","--fail","--location","--retry","8","--retry-delay","2","--retry-all-errors","--continue-at","-","--output",str(dest),url]
    p = subprocess.run(cmd, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if p.returncode != 0:
        raise RuntimeError("curl failed: " + p.stderr[-3000:])

def pdal_json(path, args):
    p = run(PDAL + ["info", str(path)] + args)
    return json.loads(p.stdout)

def validate_tile(tile, scratch, result_dir):
    idx = int(tile["index"])
    url = tile["download_url"]
    filename = pathlib.Path(url.split("?",1)[0]).name or f"tile_{idx}.laz"
    local = scratch / filename
    started = time.time()
    result = {
        "index": idx,
        "title": tile.get("title"),
        "filename": filename,
        "download_url": url,
        "catalog_size_bytes": tile.get("catalog_size_bytes"),
        "source_id": tile.get("source_id"),
        "status": "FAIL",
        "checks": {},
        "project_metadata_used": PROJECT_META,
    }
    try:
        download(url, local)
        size = local.stat().st_size
        sha = hashlib.sha256()
        with local.open("rb") as f:
            for chunk in iter(lambda: f.read(8*1024*1024), b""): sha.update(chunk)
        result["downloaded_size_bytes"] = size
        result["sha256"] = sha.hexdigest()
        cat_size = tile.get("catalog_size_bytes")
        result["checks"]["byte_size"] = "PASS" if cat_size in (None,0) or int(cat_size) == size else "FAIL"

        summary = pdal_json(local, ["--summary"])
        metadata = pdal_json(local, ["--metadata"])
        stats = pdal_json(local, ["--stats","--dimensions=Classification,ReturnNumber,NumberOfReturns,Intensity,Z","--enumerate=Classification,ReturnNumber,NumberOfReturns"])
        result["checks"]["full_decode"] = "PASS"

        points = find_point_count(summary)
        bounds = find_bounds(summary)
        classes = dimension_counts(stats, "Classification")
        rnum = dimension_counts(stats, "ReturnNumber")
        nret = dimension_counts(stats, "NumberOfReturns")
        ground = int(classes.get("2", 0))
        result["point_count"] = points
        result["projected_bounds"] = bounds
        result["classification_counts"] = classes
        result["return_number_counts"] = rnum
        result["number_of_returns_counts"] = nret
        result["ground_class_2_count"] = ground
        result["crs"] = extract_crs(metadata)

        # Project source CRS uses international feet. Area conversion is therefore deterministic.
        unit_to_m = 0.3048
        area_native = ((bounds["maxx"]-bounds["minx"])*(bounds["maxy"]-bounds["miny"])) if bounds else None
        area_m2 = area_native * unit_to_m * unit_to_m if area_native else None
        result["area_native_sq_ft"] = area_native
        result["area_m2"] = area_m2
        result["total_density_pts_m2"] = points/area_m2 if points and area_m2 else None
        result["ground_density_pts_m2"] = ground/area_m2 if ground and area_m2 else None

        result["checks"]["point_count"] = "PASS" if points and points > 0 else "FAIL"
        result["checks"]["bounds"] = "PASS" if bounds else "FAIL"
        result["checks"]["classification"] = "PASS" if classes else "FAIL"
        result["checks"]["ground_class_2"] = "PASS" if ground > 0 else "FAIL"
        result["checks"]["returns"] = "PASS" if rnum and nret else "FAIL"
        result["checks"]["density"] = "PASS" if result["total_density_pts_m2"] and result["total_density_pts_m2"] > 0 else "FAIL"
        result["checks"]["vertical_datum_resolved"] = "PASS"
        result["status"] = "PASS" if all(v == "PASS" for v in result["checks"].values()) else "FAIL"
    except Exception as e:
        result["error"] = f"{type(e).__name__}: {e}"
        if local.exists() and local.stat().st_size:
            result["partial_size_bytes"] = local.stat().st_size
    finally:
        result["elapsed_seconds"] = round(time.time() - started, 3)
        (result_dir / f"tile_{idx:05d}.json").write_text(json.dumps(result, indent=2, sort_keys=True) + "\n")
        try: local.unlink()
        except FileNotFoundError: pass
    return result

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", required=True)
    ap.add_argument("--shard-index", type=int, required=True)
    ap.add_argument("--shard-count", type=int, required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()
    manifest = json.loads(pathlib.Path(args.manifest).read_text())
    out = pathlib.Path(args.out); results = out / "results"; scratch = out / "scratch"
    results.mkdir(parents=True, exist_ok=True); scratch.mkdir(parents=True, exist_ok=True)
    assigned = [t for t in manifest["tiles"] if int(t["index"]) % args.shard_count == args.shard_index]
    summary = {"shard_index": args.shard_index, "shard_count": args.shard_count, "assigned": len(assigned), "pass":0, "fail":0}
    for tile in assigned:
        r = validate_tile(tile, scratch, results)
        summary["pass" if r["status"] == "PASS" else "fail"] += 1
        print(json.dumps({"index": r["index"], "filename": r["filename"], "status": r["status"], "error": r.get("error")}), flush=True)
    shutil.rmtree(scratch, ignore_errors=True)
    (out / "shard_summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print(json.dumps(summary, indent=2))
    # Never abort the batch for per-tile failures; aggregate stage owns the final gate.
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
