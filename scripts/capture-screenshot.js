const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const routes = [
    { name: 'homepage', path: '/' },
    { name: 'calculator', path: '/tools/cost-calculator' },
    { name: 'configurator', path: '/tools/maintenance-configurator' },
    { name: 'contact', path: '/contact' }
  ];

  try {
    for (const route of routes) {
      console.log(`Navigating to http://localhost:3001${route.path}...`);
      await page.goto(`http://localhost:3001${route.path}`, { waitUntil: 'networkidle', timeout: 60000 });
      await page.screenshot({ path: `preview-${route.name}.png`, fullPage: true });
      console.log(`Screenshot saved as preview-${route.name}.png`);
    }
  } catch (error) {
    console.error('Failed to capture screenshots:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
