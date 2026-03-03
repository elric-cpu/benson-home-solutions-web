import { test, expect } from '@playwright/test';

test.describe('Bathroom Remodeling Page', () => {
  test('should load successfully and display essential information', async ({
    page,
  }) => {
    await page.goto('/services/bathroom-remodeling');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Bathroom Remodeling & Structural Finish/);

    // Expect the main headline to be visible
    await expect(
      page.getByRole('heading', {
        name: 'High-Fidelity Bathroom Reconstruction',
      }),
    ).toBeVisible();

    // Expect the cost range to be visible
    await expect(
      page.getByText('Typical projects: $15,000 - $30,000'),
    ).toBeVisible();

    // Expect the "Request Assessment" button to be visible and have the correct href
    const assessmentButton = page.getByRole('link', {
      name: 'Request Assessment',
    });
    await expect(assessmentButton).toBeVisible();
    await expect(assessmentButton).toHaveAttribute('href', '/contact');

    // Expect the "Bathroom Before & After" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Bathroom Before & After' }),
    ).toBeVisible();

    // Expect the "Frequently Asked Questions" section to be visible
    await expect(
      page.getByRole('heading', { name: 'Frequently Asked Questions' }),
    ).toBeVisible();
  });
});
