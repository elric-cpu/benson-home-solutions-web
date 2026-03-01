export interface ZipData {
  zip: string;
  city: string;
  state: string;
  county: string;
  median_home_value: number;
  costs: {
    property_tax: number;
    insurance: number;
    maintenance: number;
    energy: number;
    utilities: number;
    deferred_maintenance_risk: number;
    appliance_reserve: number;
  };
}

// Default benchmark for any US address if ZIP data is missing
export const DEFAULT_BENCHMARK: ZipData = {
  zip: '00000',
  city: 'National Average',
  state: 'US',
  county: 'USA',
  median_home_value: 350000,
  costs: {
    property_tax: 3500,
    insurance: 1500,
    maintenance: 3500,
    energy: 2400,
    utilities: 1200,
    deferred_maintenance_risk: 4500,
    appliance_reserve: 1200,
  },
};

// Targeted data for Benson service areas
export const MOCK_ZIP_DATA: Record<string, ZipData> = {
  '97321': {
    zip: '97321', city: 'Albany', state: 'OR', county: 'Linn',
    median_home_value: 425000,
    costs: {
      property_tax: 4250, insurance: 1650, maintenance: 4250, energy: 2600,
      utilities: 1100, deferred_maintenance_risk: 5100, appliance_reserve: 1300,
    },
  },
  '97322': {
    zip: '97322', city: 'Albany', state: 'OR', county: 'Linn',
    median_home_value: 415000,
    costs: {
      property_tax: 4150, insurance: 1600, maintenance: 4150, energy: 2550,
      utilities: 1050, deferred_maintenance_risk: 4900, appliance_reserve: 1250,
    },
  },
  '97301': {
    zip: '97301', city: 'Salem', state: 'OR', county: 'Marion',
    median_home_value: 395000,
    costs: {
      property_tax: 4100, insurance: 1550, maintenance: 3950, energy: 2450,
      utilities: 1200, deferred_maintenance_risk: 4800, appliance_reserve: 1200,
    },
  },
  '97303': {
    zip: '97303', city: 'Keizer', state: 'OR', county: 'Marion',
    median_home_value: 445000,
    costs: {
      property_tax: 4600, insurance: 1700, maintenance: 4450, energy: 2500,
      utilities: 1150, deferred_maintenance_risk: 4500, appliance_reserve: 1350,
    },
  },
  '97330': {
    zip: '97330', city: 'Corvallis', state: 'OR', county: 'Benton',
    median_home_value: 525000,
    costs: {
      property_tax: 5800, insurance: 1850, maintenance: 5250, energy: 2300,
      utilities: 1300, deferred_maintenance_risk: 4200, appliance_reserve: 1500,
    },
  },
  '97333': {
    zip: '97333', city: 'Corvallis', state: 'OR', county: 'Benton',
    median_home_value: 510000,
    costs: {
      property_tax: 5600, insurance: 1800, maintenance: 5100, energy: 2350,
      utilities: 1250, deferred_maintenance_risk: 4300, appliance_reserve: 1450,
    },
  },
  '97355': {
    zip: '97355', city: 'Lebanon', state: 'OR', county: 'Linn',
    median_home_value: 365000,
    costs: {
      property_tax: 3650, insurance: 1450, maintenance: 3650, energy: 2750,
      utilities: 1000, deferred_maintenance_risk: 5500, appliance_reserve: 1150,
    },
  },
  '97386': {
    zip: '97386', city: 'Sweet Home', state: 'OR', county: 'Linn',
    median_home_value: 325000,
    costs: {
      property_tax: 3250, insurance: 1400, maintenance: 3250, energy: 2800,
      utilities: 900, deferred_maintenance_risk: 5800, appliance_reserve: 1200,
    },
  },
  '97370': {
    zip: '97370', city: 'Philomath', state: 'OR', county: 'Benton',
    median_home_value: 465000,
    costs: {
      property_tax: 4800, insurance: 1650, maintenance: 4650, energy: 2550,
      utilities: 1100, deferred_maintenance_risk: 4700, appliance_reserve: 1300,
    },
  },
  '97338': {
    zip: '97338', city: 'Dallas', state: 'OR', county: 'Polk',
    median_home_value: 410000,
    costs: {
      property_tax: 4300, insurance: 1550, maintenance: 4100, energy: 2650,
      utilities: 1050, deferred_maintenance_risk: 5000, appliance_reserve: 1250,
    },
  },
  '97361': {
    zip: '97361', city: 'Monmouth', state: 'OR', county: 'Polk',
    median_home_value: 385000,
    costs: {
      property_tax: 4000, insurance: 1500, maintenance: 3850, energy: 2700,
      utilities: 1000, deferred_maintenance_risk: 5200, appliance_reserve: 1200,
    },
  },
  '97720': {
    zip: '97720', city: 'Burns', state: 'OR', county: 'Harney',
    median_home_value: 275000,
    costs: {
      property_tax: 2750, insurance: 1300, maintenance: 2750, energy: 3100,
      utilities: 850, deferred_maintenance_risk: 6200, appliance_reserve: 1100,
    },
  },
};
