import planData from '@/lib/maintenance-plans.json';

export type Segment = keyof typeof planData.segments;

export type TierKey<S extends Segment = Segment> =
  keyof (typeof planData.segments)[S]['tiers'];

export type MaintenanceTier = {
  key: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

export const recommendedTierBySegment: Record<Segment, string> = {
  residential: 'standard',
  commercial: 'plus',
  church: 'guardian',
};

export function getSegmentData(segment: Segment) {
  return planData.segments[segment];
}

export function getTierEntries(segment: Segment): MaintenanceTier[] {
  return Object.entries(planData.segments[segment].tiers).map(
    ([key, tier]) => ({
      key,
      name: tier.name,
      price: tier.price,
      description: tier.description,
      features: tier.features,
    }),
  );
}

export function getTier(
  segment: Segment,
  tierKey?: string | null,
): MaintenanceTier {
  const tiers = getTierEntries(segment);
  const resolvedKey =
    tierKey && tierKey in planData.segments[segment].tiers
      ? tierKey
      : recommendedTierBySegment[segment];

  return tiers.find((tier) => tier.key === resolvedKey) ?? tiers[0];
}

export function getAnnualPlanPrice(monthlyPrice: number) {
  return monthlyPrice * 12;
}

export function getMonthlyEquivalent(annualCost: number) {
  return Math.round(annualCost / 12);
}

export function getResidentialIndustryContext(
  homeValue?: number | null,
  homeAge?: number | null,
) {
  const percentBand =
    homeAge == null || homeAge < 6
      ? { low: 0.5, high: 1 }
      : homeAge < 16
        ? { low: 1, high: 1.5 }
        : homeAge < 31
          ? { low: 1.5, high: 2.5 }
          : { low: 2, high: 4 };

  if (!homeValue) {
    return {
      annualLow: null,
      annualHigh: null,
      note: 'Industry budgeting rules usually start at about 1% of home value per year and climb for older homes, larger homes, and harsher climates.',
    };
  }

  return {
    annualLow: Math.round(homeValue * (percentBand.low / 100)),
    annualHigh: Math.round(homeValue * (percentBand.high / 100)),
    note: 'This benchmark uses the common 1%-plus maintenance budgeting rule, with higher bands for older homes that typically require more correction work.',
  };
}

export function getEmergencyRiskFrame(
  segment: Segment,
  annualPlanPrice: number,
) {
  const multiplier =
    segment === 'commercial' ? 2.4 : segment === 'church' ? 2.2 : 2;

  return {
    annualPlanPrice,
    reactiveRangeLow: Math.round(annualPlanPrice * multiplier),
    reactiveRangeHigh: Math.round(annualPlanPrice * (multiplier + 1.2)),
  };
}
