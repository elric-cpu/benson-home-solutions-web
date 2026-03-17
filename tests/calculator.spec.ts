import { test, expect } from '@playwright/test';

test.describe('True Cost Calculator', () => {
  test('landing page loads correctly', async ({ page }) => {
    await page.goto('/tools/cost-calculator', { waitUntil: 'networkidle' });
    await expect(
      page.getByRole('heading', { name: /What Does Your Home REALLY Cost/i }),
    ).toBeVisible();
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  test('full calculator flow with mock address', async ({ page }) => {
    // Mock Geocoding API
    await page.route(/nominatim\.openstreetmap\.org/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            display_name: '123 Main St, Albany, OR 97321, USA',
            place_id: 12345,
            lat: '44.6368',
            lon: '-123.1059',
            address: {
              house_number: '123',
              road: 'Main St',
              city: 'Albany',
              state: 'OR',
              postcode: '97321',
              country: 'USA',
            },
          },
        ]),
      });
    });

    // Mock Lead API
    await page.route(/\/api\/calculator\/lead/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, addressHash: 'mock-hash' }),
      });
    });

    await page.goto('/tools/cost-calculator', { waitUntil: 'networkidle' });

    // Select address from autocomplete
    const input = page.getByRole('combobox');
    await input.fill('123 Main St, Albany, OR 97321');

    // Wait for mock or real suggestions to appear
    const listbox = page.getByRole('listbox');
    await expect(listbox).toBeVisible({ timeout: 15000 });

    // Click the first suggestion
    await listbox.getByRole('option').first().click();

    // Wait for processing state
    await expect(page.getByText(/Analyzing Property Data/i)).toBeVisible();

    // Wait for result state (reveal)
    await expect(page.getByText(/True Annual Cost Reveal/i)).toBeVisible({
      timeout: 15000,
    });

    // Fill lead form
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('#consent').check();
    await page.getByRole('button', { name: /Send My Report/i }).click();

    // Verify "Report Unlocked" state
    await expect(page.getByText(/Report Unlocked/i)).toBeVisible();
    await expect(
      page.getByRole('link', { name: /View Full Report/i }),
    ).toBeVisible();
  });
});

test.describe('Forensic Report Page', () => {
  test('report page redirects to 404 for invalid hash', async ({ page }) => {
    const response = await page.goto('/report/invalid-hash');
    expect(response?.status()).toBe(404);
  });
});
