/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bensonhomesolutions.com',
  generateRobotsTxt: true,
  exclude: ['/studio/*', '/api/*', '/areas', '/areas/*'],
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.6,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/studio/'] }],
  },
  transform: async (config, path) => {
    if (path === '/') return { loc: path, changefreq: 'weekly', priority: 1.0 };
    if (path === '/services') return { loc: path, changefreq: 'weekly', priority: 0.95 };
    if (path.startsWith('/services/')) return { loc: path, changefreq: 'monthly', priority: 0.9 };
    if (path === '/wildfire-recovery') return { loc: path, changefreq: 'weekly', priority: 0.95 };
    if (path === '/service-area') return { loc: path, changefreq: 'monthly', priority: 0.85 };
    if (path === '/request-estimate' || path === '/contact') return { loc: path, changefreq: 'monthly', priority: 0.85 };
    if (path.startsWith('/tools/')) return { loc: path, changefreq: 'monthly', priority: 0.7 };
    return { loc: path, changefreq: config.changefreq, priority: config.priority };
  },
};
