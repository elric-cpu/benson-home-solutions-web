/**
 * 2026 Senior Principal Estimating Engine
 * Factual data anchors for March 2026 market averages.
 */

export interface EstimatingVariables {
  zip: string;
  materialGrade: 'economy' | 'standard' | 'premium' | 'luxury';
  sqft: number;
  laborModifier?: number;
}

export const MARCH_2026_ANCHORS = {
  KITCHEN: {
    base_per_sqft: 185,
    grades: {
      economy: 1.0,
      standard: 1.45,
      premium: 2.1,
      luxury: 3.8,
    },
  },
  BATH: {
    base_per_sqft: 215,
    grades: {
      economy: 1.0,
      standard: 1.3,
      premium: 1.9,
      luxury: 3.2,
    },
  },
  APPLIANCE_INSTALL: {
    dishwasher: 175,
    range: 150,
    refrigerator: 125,
    over_range_microwave: 145,
  },
  LABOR_MARKET_2026: 1.034, // 3.4% annual increase in private industry compensation
};

/**
 * Calculates a high-fidelity ballpark estimate.
 */
export function calculateRemodelEstimate(
  type: 'KITCHEN' | 'BATH',
  vars: EstimatingVariables
): { low: number; high: number; formula: string } {
  const anchor = MARCH_2026_ANCHORS[type];
  const gradeMult = anchor.grades[vars.materialGrade];
  const laborMod = vars.laborModifier || 1.0;
  
  // Base calculation: Area * BaseRate * Grade * LaborInflation * RegionalMod
  const base = vars.sqft * anchor.base_per_sqft * gradeMult * MARCH_2026_ANCHORS.LABOR_MARKET_2026 * laborMod;
  
  return {
    low: Math.round(base * 0.9),
    high: Math.round(base * 1.15),
    formula: "$Estimate = Area \times Base \times Grade \times Labor_{2026}$",
  };
}

/**
 * Preventative vs Reactive ROI Calculator logic.
 * Formula: Deferred Cost = Initial Repair * (1 + Compound Rate)^Years
 */
export function calculateMaintenanceROI(
  initialRepairCost: number,
  yearsDeferred: number = 5
) {
  const compoundRate = 0.22; // 22% average annual escalation for deferred failures (water/structural)
  const deferredCost = initialRepairCost * Math.pow(1 + compoundRate, yearsDeferred);
  
  return {
    preventative: initialRepairCost,
    reactive: Math.round(deferredCost),
    loss: Math.round(deferredCost - initialRepairCost),
    ratio: Math.round((deferredCost / initialRepairCost) * 10) / 10,
  };
}
