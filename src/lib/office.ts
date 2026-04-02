export type OfficeAgentMode = 'single' | 'multi';

type OfficeAgent = {
  id: string;
  name: string;
  role: string;
  summary: string;
  keywords: string[];
};

const DISABLED_FLAG_VALUES = new Set(['0', 'false', 'off', 'no', 'disabled']);

const OFFICE_AGENTS: OfficeAgent[] = [
  {
    id: 'growth_director',
    name: 'Mara Voss',
    role: 'Growth Director',
    summary: 'Owns SEO, CRO, revenue impact, and authority strategy.',
    keywords: ['seo', 'ranking', 'traffic', 'content', 'conversion', 'lead', 'customer'],
  },
  {
    id: 'search_dominance',
    name: 'Silas Wren',
    role: 'Search Dominance Lead',
    summary: 'Owns crawl audits, local SEO, GEO/AEO, schema, and internal linking.',
    keywords: ['seo', 'google', 'search', 'schema', 'ranking', 'citation', 'local seo'],
  },
  {
    id: 'content_production',
    name: 'Rook Mercer',
    role: 'Content Production Lead',
    summary: 'Owns service pages, area pages, compare pages, blogs, and metadata.',
    keywords: ['page', 'copy', 'blog', 'content', 'write', 'headline', 'metadata'],
  },
  {
    id: 'platform_engineering',
    name: 'Nadia Kade',
    role: 'Platform Engineering Lead',
    summary: 'Owns frontend performance, APIs, forms, reliability, and Google runtime integrations.',
    keywords: [
      'bug',
      'website',
      'api',
      'chatbot',
      'form',
      'broken',
      'integration',
      'deployment',
      'performance',
      'speed',
    ],
  },
  {
    id: 'verification_release',
    name: 'Gideon Pike',
    role: 'Verification and Release Lead',
    summary: 'Owns QA, regression, accessibility, rollback, and release safety.',
    keywords: ['test', 'qa', 'accessibility', 'regression', 'broken', 'release', 'error'],
  },
  {
    id: 'analytics_experimentation',
    name: 'Tess Armitage',
    role: 'Analytics and Experimentation Lead',
    summary: 'Owns analytics, attribution, dashboards, experiments, and measurement integrity.',
    keywords: ['analytics', 'tracking', 'ga4', 'experiment', 'dashboard', 'attribution', 'metrics'],
  },
];

function normalizeFlagValue(value: string | undefined): string | undefined {
  return value?.trim().toLowerCase();
}

export function isMultiAgentEnabled(): boolean {
  const explicitFlag =
    normalizeFlagValue(process.env.ENABLE_MULTI_AGENT) ??
    normalizeFlagValue(process.env.NEXT_PUBLIC_ENABLE_MULTI_AGENT);

  if (!explicitFlag) {
    return true;
  }

  return !DISABLED_FLAG_VALUES.has(explicitFlag);
}

export function resolveOfficeAgentMode(requestedMode?: string | null): OfficeAgentMode {
  const normalizedMode = requestedMode?.trim().toLowerCase();

  if (normalizedMode === 'single') {
    return 'single';
  }

  if (!isMultiAgentEnabled()) {
    return 'single';
  }

  return 'multi';
}

export function getOfficeAgentModeLabel(mode: OfficeAgentMode): string {
  return mode === 'multi' ? 'Multi-agent office' : 'Single-agent assistant';
}

export function routeOfficeAgents(message: string) {
  const haystack = message.toLowerCase();

  const matches = OFFICE_AGENTS.filter(agent =>
    agent.keywords.some(keyword => haystack.includes(keyword)),
  );

  const lead = matches[0] ?? OFFICE_AGENTS.find(agent => agent.id === 'platform_engineering')!;
  const reviewers = matches
    .filter(agent => agent.id !== lead.id)
    .slice(0, 2);

  return {
    lead,
    reviewers,
  };
}
