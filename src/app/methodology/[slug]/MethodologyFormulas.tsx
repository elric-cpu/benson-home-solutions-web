'use client';

export interface FormulaData {
  formula: string;
  variables: { name: string; description: string }[];
  example?: string;
}

export const METHODOLOGY_FORMULAS: Record<string, FormulaData> = {
  'property-taxes': {
    formula: 'T = (V * R) + F',
    variables: [
      { name: 'T', description: 'Total Annual Property Tax' },
      { name: 'V', description: 'Assessed Property Value' },
      { name: 'R', description: 'Millage Rate (Regional %)' },
      { name: 'F', description: 'Fixed Local Assessments/Fees' },
    ],
    example: 'For a $400k home in Linn County with a 1.2% rate, T = ($400,000 * 0.012) + $240 = $5,040/yr.',
  },
  insurance: {
    formula: 'I = B * (1 + F) * (1 + S)',
    variables: [
      { name: 'I', description: 'Annual Insurance Premium' },
      { name: 'B', description: 'Base Regional Premium (NAIC)' },
      { name: 'F', description: 'Flood Zone Multiplier (FEMA)' },
      { name: 'S', description: 'Structure Specific Risk Factor' },
    ],
    example: 'A home in flood zone AE might see F = 0.45, increasing base premiums by 45%.',
  },
  maintenance: {
    formula: 'M = (V * 0.01) * (1 + (A/50))',
    variables: [
      { name: 'M', description: 'Annual Preventive Maintenance Budget' },
      { name: 'V', description: 'Total Structure Replacement Cost' },
      { name: 'A', description: 'Building Age (in years)' },
    ],
    example: 'A 25-year-old home requires ~50% more maintenance budget than a new build to handle system wear.',
  },
  energy: {
    formula: 'E = (HDD * C) + (CDD * C) + B',
    variables: [
      { name: 'E', description: 'Total Annual Energy Cost' },
      { name: 'HDD', description: 'Heating Degree Days (NOAA)' },
      { name: 'CDD', description: 'Cooling Degree Days (NOAA)' },
      { name: 'C', description: 'Climate Consumption Constant' },
      { name: 'B', description: 'Base Appliance Load' },
    ],
    example: 'Mid-Willamette Valley averages 4,800 HDD, driving heating as 60% of annual energy load.',
  },
  'water-utilities': {
    formula: 'U = R + (U_avg * P)',
    variables: [
      { name: 'U', description: 'Annual Utility Cost' },
      { name: 'R', description: 'Fixed Readiness Rate' },
      { name: 'U_avg', description: 'Median Local Consumption' },
      { name: 'P', description: 'Price Per CCF/kGal' },
    ],
    example: 'Fixed service fees in rural Oregon often account for 40% of the total water/sewer bill.',
  },
  'deferred-maintenance': {
    formula: 'D = R * (1 + i)^n',
    variables: [
      { name: 'D', description: 'Deferred Maintenance Cost' },
      { name: 'R', description: 'Routine Repair Cost' },
      { name: 'i', description: 'Compound Failure Rate (Estimated 20-30%)' },
      { name: 'n', description: 'Number of Years Delayed' },
    ],
    example: 'A $500 gutter cleaning delayed for 3 years leads to $5,000+ in foundation and siding rot.',
  },
  'appliance-lifecycle': {
    formula: 'S = SUM(C_i / L_i)',
    variables: [
      { name: 'S', description: 'Annual Sinking Fund Contribution' },
      { name: 'C_i', description: 'Replacement Cost of System i' },
      { name: 'L_i', description: 'Remaining Lifespan of System i' },
    ],
    example: 'A $12,000 HVAC system with 12 years left requires a $1,000/year reserve contribution.',
  },
};
