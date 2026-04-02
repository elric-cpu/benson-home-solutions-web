import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { FAQSection } from '@/components/content/FAQSection';
import { Mountain, Droplets, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Diagnostic Sitework & Drainage | Benson Home Solutions',
  description:
    'Licensed sitework and drainage solutions in Oregon. We solve foundation moisture issues, grading problems, and landscape failures with building science. CCB #258533.',
};

export default function SiteworkPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Foundation Protection
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Control the <br />
            <span className="italic opacity-60">Flow.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Oregon sitework isn&apos;t just about moving dirt. It&apos;s about moisture management. Benson Home Solutions engineers drainage and grading that protects your foundation from the ground up.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact?service=sitework">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                Request Drainage Audit
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
                <Mountain className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Precision Grading</h3>
              <p className="text-slate font-medium leading-relaxed">
                We use laser levels and diagnostic site analysis to ensure water flows away from your building envelope, never toward it.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Droplets className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">French Drains</h3>
              <p className="text-slate font-medium leading-relaxed">
                Custom-engineered subsurface drainage systems designed to handle the atmospheric rivers of the Mid-Willamette Valley.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <ShieldCheck className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Foundation Sealing</h3>
              <p className="text-slate font-medium leading-relaxed">
                Diagnostic application of moisture barriers and foundation protection to stop capillary action and crawlspace dampness.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FAQSection />
    </>
  );
}
