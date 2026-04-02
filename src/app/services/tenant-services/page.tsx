import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { FAQSection } from '@/components/content/FAQSection';
import { FileText, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tenant Improvement & Services | Benson Home Solutions',
  description:
    'Board-ready tenant improvements and facility services for Oregon commercial assets. Fast-track proactive maintenance and professional oversight. CCB #258533.',
};

export default function TenantServicesPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Asset Optimization
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Maximize Your <br />
            <span className="italic opacity-60">Asset Value.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            From rapid tenant turns to complex diagnostic build-outs, Benson Home Solutions provides the professional documentation and precision execution that commercial boards demand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/services/maintenance-subscriptions">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                View Commercial Plans
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Zap className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Fast-Track Turns</h3>
              <p className="text-slate font-medium leading-relaxed">
                Minimize vacancy time. We provide efficient, diagnostic-quality tenant turns designed to get your unit back on the market in peak condition.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <FileText className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Board Reporting</h3>
              <p className="text-slate font-medium leading-relaxed">
                Total transparency. Every project includes board-ready digital documentation with diagnostic photo verification of all work performed.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Users className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Safety Compliance</h3>
              <p className="text-slate font-medium leading-relaxed">
                We ensure your facility meets all Oregon safety and accessibility standards, protecting you from liability and ensuring tenant satisfaction.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FAQSection />
    </>
  );
}
