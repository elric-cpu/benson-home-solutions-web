import { test, expect } from '@playwright/test';

test.describe('Kitchen Remodeling Page', () => {
  test('should load successfully and display essential information', async ({
    page,
  }) => {
    await page.goto('/services/kitchen-remodeling');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Kitchen Remodeling & Reconstruction/);

    // Expect the main headline to be visible
    await expect(
      page.getByRole('heading', { name: 'Precision Kitchen Remodeling' }),
    ).toBeVisible();

    // Expect the cost range to be visible
    await expect(
      page.getByText('Typical projects: $25,000 - $45,000'),
    ).toBeVisible();

    // Expect the "Request Design Consultation" button to be visible and have the correct href
    const consultationButton = page.getByRole('link', {
      name: 'Request Design Consultation',
    });
    await expect(consultationButton).toBeVisible();
    await expect(consultationButton).toHaveAttribute('href', '/contact');

    // Expect the "Before & After Transformations" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Before & After Transformations' }),
    ).toBeVisible();

    // Expect the "Frequently Asked Questions" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Frequently Asked Questions' }),
    ).toBeVisible();

    // Expect the final CTA button "Start Your Project" to be visible and have the correct href
    const finalCtaButton = page.getByRole('link', {
      name: 'Start Your Project',
    });
    await expect(finalCtaButton).toBeVisible();
    await expect(finalCtaButton).toHaveAttribute('href', '/contact');
  });
});
