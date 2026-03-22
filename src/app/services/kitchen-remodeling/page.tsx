import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { FAQSection } from '@/components/content/FAQSection';
import { BUSINESS } from '@/lib/constants';
import { UtensilsCrossed, Bath, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kitchen & Bathroom Remodeling | Benson Home Solutions',
  description:
    'Expert kitchen and bathroom remodeling in Salem, Albany, and Corvallis. Forensic audits for moisture protection and premium finishes. CCB #258533.',
  keywords: [
    'kitchen remodeling Salem Oregon',
    'bathroom renovation Albany',
    'custom kitchen design Corvallis',
    'licensed contractor Oregon',
    'remodeling moisture protection',
    'Benson Home Solutions remodeling',
  ],
};

export default function RemodelingPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            Oregon CCB #258533
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            Precision Rebuilds. <br />
            <span className="italic text-oxblood/60">Forensic Quality.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto">
            We don&apos;t just cover up old problems. Benson Home Solutions specializes in remodeling that begins with a forensic moisture audit and ends with a premium, board-ready finish.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact?service=remodeling">
              <Button size="lg" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest shadow-xl shadow-oxblood/20">
                Request a Design Audit
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-10 border-oxblood/5 shadow-xl hover:shadow-2xl transition-all">
              <UtensilsCrossed className="w-12 h-12 text-oxblood mb-6" />
              <h2 className="text-3xl font-black uppercase tracking-tight text-oxblood mb-4">Kitchen Remodeling</h2>
              <p className="text-slate font-medium leading-relaxed mb-8">
                From structural reconfiguration to high-end cabinet installation. We ensure your kitchen is not only beautiful but engineered for Oregon&apos;s humidity.
              </p>
              <ul className="space-y-3 mb-8">
                {['Custom Cabinetry', 'Quartz & Stone Surfaces', 'Structural Re-layout', 'Smart Lighting Systems'].map(i => (
                  <li key={i} className="flex items-center gap-2 font-bold text-sm text-oxblood">
                    <ShieldCheck className="w-4 h-4" /> {i}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-10 border-oxblood/5 shadow-xl hover:shadow-2xl transition-all">
              <Bath className="w-12 h-12 text-oxblood mb-6" />
              <h2 className="text-3xl font-black uppercase tracking-tight text-oxblood mb-4">Bathroom Renovation</h2>
              <p className="text-slate font-medium leading-relaxed mb-8">
                Precision waterproofing is our obsession. We use forensic moisture detection to ensure your new bathroom is protected from the substrate out.
              </p>
              <ul className="space-y-3 mb-8">
                {['Schluter-Certified Waterproofing', 'Custom Tile Work', 'Luxury Shower Systems', 'Heated Flooring'].map(i => (
                  <li key={i} className="flex items-center gap-2 font-bold text-sm text-oxblood">
                    <ShieldCheck className="w-4 h-4" /> {i}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="oxblood" spacing="md">
        <Container className="text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-6">Ready to Rebuild?</h2>
          <p className="text-xl opacity-80 mb-10 max-w-xl mx-auto font-medium">
            Let&apos;s start with a forensic audit of your current space to build a foundation that lasts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact?service=remodeling">
              <Button variant="secondary" size="lg" className="font-black uppercase tracking-widest px-12 py-8">Get Started</Button>
            </Link>
            <a href={`tel:${BUSINESS.phone}`}>
              <Button variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-oxblood px-12 py-8 font-black uppercase tracking-widest">Call {BUSINESS.phone}</Button>
            </a>
          </div>
        </Container>
      </Section>

      <FAQSection />
    </main>
  );
}
