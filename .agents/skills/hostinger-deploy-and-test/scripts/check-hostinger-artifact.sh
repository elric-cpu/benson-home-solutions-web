#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
artifact_dir="${1:-${root_dir}/.hostinger/node-app}"
artifact_tgz="${2:-${root_dir}/.hostinger/node-app.tgz}"
env_file="${3:-${root_dir}/.hostinger/.env.production}"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

[[ -d "${artifact_dir}" ]] || fail "missing artifact directory: ${artifact_dir}"
[[ -f "${artifact_tgz}" ]] || fail "missing artifact tarball: ${artifact_tgz}"
[[ -f "${env_file}" ]] || fail "missing env file: ${env_file}"
[[ -f "${artifact_dir}/server.js" ]] || fail "missing server.js in artifact"
[[ -f "${artifact_dir}/start-hostinger.sh" ]] || fail "missing start-hostinger.sh in artifact"
[[ -d "${artifact_dir}/.next/static" ]] || fail "missing .next/static in artifact"

echo "PASS: Hostinger artifact looks complete"
echo "artifact_dir=${artifact_dir}"
echo "artifact_tgz=${artifact_tgz}"
echo "env_file=${env_file}"
