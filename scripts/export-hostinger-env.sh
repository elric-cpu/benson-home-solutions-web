#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_env="${root_dir}/.env"
output_env="${root_dir}/.hostinger/.env.production"

mkdir -p "${root_dir}/.hostinger"

if [[ ! -f "${source_env}" ]]; then
  echo "Missing ${source_env}" >&2
  exit 1
fi

keys=(
  DATABASE_URL
  NEXT_PUBLIC_SANITY_PROJECT_ID
  NEXT_PUBLIC_SANITY_DATASET
  SANITY_API_TOKEN
  PINECONE_API_KEY
  PINECONE_INDEX
  RESEND_API_KEY
  GA4_API_SECRET
  GA4_MEASUREMENT_ID
  GOOGLE_GENAI_API_KEY
  GOOGLE_MAPS_API_KEY
  GCS_BUCKET_NAME
  NEXT_PUBLIC_SENTRY_DSN
  NOTION_API_KEY
  NOTION_DB_KNOWLEDGE
  NOTION_DB_PROPERTIES
  NOTION_DB_CLIENTS
  NOTION_DB_AGREEMENTS
  NOTION_DB_SERVICE_LOG
  HUD_API_TOKEN
  BHS_WEBHOOK_SECRET
  ADMIN_SECRET
)

{
  echo "# Generated for Hostinger Node.js app deployment"
  echo "# Review before uploading into hPanel Environment Variables"
  echo
  for key in "${keys[@]}"; do
    if line="$(grep -E "^${key}=" "${source_env}" | tail -n 1)"; then
      echo "${line}"
    fi
  done
} > "${output_env}"

echo "Exported Hostinger env file:"
echo "  ${output_env}"
