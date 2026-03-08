export interface ZipData {
  city: string;
  state: string;
  zip: string;
  county: string;
  costs: {
    property_tax: {
      annual: number;
      confidence: 'high' | 'medium' | 'low';
      source: string;
    };
    insurance: {
      annual: number;
      confidence: 'high' | 'medium' | 'low';
      source: string;
    };
    maintenance: {
      annual: number;
      confidence: 'high' | 'medium' | 'low';
      source: string;
    };
    energy: {
      annual: number;
      confidence: 'high' | 'medium' | 'low';
      source: string;
    };
    utilities: {
      annual: number;
      confidence: 'high' | 'medium' | 'low';
      source: string;
    };
    deferred_maintenance_risk: {
      annual: number;
      confidence: 'high' | 'medium' | 'low';
      source: string;
    };
    appliance_reserve: {
      annual: number;
      confidence: 'high' | 'medium' | 'low';
      source: string;
    };
  };
}

export const DEFAULT_BENCHMARK: ZipData = {
  city: 'Unknown',
  state: 'OR',
  zip: '00000',
  county: 'Unknown',
  costs: {
    property_tax: { annual: 3500, confidence: 'medium', source: 'Census ACS' },
    insurance: { annual: 1200, confidence: 'medium', source: 'NAIC' },
    maintenance: { annual: 4500, confidence: 'medium', source: 'DOE ResStock' },
    energy: { annual: 2200, confidence: 'high', source: 'EIA' },
    utilities: { annual: 1800, confidence: 'medium', source: 'Local Utility' },
    deferred_maintenance_risk: {
      annual: 3000,
      confidence: 'medium',
      source: 'Actuarial',
    },
    appliance_reserve: {
      annual: 800,
      confidence: 'medium',
      source: 'Consumer Reports',
    },
  },
};

export const MOCK_ZIP_DATA: Record<string, ZipData> = {
  '97321': {
    city: 'Albany',
    state: 'OR',
    zip: '97321',
    county: 'Linn',
    costs: {
      property_tax: {
        annual: 3100,
        confidence: 'high',
        source: 'Linn County Assessor',
      },
      insurance: { annual: 950, confidence: 'high', source: 'Local Agent' },
      maintenance: {
        annual: 3800,
        confidence: 'high',
        source: 'Benson Historical Data',
      },
      energy: { annual: 2400, confidence: 'high', source: 'Pacific Power' },
      utilities: { annual: 1600, confidence: 'high', source: 'City of Albany' },
      deferred_maintenance_risk: {
        annual: 2800,
        confidence: 'medium',
        source: 'Benson Model',
      },
      appliance_reserve: {
        annual: 750,
        confidence: 'medium',
        source: 'Market Rates',
      },
    },
  },
};

export function isServiceArea(
  zip: string,
  county: string,
  state: string,
): boolean {
  if (state !== 'OR') return false;
  if (county === 'Linn' || county === 'Benton' || county === 'Harney')
    return true;
  const serviceZips = [
    '97321',
    '97322',
    '97386',
    '97355',
    '97330',
    '97333',
    '97720',
  ];
  return serviceZips.includes(zip);
}
