export interface ServiceRule {
  id: string;
  name: string;
  category: 'exterior' | 'interior' | 'systems' | 'seasonal' | 'safety';
  applicable_to: ('residential' | 'commercial' | 'church_community')[];
  base_price: number; // Annual
  sqft_multiplier: number; // per sqft above 1000
  age_multiplier: Record<string, number>;
  flood_zone_multiplier: Record<string, number>;
  frequency_options: ('monthly' | 'quarterly' | 'semi-annual' | 'annual')[];
}

export const SERVICE_CATALOG: ServiceRule[] = [
  {
    id: 'GUTTER_CLEAN',
    name: 'Gutter Cleaning & Inspection',
    category: 'exterior',
    applicable_to: ['residential', 'commercial', 'church_community'],
    base_price: 300,
    sqft_multiplier: 0.05,
    age_multiplier: { '0-10': 1.0, '11-25': 1.1, '26-50': 1.2, '50+': 1.3 },
    flood_zone_multiplier: { 'X': 1.0, 'AE': 1.2, 'A': 1.2, 'default': 1.0 },
    frequency_options: ['semi-annual', 'annual'],
  },
  {
    id: 'HVAC_PREVENTIVE',
    name: 'HVAC Seasonal Optimization',
    category: 'systems',
    applicable_to: ['residential', 'commercial', 'church_community'],
    base_price: 450,
    sqft_multiplier: 0.08,
    age_multiplier: { '0-10': 1.0, '11-25': 1.2, '26-50': 1.4, '50+': 1.6 },
    flood_zone_multiplier: { 'X': 1.0, 'default': 1.0 },
    frequency_options: ['semi-annual', 'quarterly'],
  },
  {
    id: 'AIR_SEALING',
    name: 'Air Sealing & Weatherization Check',
    category: 'systems',
    applicable_to: ['residential'],
    base_price: 200,
    sqft_multiplier: 0.02,
    age_multiplier: { '0-10': 1.0, '11-25': 1.3, '26-50': 1.6, '50+': 2.0 },
    flood_zone_multiplier: { 'X': 1.0, 'default': 1.0 },
    frequency_options: ['annual'],
  },
];
