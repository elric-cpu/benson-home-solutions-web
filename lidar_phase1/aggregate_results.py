#!/usr/bin/env python3
import argparse, csv, json, pathlib, statistics

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", required=True)
    ap.add_argument("--results-root", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    manifest = json.loads(pathlib.Path(args.manifest).read_text())
    root = pathlib.Path(args.results_root)
    out = pathlib.Path(args.out); out.mkdir(parents=True, exist_ok=True)
    files = sorted(root.rglob("tile_*.json"))
    rows = [json.loads(p.read_text()) for p in files]
    by_idx = {int(r["index"]): r for r in rows}
    expected_indices = {int(t["index"]) for t in manifest["tiles"]}
    missing = sorted(expected_indices - set(by_idx))
    extras = sorted(set(by_idx) - expected_indices)
    failures = [r for r in rows if r.get("status") != "PASS"]
    passes = [r for r in rows if r.get("status") == "PASS"]
    densities = [r.get("total_density_pts_m2") for r in passes if r.get("total_density_pts_m2") is not None]
    ground_densities = [r.get("ground_density_pts_m2") for r in passes if r.get("ground_density_pts_m2") is not None]

    report = {
        "phase": "Phase 1 - LiDAR source validation",
        "manifest_resolved_tile_count": manifest.get("resolved_tile_count"),
        "prior_inventory_expected_tile_count": manifest.get("expected_tile_count_from_prior_inventory"),
        "manifest_count_matches_prior_inventory": manifest.get("count_matches_prior_inventory"),
        "results_received": len(rows),
        "pass_count": len(passes),
        "fail_count": len(failures),
        "missing_result_indices": missing,
        "unexpected_result_indices": extras,
        "all_manifest_tiles_attempted": not missing and not extras and len(rows) == len(expected_indices),
        "all_tiles_pass": not failures and not missing and not extras and len(rows) == len(expected_indices),
        "density_pts_m2": {
            "min": min(densities) if densities else None,
            "median": statistics.median(densities) if densities else None,
            "max": max(densities) if densities else None,
        },
        "ground_density_pts_m2": {
            "min": min(ground_densities) if ground_densities else None,
            "median": statistics.median(ground_densities) if ground_densities else None,
            "max": max(ground_densities) if ground_densities else None,
        },
        "failed_tiles": [{"index":r.get("index"),"filename":r.get("filename"),"error":r.get("error"),"checks":r.get("checks")} for r in failures],
    }
    (out / "phase1_validation_summary.json").write_text(json.dumps(report, indent=2, sort_keys=True) + "\n")

    fields = ["index","filename","status","downloaded_size_bytes","sha256","point_count","ground_class_2_count","total_density_pts_m2","ground_density_pts_m2","elapsed_seconds","error"]
    with (out / "phase1_tile_results.csv").open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields); w.writeheader()
        for r in sorted(rows, key=lambda x:int(x["index"])):
            w.writerow({k:r.get(k) for k in fields})

    (out / "failed_tile_indices.txt").write_text("\n".join(str(r["index"]) for r in failures) + ("\n" if failures else ""))
    print(json.dumps(report, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
