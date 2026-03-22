import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { MapPin, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Burns & Harney County Maintenance | Benson Home Solutions',
  description:
    'High-desert property maintenance and winterization in Burns and Harney County. Forensic audits for wildfire hardening and extreme temperature protection. CCB #258533.',
};

export default function BurnsAreaPage() {
  return (
    <main>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Serving Harney County
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            High Desert <br />
            <span className="italic opacity-60">Asset Protection.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            From the freezes of Drewsey to the summer heat of Burns, we provide the specialized high-desert maintenance required to preserve your property.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                Call Our Office
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">
                Extreme Climate Strategy
              </h2>
              <p className="text-lg text-slate font-medium leading-relaxed mb-8">
                Harney County properties face extreme temperature swings and wildfire risk. Our forensic approach focuses on thermal efficiency, winterization, and wildfire hardening.
              </p>
              <ul className="space-y-4">
                {['Wildfire Hardening Audits', 'Deep Freeze Winterization', 'Commercial Asset Management', 'Ecclesiastical Preservation'].map(i => (
                  <li key={i} className="flex items-center gap-3 font-bold text-oxblood">
                    <ShieldCheck className="w-5 h-5 opacity-60" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream p-12 rounded-3xl border border-oxblood/10 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" /> Harney Service Area
              </h3>
              <p className="text-slate font-medium mb-6">
                We provide specialized services throughout Harney County:
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Burns', 'Hines', 'Riley', 'Drewsey', 'Denio', 'McDermitt'].map(c => (
                  <span key={c} className="px-3 py-1 bg-oxblood text-cream rounded-full text-xs font-bold uppercase">{c}</span>
                ))}
              </div>
              <Link href="/contact">
                <Button className="w-full font-black uppercase tracking-widest">Request Site Audit</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
