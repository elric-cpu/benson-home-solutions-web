import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { FAQSection } from '@/components/content/FAQSection';
import { BUSINESS } from '@/lib/constants';
import { ShieldCheck, CloudRain, FileSearch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mold Remediation & Protection | Benson Home Solutions',
  description:
    'Licensed mold remediation and diagnostic moisture audits in the Mid-Willamette Valley. We identify the source, stop the growth, and protect your asset. CCB #258533.',
  keywords: [
    'mold remediation Salem Oregon',
    'black mold removal Albany',
    'moisture detection Corvallis',
    'attic mold treatment Oregon',
    'diagnostic moisture audit mold',
    'Benson Home Solutions mold',
  ],
};

export default function MoldRemediationPage() {
  return (
    <>
      {/* Hero Section */}
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Diagnostic Moisture Control
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Identify. Remediate. <br />
            <span className="italic opacity-60">Protect.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            In Oregon, mold is a symptom of a building envelope failure. We don&apos;t just clean the mold; we use diagnostic moisture detection to identify the source and stop it forever.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact?service=mold">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                Request Comprehensive Audit
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* The Difference */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <FileSearch className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Source Detection</h3>
              <p className="text-slate font-medium leading-relaxed">
                Using thermal imaging and moisture metering, we find the hidden leaks and condensation points that allow mold to thrive in Oregon&apos;s climate.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <ShieldCheck className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Certified Remediation</h3>
              <p className="text-slate font-medium leading-relaxed">
                Safe, effective removal and antimicrobial treatment of affected materials. We follow strict containment and air filtration protocols.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <CloudRain className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Barrier Protection</h3>
              <p className="text-slate font-medium leading-relaxed">
                We engineer drainage and ventilation solutions to keep moisture out of your attic, crawlspace, and walls for good.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">Don&apos;t Just Spray It.</h2>
          <p className="text-xl text-slate font-medium mb-10 max-w-xl mx-auto">
            Surface cleaning is a temporary fix. Let our diagnostic team identify why the mold is growing and protect your asset for the long term.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center justify-center h-16 px-10 text-sm font-black uppercase tracking-widest rounded-xl bg-oxblood text-cream hover:bg-oxblood/90 transition-all shadow-xl shadow-oxblood/20"
            >
              Call {BUSINESS.phone}
            </a>
            <Link
              href="/contact?service=mold"
              className="inline-flex items-center justify-center h-16 px-10 text-sm font-black uppercase tracking-widest rounded-xl border-2 border-oxblood text-oxblood hover:bg-oxblood hover:text-cream transition-all"
            >
              Send Audit Request
            </Link>
          </div>
        </Container>
      </Section>

      <FAQSection />
    </>
  );
}
