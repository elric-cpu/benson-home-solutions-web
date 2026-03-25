import Link from 'next/link';
import { Container, Section, Button, Badge, Card, CardHeader, CardContent } from '@/components/ui';
import { StatsSection } from '@/components/content/StatsSection';
import { FAQSection } from '@/components/content/FAQSection';
import { Quote, CheckCircle2 } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Benson Home Solutions | Proactive Home Maintenance in Salem, Oregon',
  description: 'Stop reacting to expensive home repairs. We are a Salem-based general contractor specializing in proactive maintenance plans for the Mid-Willamette Valley and Harney County.',
};

/**
 * Benson Home Solutions Home Page - Rebuild V1 (2026)
 * Answer-First SEO Strategy.
 */
export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="cream" spacing="lg" className="relative overflow-hidden">
        <Container className="text-center relative z-10">
          <Badge variant="secondary" className="mb-8 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            Oregon CCB #258533
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight text-oxblood">
            Stop Paying for Emergency Repairs.
            <br />
            <span className="text-oxblood/60 italic">Start Investing in Maintenance.</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto px-4">
            {`We're not the contractors you call when a pipe bursts. We're the team you hire to prevent it from ever happening. We own and operate the specialized equipment most contractors rent, ensuring quality control and faster results.`}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 px-4">
            <Link href="/tools/cost-calculator" className="w-full sm:w-auto">
              <Button size="lg" className="w-full px-10 py-7 text-base md:text-lg font-black uppercase tracking-widest shadow-xl shadow-oxblood/20 active:scale-95 transition-transform">
                Calculate Your Risk
              </Button>
            </Link>
            <Link href="/plans" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full px-10 py-7 text-base md:text-lg font-black uppercase tracking-widest border-2 border-oxblood text-oxblood hover:bg-oxblood hover:text-cream active:scale-95 transition-transform">
                Explore Maintenance Plans
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest text-oxblood/60">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-cream bg-oxblood/10 flex items-center justify-center">
                  <span className="text-oxblood text-xs">★</span>
                </div>
              ))}
            </div>
            <span>Trusted by 150+ Property Owners in Oregon</span>
          </div>
        </Container>
      </Section>

      {/* Forensic Audits / Value Props */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group">
              <div className="h-2 w-12 bg-oxblood mb-6 group-hover:w-full transition-all duration-500" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Forensic Audits</h3>
              <p className="text-slate font-medium leading-relaxed mb-6">
                A standard home inspection is visual. We use thermal cameras, moisture meters, and pressure tests to find problems before they&apos;re visible to the naked eye.
              </p>
              <Link href="/contact?service=audit" className="text-xs font-black uppercase tracking-widest text-oxblood border-b-2 border-oxblood pb-1 hover:opacity-70 transition-opacity">
                Request a Forensic Audit &rarr;
              </Link>
            </div>
            <div className="group">
              <div className="h-2 w-12 bg-oxblood mb-6 group-hover:w-full transition-all duration-500" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Engineered for Oregon</h3>
              <p className="text-slate font-medium leading-relaxed mb-6">
                From the wet winters of the Willamette Valley to the dry summers of Harney County, our maintenance plans are designed for Oregon&apos;s unique climate.
              </p>
              <Link href="/areas" className="text-xs font-black uppercase tracking-widest text-oxblood border-b-2 border-oxblood pb-1 hover:opacity-70 transition-opacity">
                View Service Areas &rarr;
              </Link>
            </div>
            <div className="group">
              <div className="h-2 w-12 bg-oxblood mb-6 group-hover:w-full transition-all duration-500" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Data-Driven Repairs</h3>
              <p className="text-slate font-medium leading-relaxed mb-6">
                We don&apos;t guess. We provide you with a detailed report of our findings, so you can make informed decisions about your property.
              </p>
              <Link href="/methodology" className="text-xs font-black uppercase tracking-widest text-oxblood border-b-2 border-oxblood pb-1 hover:opacity-70 transition-opacity">
                Our Methodology &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Audit CTA Section */}
      <Section variant="cream" spacing="sm" className="border-y border-oxblood/5">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-black uppercase tracking-tight text-oxblood">An $800 inspection now can save you $15,000 later.</h4>
              <p className="text-slate font-medium text-sm">The average cost of non-weather-related water damage repair is over $15,000. Our forensic audits start at $800.</p>
            </div>
            <Link href="/contact?service=audit">
              <Button className="font-black uppercase tracking-widest px-8">Schedule Your Audit</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Stats Section (GEO Focus) */}
      <StatsSection />

      {/* Expert Quote (GEO Focus) */}
      <Section variant="cream" spacing="lg">
        <Container size="narrow" className="text-center">
          <Quote className="w-16 h-16 text-oxblood/20 mx-auto mb-8" />
          <blockquote className="text-3xl md:text-4xl font-black italic text-oxblood mb-8 leading-tight tracking-tight">
            {`"A visual inspection just tells you what's already broken. I'd rather tell you what's about to break. That's the difference between a $500 fix and a $25,000 renovation."`}
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="font-black text-xl uppercase tracking-widest text-oxblood mb-1">
              {BUSINESS.owner}
            </div>
            <div className="text-oxblood/60 font-bold uppercase tracking-widest text-xs">
              Founder & General Contractor
            </div>
          </div>
        </Container>
      </Section>

      {/* Maintenance Subscriptions Preview */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Choose Your Maintenance Plan
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              Proactive maintenance plans for homeowners, commercial properties, and churches.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="bg-cream/30">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">Residential</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Quarterly Forensic Audit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Gutter, Drainage & HVAC Checks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Priority Scheduling for Repairs</span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button className="w-full font-black uppercase tracking-widest">View Residential Plans</Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-oxblood text-cream">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight">Commercial</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cream shrink-0 mt-1" />
                    <span className="font-medium">Board-Ready Asset Reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cream shrink-0 mt-1" />
                    <span className="font-medium">4-Hour Emergency Response SLA</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cream shrink-0 mt-1" />
                    <span className="font-medium">Capital Expense Forecasting</span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button variant="secondary" className="w-full font-black uppercase tracking-widest">View Commercial Plans</Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-cream/30">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">Churches & Non-Profits</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Historic Building Preservation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Facility Budget & Grant Support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Volunteer Coordination & Training</span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button className="w-full font-black uppercase tracking-widest">View Facility Plans</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Section (AEO/GEO Focus) */}
      <FAQSection />
    </main>
  );
}
