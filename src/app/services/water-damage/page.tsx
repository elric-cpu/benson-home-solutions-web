import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { FAQSection } from '@/components/content/FAQSection';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';
import { Droplets, ShieldAlert, FileSearch, Zap, Hammer } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Water Damage Restoration | Emergency Dry-Out Salem & Albany',
  description:
    '24/7 emergency water damage restoration in the Mid-Willamette Valley. Diagnostic dry-out, insurance-ready documentation, and full rebuild services. CCB #258533.',
  keywords: [
    'water damage restoration Salem Oregon',
    'emergency dry out Albany Oregon',
    'flood restoration Corvallis',
    'mold remediation Oregon',
    'insurance claim contractor Oregon',
    'Benson Home Solutions water damage',
  ],
};

export default function WaterDamagePage() {
  return (
    <>
      {/* Hero Section */}
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-red-500 text-white border-none px-4 py-1.5 uppercase tracking-widest font-black flex items-center gap-2 mx-auto w-fit">
            <ShieldAlert className="w-4 h-4" /> 24/7 Emergency Response
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Stop the Damage. <br />
            <span className="italic opacity-60">Start the Restore.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Water damage doesn&apos;t wait. Neither do we. Benson Home Solutions provides diagnostic dry-out and full-service restoration with documentation designed to maximize your insurance recovery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`tel:${BUSINESS.afterhoursPhone}`}>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest bg-red-600 text-white border-none hover:bg-red-700 shadow-xl shadow-red-900/40">
                Call Emergency Line
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      {/* The Diagnostic Difference */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Droplets className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Extraction & Dry-Out</h3>
              <p className="text-slate font-medium leading-relaxed">
                Industrial-grade water extraction and dehumidification. We don&apos;t just dry the surface; we use thermal imaging to ensure the structure is bone-dry.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <FileSearch className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Claims Documentation</h3>
              <p className="text-slate font-medium leading-relaxed">
                We provide the diagnostic data adjusters need. Moisture logs, infrared scans, and detailed line-item estimates (Xactimate-compatible).
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Hammer className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Full Reconstruction</h3>
              <p className="text-slate font-medium leading-relaxed">
                Unlike mitigation-only firms, we are a licensed General Contractor (CCB #258533). We handle everything from dry-out to final paint.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Restoration Roadmap
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              How we bring your property back from the brink in four phases.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Response', desc: 'On-site within hours to stop the source and prevent secondary damage.', icon: Zap },
              { title: 'Audit', desc: 'Diagnostic mapping of moisture levels to define the dry-out strategy.', icon: FileSearch },
              { title: 'Mitigation', desc: 'Extraction, dehumidification, and antimicrobial treatment.', icon: Droplets },
              { title: 'Rebuild', desc: 'Seamless reconstruction to restore your property to pre-loss condition.', icon: Hammer },
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="text-oxblood/10 text-8xl font-black absolute -top-8 -left-4 select-none">0{idx + 1}</div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-2">{step.title}</h4>
                  <p className="text-slate font-medium text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg">
        <Container className="text-center">
          <Card className="bg-oxblood p-12 text-cream border-none shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
              Dealing with Water Now?
            </h2>
            <p className="text-xl font-medium mb-12 opacity-80 max-w-2xl mx-auto">
              Every hour matters. Standing water leads to mold in as little as 24 hours. Let our diagnostic team take control.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href={`tel:${BUSINESS.afterhoursPhone}`}
                className="inline-flex items-center justify-center h-16 px-10 text-sm font-black uppercase tracking-widest rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-xl shadow-red-900/40"
              >
                Call Emergency line
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-16 px-10 text-sm font-black uppercase tracking-widest rounded-xl border-2 border-cream text-cream hover:bg-cream hover:text-oxblood transition-all"
              >
                Send Claim Details
              </Link>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Local SEO Boost */}
      <Section variant="cream" spacing="md">
        <Container className="text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-6">Serving the Mid-Willamette Valley</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICE_AREAS.midWillametteValley.map(city => (
              <span key={city} className="px-4 py-2 bg-oxblood/5 border border-oxblood/10 rounded-full text-xs font-bold text-oxblood uppercase tracking-widest">
                {city}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <FAQSection />
    </>
  );
}
