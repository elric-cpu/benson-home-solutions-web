#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <base-url>" >&2
  echo "Example: $0 https://azure-crow-946922.hostingersite.com" >&2
  exit 1
fi

base_url="${1%/}"

echo "Smoke testing ${base_url}"
echo

echo "== GET / =="
curl -fsSL -D /tmp/hostinger-home.headers "${base_url}/" -o /tmp/hostinger-home.body
head -n 20 /tmp/hostinger-home.headers
echo
if ! grep -qi "<html" /tmp/hostinger-home.body; then
  echo "FAIL: homepage response does not look like HTML" >&2
  exit 1
fi
echo "PASS: homepage returned HTML"
echo

echo "== GET /api/health =="
curl -fsSL -D /tmp/hostinger-health.headers "${base_url}/api/health" -o /tmp/hostinger-health.body
head -n 20 /tmp/hostinger-health.headers
echo
cat /tmp/hostinger-health.body
echo
if ! grep -q '"database"' /tmp/hostinger-health.body; then
  echo "FAIL: /api/health response missing expected config flags" >&2
  exit 1
fi
echo "PASS: /api/health returned expected JSON"
