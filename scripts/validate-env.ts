/**
 * Environment Validation Script
 * Loads Next.js env files and reports missing runtime configuration.
 */

import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const CORE_RUNTIME_VARS = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_API_TOKEN',
  'DATABASE_URL',
  'PINECONE_API_KEY',
  'PINECONE_INDEX',
  'RESEND_API_KEY',
];

const OPTIONAL_VARS = [
  {
    name: 'OPENROUTER_API_KEY',
    reason: 'AI recommendation routes will be unavailable without it.',
  },
  {
    name: 'GEOAPIFY_API_KEY',
    reason: 'Server geocoding will fall back to Census when it is missing.',
  },
  {
    name: 'NEXT_PUBLIC_GEOAPIFY_API_KEY',
    reason:
      'Client address autocomplete will fall back to OpenStreetMap/Census.',
  },
  {
    name: 'NEXT_PUBLIC_SENTRY_DSN',
    reason: 'Sentry monitoring stays disabled until a real DSN is configured.',
  },
];

function validate() {
  console.log('🔍 Validating environment configuration...');
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
