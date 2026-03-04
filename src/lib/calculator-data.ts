export interface CostDetail {
  annual: number;
  confidence: 'high' | 'medium' | 'low';
  source: string;
}

export interface ZipData {
  zip: string;
  city: string;
  state: string;
  county: string;
  median_home_value: number;
  costs: {
    property_tax: CostDetail;
    insurance: CostDetail;
    maintenance: CostDetail;
    energy: CostDetail;
    utilities: CostDetail;
    deferred_maintenance_risk: CostDetail;
    appliance_reserve: CostDetail;
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
    property_tax: { annual: 3500, confidence: 'medium', source: 'Census ACS B25103' },
    insurance: { annual: 1500, confidence: 'medium', source: 'NAIC State Averages' },
    maintenance: { annual: 3500, confidence: 'medium', source: 'DOE ResStock + Harvard JCHS' },
    energy: { annual: 2400, confidence: 'high', source: 'EIA RECS + NOAA HDD/CDD' },
    utilities: { annual: 1200, confidence: 'low', source: 'Census ACS Utility Tables' },
    deferred_maintenance_risk: { annual: 4500, confidence: 'medium', source: 'Harvard JCHS + Benson Model' },
    appliance_reserve: { annual: 1200, confidence: 'medium', source: 'DOE + BLS CPI' },
  },
};

// Targeted data for Benson service areas
export const MOCK_ZIP_DATA: Record<string, ZipData> = {
  '97321': {
    zip: '97321', city: 'Albany', state: 'OR', county: 'Linn', median_home_value: 425000,
    costs: {
      property_tax: { annual: 4250, confidence: 'high', source: 'Linn County Assessor' },
      insurance: { annual: 1650, confidence: 'medium', source: 'NAIC + FEMA Zone AE' },
      maintenance: { annual: 4250, confidence: 'high', source: 'Benson Regional Model' },
      energy: { annual: 2600, confidence: 'high', source: 'EIA RECS (Climate Zone 4C)' },
      utilities: { annual: 1100, confidence: 'medium', source: 'City of Albany Utilities' },
      deferred_maintenance_risk: { annual: 5100, confidence: 'medium', source: 'Harvard JCHS' },
      appliance_reserve: { annual: 1300, confidence: 'medium', source: 'DOE Life Cycles' },
    },
  },
  '97322': {
    zip: '97322', city: 'Albany', state: 'OR', county: 'Linn', median_home_value: 415000,
    costs: {
      property_tax: { annual: 4150, confidence: 'high', source: 'Linn County Assessor' },
      insurance: { annual: 1600, confidence: 'medium', source: 'NAIC + FEMA Zone X' },
      maintenance: { annual: 4150, confidence: 'high', source: 'Benson Regional Model' },
      energy: { annual: 2550, confidence: 'high', source: 'EIA RECS (Climate Zone 4C)' },
      utilities: { annual: 1050, confidence: 'medium', source: 'City of Albany Utilities' },
      deferred_maintenance_risk: { annual: 4900, confidence: 'medium', source: 'Harvard JCHS' },
      appliance_reserve: { annual: 1250, confidence: 'medium', source: 'DOE Life Cycles' },
    },
  },
  '97355': {
    zip: '97355', city: 'Lebanon', state: 'OR', county: 'Linn', median_home_value: 365000,
    costs: {
      property_tax: { annual: 3650, confidence: 'high', source: 'Linn County Assessor' },
      insurance: { annual: 1450, confidence: 'medium', source: 'NAIC State Averages' },
      maintenance: { annual: 3650, confidence: 'high', source: 'Benson Regional Model' },
      energy: { annual: 2750, confidence: 'high', source: 'EIA RECS (Climate Zone 4C)' },
      utilities: { annual: 1000, confidence: 'medium', source: 'City of Lebanon Utilities' },
      deferred_maintenance_risk: { annual: 5500, confidence: 'medium', source: 'Harvard JCHS' },
      appliance_reserve: { annual: 1150, confidence: 'medium', source: 'DOE Life Cycles' },
    },
  },
  '97386': {
    zip: '97386', city: 'Sweet Home', state: 'OR', county: 'Linn', median_home_value: 325000,
    costs: {
      property_tax: { annual: 3250, confidence: 'high', source: 'Linn County Assessor' },
      insurance: { annual: 1400, confidence: 'medium', source: 'NAIC State Averages' },
      maintenance: { annual: 3250, confidence: 'high', source: 'Benson Regional Model' },
      energy: { annual: 2800, confidence: 'high', source: 'EIA RECS (Climate Zone 4C)' },
      utilities: { annual: 900, confidence: 'medium', source: 'City of Sweet Home Utilities' },
      deferred_maintenance_risk: { annual: 5800, confidence: 'medium', source: 'Harvard JCHS' },
      appliance_reserve: { annual: 1200, confidence: 'medium', source: 'DOE Life Cycles' },
    },
  },
  '97720': {
    zip: '97720', city: 'Burns', state: 'OR', county: 'Harney', median_home_value: 275000,
    costs: {
      property_tax: { annual: 2750, confidence: 'high', source: 'Harney County Assessor' },
      insurance: { annual: 1300, confidence: 'medium', source: 'NAIC State Averages' },
      maintenance: { annual: 2750, confidence: 'high', source: 'Benson Regional Model' },
      energy: { annual: 3100, confidence: 'high', source: 'EIA RECS (Climate Zone 6)' },
      utilities: { annual: 850, confidence: 'medium', source: 'City of Burns Utilities' },
      deferred_maintenance_risk: { annual: 6200, confidence: 'medium', source: 'Harvard JCHS' },
      appliance_reserve: { annual: 1100, confidence: 'medium', source: 'DOE Life Cycles' },
    },
  },
};

/**
 * Checks if a given ZIP code or county is within the Benson Home Solutions service area.
 */
export function isServiceArea(
  zip: string,
  county?: string,
  state?: string,
): boolean {
  if (state !== 'OR') return false;

  // Harney County Check
  if (county?.toLowerCase().includes('harney')) return true;

  // Specific Harney ZIPs
  const harneyZips = [
    '97720',
    '97758',
    '97904',
    '97710',
    '97920',
    '97721',
    '97722',
    '97736',
  ];
  if (harneyZips.includes(zip)) return true;

  // Mid-Willamette Valley ZIPs
  const coreZips = [
    '97321', '97322', '97355', '97386', '97330', '97333', 
    '97301', '97302', '97303', '97304', '97305', '97306',
    '97317', '97370', '97338', '97361', '97348', '97448',
    '97401', '97402', '97403', '97404', '97405', '97408',
  ];

  if (coreZips.includes(zip)) return true;

  const valleyCounties = ['linn', 'benton', 'marion', 'polk', 'lane'];
  if (county && valleyCounties.includes(county.toLowerCase())) return true;

  return false;
}
