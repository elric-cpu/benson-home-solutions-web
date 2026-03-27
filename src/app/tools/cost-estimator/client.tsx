'use client';

import { useState } from 'react';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import {
  Building2,
  Calendar,
  ShieldAlert,
  FileText,
  PieChart,
  Info,
} from 'lucide-react';
import Link from 'next/link';

const assetCategories = [
  { name: 'Roofing Systems', life: 25, costPerSqFt: 12 },
  { name: 'HVAC Units', life: 15, costPerSqFt: 8 },
  { name: 'Siding / Envelope', life: 30, costPerSqFt: 18 },
  { name: 'Windows / Doors', life: 25, costPerSqFt: 15 },
  { name: 'Plumbing / Main Lines', life: 40, costPerSqFt: 10 },
];

export default function AssetLifecyclePlanner() {
  const [sqFt, setSqFt] = useState(5000);
  const [buildingAge, setBuildingAge] = useState(10);

  const totalReplacement = assetCategories.reduce(
    (acc, cat) => acc + cat.costPerSqFt * sqFt,
    0,
  );
  const avgLife =
    assetCategories.reduce((acc, cat) => acc + cat.life, 0) /
    assetCategories.length;

  const lifeUsed = Math.min(1, buildingAge / avgLife);
  const currentLiability = totalReplacement * lifeUsed;

  const totalLiability = Math.round(currentLiability);
  const annualBudget = Math.round(totalReplacement / avgLife);

  return (
    <>
      <Section variant="charcoal" spacing="lg">
        <Container className="text-center">
          <Badge className="bg-cream/10 text-cream border-cream/20 mb-6 px-4 py-1.5 font-black tracking-widest uppercase">
            For Commercial & Non-Profit Boards
          </Badge>
          <h1 className="text-cream mb-8 text-5xl leading-tight font-black tracking-tight md:text-7xl">
            Your 10-Year <br />
            <span className="italic opacity-60">
              Capital Expenditure Forecast
            </span>
          </h1>
          <p className="text-cream/80 mx-auto max-w-2xl text-xl font-medium">
            {`This tool helps you answer the question: "How much should we be setting aside for building maintenance?" Stop reacting to expensive emergencies and start planning for the future.`}
          </p>
          <p className="text-cream/70 mx-auto mt-6 max-w-3xl text-base leading-relaxed font-medium">
            Use this estimator as a directional reserve-planning tool for
            churches, schools, nonprofits, and commercial properties. It gives
            decision-makers a first-pass view of replacement exposure across
            major building systems.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <Card className="border-oxblood/5 p-8 shadow-xl">
                <h2 className="text-oxblood mb-8 text-2xl font-black tracking-tight uppercase">
                  1. Enter Your Building&apos;s Details
                </h2>

                <div className="space-y-8">
                  <div>
                    <label
                      htmlFor="asset-square-footage"
                      className="text-oxblood/60 mb-4 block text-sm font-black tracking-widest uppercase"
                    >
                      Square Footage: {sqFt.toLocaleString()} sq. ft.
                    </label>
                    <input
                      id="asset-square-footage"
                      type="range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={sqFt}
                      onChange={(e) => setSqFt(parseInt(e.target.value))}
                      aria-label="Square footage"
                      className="bg-oxblood/10 accent-oxblood h-3 w-full cursor-pointer appearance-none rounded-lg"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="asset-building-age"
                      className="text-oxblood/60 mb-4 block text-sm font-black tracking-widest uppercase"
                    >
                      Average Age of Building Systems: {buildingAge} Years
                    </label>
                    <input
                      id="asset-building-age"
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={buildingAge}
                      onChange={(e) => setBuildingAge(parseInt(e.target.value))}
                      aria-label="Average age of building systems"
                      className="bg-oxblood/10 accent-oxblood h-3 w-full cursor-pointer appearance-none rounded-lg"
                    />
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-oxblood/5 border-oxblood/10 rounded-2xl border p-6">
                  <div className="text-oxblood mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[10px] font-black tracking-widest uppercase">
                      Recommended Annual Budget
                    </span>
                  </div>
                  <div className="text-oxblood text-2xl font-black">
                    ${annualBudget.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-medium opacity-60">
                    to set aside for capital reserves.
                  </div>
                </div>
                <div className="bg-oxblood/5 border-oxblood/10 rounded-2xl border p-6">
                  <div className="text-oxblood mb-2 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    <span className="text-[10px] font-black tracking-widest uppercase">
                      Next Major Expense
                    </span>
                  </div>
                  <div className="text-oxblood text-2xl font-black">
                    {Math.max(1, 15 - buildingAge)} Yrs
                  </div>
                  <div className="text-[10px] font-medium opacity-60">
                    is the estimated failure for HVAC/Roof.
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-oxblood text-cream relative overflow-hidden border-none p-8 shadow-2xl">
              <div className="relative z-10">
                <h3 className="mb-2 text-sm font-black tracking-widest uppercase opacity-60">
                  2. Understand Your Liability
                </h3>
                <div className="mb-8 text-6xl font-black italic">
                  ${totalLiability.toLocaleString()}
                </div>

                <div className="mb-10 space-y-6">
                  <div className="border-cream/10 flex items-center gap-4 border-b pb-6">
                    <div className="bg-cream/10 rounded-xl p-3">
                      <PieChart className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-black tracking-widest uppercase">
                        Asset Health Score
                      </div>
                      <div className="bg-cream/10 h-2 w-48 overflow-hidden rounded-full">
                        <div
                          className="bg-cream h-full transition-all duration-1000"
                          style={{
                            width: `${100 - Math.min(100, (buildingAge / 40) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-cream/10 rounded-xl p-3">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-black tracking-widest uppercase">
                        Get a Board-Ready Report
                      </div>
                      <div className="text-sm font-medium opacity-80">
                        Request a formal proposal to receive a detailed
                        breakdown of your property&apos;s asset lifecycle.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/contact?service=commercial" className="flex-1">
                    <Button
                      variant="secondary"
                      className="w-full py-6 font-black tracking-widest uppercase"
                    >
                      Request a Formal Proposal
                    </Button>
                  </Link>
                </div>
              </div>

              <Building2 className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 opacity-5" />
            </Card>
          </div>
        </Container>
      </Section>

      <Section variant="cream">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Info className="text-oxblood/20 mx-auto mb-6 h-12 w-12" />
            <h3 className="text-oxblood mb-6 text-3xl font-black tracking-tight uppercase">
              A Note from Elric Benson for Board Members
            </h3>
            <p className="text-slate mb-8 leading-relaxed font-medium">
              {`"This gives you a starting point. If you need a real scope, we can walk the property, document the risk, and build a repair and reserve plan you can actually use."`}
            </p>
            <Link href="/contact?service=Maintenance Plan">
              <Button
                size="lg"
                className="font-black tracking-widest uppercase"
              >
                Request a Building Scope
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8">
              <h2 className="text-oxblood text-2xl font-black tracking-tight uppercase">
                What is included
              </h2>
              <ul className="text-slate mt-5 space-y-3 text-sm leading-relaxed font-medium">
                <li>
                  Roofing, HVAC, siding and envelope systems, windows and doors,
                  and plumbing infrastructure.
                </li>
                <li>
                  Directional replacement exposure based on square footage and
                  average system age.
                </li>
                <li>
                  A simple annual reserve target to support budget
                  conversations.
                </li>
                <li>
                  A next-major-expense signal to show when reactive costs are
                  likely to arrive.
                </li>
              </ul>
            </Card>
            <Card className="p-8">
              <h2 className="text-oxblood text-2xl font-black tracking-tight uppercase">
                How to use this estimator
              </h2>
              <p className="text-slate mt-5 text-sm leading-relaxed font-medium">
                This is not a reserve study and not a contractor proposal. It is
                a planning model built to show boards and facilities teams how
                system age and square footage create maintenance liability. When
                you need a real scope, we pair site documentation with an
                actionable repair and reserve plan.
              </p>
              <div className="mt-6">
                <Link
                  href="/methodology"
                  className="text-oxblood text-sm font-black tracking-widest uppercase"
                >
                  See how we document real scopes
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
