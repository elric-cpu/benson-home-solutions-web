import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Prospecting map', () => {
  test('loads ArcGIS controls and passes custom-interface accessibility checks', async ({
    page,
  }) => {
    await page.goto('/prospecting-map.html', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle('Benson Prospecting GIS');
    await expect(page.locator('#view .esri-view-root')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#layerControls input[type="checkbox"]')).toHaveCount(9);

    await page.getByRole('button', { name: 'Layers', exact: true }).first().click();
    await expect(page.locator('#layers')).toHaveClass(/open/);

    const accessibility = await new AxeBuilder({ page })
      .exclude('#view')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibility.violations).toEqual([]);
  });
});
