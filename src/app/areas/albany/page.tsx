import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { MapPin, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Albany Oregon Home Maintenance | Benson Home Solutions',
  description:
    'Professional forensic home maintenance and emergency restoration in Albany, Oregon. Licensed contractor (CCB #258533) serving Linn and Benton Counties.',
};

export default function AlbanyAreaPage() {
  return (
    <main>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Serving Albany & Linn County
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Albany&apos;s Forensic <br />
            <span className="italic opacity-60">Property Experts.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Protecting Albany&apos;s residential and commercial assets with building science and precision maintenance.
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
                Linn County Protection
              </h2>
              <p className="text-lg text-slate font-medium leading-relaxed mb-8">
                Albany properties face unique moisture challenges. Our forensic audits and maintenance plans are engineered to stop rot before it starts.
              </p>
              <ul className="space-y-4">
                {['Rapid Emergency Response', 'Monthly Protection Plans', 'Board-Ready Documentation', 'Forensic Audit Technology'].map(i => (
                  <li key={i} className="flex items-center gap-3 font-bold text-oxblood">
                    <ShieldCheck className="w-5 h-5 opacity-60" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream p-12 rounded-3xl border border-oxblood/10 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" /> Local Service Area
              </h3>
              <p className="text-slate font-medium mb-6">
                We serve the Albany area and surrounding Linn County communities:
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Albany', 'Millersburg', 'Tangest', 'Jefferson', 'Lebanon', 'Sweet Home'].map(c => (
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
