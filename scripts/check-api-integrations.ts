import { loadEnvConfig } from '@next/env';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

loadEnvConfig(process.cwd());

type Severity = 'required' | 'recommended';

interface IntegrationCheck {
  name: string;
  severity: Severity;
  keys: string[];
  notes: string;
  isConfigured?: () => boolean;
}

const PLACEHOLDER_VALUES = new Set([
  'PLACEHOLDER',
  'production',
  '49142342',
  '555-666',
  '111-222',
  'prj_NFlLiigV9iuRlpMHDjB1wkde2Dpd',
]);

const CHECKS: IntegrationCheck[] = [
  {
    name: 'Geoapify server geocoding',
    severity: 'required',
    keys: ['GEOAPIFY_API_KEY'],
    notes: 'Primary address geocoding provider.',
  },
  {
    name: 'Geoapify client autocomplete',
    severity: 'required',
    keys: ['NEXT_PUBLIC_GEOAPIFY_API_KEY'],
    notes: 'Browser address autocomplete provider.',
  },
  {
    name: 'Gumloop agreement workflows',
    severity: 'required',
    keys: ['GUMLOOP_API_KEY', 'GUMLOOP_USER_ID', 'GUMLOOP_PIPELINE_ID'],
    notes: 'Specialized maintenance recommendation pipeline.',
  },
  {
    name: 'iGUIDE authenticated API',
    severity: 'required',
    keys: ['IGUIDE_API_KEY'],
    notes: 'Authenticated iGUIDE portal access for private view summaries.',
  },
  {
    name: 'HubSpot CRM sync',
    severity: 'required',
    keys: ['HUBSPOT_ACCESS_TOKEN'],
    notes: 'Server-side CRM sync via env token or authenticated hs CLI token.',
    isConfigured: () =>
      isConfigured('HUBSPOT_ACCESS_TOKEN') || hasHubSpotCliToken(),
  },
  {
    name: 'HubSpot frontend form embeds',
    severity: 'recommended',
    keys: [
      'NEXT_PUBLIC_HUBSPOT_PORTAL_ID',
      'NEXT_PUBLIC_HUBSPOT_CALCULATOR_FORM_ID',
      'NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID',
    ],
    notes: 'Public form embeds require portal and form IDs with forms scope.',
  },
  {
    name: 'Sentry client monitoring',
    severity: 'recommended',
    keys: ['NEXT_PUBLIC_SENTRY_DSN'],
    notes: 'Recommended for production observability.',
  },
];

function isConfigured(key: string): boolean {
  const value = process.env[key];
  if (!value) return false;
  return !PLACEHOLDER_VALUES.has(value);
}

function hasHubSpotCliToken(): boolean {
  try {
    const configPath = join(homedir(), '.hscli', 'config.yml');
    const config = readFileSync(configPath, 'utf8');
    return /accessToken:\s*>-\s*\n\s*[A-Za-z0-9._-]+/m.test(config);
  } catch {
    return false;
  }
}

function formatStatus(ok: boolean): string {
  return ok ? 'OK' : 'MISSING';
}

function run(): void {
  const strict = process.argv.includes('--strict');
  let hardFailures = 0;

  console.log('API integration audit');

  for (const check of CHECKS) {
    const missing = check.keys.filter((key) => !isConfigured(key));
    const ok = check.isConfigured ? check.isConfigured() : missing.length === 0;
    const severityLabel = check.severity.toUpperCase();

    console.log(`\n[${formatStatus(ok)}] ${check.name} (${severityLabel})`);
    console.log(`  ${check.notes}`);

    if (ok) {
      console.log(`  Keys: ${check.keys.join(', ')}`);
      continue;
    }

    console.log(`  Missing: ${missing.join(', ')}`);

    if (check.severity === 'required') {
      hardFailures++;
    }
  }

  if (strict && hardFailures > 0) {
    console.error(
      `\n${hardFailures} required integration group(s) are incomplete.`,
    );
    process.exit(1);
  }
}

run();
