#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${HOSTINGER_API_TOKEN:-}" ]]; then
  echo "HOSTINGER_API_TOKEN is required" >&2
  exit 1
fi

if [[ $# -lt 1 ]]; then
  echo "Usage:" >&2
  echo "  $0 list" >&2
  echo "  $0 get <website-id>" >&2
  echo "  $0 create <json-file>" >&2
  echo "  $0 patch <website-id> <json-file>" >&2
  echo "  $0 delete <website-id>" >&2
  echo "  $0 free-subdomain" >&2
  exit 1
fi

base_url='https://developers.hostinger.com'
action="$1"

auth_header="Authorization: Bearer ${HOSTINGER_API_TOKEN}"
json_header='Content-Type: application/json'

case "$action" in
  list)
    curl -sS "${base_url}/api/hosting/v1/websites" \
      -H "${auth_header}" | jq
    ;;
  get)
    website_id="${2:?website id required}"
    curl -sS "${base_url}/api/hosting/v1/websites/${website_id}" \
      -H "${auth_header}" | jq
    ;;
  create)
    payload_file="${2:?json file required}"
    curl -sS -X POST "${base_url}/api/hosting/v1/websites" \
      -H "${auth_header}" \
      -H "${json_header}" \
      --data-binary "@${payload_file}" | jq
    ;;
  patch)
    website_id="${2:?website id required}"
    payload_file="${3:?json file required}"
    curl -sS -X PATCH "${base_url}/api/hosting/v1/websites/${website_id}" \
      -H "${auth_header}" \
      -H "${json_header}" \
      --data-binary "@${payload_file}" | jq
    ;;
  delete)
    website_id="${2:?website id required}"
    curl -sS -X DELETE "${base_url}/api/hosting/v1/websites/${website_id}" \
      -H "${auth_header}" | jq
    ;;
  free-subdomain)
    curl -sS -X POST "${base_url}/api/hosting/v1/domains/free-subdomains" \
      -H "${auth_header}" \
      -H "${json_header}" | jq
    ;;
  *)
    echo "Unknown action: ${action}" >&2
    exit 1
    ;;
esac
