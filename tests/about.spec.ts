import { test, expect } from '@playwright/test';
import { BUSINESS } from '@/lib/constants';

test.describe('About Page', () => {
  test('should load successfully and display essential information', async ({
    page,
  }) => {
    await page.goto('/about');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/About Us/);

    // Expect the main headline to be visible
    await expect(
      page.getByRole('heading', { name: /Protecting Properties Since \d{4}/ }),
    ).toBeVisible();

    // Expect the "Our Foundation" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Our Foundation' }),
    ).toBeVisible();

    // Expect the owner's name to be visible
    await expect(page.getByText(BUSINESS.owner)).toBeVisible();

    // Expect the "Our Principles" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Our Principles' }),
    ).toBeVisible();

    // Expect the "Licensed, Bonded & Insured" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Licensed, Bonded & Insured' }),
    ).toBeVisible();

    // Expect the "Schedule a Call" button to be visible and have the correct href
    const scheduleCallButton = page.getByRole('link', {
      name: 'Schedule a Call',
    });
    await expect(scheduleCallButton).toBeVisible();
    await expect(scheduleCallButton).toHaveAttribute('href', '/contact');
  });
});
