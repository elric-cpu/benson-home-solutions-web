import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import {
  Section,
  Container,
  Badge,
  Card,
  CardContent,
  Button,
} from '@/components/ui';
import { MOCK_ZIP_DATA, DEFAULT_BENCHMARK } from '@/lib/calculator-data';
import Link from 'next/link';
import { RefineEstimatesForm } from './RefineEstimatesForm';

interface Props {
  params: Promise<{ hash: string }>;
}

async function ReportContent({ hash }: { hash: string }) {
  // 1. Try to fetch from database
  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.addressHash, hash));

  // 2. If not found in DB, show 404
  if (!property) {
    notFound();
  }

  // Use the stored data or fallback to ZIP-level defaults
  const zipData = MOCK_ZIP_DATA[property.zip || ''] || DEFAULT_BENCHMARK;

  // Extract costs with proper fallback
  const energyBenchmarks = property.energyBenchmarks as {
    costs?: Record<string, number>;
  } | null;
  const costs = energyBenchmarks?.costs || zipData.costs;

  const annualTotal = Object.values(costs).reduce((acc, val) => acc + val, 0);
  const monthlyTotal = Math.floor(annualTotal / 12);

  const avgCosts = DEFAULT_BENCHMARK.costs;

  return (
    <>
      <Section variant="oxblood" className="text-cream py-20">
        <Container size="narrow" className="text-center">
          <Badge
            variant="secondary"
            className="bg-cream/10 text-cream border-cream/20 mb-6 tracking-widest uppercase"
          >
            Property Intelligence Report
          </Badge>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            {property.rawAddress}
          </h1>
          <div className="mb-4 text-6xl font-black tabular-nums md:text-8xl">
            ${annualTotal.toLocaleString()}
            <span className="ml-2 text-2xl font-bold opacity-50 md:text-3xl">
              /year
            </span>
          </div>
          <p className="text-cream/80 text-xl font-medium md:text-2xl">
            That&apos;s{' '}
            <strong>${monthlyTotal.toLocaleString()} per month</strong> in
            hidden costs.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-charcoal text-2xl font-bold">
                  Cost Breakdown vs. Average
                </h3>
                <div className="flex gap-4 text-[10px] font-bold tracking-widest uppercase">
                  <div className="flex items-center gap-2">
                    <div className="bg-oxblood h-2 w-2 rounded-full" /> Your
                    Home
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-slate/20 h-2 w-2 rounded-full" />{' '}
                    National Avg
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                {Object.entries(costs).map(([key, value]) => {
                  const avgVal = (avgCosts as Record<string, number>)[key] || 0;
                  const maxVal = Math.max(value, avgVal);
                  const slugMap: Record<string, string> = {
                    property_tax: 'property-taxes',
                    insurance: 'insurance',
                    maintenance: 'maintenance',
                    energy: 'energy',
                    utilities: 'water-utilities',
                    deferred_maintenance_risk: 'deferred-maintenance',
                    appliance_reserve: 'appliance-lifecycle',
                  };
                  return (
                    <div key={key} className="group">
                      <div className="mb-2 flex items-end justify-between">
                        <Link
                          href={`/methodology/${slugMap[key] || ''}`}
                          className="text-slate hover:text-oxblood text-sm font-bold tracking-wider uppercase transition-colors"
                        >
                          {key.replace(/_/g, ' ')} &rarr;
                        </Link>
                        <div className="text-right">
                          <div className="text-charcoal font-bold">
                            ${value.toLocaleString()}
                          </div>
                          <div className="text-slate text-[10px] opacity-50">
                            Avg: ${avgVal.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {/* Your Cost */}
                        <div className="bg-slate/5 h-2.5 overflow-hidden rounded-full">
                          <div
                            className="bg-oxblood h-full transition-all duration-1000 ease-out"
                            style={{ width: `${(value / maxVal) * 100}%` }}
                          />
                        </div>
                        {/* Avg Cost */}
                        <div className="bg-slate/5 h-1 overflow-hidden rounded-full opacity-50">
                          <div
                            className="bg-slate/30 h-full"
                            style={{ width: `${(avgVal / maxVal) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-8">
              <Card variant="outlined" className="border-red-100 bg-red-50/30">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-bold text-red-900">
                    ⚠️ Deferred Maintenance Risk
                  </h3>
                  <p className="text-sm leading-relaxed text-red-800">
                    Your estimated deferred maintenance risk is{' '}
                    <strong>
                      $
                      {(
                        costs as Record<string, number>
                      ).deferred_maintenance_risk.toLocaleString()}
                    </strong>
                    . Proactive maintenance through a Benson Home Solutions plan
                    can reduce this risk by up to 60% over 5 years.
                  </p>
                </CardContent>
              </Card>

              <Card variant="outlined" className="bg-cream/30">
                <CardContent className="p-8">
                  <h3 className="text-charcoal mb-6 text-xl font-bold">
                    Property Metadata
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
                    <div>
                      <dt className="text-slate font-bold tracking-wider uppercase opacity-50">
                        City
                      </dt>
                      <dd className="text-charcoal font-medium">
                        {property.city}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate font-bold tracking-wider uppercase opacity-50">
                        State
                      </dt>
                      <dd className="text-charcoal font-medium">
                        {property.state}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate font-bold tracking-wider uppercase opacity-50">
                        ZIP Code
                      </dt>
                      <dd className="text-charcoal font-medium">
                        {property.zip}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate font-bold tracking-wider uppercase opacity-50">
                        County
                      </dt>
                      <dd className="text-charcoal font-medium">
                        {property.county}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate font-bold tracking-wider uppercase opacity-50">
                        Data Confidence
                      </dt>
                      <dd className="text-charcoal font-medium">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          High
                        </Badge>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate font-bold tracking-wider uppercase opacity-50">
                        Report ID
                      </dt>
                      <dd className="text-charcoal truncate font-mono text-[10px]">
                        {hash.slice(0, 8)}...
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <RefineEstimatesForm
                initialCosts={costs}
                initialMetadata={{
                  sqft: (property.housingData as { sqft?: number } | null)
                    ?.sqft,
                  yearBuilt: (
                    property.housingData as { yearBuilt?: number } | null
                  )?.yearBuilt,
                }}
              />

              <Card className="bg-charcoal text-cream shadow-elevated border-none">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-2xl font-bold">Next Steps</h3>
                  <div className="mb-8 space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                        1
                      </div>
                      <p className="text-cream/70 text-sm">
                        Download your full maintenance checklist (sent to
                        email).
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                        2
                      </div>
                      <p className="text-cream/70 text-sm">
                        Review energy efficiency recommendations for{' '}
                        {property.city}.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                        3
                      </div>
                      <p className="text-cream/70 text-sm">
                        Schedule a professional on-site audit with our team.
                      </p>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button variant="secondary" size="lg" className="w-full">
                      Book Initial Assessment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default async function ReportPage(props: Props) {
  const { hash } = await props.params;

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="border-oxblood/20 border-t-oxblood h-12 w-12 animate-spin rounded-full border-4" />
        </div>
      }
    >
      <ReportContent hash={hash} />
    </Suspense>
  );
}
