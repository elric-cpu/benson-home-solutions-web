import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { FAQSection } from '@/components/content/FAQSection';
import { ShieldCheck, Thermometer, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Windows & Doors | Diagnostic Installation Oregon',
  description:
    'Expert window and door replacement in Salem and Albany. We focus on building envelope integrity and thermal efficiency to prevent PNW moisture intrusion. CCB #258533.',
};

export default function WindowsDoorsPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Envelope Integrity
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Seal the <br />
            <span className="italic opacity-60">Vulnerability.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Windows and doors are the most common points of building envelope failure. We provide diagnostic-level installations that stop moisture and keep the heat where it belongs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact?service=windows">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                Request Efficiency Audit
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
                <Thermometer className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Thermal Performance</h3>
              <p className="text-slate font-medium leading-relaxed">
                Identify and eliminate heat loss. We use thermal imaging to verify that your new windows are performing to peak Oregon efficiency standards.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <ShieldCheck className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Diagnostic Flashing</h3>
              <p className="text-slate font-medium leading-relaxed">
                It&apos;s not about the window; it&apos;s about the hole. We apply precision flashing and moisture barriers that exceed standard building codes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Wind className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Air Infiltration</h3>
              <p className="text-slate font-medium leading-relaxed">
                Stop the drafts. Our installation methodology focuses on airtight seals to protect your indoor air quality and lower utility bills.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FAQSection />
    </>
  );
}
