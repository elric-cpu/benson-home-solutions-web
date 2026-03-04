import { SERVICE_CATALOG, ServiceRule } from './service-catalog';

export interface PricingInput {
  serviceId: string;
  sqft: number;
  yearBuilt: number;
  floodZone: string;
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  propertyType: 'residential' | 'commercial' | 'church_community';
}

export function calculateServicePrice(input: PricingInput): number {
  const rule = SERVICE_CATALOG.find((s) => s.id === input.serviceId);
  if (!rule) return 0;

  const age = new Date().getFullYear() - input.yearBuilt;
  let ageBracket = '0-10';
  if (age > 50) ageBracket = '50+';
  else if (age > 25) ageBracket = '26-50';
  else if (age > 10) ageBracket = '11-25';

  const ageMult = rule.age_multiplier[ageBracket] || 1.0;
  const floodMult = rule.flood_zone_multiplier[input.floodZone] || rule.flood_zone_multiplier['default'] || 1.0;
  
  const sqftExtra = Math.max(0, (input.sqft - 1000) / 1000);
  const sqftMult = 1 + (rule.sqft_multiplier * sqftExtra);

  // Frequency adjustments
  const freqMultMap = {
    monthly: 12,
    quarterly: 4,
    'semi-annual': 2,
    annual: 1
  };
  const freqMult = freqMultMap[input.frequency] || 1;

  let finalPrice = rule.base_price * sqftMult * ageMult * floodMult * (1 / freqMult);

  // Church discount (20%)
  if (input.propertyType === 'church_community') {
    finalPrice *= 0.8;
  }

  return Math.round(finalPrice * 100) / 100;
}
