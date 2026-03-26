import { chromium } from 'playwright';

const URLS = [
  'https://www.bensonhomesolutions.com/',
  'https://www.bensonhomesolutions.com/tools/subscription-recommender',
  'https://www.bensonhomesolutions.com/methodology/property-taxes',
];

async function checkPerformance(url: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log(`\n--- Auditing: ${url} ---`);

  await page.goto(url, { waitUntil: 'networkidle' });

  const metrics = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let lcp = 0;
      let fcp = 0;
      let cls = 0;

      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        lcp = lastEntry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        fcp = entries[0].startTime;
      }).observe({ type: 'paint', buffered: true });

      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });

      // Give it a bit more time to capture LCP/CLS
      setTimeout(() => {
        resolve({ lcp, fcp, cls });
      }, 2000);
    });
  });

  console.log(JSON.stringify(metrics, null, 2));
  await browser.close();
  return metrics;
}

(async () => {
  try {
    for (const url of URLS) {
      await checkPerformance(url);
    }
  } catch (error) {
    console.error('Performance check failed:', error);
    process.exit(1);
  }
})();
