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

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { hash } = await params;
  const [property] = await db.select().from(properties).where(eq(properties.addressHash, hash)).limit(1);

  if (!property) return { title: 'Report Not Found' };

  return {
    title: `Forensic Property Report: ${property.standardizedAddress} | Benson Home Solutions`,
    description: `Detailed homeownership cost analysis and maintenance schedule for ${property.standardizedAddress}.`,
  };
}

interface PropertyCosts {
  total: number;
  breakdown: Record<string, number>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { hash } = await params;
  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.addressHash, hash))
    .limit(1);

  if (!property) notFound();

  const costs = property.housingData as unknown as PropertyCosts;
  const annualTotal = costs?.total || 0;
  const monthlyTotal = Math.round(annualTotal / 12);
  
  // Logic-based insights
  const propertyAge = new Date().getFullYear() - (property.yearBuilt || 1990);
  const isAging = propertyAge > 25;
  const needsSealing = propertyAge > 15;
  
  const maintenanceSchedule = [
    { season: 'Spring', task: 'Exterior Envelope Audit', desc: 'Identify sealant failures and winter storm damage.', priority: 'High' },
    { season: 'Summer', task: 'Cooling System Tune-up', desc: 'Ensure HVAC efficiency before peak heat loads.', priority: 'Medium' },
    { season: 'Fall', task: 'Gutter & Drainage Clearing', desc: 'Prevent foundation moisture intrusion before rain season.', priority: 'Critical' },
    { season: 'Winter', task: 'Interior Moisture Mapping', desc: 'Check critical points for condensation or thermal bridging.', priority: 'High' },
  ];

  const applianceTimeline = [
    { item: 'Water Heater', avgLife: 10, remaining: Math.max(0, 10 - (propertyAge % 10)), status: propertyAge % 10 > 8 ? 'Replace Soon' : 'Stable' },
    { item: 'HVAC System', avgLife: 15, remaining: Math.max(0, 15 - (propertyAge % 15)), status: propertyAge % 15 > 12 ? 'Monitor' : 'Stable' },
    { item: 'Roof System', avgLife: 25, remaining: Math.max(0, 25 - (propertyAge % 25)), status: propertyAge % 25 > 20 ? 'Critical Audit' : 'Stable' },
    { item: 'Dishwasher', avgLife: 9, remaining: Math.max(0, 9 - (propertyAge % 9)), status: propertyAge % 9 > 7 ? 'Check Seals' : 'Stable' },
  ];

  return (
    <main className="min-h-screen bg-cream/30 pb-20">
      {/* Header / Actions */}
      <div className="bg-white border-b border-slate/10 sticky top-0 z-30 py-4 shadow-sm">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-black text-oxblood text-xl tracking-tighter">BHS</Link>
            <div className="h-6 w-px bg-slate/10" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate/40 hidden sm:block">Forensic Property Report</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex gap-2 font-bold text-[10px] uppercase">
              <Download className="w-3 h-3" /> Download PDF
            </Button>
            <Button variant="primary" size="sm" className="gap-2 font-bold text-[10px] uppercase">
              <Printer className="w-3 h-3" /> Print Report
            </Button>
          </div>
        </Container>
      </div>

      <Section spacing="md">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Sidebar Summary */}
            <aside className="lg:col-span-4 space-y-6">
              <Card className="shadow-elevated overflow-hidden border-none bg-oxblood text-cream rounded-3xl">
                <CardContent className="p-8">
                  <Badge variant="secondary" className="bg-cream/10 border-cream/20 text-cream mb-6 uppercase tracking-widest">
                    Property Profile
                  </Badge>
                  <h1 className="text-2xl font-black leading-tight mb-2">{property.standardizedAddress}</h1>
                  <p className="opacity-60 text-sm font-medium mb-8">{property.city}, {property.state} {property.zip}</p>
                  
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-40">Year Built</span>
                      <span className="font-black">{property.yearBuilt || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-40">Square Feet</span>
                      <span className="font-black">{property.sqft?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-40">Flood Zone</span>
                      <span className="font-black">{property.floodZone || 'X'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-none rounded-3xl bg-white">
                <CardContent className="p-8">
                  <h3 className="text-charcoal font-black uppercase tracking-tight text-lg mb-6">Financial Overview</h3>
                  <div className="mb-8">
                    <div className="text-slate/40 text-[10px] font-black uppercase tracking-widest mb-1">True Annual Cost</div>
                    <div className="text-oxblood text-4xl font-black">${annualTotal.toLocaleString()}</div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate/5 flex items-center gap-4">
                       <div className="bg-oxblood text-cream p-2 rounded-lg">
                          <Home className="w-4 h-4" />
                       </div>
                       <div>
                          <div className="text-[10px] font-black uppercase tracking-tight text-slate/40">Monthly Sinking Fund</div>
                          <div className="font-black text-charcoal">${monthlyTotal.toLocaleString()}/mo</div>
                       </div>
                    </div>
                    <p className="text-[10px] text-slate/50 font-medium leading-relaxed italic">
                      This represents the capital required annually to cover taxes, insurance, and professional maintenance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Executive Summary */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate/5">
                <div className="flex items-center gap-3 mb-8">
                  <Shield className="text-oxblood w-6 h-6" />
                  <h2 className="text-charcoal text-2xl font-black uppercase tracking-tight">Executive Summary</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg font-medium leading-relaxed text-slate/80">
                    Your property, constructed in {property.yearBuilt}, has reached a {isAging ? 'critical aging threshold' : 'mature stable phase'}. 
                    Our analysis indicates that while the building envelope remains functional, the probability of system failures—specifically {isAging ? 'roofing and utility infrastructure' : 'exterior seals and drainage'}—is increasing.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2 mt-10 not-prose">
                    <div className={`p-6 rounded-2xl border ${isAging ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'}`}>
                       <h4 className={`font-black uppercase tracking-widest text-xs mb-3 ${isAging ? 'text-amber-900' : 'text-green-900'}`}>
                          Envelope Integrity
                       </h4>
                       <p className={`text-sm font-medium leading-relaxed ${isAging ? 'text-amber-800/80' : 'text-green-800/80'}`}>
                          {isAging ? 'High risk of moisture intrusion. Immediate inspection of window and door flashing is recommended.' : 'Building envelope is stable. Periodic sealant audits will maintain protection.'}
                       </p>
                    </div>
                    <div className="p-6 rounded-2xl border bg-blue-50 border-blue-100">
                       <h4 className="text-blue-900 font-black uppercase tracking-widest text-xs mb-3">Efficiency Potential</h4>
                       <p className="text-blue-800/80 text-sm font-medium leading-relaxed">
                          {needsSealing ? 'Targeted air sealing and insulation audits could reduce annual energy costs by 15–22%.' : 'Current efficiency metrics are within acceptable local benchmarks.'}
                       </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Schedule */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2 px-2">
                  <Calendar className="text-oxblood w-6 h-6" />
                  <h2 className="text-charcoal text-2xl font-black uppercase tracking-tight">Custom Maintenance Schedule</h2>
                </div>
                <div className="grid gap-4">
                  {maintenanceSchedule.map((item, i) => (
                    <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white overflow-hidden">
                      <CardContent className="p-0 flex flex-col md:flex-row">
                        <div className="bg-slate-50 p-6 md:w-32 flex flex-center items-center justify-center border-r border-slate/5">
                           <span className="font-black text-oxblood uppercase tracking-widest text-xs rotate-0 md:-rotate-90">{item.season}</span>
                        </div>
                        <div className="p-6 flex-1 flex items-center justify-between gap-6">
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <h3 className="font-black text-charcoal">{item.task}</h3>
                                 <Badge variant={item.priority === 'Critical' ? 'emergency' : 'warning'} className="text-[8px] uppercase">
                                    {item.priority}
                                 </Badge>
                              </div>
                              <p className="text-slate/60 text-sm font-medium">{item.desc}</p>
                           </div>
                           <CheckCircle2 className="w-5 h-5 text-slate/10" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Appliance Lifespan */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-cream">
                <div className="flex items-center gap-3 mb-10">
                  <Zap className="text-amber-400 w-6 h-6" />
                  <h2 className="text-2xl font-black uppercase tracking-tight">System Replacement Timeline</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest opacity-40">Home System</th>
                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest opacity-40">Avg. Life</th>
                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest opacity-40">Est. Remaining</th>
                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest opacity-40">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {applianceTimeline.map((item, i) => (
                        <tr key={i}>
                          <td className="py-5 font-bold">{item.item}</td>
                          <td className="py-5 text-sm opacity-60">{item.avgLife} years</td>
                          <td className="py-5">
                             <div className="flex items-center gap-2">
                                <span className="font-black">{item.remaining} yrs</span>
                                <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                   <div className="bg-amber-400 h-full" style={{ width: `${(item.remaining / item.avgLife) * 100}%` }} />
                                </div>
                             </div>
                          </td>
                          <td className="py-5">
                             <Badge className={item.status === 'Stable' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}>
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
              <div className="bg-oxblood rounded-[2.5rem] p-10 md:p-16 text-center text-cream relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-cream" />
                 </div>
                 <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Don&apos;t wait for the building envelope to fail.</h2>
                    <p className="text-cream/70 text-lg font-medium mb-10">
                       Our systematic maintenance plans start at just $119/mo and cover the critical inspections and tune-ups identified in your report.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Link href="/services/maintenance-subscriptions">
                          <Button variant="secondary" size="xl" className="font-black uppercase tracking-widest shadow-xl">
                             View Maintenance Plans
                          </Button>
                       </Link>
                       <Link href="/contact">
                          <Button variant="outline" size="xl" className="font-black uppercase tracking-widest text-cream border-cream/20 hover:bg-cream hover:text-oxblood transition-all">
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
