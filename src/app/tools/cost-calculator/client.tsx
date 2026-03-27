'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

const sidingTypes = [
  { name: 'Wood / Cedar', risk: 0.9, maintenance: 'High' },
  { name: 'Hardie / Fiber Cement', risk: 0.3, maintenance: 'Medium' },
  { name: 'Vinyl', risk: 0.4, maintenance: 'Low' },
  { name: 'Brick / Stone', risk: 0.1, maintenance: 'Low' },
];

const locations = [
  { name: 'Mid-Willamette Valley', rainfall: 45, humidity: 80 },
  { name: 'Harney County', rainfall: 10, humidity: 20 },
  { name: 'Oregon Coast', rainfall: 80, humidity: 90 },
];

export default function RotRiskSimulator() {
  const [yearsDeferred, setYearsDeferred] = useState(0);
  const [siding, setSiding] = useState(sidingTypes[0]);
  const [location, setLocation] = useState(locations[0]);

  const baseMaint = 150 * (yearsDeferred || 1);
  const mult = location.rainfall > 40 ? 1.8 : 1.3;
  const baseRest = 1500 * Math.pow(mult, yearsDeferred) * siding.risk;

  const repairCost = Math.round(baseMaint);
  const restorationCost = Math.round(baseRest);

  const riskScore = Math.min(
    100,
    Math.round(yearsDeferred * 15 * siding.risk * (location.rainfall / 30)),
  );

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge
            variant="secondary"
            className="border-oxblood/30 text-oxblood mb-6 px-4 py-1.5 font-black tracking-widest uppercase"
          >
            Methodology Tool Reviewed by Elric Benson
          </Badge>
          <h1 className="text-oxblood mb-8 text-5xl leading-tight font-black tracking-tight md:text-7xl">
            The Oregon <br />
            <span className="text-oxblood/60 italic">Dry Rot Calculator</span>
          </h1>
          <p className="text-oxblood/80 mx-auto max-w-2xl text-xl font-medium">
            A small leak can rot out a wall in a single season. Use this tool to
            understand your property&apos;s real-world risk, and how much it
            could cost if left unchecked.
          </p>
          <p className="text-slate mx-auto mt-6 max-w-3xl text-base leading-relaxed font-medium">
            This calculator is designed for answer-first research. It gives
            Oregon property owners a directional estimate based on deferred
            maintenance, moisture exposure, and cladding risk so you can
            understand what drives price before you request a scope.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Card className="border-oxblood/5 p-8 shadow-2xl">
              <h2 className="text-oxblood mb-8 text-2xl font-black tracking-tight uppercase">
                1. Set Your Property&apos;s Parameters
              </h2>

              <div className="space-y-8">
                <div>
                  <label
                    htmlFor="years-deferred"
                    className="text-oxblood/60 mb-4 block text-sm font-black tracking-widest uppercase"
                  >
                    Years of Deferred Maintenance: {yearsDeferred}
                  </label>
                  <input
                    id="years-deferred"
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={yearsDeferred}
                    onChange={(e) => setYearsDeferred(parseInt(e.target.value))}
                    aria-label="Years of deferred maintenance"
                    className="bg-oxblood/10 accent-oxblood h-3 w-full cursor-pointer appearance-none rounded-lg"
                  />
                  <div className="text-oxblood/40 mt-2 flex justify-between text-[10px] font-bold uppercase">
                    <span>Proactive</span>
                    <span>Neglected</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="risk-location"
                      className="text-oxblood/60 mb-2 block text-sm font-black tracking-widest uppercase"
                    >
                      Location
                    </label>
                    <select
                      id="risk-location"
                      className="bg-cream border-oxblood/10 text-oxblood focus:border-oxblood w-full rounded-xl border-2 p-3 font-bold outline-none"
                      onChange={(e) =>
                        setLocation(
                          locations.find((l) => l.name === e.target.value) ||
                            locations[0],
                        )
                      }
                    >
                      {locations.map((l) => (
                        <option key={l.name}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="risk-siding"
                      className="text-oxblood/60 mb-2 block text-sm font-black tracking-widest uppercase"
                    >
                      Siding
                    </label>
                    <select
                      id="risk-siding"
                      className="bg-cream border-oxblood/10 text-oxblood focus:border-oxblood w-full rounded-xl border-2 p-3 font-bold outline-none"
                      onChange={(e) =>
                        setSiding(
                          sidingTypes.find((s) => s.name === e.target.value) ||
                            sidingTypes[0],
                        )
                      }
                    >
                      {sidingTypes.map((s) => (
                        <option key={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              <Card
                className={`text-cream border-none p-8 transition-all duration-500 ${riskScore > 50 ? 'bg-red-900' : 'bg-oxblood'}`}
              >
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <div className="mb-1 text-sm font-black tracking-widest uppercase opacity-60">
                      Your Dry Rot Risk Score
                    </div>
                    <div className="text-6xl font-black italic">
                      {riskScore}%
                    </div>
                  </div>
                  <AlertTriangle
                    className={`h-12 w-12 ${riskScore > 50 ? 'animate-pulse' : 'opacity-20'}`}
                  />
                </div>

                <div className="border-cream/10 grid grid-cols-2 gap-8 border-y py-8">
                  <div>
                    <div className="mb-2 text-[10px] font-black tracking-widest uppercase opacity-60">
                      Proactive Maintenance
                    </div>
                    <div className="text-2xl font-black">
                      ${repairCost.toLocaleString()}
                    </div>
                    <div className="mt-1 text-[10px] italic opacity-60">
                      The cost to fix it now.
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-[10px] font-black tracking-widest uppercase opacity-60">
                      Reactive Restoration
                    </div>
                    <div className="text-2xl font-black text-red-400">
                      ${restorationCost.toLocaleString()}
                    </div>
                    <div className="mt-1 text-[10px] italic opacity-60">
                      The cost to fix it later.
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-6 text-sm leading-relaxed font-medium opacity-80">
                    <span className="font-bold">A Note from Elric:</span>{' '}
                    {riskScore < 20
                      ? "Your risk is low, but in Oregon, it's never zero. A maintenance plan is your best defense."
                      : riskScore < 60
                        ? 'This is a serious risk. At this stage, there is a good chance moisture is already moving where it should not.'
                        : 'This is a critical situation. Your property is likely sustaining damage right now. Call and get the repair path started immediately.'}
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="/contact?service=Water Damage / Mold / Moisture"
                      className="flex-1"
                    >
                      <Button
                        variant="secondary"
                        className="w-full font-black tracking-widest uppercase"
                      >
                        Request Moisture Repair Help
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="cream">
        <Container size="narrow" className="text-center">
          <h3 className="text-oxblood mb-6 text-2xl font-black tracking-tight uppercase">
            Don&apos;t Wait for the Stain
          </h3>
          <p className="text-slate mb-8 leading-relaxed font-medium">
            By the time you see staining or decay on the surface, the wall has
            usually been taking damage for a while. The right move is to find
            the source, dry what can be saved, and repair what cannot.
          </p>
          <Link href="/plans">
            <Button size="lg" className="font-black tracking-widest uppercase">
              Explore Our Maintenance Plans
            </Button>
          </Link>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8">
              <h2 className="text-oxblood text-2xl font-black tracking-tight uppercase">
                What affects the estimate
              </h2>
              <ul className="text-slate mt-5 space-y-3 text-sm leading-relaxed font-medium">
                <li>
                  Years deferred increase the exposure window for moisture to
                  move behind finishes.
                </li>
                <li>
                  Wet Oregon climates compound the cost of waiting faster than
                  dry interior markets.
                </li>
                <li>
                  Siding type changes how quickly water intrusion turns into rot
                  and replacement work.
                </li>
                <li>
                  The estimate compares early correction cost with later
                  restoration pressure.
                </li>
              </ul>
            </Card>
            <Card className="p-8">
              <h2 className="text-oxblood text-2xl font-black tracking-tight uppercase">
                How the methodology works
              </h2>
              <p className="text-slate mt-5 text-sm leading-relaxed font-medium">
                The calculator uses a simple directional model: proactive
                maintenance starts with a base correction cost, while delayed
                restoration compounds based on moisture-heavy climates and more
                vulnerable cladding. It is not a bid. It is a planning tool to
                show why timing and building envelope conditions drive price.
              </p>
              <div className="mt-6">
                <Link
                  href="/methodology"
                  className="text-oxblood text-sm font-black tracking-widest uppercase"
                >
                  See the field process behind the estimate
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
