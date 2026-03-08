import { test, expect } from '@playwright/test';

test.describe('Emergency Services Page', () => {
  test('emergency page loads successfully', async ({ page }) => {
    const response = await page.goto('/emergency');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Emergency/i);
  });

  test('emergency page has primary call to action', async ({ page }) => {
    await page.goto('/emergency');
    const callButton = page
      .getByRole('link', { name: /Call Emergency Line|Call Now/i })
      .first();
    await expect(callButton).toBeVisible();
    await expect(callButton).toHaveAttribute('href', /^tel:/);
  });

  test('emergency action bar is visible on mobile', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/emergency');

    const actionBar = page.getByRole('complementary', {
      name: /Emergency Actions/i,
    });
    await expect(actionBar).toBeVisible();

    const callNow = actionBar
      .getByRole('link')
      .filter({ hasText: /CALL NOW/i });
    await expect(callNow).toBeVisible();
    await expect(callNow).toHaveAttribute('href', /^tel:/);
  });
});

test.describe('Water Damage Page', () => {
  test('water damage page loads successfully', async ({ page }) => {
    const response = await page.goto('/services/water-damage');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Water Damage/i);
  });

  test('water damage page has emergency contact', async ({ page }) => {
    await page.goto('/services/water-damage');
    const emergencyButton = page
      .getByRole('link', { name: /Emergency:/i })
      .first();
    await expect(emergencyButton).toBeVisible();
    await expect(emergencyButton).toHaveAttribute('href', /^tel:/);
  });
});
