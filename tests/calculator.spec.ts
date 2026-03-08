import { test, expect } from '@playwright/test';

test.describe('True Cost Calculator', () => {
  test('landing page loads correctly', async ({ page }) => {
    await page.goto('/tools/cost-calculator');
    await expect(
      page.getByRole('heading', { name: /What Does Your Home REALLY Cost/i }),
    ).toBeVisible();
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  test('full calculator flow with mock address', async ({ page }) => {
    await page.goto('/tools/cost-calculator');

    // Select address from autocomplete
    const input = page.getByRole('combobox');
    await input.fill('123 Main St, Albany, OR 97321');

    // Wait for mock or real suggestions to appear
    const listbox = page.getByRole('listbox');
    await expect(listbox).toBeVisible({ timeout: 10000 });

    // Click the first suggestion
    await listbox.getByRole('option').first().click();

    // Wait for processing state
    await expect(page.getByText(/Analyzing Property Data/i)).toBeVisible();

    // Wait for unlock state (takes ~4 seconds in component logic)
    await expect(page.getByText(/Unlock Your Full Report/i), {
      timeout: 10000,
    }).toBeVisible();

    // Fill lead form
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.getByRole('button', { name: /Reveal My Annual Cost/i }).click();

    // Verify results
    await expect(page.getByText(/True Annual Cost Reveal/i)).toBeVisible();
    await expect(page.getByText(/\$([0-9,]+)\/year/)).toBeVisible();
    await expect(page.getByText(/Cost Breakdown/i)).toBeVisible();
  });
});
