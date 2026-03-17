#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${HOSTINGER_API_TOKEN:-}" ]]; then
  echo "HOSTINGER_API_TOKEN is required" >&2
  exit 1
fi

if [[ $# -lt 2 ]]; then
  echo "Usage:" >&2
  echo "  $0 get <domain>" >&2
  echo "  $0 validate <domain>" >&2
  echo "  $0 put <domain> <json-file>" >&2
  echo "  $0 verify-ownership <domain>" >&2
  exit 1
fi

base_url='https://developers.hostinger.com'
action="$1"
domain="$2"

auth_header="Authorization: Bearer ${HOSTINGER_API_TOKEN}"
json_header='Content-Type: application/json'

case "$action" in
  get)
    curl -sS "${base_url}/api/dns/v1/zones/${domain}" \
      -H "${auth_header}" | jq
    ;;
  validate)
    curl -sS -X POST "${base_url}/api/dns/v1/zones/${domain}/validate" \
      -H "${auth_header}" \
      -H "${json_header}" | jq
    ;;
  put)
    if [[ $# -ne 3 ]]; then
      echo "put requires a JSON file" >&2
      exit 1
    fi

    payload_file="$3"
    curl -sS -X PUT "${base_url}/api/dns/v1/zones/${domain}" \
      -H "${auth_header}" \
      -H "${json_header}" \
      --data-binary "@${payload_file}" | jq
    ;;
  verify-ownership)
    curl -sS -X POST "${base_url}/api/hosting/v1/domains/verify-ownership" \
      -H "${auth_header}" \
      -H "${json_header}" \
      -d "{\"domain\":\"${domain}\"}" | jq
    ;;
  *)
    echo "Unknown action: ${action}" >&2
    exit 1
    ;;
esac
