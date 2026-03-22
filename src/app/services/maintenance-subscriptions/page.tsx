import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card, CardHeader, CardContent } from '@/components/ui';
import { FAQSection } from '@/components/content/FAQSection';
import { StatsSection } from '@/components/content/StatsSection';
import { CheckCircle2, FileText, Zap, Shield, MapPin, Building2, Home, Church } from 'lucide-react';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Maintenance Subscriptions | Proactive Property Care Oregon',
  description:
    'Licensed home, commercial, and church maintenance programs. Monthly forensic audits, defined SLAs, and board-ready documentation. Benson Home Solutions serving Salem, Albany, and Burns.',
  keywords: [
    'home maintenance subscription Oregon',
    'commercial property maintenance Salem',
    'church facility maintenance Oregon',
    'proactive property care',
    'forensic home audit',
    'Benson Home Solutions maintenance',
  ],
};

export default function MaintenanceSubscriptionsPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            The Maintenance-First Mission
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Protection, <br />
            <span className="italic opacity-60">Not Just Repair.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Standard property management is reactive. Benson Home Solutions is forensic. Our subscription programs provide the board-ready documentation and monthly oversight required to preserve your asset&apos;s value.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                Request Program Audit
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Core Benefits */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <FileText className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Board-Ready Data</h3>
              <p className="text-slate font-medium leading-relaxed">
                Every visit generates a forensic digital report. Track moisture levels, building envelope integrity, and asset lifecycle in real-time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Zap className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">4hr Emergency SLA</h3>
              <p className="text-slate font-medium leading-relaxed">
                Subscription members bypass the queue. When the Valley floods or the High Desert freezes, we are on-site within 4 hours. Guaranteed.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Shield className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Liability Mitigation</h3>
              <p className="text-slate font-medium leading-relaxed">
                Documented monthly maintenance is your best defense against insurance claim denials and long-term structural negligence.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Plans Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Subscription Programs
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              Precision oversight for residential, commercial, and ecclesiastical assets.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Residential */}
            <Card className="flex flex-col border-2 border-oxblood/5 shadow-xl">
              <CardHeader className="text-center pb-8 border-b border-oxblood/5">
                <div className="mx-auto mb-4 p-3 bg-oxblood text-cream rounded-xl inline-block">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-oxblood">Residential</h3>
                <p className="text-oxblood/60 font-bold mt-1 mb-4 italic">Proactive Home Defense</p>
                <div className="inline-block bg-oxblood/5 text-oxblood px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest border border-oxblood/10">
                  Plans from $149/mo
                </div>
              </CardHeader>
              <CardContent className="pt-8 flex-1">
                <ul className="space-y-4 mb-10">
                  {[
                    'Monthly Forensic Moisture Audits',
                    'Gutter & Drainage Maintenance',
                    'Annual HVAC/Plumbing Systems Audit',
                    'Window & Door Seal Inspection',
                    'Same-Day Emergency Priority',
                    'Annual Siding/Roof Soft Wash (Add-on)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-0.5" />
                      <span className="font-medium text-slate">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact?program=residential" className="mt-auto block">
                  <Button className="w-full font-black uppercase tracking-widest py-6">Get My Audit</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Commercial */}
            <Card className="flex flex-col border-4 border-oxblood shadow-2xl scale-105 bg-oxblood text-cream z-10">
              <CardHeader className="text-center pb-8 border-b border-cream/10">
                <div className="mx-auto mb-4 p-3 bg-cream text-oxblood rounded-xl inline-block">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">Commercial</h3>
                <p className="text-cream/60 font-bold mt-1 mb-4 italic">Enterprise Asset Management</p>
                <div className="inline-block bg-cream text-oxblood px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                  Custom Asset Quoted
                </div>
              </CardHeader>
              <CardContent className="pt-8 flex-1">
                <ul className="space-y-4 mb-10">
                  {[
                    'Board-Ready Compliance Reporting',
                    'Asset Lifecycle Expense Mapping',
                    'Guaranteed 4hr Emergency SLA',
                    'Bi-Weekly Common Area Audits',
                    'Commercial Roofing Oversight',
                    'Defined Maintenance Budgets',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cream shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact?program=commercial" className="mt-auto block">
                  <Button variant="secondary" className="w-full font-black uppercase tracking-widest py-6">Consultation</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Churches */}
            <Card className="flex flex-col border-2 border-oxblood/5 shadow-xl">
              <CardHeader className="text-center pb-8 border-b border-oxblood/5">
                <div className="mx-auto mb-4 p-3 bg-oxblood text-cream rounded-xl inline-block">
                  <Church className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-oxblood">Churches</h3>
                <p className="text-oxblood/60 font-bold mt-1 mb-4 italic">Historical Asset Stewardship</p>
                <div className="inline-block bg-oxblood/5 text-oxblood px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest border border-oxblood/10">
                  Specialized Non-Profit Rates
                </div>
              </CardHeader>
              <CardContent className="pt-8 flex-1">
                <ul className="space-y-4 mb-10">
                  {[
                    'Specialized Stained Glass Oversight',
                    'Heavy Timber Structural Audits',
                    'Budget-Predictive Maintenance',
                    'Volunteer-Safe Task Management',
                    'HVAC Efficiency Preservation',
                    'Historical Preservation Compliance',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-0.5" />
                      <span className="font-medium text-slate">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact?program=church" className="mt-auto block">
                  <Button className="w-full font-black uppercase tracking-widest py-6">Request Proposal</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <StatsSection />

      {/* Service Areas Section (Local SEO Boost) */}
      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">
                Serving the Valley & High Desert
              </h2>
              <p className="text-xl text-slate font-medium mb-8 leading-relaxed">
                We are a dual-region operation. We protect properties from the rain-soaked Mid-Willamette Valley to the extreme climate swings of Harney County.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 font-black uppercase tracking-widest text-oxblood mb-4 text-sm">
                    <MapPin className="w-4 h-4" /> Mid-Willamette Valley
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_AREAS.midWillametteValley.map((city) => (
                      <span key={city} className="px-3 py-1 bg-cream border border-oxblood/10 rounded-full text-xs font-bold text-slate">
                        {city}
                      </span >
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-black uppercase tracking-widest text-oxblood mb-4 text-sm">
                    <MapPin className="w-4 h-4" /> Harney County
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_AREAS.harneyCounty.map((city) => (
                      <span key={city} className="px-3 py-1 bg-cream border border-oxblood/10 rounded-full text-xs font-bold text-slate">
                        {city}
                      </span >
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-oxblood p-12 rounded-3xl text-cream relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-6 leading-tight">
                  One Monthly Audit. <br />
                  Zero Worry.
                </h3>
                <p className="font-medium text-cream/80 mb-8 leading-relaxed">
                  Join 150+ Oregon property owners who have switched to a maintenance-first lifestyle.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 border-b border-cream/10 pb-4">
                    <div className="text-3xl font-black italic">4.9/5</div>
                    <div className="text-xs uppercase font-bold tracking-widest opacity-60">Google Business <br />Profile Rating</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-black italic">100%</div>
                    <div className="text-xs uppercase font-bold tracking-widest opacity-60">Asset Retention <br />Goal Achievement</div>
                  </div>
                </div>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="inline-flex items-center justify-center w-full h-14 bg-cream text-oxblood text-sm font-black uppercase tracking-widest rounded-xl hover:bg-cream/90 transition-all"
                >
                  Call {BUSINESS.phone}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <FAQSection />
    </main>
  );
}
