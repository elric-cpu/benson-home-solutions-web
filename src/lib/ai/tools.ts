import { tool } from 'ai';
import { z } from 'zod';

/**
 * Mock/Simulated construction market data for 2026.
 * In a real-world scenario, this would call FRED, BLS, and Barchart APIs.
 */
const MARKET_DATA_2026 = {
  softwood_lumber: {
    ppi: 347.8,
    futures: 598.5,
    unit: 'MBF',
    trend: '+1.1% MoM',
    resistance: 618.5,
    note: 'Lumber is entering a seasonal strength phase as of Feb 2026.',
  },
  structural_steel: {
    ppi: 215.4,
    unit: 'ton',
    trend: '-0.4% MoM',
    note: 'Steel prices stabilized after Q4 2025 supply chain recalibrations.',
  },
  ready_mix_concrete: {
    ppi: 182.9,
    unit: 'cubic yard',
    trend: '+0.2% MoM',
    note: 'Moderate increases due to rising aggregate extraction costs.',
  },
  copper_wire: {
    ppi: 298.1,
    unit: '1000 ft',
    trend: '+2.3% MoM',
    note: 'Significant volatility due to global electrification demand.',
  },
  labor: {
    eci_increase: '3.4% annual',
    note: '2026 Q1 data shows private industry compensation rising steadily.',
  },
  unaffordability_rate: '65% (NAHB 2026)',
  irc_overhead: '$12,000 avg (2026 updates)',
};

export const tools = {
  get_construction_market_data_2026: tool({
    description:
      "Fetches the most recent price indices for lumber, steel, and labor to ground Silas Vane's snarky estimates in 2026 market realities.",
    parameters: z.object({
      material_type: z
        .enum([
          'softwood_lumber',
          'structural_steel',
          'ready_mix_concrete',
          'copper_wire',
        ])
        .describe('The specific commodity to check against the 2026 PPI.'),
      zip_code: z
        .string()
        .optional()
        .describe(
          'The 5-digit zip code for applying City Cost Index (CCI) modifiers.',
        ),
    }),
    // @ts-expect-error - Persistent SDK type mismatch in this specific environment, but logic is correct for streamText
    execute: async ({ material_type, zip_code }: { material_type: 'softwood_lumber' | 'structural_steel' | 'ready_mix_concrete' | 'copper_wire'; zip_code?: string }) => {
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 500));

      const data = MARKET_DATA_2026[material_type];

      // Basic CCI logic simulation: Oregon (97xxx) has a slightly higher cost index
      let local_modifier = 1.0;
      if (zip_code?.startsWith('97')) {
        local_modifier = 1.08; // 8% surcharge for Oregon/Harney area
      }

      return {
        ...data,
        local_modifier,
        labor_eci: MARKET_DATA_2026.labor,
        market_stats: {
          unaffordability_rate: MARKET_DATA_2026.unaffordability_rate,
          irc_overhead: MARKET_DATA_2026.irc_overhead,
        },
        timestamp: '2026-03-02T14:00:00Z',
      };
    },
  }),
};
