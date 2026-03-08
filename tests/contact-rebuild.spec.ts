import { test, expect } from '@playwright/test';

test.describe('Contact Page Rebuild', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should load the contact page with correct metadata', async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Contact|Benson/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display emergency banner', async ({ page }) => {
    const banner = page.getByRole('alert');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(/Emergency/i);
    await expect(banner).toContainText(/541/);
  });

  test('should have a functional contact form', async ({ page }) => {
    const timestamp = Date.now();
    const uniqueEmail = `test-${timestamp}@example.com`;

    // Fill out the form
    await page.getByLabel(/First Name/i).fill('Test');
    await page.getByLabel(/Last Name/i).fill('User');
    await page.getByLabel(/Email/i).fill(uniqueEmail);
    await page.getByLabel(/Phone/i).fill('555-555-5555');

    // Select a service (using ID to be sure)
    await page.locator('#service').selectOption('maintenance');

    await page
      .getByLabel(/Message/i)
      .fill('This is a test message from Playwright.');

    // Submit
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Expect success message
    await expect(page.getByText(/Message Sent/i)).toBeVisible({
      timeout: 10000,
    });
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.getByRole('button', { name: /Send Message/i }).click();

    // HTML5 validation or UI validation
    // Checking for required field errors
    // Simple check: form should not be submitted (no success message)
    await expect(page.getByText(/Message Sent/i)).not.toBeVisible();
  });

  test('should display trust signals', async ({ page }) => {
    // Be more specific to avoid strict mode violations
    await expect(
      page
        .locator('p')
        .filter({ hasText: /Licensed/i })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator('p')
        .filter({ hasText: /258533/ })
        .first(),
    ).toBeVisible(); // CCB
  });
});
