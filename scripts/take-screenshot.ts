import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://bensonhomesolutions.com', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'visual-inspection-home.png', fullPage: true });
  console.log('Screenshot saved to visual-inspection-home.png');
  await browser.close();
})();
