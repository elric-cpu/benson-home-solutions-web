'use client';

import { useState } from 'react';
import { Section, Container, Card, CardContent, Badge } from '@/components/ui';
import { MARCH_2026_ANCHORS } from '@/lib/estimating-engine';
import Link from 'next/link';

export default function ApplianceReplacementPage() {
  const [selectedAppliance, setSelectedAppliance] =
    useState<keyof typeof MARCH_2026_ANCHORS.APPLIANCE_INSTALL>('dishwasher');
  const [zip, setZip] = useState('');

  const installCost = MARCH_2026_ANCHORS.APPLIANCE_INSTALL[selectedAppliance];
  const totalWithLabor = Math.round(
    installCost * MARCH_2026_ANCHORS.LABOR_MARKET_2026,
  );

  return (
    <main>
      <Section variant="cream" spacing="lg" className="pb-32">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/tools"
              className="text-oxblood hover:text-oxblood/80 mb-4 inline-block text-sm font-medium transition-colors"
            >
              &larr; All Tools
            </Link>
            <Badge variant="secondary" className="mb-4 block w-fit">
              Modernization Suite
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl">
              Appliance Replacement Estimator
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Calculate labor and installation costs for modernizing your home
              appliances. Anchored to 2026 trade rates.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="-mt-32">
        <Container size="narrow">
          <Card className="border-oxblood/10 shadow-elevated">
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                    Select Appliance
                  </label>
                  <select
                    value={selectedAppliance}
                    onChange={(e) =>
                      setSelectedAppliance(
                        e.target
                          .value as keyof typeof MARCH_2026_ANCHORS.APPLIANCE_INSTALL,
                      )
                    }
                    className="border-slate/20 focus:border-oxblood w-full rounded-lg border p-3 outline-none"
                  >
                    <option value="dishwasher">Dishwasher</option>
                    <option value="range">Range (Gas/Electric)</option>
                    <option value="refrigerator">
                      Refrigerator (with Water Line)
                    </option>
                    <option value="over_range_microwave">OTR Microwave</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                    Installation Zip
                  </label>
                  <input
                    type="text"
                    placeholder="97321"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="border-slate/20 focus:border-oxblood w-full rounded-lg border p-3 outline-none"
                  />
                </div>
              </div>

              <div className="mt-12 text-center">
                <Badge variant="secondary" className="mb-2 uppercase">
                  Labor Only (Projected)
                </Badge>
                <div className="text-charcoal text-6xl font-black tabular-nums md:text-8xl">
                  ${totalWithLabor.toLocaleString()}
                </div>
                <p className="text-slate mx-auto mt-4 max-w-sm text-sm">
                  Estimated professional installation labor for{' '}
                  {selectedAppliance.replace(/_/g, ' ')}. Does not include
                  appliance purchase price.
                </p>
              </div>

              <div className="bg-charcoal text-cream mt-12 rounded-xl p-8">
                <h3 className="mb-4 text-xl font-bold">
                  Why Professional Install?
                </h3>
                <ul className="text-cream/70 list-none space-y-3 pl-0 text-sm">
                  <li className="flex gap-2">
                    <span className="text-oxblood font-bold">✓</span> 2026 IRC
                    Electrical Compliance
                  </li>
                  <li className="flex gap-2">
                    <span className="text-oxblood font-bold">✓</span> Anti-tip
                    Bracket Verification
                  </li>
                  <li className="flex gap-2">
                    <span className="text-oxblood font-bold">✓</span> Proper
                    Drainage/Seal Validation
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
