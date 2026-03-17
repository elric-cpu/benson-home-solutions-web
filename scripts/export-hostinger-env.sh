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
  OPENROUTER_API_KEY
  GEOAPIFY_API_KEY
  NEXT_PUBLIC_GEOAPIFY_API_KEY
  NEXT_PUBLIC_SENTRY_DSN
  NOTION_API_KEY
  NOTION_DB_KNOWLEDGE
  NOTION_DB_PROPERTIES
  NOTION_DB_CLIENTS
  NOTION_DB_AGREEMENTS
  NOTION_DB_SERVICE_LOG
  HUD_API_TOKEN
  COMPANYCAM_WEBHOOK_TOKEN
  BHS_WEBHOOK_SECRET
  NOTION_WEBHOOK_SECRET
  SUPABASE_WEBHOOK_SECRET
  ADMIN_SECRET
  GUMLOOP_API_KEY
  GUMLOOP_USER_ID
  GUMLOOP_PIPELINE_ID
  GUMLOOP_SEO_PIPELINE_ID
  SIGNATURE_PROVIDER
  SIGNATURE_API_KEY
  IGUIDE_API_KEY
  IGUIDE_API_BASE_URL
  IGUIDE_PUBLIC_BASE_URL
  METABASE_SITE_URL
  METABASE_SECRET_KEY
  METABASE_EMBED_SECRET
  MUX_GATED_CONTENT
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
