import { test, expect } from '@playwright/test';
import { BUSINESS } from '@/lib/constants';

test.describe('Contact Page', () => {
  test('should load successfully and display essential information', async ({
    page,
  }) => {
    await page.goto('/contact');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Contact Us/);

    // Expect the main hero headline to be visible
    await expect(
      page.getByRole('heading', { name: 'Ready to Protect Your Property?' }),
    ).toBeVisible();

    // Expect the "Contact Information" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Contact Information' }),
    ).toBeVisible();

    // Expect the office phone number to be visible and have the correct href
    const officePhone = page.locator('main').getByRole('heading', { name: 'Office Phone' }).getByRole('link', { name: BUSINESS.phone });
    await expect(officePhone).toBeVisible();
    await expect(officePhone).toHaveAttribute('href', `tel:${BUSINESS.phone}`);

    // Expect the emergency phone number to be visible and have the correct href
    const emergencyPhone = page.locator('main').getByRole('heading', { name: 'Emergency Line' }).getByRole('link', { name: BUSINESS.afterhoursPhone });
    await expect(emergencyPhone).toBeVisible();
    await expect(emergencyPhone).toHaveAttribute('href', `tel:${BUSINESS.afterhoursPhone}`);

    // Expect the email address to be visible and have the correct href
    const emailAddress = page.getByRole('link', { name: BUSINESS.email });
    await expect(emailAddress).toBeVisible();
    await expect(emailAddress).toHaveAttribute('href', `mailto:${BUSINESS.email}`);

    // Expect the "Credentials" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Credentials' }),
    ).toBeVisible();

    // Expect the "Our Location" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Our Location' }),
    ).toBeVisible();

    // Expect the HubSpot form to be visible
    await expect(
      page.getByRole('heading', { name: 'Send Us a Message' }),
    ).toBeVisible();

    // Expect the Google Maps placeholder to be visible
    await expect(
      page.frameLocator('iframe[title="Google Maps of Albany, OR"]').getByText('Google Maps Placeholder')
    ).toBeVisible();
  });
});
