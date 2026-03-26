// Lighthouse CI Configuration
// Baseline budgets for Sprint 1 — tighten in Sprint 2
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'node .next/standalone/server.js',
      startServerReadyPattern: 'Ready in',
      startServerTimeout: 120000,
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        // Skip HTTPS and service worker checks for localhost
        skipAudits: ['is-on-https', 'service-worker'],
      },
    },
    assert: {
      assertions: {
        // Sprint 1 baseline — relaxed for scaffold pages
        // TODO: Sprint 2 — tighten to 0.9 across all categories
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.8 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
