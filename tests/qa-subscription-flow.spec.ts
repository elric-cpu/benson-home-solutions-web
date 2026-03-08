import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function checkA11y(page: any, stepName: string) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  if (accessibilityScanResults.violations.length > 0) {
    console.log(
      `[A11y Violation] ${stepName}:`,
      JSON.stringify(accessibilityScanResults.violations, null, 2),
    );
  } else {
    console.log(`[A11y Pass] ${stepName}`);
  }
}

test('Subscription Recommender Flow QA', async ({ page }) => {
  // Mock Internal API Responses
  await page.route('**/api/calculator/lead', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true }),
    });
  });

  await page.route('**/api/agreements/recommend', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        recommendations: [
          {
            service_id: 'GUTTER_CLEAN',
            priority: 'essential',
            reasoning: 'Mock reasoning',
            frequency: 'annual',
          },
          {
            service_id: 'HVAC_MAINT',
            priority: 'recommended',
            reasoning: 'Mock reasoning',
            frequency: 'semi-annual',
          },
        ],
      }),
    });
  });

  // Mock Geocoding API
  await page.route('**/*nominatim.openstreetmap.org/**', async (route) => {
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

  // Step 1: Homepage & CTA
  console.log('--- Step 1: Homepage ---');
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Get Your Personalized Maintenance Plan');
  await checkA11y(page, 'Homepage');
  await page.screenshot({ path: 'qa-01-homepage.png', fullPage: true });

  // Step 2: Navigate to Tool
  console.log('--- Step 2: Navigation ---');
  await page.getByRole('link', { name: 'Start My Recommendation' }).click();
  await expect(page).toHaveURL(/\/tools\/subscription-recommender/, {
    timeout: 10000,
  });

  // Step 3: Address Input
  console.log('--- Step 3: Address Input ---');
  await expect(page.getByText('Enter Your Property Address')).toBeVisible();
  await checkA11y(page, 'Address Step');
  await page.screenshot({ path: 'qa-02-address.png' });

  const addressInput = page.getByPlaceholder(/Enter your US address/i);
  await addressInput.fill('123 Main');
  await expect(page.getByRole('listbox')).toBeVisible({ timeout: 10000 });
  await page.getByRole('option').first().click();

  // Step 4: Info Step
  console.log('--- Step 4: Info Step ---');
  await expect(page.getByText('Property Details')).toBeVisible();
  await checkA11y(page, 'Info Step');
  await page.screenshot({ path: 'qa-03-info.png' });

  await page.getByLabel('Approx. Square Footage').fill('2500');
  await page.getByLabel('Estimated Year Built').fill('2000');
  await page.getByRole('button', { name: /Analyze/i }).click();

  // Step 5: Email Step
  console.log('--- Step 5: Email Step ---');
  await expect(page.getByText('Unlock Your Plan')).toBeVisible();
  await checkA11y(page, 'Email Step');
  await page.screenshot({ path: 'qa-04-email.png' });

  await page
    .getByPlaceholder('you@example.com')
    .fill('qa-test@bensonhomesolutions.com');
  await page.getByRole('button', { name: /Reveal/i }).click();

  // Step 6: Results
  console.log('--- Step 6: Results ---');
  await expect(page.getByText('Plan Recommendation')).toBeVisible({
    timeout: 10000,
  });
  await checkA11y(page, 'Results Step');
  await page.screenshot({ path: 'qa-05-results.png', fullPage: true });

  console.log('QA Flow Complete');
});
