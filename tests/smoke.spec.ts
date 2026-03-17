import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/$/);
    await expect(page).toHaveTitle(/Benson Home Solutions/i);
  });

  test('homepage has no critical accessibility violations @a11y', async ({
    page,
  }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    // Log violations for debugging but only fail on critical/serious
    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );
    expect(
      critical,
      `Found ${critical.length} critical/serious a11y violations: ${critical.map((v) => v.id).join(', ')}`,
    ).toHaveLength(0);
  });

  test('contact page loads', async ({ page }) => {
    const response = await page.goto('/contact');
    expect(response?.status()).toBe(200);
  });

  test('health check endpoint returns OK', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBeDefined();
  });
});
