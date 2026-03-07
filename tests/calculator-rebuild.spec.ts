import { test, expect } from '@playwright/test';

test.describe('True Cost of Homeownership Calculator', () => {
  test('should load the calculator and generate a report', async ({ page }) => {
    // 1. Navigate to the calculator page
    await page.goto('/tools/cost-calculator');

    // 2. Verify Hero Title
    await expect(page.locator('h1')).toContainText('What Does Your Home');

    // 3. Verify Address Input is visible
    const addressInput = page.getByPlaceholder('Enter your US address...');
    await expect(addressInput).toBeVisible();

    // 4. Simulate Address Entry & Selection
    await addressInput.fill('123 Main St');
    // Wait for suggestion (mock interaction)
    // Since we don't have a real geocoder in test, we might need to rely on the fallback or mock fetch.
    // We'll click the first option if it appears.
    // If we can't easily mock, we'll assume the user types and hits Enter or similar.
    
    // For this "rebuild" verification, we want to ensure the logic flows.
    // Let's assume we can select an option.
    // AddressAutocomplete usually shows a list.
    // await page.click('text=123 Main St'); // This depends on the API response.
    
    // Instead of fighting the geocoder, let's verify the *state* logic exists.
    // But we can't trigger it without selection.
    
    // I will mock the geocoder response to ensure test stability.
    await page.route('**/*geoapify*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          features: [{
            properties: {
              formatted: '123 Main St, Albany, OR 97321',
              place_id: '123',
              address_line1: '123 Main St',
              address_line2: 'Albany, OR 97321',
              city: 'Albany',
              state: 'OR',
              postcode: '97321',
              county: 'Linn'
            },
            geometry: { coordinates: [-123, 44] }
          }]
        })
      });
    });

    await addressInput.click();
    await addressInput.press('ArrowDown'); // Trigger list if needed
    
    // Wait for the list item and click it
    const suggestion = page.locator('role=option').first();
    await expect(suggestion).toBeVisible();
    await suggestion.click();

    // 5. Verify Processing State
    await expect(page.getByText('Analyzing Property Data')).toBeVisible();

    // 6. Verify Result State (after timeout)
    // The component has a delay. We wait for the result.
    await expect(page.getByText('True Annual Cost Reveal', { exact: false })).toBeVisible({ timeout: 10000 });
    
    // 7. Verify Cost Breakdown
    await expect(page.getByText('Cost Breakdown')).toBeVisible();
  });
});
