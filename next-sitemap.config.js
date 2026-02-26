/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bensonhomesolutions.com',
  generateRobotsTxt: false,
  exclude: ['/studio/*', '/api/*'],
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    if (path === '/') return { loc: path, changefreq: 'daily', priority: 1.0 };
    if (path.startsWith('/services/')) return { loc: path, changefreq: 'weekly', priority: 0.9 };
    if (path.startsWith('/areas/')) return { loc: path, changefreq: 'weekly', priority: 0.8 };
    return { loc: path, changefreq: config.changefreq, priority: config.priority };
  },
};
