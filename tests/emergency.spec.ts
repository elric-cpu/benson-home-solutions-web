import { test, expect } from '@playwright/test';

test.describe('Emergency Page', () => {
  test('should load successfully and display emergency information', async ({
    page,
  }) => {
    await page.goto('/emergency');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Emergency Services/);

    // Expect the main headline to be visible
    await expect(
      page.getByRole('heading', { name: '24/7 Emergency Stabilization' }),
    ).toBeVisible();

    // Expect the "Call Now" button to be visible and have the correct href
    const callNowButton = page.getByRole('link', {
      name: /Call Now: \(\d{3}\) \d{3}-\d{4}/,
    });
    await expect(callNowButton).toBeVisible();
    await expect(callNowButton).toHaveAttribute('href', /tel:\(\d{3}\) \d{3}-\d{4}/);

    // Expect the "Emergency SMS" button to be visible and have the correct href
    const smsButton = page.getByRole('link', { name: 'Emergency SMS' });
    await expect(smsButton).toBeVisible();
    await expect(smsButton).toHaveAttribute('href', 'sms:+15413215115');

    // Expect rapid mitigation services section to be visible
    await expect(
      page.getByRole('heading', { name: 'Rapid Mitigation Services' }),
    ).toBeVisible();

    // Expect the "Our Response Framework" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Our Response Framework' }),
    ).toBeVisible();
  });
});
