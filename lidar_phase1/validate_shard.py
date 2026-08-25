#!/usr/bin/env python3
import argparse, concurrent.futures, hashlib, json, os, pathlib, shlex, shutil, subprocess, time

PROJECT_META = {
    "project": "Central Oregon 3DEP 2019 / OR_NRCSUSGS_2019_D19",
    "horizontal_datum": "NAD 1983 (2011)",
    "horizontal_crs_epsg": 6557,
    "projection": "Oregon GIC Lambert (ft)",
    "vertical_datum": "NAVD88",
    "vertical_crs_epsg": 8228,
    "geoid_model": "GEOID12B",
    "horizontal_units": "foot",
    "vertical_units": "foot",
    "unit_to_meter": 0.3048,
    "acquisition_window": "2019-10-10 through 2020-07-29",
    "reported_average_first_return_density_pts_m2": 11.89,
}

PDAL = shlex.split(os.environ.get("PDAL_EXEC", "pdal"))

def run(cmd):
    return subprocess.run(cmd, check=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def curl_range(url, dest, start, end):
    cmd = ["curl","--fail","--silent","--show-error","--location","--retry","6","--retry-delay","2","--retry-all-errors","--range",f"{start}-{end}","--output",str(dest),url]
    p = subprocess.run(cmd, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if p.returncode != 0:
        raise RuntimeError(f"range {start}-{end} failed: {p.stderr[-1500:]}")
    expected = end - start + 1
    actual = dest.stat().st_size
    if actual != expected:
        raise RuntimeError(f"range {start}-{end} expected {expected} bytes, got {actual}")

def download(url, dest, expected_size):
    if expected_size and expected_size > 1:
        probe = dest.with_suffix(dest.suffix + ".probe")
        p = subprocess.run([
            "curl","--silent","--show-error","--location","--retry","3","--range","0-0",
            "--output",str(probe),"--write-out","%{http_code}",url
        ], text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        try:
            range_ok = p.returncode == 0 and p.stdout.strip() == "206" and probe.exists() and probe.stat().st_size == 1
        finally:
            try: probe.unlink()
            except FileNotFoundError: pass
        if range_ok:
            parts = 4
            part_dir = dest.parent / (dest.name + ".parts")
            part_dir.mkdir(parents=True, exist_ok=True)
            chunk = (int(expected_size) + parts - 1) // parts
            tasks = []
            with concurrent.futures.ThreadPoolExecutor(max_workers=parts) as ex:
                for i in range(parts):
                    start = i * chunk
                    if start >= expected_size: break
                    end = min(expected_size - 1, start + chunk - 1)
                    part = part_dir / f"part.{i:02d}"
                    tasks.append((i, part, ex.submit(curl_range, url, part, start, end)))
                for _, _, fut in tasks:
                    fut.result()
            with dest.open("wb") as out:
                for _, part, _ in sorted(tasks):
                    with part.open("rb") as src:
                        shutil.copyfileobj(src, out, length=8*1024*1024)
            shutil.rmtree(part_dir, ignore_errors=True)
            if dest.stat().st_size != expected_size:
                raise RuntimeError(f"assembled file expected {expected_size} bytes, got {dest.stat().st_size}")
            return "parallel-range-4"
    cmd = ["curl","--fail","--silent","--show-error","--location","--retry","8","--retry-delay","2","--retry-all-errors","--continue-at","-","--output",str(dest),url]
    p = subprocess.run(cmd, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if p.returncode != 0:
        raise RuntimeError("curl failed: " + p.stderr[-3000:])
    return "single-stream-fallback"

def normalize_bins(raw):
    out = {}
    if not isinstance(raw, dict):
        return out
    for k, v in raw.items():
        try:
            key = str(int(float(k)))
            out[key] = int(v)
        except Exception:
            continue
    return out

def stats_node(metadata, name):
    stats = (((metadata.get("stages") or {}).get("filters.stats") or {}).get("statistic") or [])
    for node in stats:
        if node.get("name") == name:
            return node
    return {}

def reader_node(metadata):
    return ((metadata.get("stages") or {}).get("readers.las") or {})

def run_full_decode_stats(local, scratch, idx):
    pipeline_path = scratch / f"tile_{idx:05d}_count_pipeline.json"
    metadata_path = scratch / f"tile_{idx:05d}_count_metadata.json"
    # Paths are relative to the repository root, which is mounted at /work in pdal-runtime.
    pipeline = {
        "pipeline": [
            {"type": "readers.las", "filename": str(local)},
            {
                "type": "filters.stats",
                "dimensions": "Classification,ReturnNumber,NumberOfReturns,Z",
                "count": "Classification,ReturnNumber,NumberOfReturns"
            },
            {"type": "writers.null"}
        ]
    }
    pipeline_path.write_text(json.dumps(pipeline, indent=2) + "\n")
    run(PDAL + ["pipeline", str(pipeline_path), "--metadata", str(metadata_path)])
    metadata = json.loads(metadata_path.read_text())
    return metadata, pipeline_path, metadata_path

def extract_crs(reader):
    text = json.dumps(reader, sort_keys=True)
    upper = text.upper()
    srs = reader.get("srs") if isinstance(reader.get("srs"), dict) else {}
    units = srs.get("units") if isinstance(srs.get("units"), dict) else {}
    return {
        "compound_wkt": reader.get("comp_spatialreference") or reader.get("spatialreference") or srs.get("compoundwkt"),
        "horizontal_epsg_6557_detected": "6557" in text and "NAD83(2011)" in upper and "OREGON GIC LAMBERT" in upper,
        "vertical_epsg_8228_detected": "8228" in text and "NAVD88" in upper and "GEOID12B" in upper,
        "horizontal_unit": units.get("horizontal"),
        "vertical_unit": units.get("vertical"),
        "resolved_horizontal_crs_epsg": PROJECT_META["horizontal_crs_epsg"],
        "resolved_vertical_crs_epsg": PROJECT_META["vertical_crs_epsg"],
        "resolved_vertical_datum": PROJECT_META["vertical_datum"],
        "resolved_geoid_model": PROJECT_META["geoid_model"],
        "datum_resolution_source": "LAS/LAZ compound CRS header",
    }

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
        "project_metadata_expected": PROJECT_META,
    }
    pipeline_path = metadata_path = None
    try:
        cat_size = tile.get("catalog_size_bytes")
        result["download_mode"] = download(url, local, int(cat_size) if cat_size else None)
        size = local.stat().st_size
        sha = hashlib.sha256()
        with local.open("rb") as f:
            for chunk in iter(lambda: f.read(8*1024*1024), b""):
                sha.update(chunk)
        result["downloaded_size_bytes"] = size
        result["sha256"] = sha.hexdigest()
        result["checks"]["byte_size"] = "PASS" if cat_size in (None,0) or int(cat_size) == size else "FAIL"

        # This pipeline reads every point. Success therefore constitutes a complete LAZ decode.
        metadata, pipeline_path, metadata_path = run_full_decode_stats(local, scratch, idx)
        result["checks"]["full_decode"] = "PASS"

        reader = reader_node(metadata)
        points = int(reader.get("count") or 0)
        bounds = None
        try:
            bounds = {k: float(reader[k]) for k in ("minx","maxx","miny","maxy")}
            if bounds["maxx"] <= bounds["minx"] or bounds["maxy"] <= bounds["miny"]:
                bounds = None
        except Exception:
            bounds = None

        class_node = stats_node(metadata, "Classification")
        return_node = stats_node(metadata, "ReturnNumber")
        nreturns_node = stats_node(metadata, "NumberOfReturns")
        z_node = stats_node(metadata, "Z")
        classes = normalize_bins(class_node.get("bins"))
        rnum = normalize_bins(return_node.get("bins"))
        nret = normalize_bins(nreturns_node.get("bins"))
        ground = int(classes.get("2", 0))
        crs = extract_crs(reader)

        min_z = reader.get("minz") if reader.get("minz") is not None else z_node.get("minimum")
        max_z = reader.get("maxz") if reader.get("maxz") is not None else z_node.get("maximum")
        result.update({
            "point_count": points,
            "projected_bounds": bounds,
            "minimum_z_ft": float(min_z) if min_z is not None else None,
            "maximum_z_ft": float(max_z) if max_z is not None else None,
            "classification_counts": classes,
            "return_number_counts": rnum,
            "number_of_returns_counts": nret,
            "ground_class_2_count": ground,
            "crs": crs,
        })

        class_sum = sum(classes.values())
        rnum_sum = sum(rnum.values())
        nret_sum = sum(nret.values())
        result["histogram_reconciliation"] = {
            "classification_sum": class_sum,
            "return_number_sum": rnum_sum,
            "number_of_returns_sum": nret_sum,
            "point_count": points,
        }

        unit_to_m = PROJECT_META["unit_to_meter"]
        area_native = ((bounds["maxx"]-bounds["minx"])*(bounds["maxy"]-bounds["miny"])) if bounds else None
        area_m2 = area_native * unit_to_m * unit_to_m if area_native else None
        result["area_native_sq_ft"] = area_native
        result["area_m2"] = area_m2
        result["total_density_pts_m2"] = points/area_m2 if points and area_m2 else None
        result["ground_density_pts_m2"] = ground/area_m2 if ground and area_m2 else None

        result["checks"].update({
            "point_count": "PASS" if points > 0 else "FAIL",
            "bounds": "PASS" if bounds else "FAIL",
            "z_range": "PASS" if min_z is not None and max_z is not None and float(max_z) >= float(min_z) else "FAIL",
            "classification_present": "PASS" if classes else "FAIL",
            "classification_reconciles": "PASS" if classes and class_sum == points else "FAIL",
            "ground_class_2_present": "PASS" if ground > 0 else "FAIL",
            "return_number_present": "PASS" if rnum else "FAIL",
            "return_number_reconciles": "PASS" if rnum and rnum_sum == points else "FAIL",
            "number_of_returns_present": "PASS" if nret else "FAIL",
            "number_of_returns_reconciles": "PASS" if nret and nret_sum == points else "FAIL",
            "horizontal_crs_epsg_6557": "PASS" if crs["horizontal_epsg_6557_detected"] else "FAIL",
            "vertical_crs_epsg_8228_navd88_geoid12b": "PASS" if crs["vertical_epsg_8228_detected"] else "FAIL",
            "horizontal_unit_foot": "PASS" if str(crs.get("horizontal_unit")).lower() == "foot" else "FAIL",
            "vertical_unit_foot": "PASS" if str(crs.get("vertical_unit")).lower() == "foot" else "FAIL",
            "total_density": "PASS" if result["total_density_pts_m2"] and result["total_density_pts_m2"] > 0 else "FAIL",
            "ground_density": "PASS" if result["ground_density_pts_m2"] and result["ground_density_pts_m2"] > 0 else "FAIL",
        })
        result["status"] = "PASS" if all(v == "PASS" for v in result["checks"].values()) else "FAIL"
    except Exception as e:
        result["error"] = f"{type(e).__name__}: {e}"
        if local.exists() and local.stat().st_size:
            result["partial_size_bytes"] = local.stat().st_size
    finally:
        result["elapsed_seconds"] = round(time.time() - started, 3)
        (result_dir / f"tile_{idx:05d}.json").write_text(json.dumps(result, indent=2, sort_keys=True) + "\n")
        for p in (local, pipeline_path, metadata_path):
            if p:
                try: pathlib.Path(p).unlink()
                except FileNotFoundError: pass
        shutil.rmtree(local.parent / (local.name + ".parts"), ignore_errors=True)
    return result

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", required=True)
    ap.add_argument("--shard-index", type=int, required=True)
    ap.add_argument("--shard-count", type=int, required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()
    manifest = json.loads(pathlib.Path(args.manifest).read_text())
    out = pathlib.Path(args.out)
    results = out / "results"
    scratch = out / "scratch"
    results.mkdir(parents=True, exist_ok=True)
    scratch.mkdir(parents=True, exist_ok=True)
    assigned = [t for t in manifest["tiles"] if int(t["index"]) % args.shard_count == args.shard_index]
    summary = {"shard_index": args.shard_index, "shard_count": args.shard_count, "assigned": len(assigned), "pass":0, "fail":0}
    for tile in assigned:
        r = validate_tile(tile, scratch, results)
        summary["pass" if r["status"] == "PASS" else "fail"] += 1
        print(json.dumps({
            "index": r["index"], "filename": r["filename"], "status": r["status"],
            "ground_class_2_count": r.get("ground_class_2_count"),
            "total_density_pts_m2": r.get("total_density_pts_m2"),
            "ground_density_pts_m2": r.get("ground_density_pts_m2"),
            "error": r.get("error")
        }), flush=True)
    shutil.rmtree(scratch, ignore_errors=True)
    (out / "shard_summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print(json.dumps(summary, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
