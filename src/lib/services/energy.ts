/**
 * Energy Benchmark Service
 * Estimates energy performance based on building vintage and climate zone.
 */

export interface EnergyBenchmark {
  annualKwh: number;
  annualTherms: number;
  efficiencyScore: number; // 0-100
  potentialSavings: number; // USD
}

/**
 * Basic lookup table for energy benchmarks based on vintage.
 * Source: DOE ResStock / EIA RECS averages.
 */
const VINTAGE_BENCHMARKS: Record<string, EnergyBenchmark> = {
  pre_1950: { annualKwh: 12000, annualTherms: 900, efficiencyScore: 35, potentialSavings: 800 },
  '1950_1980': { annualKwh: 10500, annualTherms: 750, efficiencyScore: 50, potentialSavings: 500 },
  '1980_2010': { annualKwh: 9000, annualTherms: 600, efficiencyScore: 70, potentialSavings: 300 },
  post_2010: { annualKwh: 7500, annualTherms: 450, efficiencyScore: 85, potentialSavings: 150 },
};

export function getEnergyBenchmark(yearBuilt: number, climateZone: string = '4C'): EnergyBenchmark {
  let vintage = 'post_2010';
  if (yearBuilt < 1950) vintage = 'pre_1950';
  else if (yearBuilt < 1980) vintage = '1950_1980';
  else if (yearBuilt < 2010) vintage = '1980_2010';

  const base = VINTAGE_BENCHMARKS[vintage];

  // Apply climate zone adjustment
  // 4C (Willamette Valley) is temperate. 6 (Harney) is cold.
  const multiplier = climateZone === '6' ? 1.4 : 1.0;

  return {
    annualKwh: Math.round(base.annualKwh * multiplier),
    annualTherms: Math.round(base.annualTherms * multiplier),
    efficiencyScore: base.efficiencyScore,
    potentialSavings: Math.round(base.potentialSavings * multiplier),
  };
}
