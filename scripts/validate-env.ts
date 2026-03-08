/**
 * Environment Validation Script
 * Ensures all required API keys and configuration values are present before build.
 */

const REQUIRED_VARS = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_API_TOKEN',
  'DATABASE_URL',
  'PINECONE_API_KEY',
  'PINECONE_INDEX',
  'OPENROUTER_API_KEY',
  'RESEND_API_KEY',
  'NEXT_PUBLIC_SENTRY_DSN',
  'GEOAPIFY_API_KEY',
];

function validate() {
  console.log('🔍 Validating environment configuration...');
  const missing = [];

  for (const v of REQUIRED_VARS) {
    if (!process.env[v]) {
      missing.push(v);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(m => console.error(`   - ${m}`));
    // In production/CI, we want to fail the build
    if (process.env.NODE_ENV === 'production' || process.env.CI) {
      process.exit(1);
    }
  } else {
    console.log('✅ All required environment variables are present.');
  }
}

validate();
