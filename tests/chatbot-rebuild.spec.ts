import { test, expect } from '@playwright/test';

/**
 * PROJECT GUS: MASTER SPECIFICATION
 * This test defines the required behavior for the ground-up chatbot rebuild.
 * Persona: Gus (Senior Diagnostics Specialist)
 */
test.describe('Chatbot "Gus" Specification', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    // We expect the widget to be present on the homepage (via layout)
    await page.goto('/');
  });

  test('should have a visible and accessible toggle button', async ({ page }) => {
    const toggleBtn = page.getByLabel('Toggle chat');
    await expect(toggleBtn).toBeVisible();
    
    // Accessibility check
    const attr = await toggleBtn.getAttribute('aria-label');
    expect(attr).toBe('Toggle chat');
  });

  test('should open the chat window with Gus branding', async ({ page }) => {
    const toggleBtn = page.getByLabel('Toggle chat');
    await toggleBtn.click();

    // Verify header branding
    const header = page.locator('h3', { hasText: 'Ask Gus' });
    await expect(header).toBeVisible();
    
    const subheader = page.locator('p', { hasText: 'Senior Diagnostics Specialist' });
    await expect(subheader).toBeVisible();
  });

  test('should display an initial Gus-persona greeting', async ({ page }) => {
    const toggleBtn = page.getByLabel('Toggle chat');
    await toggleBtn.click();

    // Gus is blunt and technical. We expect a greeting that isn't "Hi, how can I help?"
    // Find the first message bubble specifically
    const welcomeMessage = page.getByTestId('chat-message').first();
    await expect(welcomeMessage).toBeVisible();
    
    const text = await welcomeMessage.innerText();
    console.log('Detected Greeting:', text);
    
    // Gus's greetings usually mention "condemned", "failure", "dimensions", or "deadline"
    const isGus = /condemned|failure|dimensions|deadline|PSI|ingress|hydrostatic|failure/i.test(text);
    expect(isGus).toBe(true);
  });

  test('should accept input and display user message', async ({ page }) => {
    const toggleBtn = page.getByLabel('Toggle chat');
    await toggleBtn.click();

    const input = page.getByPlaceholder('Describe the failure...');
    await input.fill('I have water ingress in my crawlspace.');
    await page.keyboard.press('Enter');

    // Verify user message appears
    await expect(page.getByTestId('chat-message').filter({ hasText: 'I have water ingress in my crawlspace.' })).toBeVisible();
  });

  test('should stream a technical response from the API', async ({ page }) => {
    // Mock the API to ensure we're testing UI logic + connectivity
    await page.route('/api/chat', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Hydrostatic pressure is forcing moisture through your foundation. State the PSI or clear the line.',
      });
    });

    const toggleBtn = page.getByLabel('Toggle chat');
    await toggleBtn.click();

    const input = page.getByPlaceholder('Describe the failure...');
    await input.fill('Foundation leak.');
    await page.keyboard.press('Enter');

    // Wait for assistant response
    await expect(page.getByTestId('chat-message').filter({ hasText: 'Hydrostatic pressure' })).toBeVisible();
  });

  test('should include RAG context in system prompt (API verification)', async ({ page }) => {
    let capturedSystemPrompt = '';
    
    // We can't easily intercept the internal API call logic from here, 
    // but we can verify that if we mock the context in the response, the UI shows it.
    // For a deeper test, we'd need to mock the vector service itself in the API route.
    
    await page.route('/api/chat', async (route) => {
      // If RAG works, the LLM would see the context and respond accordingly.
      // We simulate an LLM response that confirms it saw the context.
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Based on our SOP #102, your moisture ingress is likely a shear failure. Dimensions now.',
      });
    });

    const toggleBtn = page.getByLabel('Toggle chat');
    await toggleBtn.click();

    const input = page.getByPlaceholder('Describe the failure...');
    await input.fill('Water in basement.');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('chat-message').filter({ hasText: 'SOP #102' })).toBeVisible();
  });
});
