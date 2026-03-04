import { test, expect } from '@playwright/test';
import { calculateServicePrice } from '../src/lib/services/pricing-engine';

test.describe('Hybrid Agreement Engine', () => {
  
  test('Deterministic Pricing: Church should get 20% discount', async () => {
    const resPrice = calculateServicePrice({
      serviceId: 'GUTTER_CLEAN',
      sqft: 1000,
      yearBuilt: 2020,
      floodZone: 'X',
      frequency: 'annual',
      propertyType: 'residential'
    });

    const churchPrice = calculateServicePrice({
      serviceId: 'GUTTER_CLEAN',
      sqft: 1000,
      yearBuilt: 2020,
      floodZone: 'X',
      frequency: 'annual',
      propertyType: 'church_community'
    });

    expect(churchPrice).toBe(resPrice * 0.8);
  });

  test('Deterministic Pricing: Older homes should have higher prices', async () => {
    const newHome = calculateServicePrice({
      serviceId: 'GUTTER_CLEAN',
      sqft: 1000,
      yearBuilt: 2024,
      floodZone: 'X',
      frequency: 'annual',
      propertyType: 'residential'
    });

    const oldHome = calculateServicePrice({
      serviceId: 'GUTTER_CLEAN',
      sqft: 1000,
      yearBuilt: 1950,
      floodZone: 'X',
      frequency: 'annual',
      propertyType: 'residential'
    });

    expect(oldHome).toBeGreaterThan(newHome);
  });
});
