'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Container, Section, Badge, Card, Button } from '@/components/ui';
import { AlertTriangle, Droplets, Siren, ShieldCheck } from 'lucide-react';

const OPTIONS = [
  {
    key: 'activeDrip',
    label: 'There is an active drip during rain.',
    weight: 35,
  },
  {
    key: 'ceilingBulge',
    label: 'Ceiling drywall is swollen, soft, or sagging.',
    weight: 30,
  },
  {
    key: 'atticMoisture',
    label: 'Attic insulation or framing feels damp.',
    weight: 20,
  },
  {
    key: 'electricalRisk',
    label: 'Water is near lighting, fans, or wiring.',
    weight: 40,
  },
  {
    key: 'roofVent',
    label: 'Leak seems tied to a roof vent, flashing, or pipe boot.',
    weight: 15,
  },
];

export default function RoofLeakUrgencyPage() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [stainWidth, setStainWidth] = useState(8);

  const score = useMemo(() => {
    const selectedScore = OPTIONS.reduce(
      (total, option) => total + (selected[option.key] ? option.weight : 0),
      0,
    );

    return Math.min(100, selectedScore + Math.min(25, Math.round(stainWidth / 2)));
  }, [selected, stainWidth]);

  const status =
    score >= 70
      ? {
          label: 'Emergency',
          summary:
            'Treat this as an active water-intrusion event. Protect occupants, isolate electrical hazards, and schedule field service immediately.',
          className: 'bg-red-950 text-cream',
        }
      : score >= 40
        ? {
            label: 'Priority Repair',
            summary:
              'Damage is progressing and likely tied to flashing, roof penetrations, or drainage. Book an inspection before the next storm cycle.',
            className: 'bg-oxblood text-cream',
          }
        : {
            label: 'Monitor Closely',
            summary:
              'No obvious structural emergency yet, but you still need diagnostics to stop hidden moisture from compounding behind finishes.',
            className: 'bg-cream text-oxblood border border-oxblood/15',
          };

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            Emergency Intake Tool
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            Roof Leak <span className="italic text-oxblood/60">Urgency Checker.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl font-medium leading-relaxed text-oxblood/80">
            Use this quick check for ceiling stains, attic moisture, roof vent leaks, and active drips. It will not replace an inspection, but it will tell you how fast you need to act.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="p-8 border-oxblood/10">
              <h2 className="mb-8 text-2xl font-black uppercase tracking-tight text-oxblood">
                What are you seeing?
              </h2>

              <div className="space-y-4">
                {OPTIONS.map((option) => (
                  <label
                    key={option.key}
                    className="flex cursor-pointer items-start gap-4 rounded-2xl border border-oxblood/10 bg-white p-4"
                  >
                    <input
                      type="checkbox"
                      checked={!!selected[option.key]}
                      onChange={(event) =>
                        setSelected((current) => ({
                          ...current,
                          [option.key]: event.target.checked,
                        }))
                      }
                      className="mt-1 h-4 w-4 accent-oxblood"
                    />
                    <div>
                      <div className="font-black uppercase tracking-wide text-oxblood">
                        {option.label}
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate">
                        Adds {option.weight} urgency points.
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-10">
                <label htmlFor="stain-width" className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-4">
                  Approximate ceiling stain width: {stainWidth}&quot;
                </label>
                <input
                  id="stain-width"
                  type="range"
                  min="0"
                  max="48"
                  step="2"
                  value={stainWidth}
                  onChange={(event) => setStainWidth(Number(event.target.value))}
                  className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-oxblood/10 accent-oxblood"
                />
              </div>
            </Card>

            <div className="space-y-6">
              <Card className={`p-8 shadow-xl ${status.className}`}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-60">
                      Urgency Score
                    </div>
                    <div className="text-6xl font-black italic">{score}</div>
                  </div>
                  <Siren className="h-12 w-12 opacity-75" />
                </div>

                <div className="rounded-2xl bg-black/10 p-5">
                  <div className="text-sm font-black uppercase tracking-widest opacity-70">
                    Status
                  </div>
                  <div className="mt-2 text-2xl font-black uppercase tracking-tight">
                    {status.label}
                  </div>
                  <p className="mt-4 text-sm font-medium leading-relaxed opacity-90">
                    {status.summary}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-black/10 p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-70">
                      <Droplets className="h-4 w-4" />
                      First Move
                    </div>
                    <p className="text-sm font-medium opacity-90">
                      Catch interior water, move contents, and document where the stain or drip is growing.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/10 p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-70">
                      <AlertTriangle className="h-4 w-4" />
                      Safety
                    </div>
                    <p className="text-sm font-medium opacity-90">
                      Avoid climbing the roof yourself, especially near roof vents, wet shingles, or power sources.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-oxblood/10">
                <h2 className="mb-4 text-2xl font-black uppercase tracking-tight text-oxblood">
                  What Benson Does Next
                </h2>
                <ul className="space-y-3 text-slate">
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-oxblood" />
                    <span className="font-medium">Trace the leak path from roof penetration to interior finish damage.</span>
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-oxblood" />
                    <span className="font-medium">Check flashing, pipe boots, vent caps, gutters, and roof-to-wall transitions.</span>
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-oxblood" />
                    <span className="font-medium">Document conditions clearly enough for repair planning and insurer review.</span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button className="font-black uppercase tracking-widest">
                      Request Leak Inspection
                    </Button>
                  </Link>
                  <Link href="/blog/roof-vent-leak-first-response-oregon">
                    <Button variant="outline" className="font-black uppercase tracking-widest">
                      Read First-Response Guide
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
