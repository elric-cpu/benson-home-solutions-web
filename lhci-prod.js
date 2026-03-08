module.exports = {
  ci: {
    collect: {
      url: [
        'https://bensonhomesolutions.com/',
        'https://bensonhomesolutions.com/tools/subscription-recommender',
        'https://bensonhomesolutions.com/methodology/property-taxes',
      ],
      numberOfRuns: 1,
      settings: {},
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
  },
};
