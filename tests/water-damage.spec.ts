import { test, expect } from '@playwright/test';

test.describe('Water Damage Page', () => {
  test('should load successfully and display essential information', async ({
    page,
  }) => {
    await page.goto('/services/water-damage');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Water Damage Restoration/);

    // Expect the main headline to be visible
    await expect(
      page.getByRole('heading', { name: 'Water Damage Restoration' }),
    ).toBeVisible();

    // Expect the emergency call button in the hero section to be visible and have the correct href
    const heroCallButton = page.getByRole('link', {
      name: /Emergency: \(\d{3}\) \d{3}-\d{4}/,
    });
    await expect(heroCallButton).toBeVisible();
    await expect(heroCallButton).toHaveAttribute('href', /tel:\(\d{3}\) \d{3}-\d{4}/);

    // Expect the urgency banner to be visible
    await expect(
      page.getByText('Water damage worsens every hour.'),
    ).toBeVisible();

    // Expect the "Complete Water Damage Services" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Complete Water Damage Services' }),
    ).toBeVisible();

    // Expect the "Our Restoration Process" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Our Restoration Process' }),
    ).toBeVisible();

    // Expect the "Common Causes of Water Damage" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Common Causes of Water Damage' }),
    ).toBeVisible();

    // Expect the "Frequently Asked Questions" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Frequently Asked Questions' }),
    ).toBeVisible();

    // Expect the final CTA button to be visible and have the correct href
    const finalCallButton = page.getByRole('link', {
      name: /Call 24\/7: \(\d{3}\) \d{3}-\d{4}/,
    });
    await expect(finalCallButton).toBeVisible();
    await expect(finalCallButton).toHaveAttribute('href', /tel:\(\d{3}\) \d{3}-\d{4}/);
  });
});
