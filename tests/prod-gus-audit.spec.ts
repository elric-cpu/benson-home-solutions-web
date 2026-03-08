import { test, expect } from '@playwright/test';

test('Gus Production Chat Audit', async ({ page }) => {
  // Use Vercel URL to bypass potential DNS propagation issues
  const PROD_URL = 'https://benson-home-solutions-kdtv9oh5n-elric-bensons-projects.vercel.app';
  
  await page.goto(PROD_URL, { waitUntil: 'networkidle' });
  
  // Wait for hydration
  await page.waitForTimeout(2000);

  // 1. Verify Toggle exists
  const toggleBtn = page.getByLabel('Toggle chat');
  // Increase timeout for production environment
  await expect(toggleBtn).toBeVisible({ timeout: 10000 });
  await toggleBtn.click();

  // 2. Check for Gus branding
  await expect(page.getByText('Ask Gus')).toBeVisible();
  
  // 3. Verify Greeting
  const firstMessage = page.getByTestId('chat-message').first();
  await expect(firstMessage).toBeVisible();
  const greetingText = await firstMessage.innerText();
  console.log('Production Greeting:', greetingText);

  // 4. Test Interaction & Streaming
  const input = page.getByPlaceholder('Describe the failure...');
  
  // Listen for requests to /api/chat
  page.on('request', request => {
    if (request.url().includes('/api/chat')) {
      console.log('>> Request to /api/chat:', request.method(), request.postData());
    }
  });

  page.on('response', response => {
    if (response.url().includes('/api/chat')) {
      console.log('<< Response from /api/chat:', response.status(), response.statusText());
    }
  });

  await input.fill('Identify common failures in a 1950s Oregon home.');
  await page.keyboard.press('Enter');

  // Wait for response bubble
  const responseBubble = page.getByTestId('chat-message').nth(2);
  await expect(responseBubble).toBeVisible({ timeout: 20000 });
  
  const initialText = await responseBubble.innerText();
  await page.waitForTimeout(5000);
  const laterText = await responseBubble.innerText();
  
  console.log('Response Growth:', initialText.length, '->', laterText.length);
  expect(laterText.length).toBeGreaterThan(initialText.length);
});
