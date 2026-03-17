/* eslint-disable no-console */
import { test, expect } from '@playwright/test';

test('Gus Production Chat Audit', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

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
  page.on('request', (request) => {
    if (request.url().includes('/api/chat')) {
      console.log(
        '>> Request to /api/chat:',
        request.method(),
        request.postData(),
      );
    }
  });

  page.on('response', (response) => {
    if (response.url().includes('/api/chat')) {
      console.log(
        '<< Response from /api/chat:',
        response.status(),
        response.statusText(),
      );
    }
  });

  await input.fill('Identify common failures in a 1950s Oregon home.');
  await page.keyboard.press('Enter');

  // Wait for response bubble
  const messages = page.getByTestId('chat-message');
  console.log('Chat messages found:', await messages.count());
  // 0: "Ask Gus (AI)"
  // 1: Welcome message
  // 2: User message
  // 3: AI response
  const responseBubble = messages.nth(3);
  await expect(responseBubble).toBeVisible({ timeout: 20000 });

  const initialText = await responseBubble.innerText();
  await page.waitForTimeout(5000);
  const laterText = await responseBubble.innerText();

  console.log('Response Growth:', initialText.length, '->', laterText.length);
  expect(laterText.length).toBeGreaterThan(initialText.length);
});
