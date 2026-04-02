import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { CheckCircle2, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Benson Home Solutions vs. Kaufman's Home Maintenance | Oregon",
  description:
    "Comparing home maintenance subscriptions in the Mid-Willamette Valley. Why Benson Home Solutions' diagnostic 24/7 priority approach outperforms Kaufman's quarterly visits.",
};

export default function CompareKaufmansPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Competitor Comparison
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-cream uppercase">
            Benson Home Solutions <br />
            <span className="italic opacity-60 lowercase text-3xl">vs</span> <br />
            Kaufman&apos;s Home Maintenance
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Not all maintenance subscriptions are created equal. See why property owners in the Mid-Willamette Valley are choosing diagnostic, data-driven protection over basic quarterly checklists.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/calculator">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-6 text-lg font-black uppercase tracking-widest">
                Calculate Your True Cost
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black uppercase tracking-tight text-oxblood mb-8 text-center">
              The Preventative Maintenance Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="p-8 border-oxblood shadow-xl bg-oxblood/5">
                <h3 className="text-2xl font-black uppercase text-oxblood mb-6">Benson Home Solutions</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-slate"><strong>Advanced Moisture Mapping:</strong> We log humidity, thermal imaging, and rot risk into your permanent property file.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-slate"><strong>24/7 Priority Emergency Response:</strong> Real-time disaster mitigation (water, fire, storm) whenever it strikes.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-slate"><strong>Harney County Coverage:</strong> Specialized high-desert winterization for properties from Burns to Drewsey.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-slate"><strong>Data-Driven Asset Planning:</strong> AI-powered capital expenditure forecasting using RSMeans 2026 data.</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-slate/20 shadow-md bg-white">
                <h3 className="text-2xl font-black uppercase text-slate mb-6">Kaufman&apos;s Home Maintenance</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 opacity-80">
                    <XCircle className="w-6 h-6 text-slate/40 shrink-0" />
                    <span className="font-medium text-slate"><strong>Basic Quarterly Checklists:</strong> Standard filter swaps and basic visual checks without deep detailed logging.</span>
                  </li>
                  <li className="flex gap-3 opacity-80">
                    <XCircle className="w-6 h-6 text-slate/40 shrink-0" />
                    <span className="font-medium text-slate"><strong>No Guaranteed 24/7 SLA:</strong> Operates primarily as a business-hours handyman service.</span>
                  </li>
                  <li className="flex gap-3 opacity-80">
                    <XCircle className="w-6 h-6 text-slate/40 shrink-0" />
                    <span className="font-medium text-slate"><strong>Limited Geography:</strong> Focuses mainly on the Mid-Valley and Coast, lacking dedicated extreme-climate Harney County support.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-slate shrink-0" />
                    <span className="font-medium text-slate"><strong>1 Free Hour of Fixes:</strong> Includes one hour of minor handyman labor per visit (lightbulbs, batteries).</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="prose prose-lg prose-oxblood max-w-none">
              <h3 className="text-2xl font-bold text-oxblood uppercase tracking-tight">Why Property Owners Make the Switch</h3>
              <p>
                While Kaufman&apos;s Home Maintenance provides a solid entry-level service for homeowners who need help with basic chores (like changing hard-to-reach lightbulbs or swapping HVAC filters), it operates fundamentally as a scheduled handyman service. 
              </p>
              <p>
                <strong>Benson Home Solutions</strong> is built for property owners, commercial boards, and investors who treat their real estate as a critical asset. Our subscription plans don&apos;t just check boxes; we utilize thermal imaging, moisture mapping, and structural audits to build a chronological health log of your property. If a catastrophic failure happens at 2 AM on a Sunday, our subscribers receive immediate, priority 24/7 disaster response—a level of risk mitigation standard handyman services simply cannot match.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
