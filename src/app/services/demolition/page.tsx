import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { FAQSection } from '@/components/content/FAQSection';
import { Hammer, ShieldAlert, FileSearch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forensic Demolition | Benson Home Solutions',
  description:
    'Licensed demolition services in Oregon. We specialize in controlled, forensic demolition that identifies underlying structural and moisture issues. CCB #258533.',
};

export default function DemolitionPage() {
  return (
    <main>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Controlled Deconstruction
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Uncover the <br />
            <span className="italic opacity-60">Truth.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Demolition is the first step of discovery. Benson Home Solutions provides surgical demolition services that protect the integrity of your remaining structure while identifying hidden rot or failure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact?service=demolition">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                Request Deconstruction Quote
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
                <Hammer className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Surgical Demo</h3>
              <p className="text-slate font-medium leading-relaxed">
                We use precise methods to remove only what is necessary, protecting your electrical, plumbing, and structural systems from collateral damage.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <FileSearch className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Discovery Audits</h3>
              <p className="text-slate font-medium leading-relaxed">
                As we deconstruct, we document. We identify the root cause of failure (moisture, insects, or structural stress) so it doesn&apos;t happen again.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <ShieldAlert className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Hazard Mitigation</h3>
              <p className="text-slate font-medium leading-relaxed">
                Professional handling of debris and identification of hazardous materials. We ensure your site is safe, clean, and ready for the next phase.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FAQSection />
    </main>
  );
}
