export interface ServiceCatalogItem {
  id: string;
  name: string;
  category: 'exterior' | 'interior' | 'systems' | 'seasonal' | 'safety';
  applicable_to: ('residential' | 'commercial' | 'church')[];
  base_price: number; // USD, annual
  sqft_multiplier: number; // per sqft above 1000
  age_multiplier: Record<string, number>;
  flood_zone_multiplier: Record<string, number>;
  frequency_options: ('monthly' | 'quarterly' | 'semi-annual' | 'annual')[];
}

export const SERVICE_CATALOG: ServiceCatalogItem[] = [
  {
    id: 'GUTTER_CLEAN',
    name: 'Gutter Cleaning & Inspection',
    category: 'exterior',
    applicable_to: ['residential', 'commercial', 'church'],
    base_price: 350,
    sqft_multiplier: 0.05,
    age_multiplier: { '0-10': 1.0, '11-25': 1.1, '26-50': 1.2, '50+': 1.3 },
    flood_zone_multiplier: { X: 1.0, AE: 1.2, VE: 1.5, A: 1.2, default: 1.0 },
    frequency_options: ['annual', 'semi-annual', 'quarterly'],
  },
  {
    id: 'HVAC_MAINT',
    name: 'HVAC Seasonal Tune-Up',
    category: 'systems',
    applicable_to: ['residential', 'commercial', 'church'],
    base_price: 250,
    sqft_multiplier: 0.02,
    age_multiplier: { '0-10': 1.0, '11-25': 1.2, '26-50': 1.4, '50+': 1.6 },
    flood_zone_multiplier: { default: 1.0 },
    frequency_options: ['semi-annual', 'annual'],
  },
  {
    id: 'PLUMBING_INSP',
    name: 'Plumbing Leak & Drain Inspection',
    category: 'systems',
    applicable_to: ['residential', 'commercial', 'church'],
    base_price: 200,
    sqft_multiplier: 0.03,
    age_multiplier: { '0-10': 1.0, '11-25': 1.3, '26-50': 1.5, '50+': 1.8 },
    flood_zone_multiplier: { X: 1.0, AE: 1.3, A: 1.3, default: 1.0 },
    frequency_options: ['annual', 'semi-annual'],
  },
  {
    id: 'EXT_SEAL_CHECK',
    name: 'Exterior Sealant & Caulk Audit',
    category: 'exterior',
    applicable_to: ['residential', 'commercial'],
    base_price: 150,
    sqft_multiplier: 0.04,
    age_multiplier: { '0-10': 1.0, '11-25': 1.2, '26-50': 1.4, '50+': 1.6 },
    flood_zone_multiplier: { default: 1.0 },
    frequency_options: ['annual'],
  },
];
