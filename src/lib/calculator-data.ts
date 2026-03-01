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
    zip: '97321',
    city: 'Albany',
    state: 'OR',
    county: 'Linn',
    median_home_value: 425000,
    costs: {
      property_tax: 4250,
      insurance: 1650,
      maintenance: 4250,
      energy: 2600,
      utilities: 1100,
      deferred_maintenance_risk: 5100,
      appliance_reserve: 1300,
    },
  },
  '97322': {
    zip: '97322',
    city: 'Albany',
    state: 'OR',
    county: 'Linn',
    median_home_value: 415000,
    costs: {
      property_tax: 4150,
      insurance: 1600,
      maintenance: 4150,
      energy: 2550,
      utilities: 1050,
      deferred_maintenance_risk: 4900,
      appliance_reserve: 1250,
    },
  },
  '97386': {
    zip: '97386',
    city: 'Sweet Home',
    state: 'OR',
    county: 'Linn',
    median_home_value: 325000,
    costs: {
      property_tax: 3250,
      insurance: 1400,
      maintenance: 3250,
      energy: 2800,
      utilities: 900,
      deferred_maintenance_risk: 5800,
      appliance_reserve: 1200,
    },
  },
  '97720': {
    zip: '97720',
    city: 'Burns',
    state: 'OR',
    county: 'Harney',
    median_home_value: 275000,
    costs: {
      property_tax: 2750,
      insurance: 1300,
      maintenance: 2750,
      energy: 3100,
      utilities: 850,
      deferred_maintenance_risk: 6200,
      appliance_reserve: 1100,
    },
  },
};
