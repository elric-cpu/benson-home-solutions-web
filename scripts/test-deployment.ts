import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url =
    process.argv[2] ||
    process.env.DEPLOYMENT_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://127.0.0.1:3000';
  
  console.log(`Checking deployment at ${url}`);
  try {
    const response = await page.goto(url);
    console.log(`Status Code: ${response?.status()}`);
    
    // Take a screenshot to see what's on the page
    await page.screenshot({ path: 'deployment-check.png' });
    console.log('Screenshot saved to deployment-check.png');
    
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    
    const content = await page.content();
    console.log(`Content length: ${content.length}`);
    
    if (content.includes('Vercel Authentication')) {
      console.log('Deployment is protected by Vercel Authentication.');
    } else if (response?.status() === 200) {
      console.log('Deployment is public and reachable.');
    }
    
  } catch (error) {
    console.error('Failed to access deployment:', error);
  } finally {
    await browser.close();
  }
})();
