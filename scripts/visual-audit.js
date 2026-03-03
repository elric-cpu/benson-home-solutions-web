const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const routes = [
    { name: '01-homepage', path: '/' },
    { name: '02-calculator', path: '/tools/cost-calculator' },
    { name: '03-configurator', path: '/tools/maintenance-configurator' },
    { name: '04-methodology-hub', path: '/methodology' },
    { name: '05-technical-detail', path: '/methodology/maintenance' },
    { name: '06-contact', path: '/contact' },
  ];

  try {
    for (const route of routes) {
      console.log(`Auditing: http://localhost:3002${route.path}...`);
      await page.goto(`http://localhost:3002${route.path}`, {
        waitUntil: 'networkidle',
        timeout: 60000,
      });
      await page.screenshot({
        path: `audit-${route.name}.png`,
        fullPage: true,
      });
    }
    console.log('Visual audit complete. Screenshots saved as audit-*.png');
  } catch (error) {
    console.error('Audit failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
