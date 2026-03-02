import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('renders the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Property Protection');
  });

  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Benson Home Solutions/);
  });

  test('skip-nav link is present', async ({ page }) => {
    await page.goto('/');
    const skipNav = page.locator('a.skip-nav');
    await expect(skipNav).toBeAttached();
  });

  test('@a11y — zero critical accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();
    expect(results.violations.filter((v) => v.impact === 'critical')).toEqual([]);
  });
});
