'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button, Card, Container, Section, Badge } from '@/components/ui';
import {
  getAnnualPlanPrice,
  getEmergencyRiskFrame,
  getResidentialIndustryContext,
  getSegmentData,
  getTier,
  getTierEntries,
  recommendedTierBySegment,
  type Segment,
} from '@/lib/maintenance-pricing';

export default function CalculatorPage() {
  const searchParams = useSearchParams();
  const segmentParam = searchParams.get('segment');
  const tierParam = searchParams.get('tier');

  const initialSegment =
    segmentParam === 'residential' ||
    segmentParam === 'commercial' ||
    segmentParam === 'church'
      ? segmentParam
      : 'residential';
  const initialTier = tierParam || recommendedTierBySegment[initialSegment];

  const [segment, setSegment] = useState<Segment>(initialSegment);
  const [tierKey, setTierKey] = useState(initialTier);
  const [homeValue, setHomeValue] = useState(350000);
  const [homeAge, setHomeAge] = useState(20);

  const segmentData = getSegmentData(segment);
  const tiers = getTierEntries(segment);
  const selectedTier = getTier(segment, tierKey);
  const annualPrice = getAnnualPlanPrice(selectedTier.price);
  const reactiveFrame = getEmergencyRiskFrame(segment, annualPrice);
  const residentialIndustry = getResidentialIndustryContext(homeValue, homeAge);

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge
            variant="secondary"
            className="border-oxblood/30 text-oxblood mb-6 px-4 py-1.5 font-black tracking-widest uppercase"
          >
            Exact Plan Pricing
          </Badge>
          <h1 className="text-oxblood mb-8 text-4xl font-black tracking-tight uppercase md:text-6xl">
            Maintenance Service Cost Calculator
          </h1>
          <p className="text-slate mx-auto max-w-3xl text-lg leading-relaxed font-medium md:text-xl">
            This calculator uses Benson Home Solutions plan pricing directly
            from the live plan data in the site. No fake savings. No placeholder
            totals. Pick the property type, compare tiers, and see the annual
            planning frame.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="p-8">
              <h2 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                1. Choose the property and plan
              </h2>

              <div className="mb-8 flex flex-wrap gap-3">
                {(['residential', 'commercial', 'church'] as Segment[]).map(
                  (option) => (
                    <Button
                      key={option}
                      variant={segment === option ? 'primary' : 'outline'}
                      onClick={() => setSegment(option)}
                      className="font-black tracking-widest uppercase"
                    >
                      {getSegmentData(option).name}
                    </Button>
                  ),
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {tiers.map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => setTierKey(tier.key)}
                    className={`rounded-2xl border p-5 text-left transition-colors ${
                      tier.key === selectedTier.key
                        ? 'border-oxblood bg-oxblood text-cream'
                        : 'border-oxblood/10 text-charcoal hover:border-oxblood bg-white'
                    }`}
                  >
                    <div className="text-xs font-black tracking-widest uppercase opacity-60">
                      {tier.key === recommendedTierBySegment[segment]
                        ? 'Recommended'
                        : 'Tier'}
                    </div>
                    <div className="mt-2 text-2xl font-black">{tier.name}</div>
                    <div className="mt-2 text-lg font-bold">
                      {tier.price > 0 ? `$${tier.price}/mo` : 'Custom quote'}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed font-medium opacity-80">
                      {tier.description}
                    </p>
                  </button>
                ))}
              </div>

              {segment === 'residential' && (
                <div className="border-oxblood/10 bg-cream mt-10 grid gap-6 rounded-3xl border p-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="home-value"
                      className="text-oxblood/60 block text-xs font-black tracking-widest uppercase"
                    >
                      Approximate home value
                    </label>
                    <input
                      id="home-value"
                      type="number"
                      min="50000"
                      step="10000"
                      value={homeValue}
                      onChange={(e) =>
                        setHomeValue(Number(e.target.value) || 0)
                      }
                      className="border-oxblood/10 text-oxblood mt-2 w-full rounded-xl border-2 bg-white px-4 py-3 font-bold"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="home-age"
                      className="text-oxblood/60 block text-xs font-black tracking-widest uppercase"
                    >
                      Approximate home age
                    </label>
                    <input
                      id="home-age"
                      type="number"
                      min="0"
                      max="120"
                      value={homeAge}
                      onChange={(e) => setHomeAge(Number(e.target.value) || 0)}
                      className="border-oxblood/10 text-oxblood mt-2 w-full rounded-xl border-2 bg-white px-4 py-3 font-bold"
                    />
                  </div>
                </div>
              )}
            </Card>

            <Card className="bg-oxblood text-cream p-8">
              <div className="text-xs font-black tracking-widest uppercase opacity-60">
                2. Your planning frame
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                {segmentData.name} {selectedTier.name}
              </h2>

              <div className="border-cream/10 mt-8 grid gap-6 border-y py-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-black tracking-widest uppercase opacity-60">
                      Monthly price
                    </div>
                    <div className="mt-2 text-4xl font-black">
                      ${selectedTier.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black tracking-widest uppercase opacity-60">
                      Annual price
                    </div>
                    <div className="mt-2 text-2xl font-black">
                      ${annualPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-black tracking-widest uppercase opacity-60">
                    Reactive planning frame
                  </div>
                  <div className="mt-2 text-xl font-black">
                    ${reactiveFrame.reactiveRangeLow.toLocaleString()}-$
                    {reactiveFrame.reactiveRangeHigh.toLocaleString()}/yr
                  </div>
                  <p className="mt-2 text-sm leading-relaxed font-medium opacity-80">
                    This is the more honest comparison for Benson plans:
                    proactive coverage versus emergency response, deferred
                    maintenance, and catch-up work.
                  </p>
                </div>

                {segment === 'residential' &&
                  residentialIndustry.annualLow != null &&
                  residentialIndustry.annualHigh != null && (
                    <div>
                      <div className="text-xs font-black tracking-widest uppercase opacity-60">
                        Industry budgeting context
                      </div>
                      <div className="mt-2 text-xl font-black">
                        ${residentialIndustry.annualLow.toLocaleString()}-$
                        {residentialIndustry.annualHigh.toLocaleString()}/yr
                      </div>
                      <p className="mt-2 text-sm leading-relaxed font-medium opacity-80">
                        {residentialIndustry.note}
                      </p>
                    </div>
                  )}
              </div>

              <ul className="mt-8 space-y-3 text-sm leading-relaxed font-medium opacity-90">
                {selectedTier.features.slice(0, 4).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="mt-8 space-y-4">
                <Link
                  href={`/contact?service=Maintenance Plan`}
                  className="block"
                >
                  <Button
                    variant="secondary"
                    className="w-full font-black tracking-widest uppercase"
                  >
                    Request This Plan
                  </Button>
                </Link>
                <Link href="/plans" className="block">
                  <Button
                    variant="outline"
                    className="border-cream text-cream w-full"
                  >
                    Compare All Plans
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
