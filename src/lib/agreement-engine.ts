import { SERVICE_CATALOG, type ServiceCatalogItem } from './agreements/catalog';

export { SERVICE_CATALOG, type ServiceCatalogItem };

export type Frequency = 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
export type BuildingType = 'residential' | 'commercial' | 'church';

export interface PropertyData {
  sqft: number;
  age: number;
  floodZone: string;
  buildingType: BuildingType;
}

/**
 * Maps building age to the corresponding multiplier bracket.
 */
function getAgeBracket(age: number): string {
  if (age <= 10) return '0-10';
  if (age <= 25) return '11-25';
  if (age <= 50) return '26-50';
  return '50+';
}

/**
 * Returns the annual frequency multiplier.
 */
function getFrequencyMultiplier(frequency: Frequency): number {
  const multipliers: Record<Frequency, number> = {
    monthly: 12,
    quarterly: 4,
    'semi-annual': 2,
    annual: 1,
  };
  return multipliers[frequency];
}

/**
 * Calculates the raw price for a service before any specialized discounts.
 */
function calculateRawPrice(
  service: ServiceCatalogItem,
  property: PropertyData,
  frequency: Frequency,
): number {
  const ageBracket = getAgeBracket(property.age);
  const freqMultiplier = getFrequencyMultiplier(frequency);

  const ageMult = service.age_multiplier[ageBracket] ?? 1.0;
  const floodMult =
    service.flood_zone_multiplier[property.floodZone] ??
    service.flood_zone_multiplier['default'] ??
    1.0;

  const sqftFactor =
    1 + service.sqft_multiplier * Math.max(0, (property.sqft - 1000) / 1000);

  return service.base_price * sqftFactor * ageMult * floodMult * freqMultiplier;
}

/**
 * Final deterministic pricing engine for maintenance services.
 */
export function calculateServicePrice(
  service: ServiceCatalogItem,
  property: PropertyData,
  frequency: Frequency,
): number {
  let price = calculateRawPrice(service, property, frequency);

  // Apply Church discount (20% off all line items per company policy)
  if (property.buildingType === 'church') {
    price *= 0.8;
  }

  return Math.round(price);
}
