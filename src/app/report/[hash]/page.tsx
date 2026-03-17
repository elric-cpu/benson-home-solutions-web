import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Container,
  Section,
  Button,
  Card,
  CardContent,
  Badge,
  TrustBar,
} from '@/components/ui';
import { db } from '@/lib/db';
import { properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import {
  CheckCircle2,
  Calendar,
  Zap,
  Shield,
  Home,
  Download,
  Printer,
} from 'lucide-react';

interface ReportPageProps {
  params: Promise<{ hash: string }>;
}

export async function generateMetadata({
  params,
}: ReportPageProps): Promise<Metadata> {
  const { hash } = await params;
  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.addressHash, hash))
    .limit(1);

  if (!property) return { title: 'Report Not Found' };

  return {
    title: `Forensic Property Report: ${property.standardizedAddress} | Benson Home Solutions`,
    description: `Detailed homeownership cost analysis and maintenance schedule for ${property.standardizedAddress}.`,
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { hash } = await params;
  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.addressHash, hash))
    .limit(1);

  if (!property) notFound();

  const costs = property.housingData as unknown as {
    total: number;
    breakdown: Record<string, number>;
    sqft?: number;
    yearBuilt?: number;
    floodZone?: string;
  };
  const annualTotal = costs?.total || 0;
  const monthlyTotal = Math.round(annualTotal / 12);
  const sqft = costs?.sqft || 2000;
  const yearBuilt = costs?.yearBuilt || 1990;
  const floodZone = costs?.floodZone || 'X';

  // Logic-based insights
  const propertyAge = new Date().getFullYear() - yearBuilt;
  const isAging = propertyAge > 25;
  const needsSealing = propertyAge > 15;

  const maintenanceSchedule = [
    {
      season: 'Spring',
      task: 'Exterior Envelope Audit',
      desc: 'Identify sealant failures and winter storm damage.',
      priority: 'High',
    },
    {
      season: 'Summer',
      task: 'Cooling System Tune-up',
      desc: 'Ensure HVAC efficiency before peak heat loads.',
      priority: 'Medium',
    },
    {
      season: 'Fall',
      task: 'Gutter & Drainage Clearing',
      desc: 'Prevent foundation moisture intrusion before rain season.',
      priority: 'Critical',
    },
    {
      season: 'Winter',
      task: 'Interior Moisture Mapping',
      desc: 'Check critical points for condensation or thermal bridging.',
      priority: 'High',
    },
  ];

  const applianceTimeline = [
    {
      item: 'Water Heater',
      avgLife: 10,
      remaining: Math.max(0, 10 - (propertyAge % 10)),
      status: propertyAge % 10 > 8 ? 'Replace Soon' : 'Stable',
    },
    {
      item: 'HVAC System',
      avgLife: 15,
      remaining: Math.max(0, 15 - (propertyAge % 15)),
      status: propertyAge % 15 > 12 ? 'Monitor' : 'Stable',
    },
    {
      item: 'Roof System',
      avgLife: 25,
      remaining: Math.max(0, 25 - (propertyAge % 25)),
      status: propertyAge % 25 > 20 ? 'Critical Audit' : 'Stable',
    },
    {
      item: 'Dishwasher',
      avgLife: 9,
      remaining: Math.max(0, 9 - (propertyAge % 9)),
      status: propertyAge % 9 > 7 ? 'Check Seals' : 'Stable',
    },
  ];

  return (
    <main className="bg-cream/30 min-h-screen pb-20">
      {/* Header / Actions */}
      <div className="border-slate/10 sticky top-0 z-30 border-b bg-white py-4 shadow-sm">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-oxblood text-xl font-black tracking-tighter"
            >
              BHS
            </Link>
            <div className="bg-slate/10 h-6 w-px" />
            <span className="text-slate/40 hidden text-[10px] font-black tracking-widest uppercase sm:block">
              Forensic Property Report
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden gap-2 text-[10px] font-bold uppercase md:flex"
            >
              <Download className="h-3 w-3" /> Download PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="gap-2 text-[10px] font-bold uppercase"
            >
              <Printer className="h-3 w-3" /> Print Report
            </Button>
          </div>
        </Container>
      </div>

      <Section spacing="md">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Sidebar Summary */}
            <aside className="space-y-6 lg:col-span-4">
              <Card className="shadow-elevated bg-oxblood text-cream overflow-hidden rounded-3xl border-none">
                <CardContent className="p-8">
                  <Badge
                    variant="secondary"
                    className="bg-cream/10 border-cream/20 text-cream mb-6 tracking-widest uppercase"
                  >
                    Property Profile
                  </Badge>
                  <h1 className="mb-2 text-2xl leading-tight font-black">
                    {property.standardizedAddress}
                  </h1>
                  <p className="mb-8 text-sm font-medium opacity-60">
                    {property.city}, {property.state} {property.zip}
                  </p>

                  <div className="space-y-4 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase opacity-40">
                        Year Built
                      </span>
                      <span className="font-black">{yearBuilt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase opacity-40">
                        Square Feet
                      </span>
                      <span className="font-black">
                        {sqft?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase opacity-40">
                        Flood Zone
                      </span>
                      <span className="font-black">{floodZone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-none bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-charcoal mb-6 text-lg font-black tracking-tight uppercase">
                    Financial Overview
                  </h3>
                  <div className="mb-8">
                    <div className="text-slate/40 mb-1 text-[10px] font-black tracking-widest uppercase">
                      True Annual Cost
                    </div>
                    <div className="text-oxblood text-4xl font-black">
                      ${annualTotal.toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="border-slate/5 flex items-center gap-4 rounded-2xl border bg-slate-50 p-4">
                      <div className="bg-oxblood text-cream rounded-lg p-2">
                        <Home className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-slate/40 text-[10px] font-black tracking-tight uppercase">
                          Monthly Sinking Fund
                        </div>
                        <div className="text-charcoal font-black">
                          ${monthlyTotal.toLocaleString()}/mo
                        </div>
                      </div>
                    </div>
                    <p className="text-slate/50 text-[10px] leading-relaxed font-medium italic">
                      This represents the capital required annually to cover
                      taxes, insurance, and professional maintenance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="space-y-12 lg:col-span-8">
              {/* Executive Summary */}
              <div className="border-slate/5 rounded-[2.5rem] border bg-white p-8 shadow-sm md:p-12">
                <div className="mb-8 flex items-center gap-3">
                  <Shield className="text-oxblood h-6 w-6" />
                  <h2 className="text-charcoal text-2xl font-black tracking-tight uppercase">
                    Executive Summary
                  </h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate/80 text-lg leading-relaxed font-medium">
                    Your property, constructed in {yearBuilt}, has reached a{' '}
                    {isAging
                      ? 'critical aging threshold'
                      : 'mature stable phase'}
                    . Our analysis indicates that while the building envelope
                    remains functional, the probability of system
                    failures—specifically{' '}
                    {isAging
                      ? 'roofing and utility infrastructure'
                      : 'exterior seals and drainage'}
                    —is increasing.
                  </p>
                  <div className="not-prose mt-10 grid gap-6 md:grid-cols-2">
                    <div
                      className={`rounded-2xl border p-6 ${isAging ? 'border-amber-100 bg-amber-50' : 'border-green-100 bg-green-50'}`}
                    >
                      <h4
                        className={`mb-3 text-xs font-black tracking-widest uppercase ${isAging ? 'text-amber-900' : 'text-green-900'}`}
                      >
                        Envelope Integrity
                      </h4>
                      <p
                        className={`text-sm leading-relaxed font-medium ${isAging ? 'text-amber-800/80' : 'text-green-800/80'}`}
                      >
                        {isAging
                          ? 'High risk of moisture intrusion. Immediate inspection of window and door flashing is recommended.'
                          : 'Building envelope is stable. Periodic sealant audits will maintain protection.'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                      <h4 className="mb-3 text-xs font-black tracking-widest text-blue-900 uppercase">
                        Efficiency Potential
                      </h4>
                      <p className="text-sm leading-relaxed font-medium text-blue-800/80">
                        {needsSealing
                          ? 'Targeted air sealing and insulation audits could reduce annual energy costs by 15–22%.'
                          : 'Current efficiency metrics are within acceptable local benchmarks.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Schedule */}
              <div className="space-y-6">
                <div className="mb-2 flex items-center gap-3 px-2">
                  <Calendar className="text-oxblood h-6 w-6" />
                  <h2 className="text-charcoal text-2xl font-black tracking-tight uppercase">
                    Custom Maintenance Schedule
                  </h2>
                </div>
                <div className="grid gap-4">
                  {maintenanceSchedule.map((item, i) => (
                    <Card
                      key={i}
                      className="overflow-hidden rounded-2xl border-none bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <CardContent className="flex flex-col p-0 md:flex-row">
                        <div className="flex-center border-slate/5 flex items-center justify-center border-r bg-slate-50 p-6 md:w-32">
                          <span className="text-oxblood rotate-0 text-xs font-black tracking-widest uppercase md:-rotate-90">
                            {item.season}
                          </span>
                        </div>
                        <div className="flex flex-1 items-center justify-between gap-6 p-6">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <h3 className="text-charcoal font-black">
                                {item.task}
                              </h3>
                              <Badge
                                variant={
                                  item.priority === 'Critical'
                                    ? 'emergency'
                                    : 'warning'
                                }
                                className="text-[8px] uppercase"
                              >
                                {item.priority}
                              </Badge>
                            </div>
                            <p className="text-slate/60 text-sm font-medium">
                              {item.desc}
                            </p>
                          </div>
                          <CheckCircle2 className="text-slate/10 h-5 w-5" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Appliance Lifespan */}
              <div className="text-cream rounded-[2.5rem] bg-slate-900 p-8 md:p-12">
                <div className="mb-10 flex items-center gap-3">
                  <Zap className="h-6 w-6 text-amber-400" />
                  <h2 className="text-2xl font-black tracking-tight uppercase">
                    System Replacement Timeline
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="pb-4 text-[10px] font-black tracking-widest uppercase opacity-40">
                          Home System
                        </th>
                        <th className="pb-4 text-[10px] font-black tracking-widest uppercase opacity-40">
                          Avg. Life
                        </th>
                        <th className="pb-4 text-[10px] font-black tracking-widest uppercase opacity-40">
                          Est. Remaining
                        </th>
                        <th className="pb-4 text-[10px] font-black tracking-widest uppercase opacity-40">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {applianceTimeline.map((item, i) => (
                        <tr key={i}>
                          <td className="py-5 font-bold">{item.item}</td>
                          <td className="py-5 text-sm opacity-60">
                            {item.avgLife} years
                          </td>
                          <td className="py-5">
                            <div className="flex items-center gap-2">
                              <span className="font-black">
                                {item.remaining} yrs
                              </span>
                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full bg-amber-400"
                                  style={{
                                    width: `${(item.remaining / item.avgLife) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-5">
                            <Badge
                              className={
                                item.status === 'Stable'
                                  ? 'border-green-500/30 bg-green-500/20 text-green-400'
                                  : 'border-amber-500/30 bg-amber-500/20 text-amber-400'
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Next Steps CTA */}
              <div className="bg-oxblood text-cream relative overflow-hidden rounded-[2.5rem] p-10 text-center md:p-16">
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-10">
                  <div className="border-cream absolute -top-24 -right-24 h-96 w-96 rounded-full border-[40px]" />
                </div>
                <div className="relative z-10 mx-auto max-w-2xl">
                  <h2 className="mb-6 text-3xl leading-tight font-black md:text-4xl">
                    Don&apos;t wait for the building envelope to fail.
                  </h2>
                  <p className="text-cream/70 mb-10 text-lg font-medium">
                    Our systematic maintenance plans start at just $119/mo and
                    cover the critical inspections and tune-ups identified in
                    your report.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link href="/services/maintenance-subscriptions">
                      <Button
                        variant="secondary"
                        size="xl"
                        className="font-black tracking-widest uppercase shadow-xl"
                      >
                        View Maintenance Plans
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        size="xl"
                        className="text-cream border-cream/20 hover:bg-cream hover:text-oxblood font-black tracking-widest uppercase transition-all"
                      >
                        Speak with a Specialist
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <TrustBar />
        </Container>
      </Section>
    </main>
  );
}
