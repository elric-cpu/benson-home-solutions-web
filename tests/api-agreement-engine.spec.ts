import { test, expect } from '@playwright/test';
import {
  calculateServicePrice,
  SERVICE_CATALOG,
} from '../src/lib/agreement-engine';

test.describe('Hybrid Agreement Engine', () => {
  const service = SERVICE_CATALOG.find((s) => s.id === 'GUTTER_CLEAN')!;

  test('Deterministic Pricing: Church should get 20% discount', async () => {
    const resPrice = calculateServicePrice({
      service,
      property: {
        sqft: 1000,
        age: 4,
        floodZone: 'X',
        buildingType: 'residential',
      },
      frequency: 'annual',
    });

    const churchPrice = calculateServicePrice({
      service,
      property: {
        sqft: 1000,
        age: 4,
        floodZone: 'X',
        buildingType: 'church',
      },
      frequency: 'annual',
    });

    expect(churchPrice).toBe(resPrice * 0.8);
  });

  test('Deterministic Pricing: Older homes should have higher prices', async () => {
    const newHome = calculateServicePrice({
      service,
      property: {
        sqft: 1000,
        age: 0,
        floodZone: 'X',
        buildingType: 'residential',
      },
      frequency: 'annual',
    });

    const oldHome = calculateServicePrice({
      service,
      property: {
        sqft: 1000,
        age: 60,
        floodZone: 'X',
        buildingType: 'residential',
      },
      frequency: 'annual',
    });

    expect(oldHome).toBeGreaterThan(newHome);
  });
});
