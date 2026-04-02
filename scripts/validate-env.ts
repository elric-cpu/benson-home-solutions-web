/**
 * Environment Validation Script
 * Loads Next.js env files and reports missing runtime configuration.
 */

import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const CORE_RUNTIME_VARS = [
  'DATABASE_URL',
  'GCLOUD_PROJECT',
  'GOOGLE_CLOUD_LOCATION',
  'GOOGLE_MAPS_API_KEY',
  'GCS_BUCKET_NAME',
];

const OPTIONAL_VARS = [
  {
    name: 'NEXT_PUBLIC_SENTRY_DSN',
    reason: 'Sentry monitoring stays disabled until a real DSN is configured.',
  },
  {
    name: 'ENABLE_MULTI_AGENT',
    reason: 'Multi-agent office mode defaults to enabled unless explicitly turned off.',
  },
  {
    name: 'NEXT_PUBLIC_ENABLE_MULTI_AGENT',
    reason: 'Client-side chat badge and request mode default to enabled unless explicitly turned off.',
  },
  {
    name: 'NEXT_PUBLIC_SANITY_PROJECT_ID',
    reason: 'Legacy Sanity fallback content will be disabled.',
  },
  {
    name: 'NEXT_PUBLIC_SANITY_DATASET',
    reason: 'Legacy Sanity fallback content will be disabled.',
  },
  {
    name: 'SANITY_API_TOKEN',
    reason: 'Legacy Sanity fallback content will be disabled.',
  },
  {
    name: 'GOOGLE_WORKSPACE_SENDER',
    reason: 'Gmail-based notifications will be skipped unless Workspace sending is configured.',
  },
  {
    name: 'GOOGLE_WORKSPACE_IMPERSONATED_USER',
    reason: 'Workspace APIs will rely on GOOGLE_WORKSPACE_SENDER or remain disabled.',
  },
  {
    name: 'GOOGLE_WORKSPACE_AGREEMENTS_FOLDER_ID',
    reason: 'Agreement documents will remain in the Workspace root or use mock links.',
  },
  {
    name: 'FIRESTORE_CONTENT_ROOT',
    reason: 'Firestore content collections will default to the website_content prefix.',
  },
];

function validate() {
  console.log('🔍 Validating environment configuration (Gcloud Native)...');
  const missingCore = [];
  const optionalMissing = [];
  const shouldFail =
    process.env.STRICT_ENV_VALIDATION === 'true' ||
    process.env.VALIDATE_ENV_STRICT === 'true';

  for (const v of CORE_RUNTIME_VARS) {
    if (!process.env[v]) {
      missingCore.push(v);
    }
  }

  for (const v of OPTIONAL_VARS) {
    if (!process.env[v.name]) {
      optionalMissing.push(v);
    }
  }

  if (missingCore.length > 0) {
    console.warn('⚠️ Missing core runtime environment variables:');
    missingCore.forEach((m) => console.warn(`   - ${m}`));
    if (shouldFail) {
      console.error(
        '❌ Strict env validation is enabled, failing due to missing core runtime variables.',
      );
      process.exit(1);
    }
  } else {
    console.log('✅ All required environment variables are present.');
  }

  if (optionalMissing.length > 0) {
    console.warn('⚠️ Missing optional environment variables:');
    optionalMissing.forEach(({ name, reason }) =>
      console.warn(`   - ${name}: ${reason}`),
    );
  }
}

validate();
