import type { Metadata } from 'next';
import { Container, Section, Badge } from '@/components/ui';
import { Microscope, ClipboardCheck, Zap, ShieldCheck, Ruler, Droplets } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Methodology | Forensic Property Care',
  description:
    'The Benson Home Solutions methodology: Forensic auditing, data-backed reporting, and precision building science. Learn how we protect Oregon assets. CCB #258533.',
};

export default function MethodologyPage() {
  const steps = [
    {
      title: 'Forensic Audit',
      desc: 'We use moisture meters, thermal imaging, and acoustic sensors to map the hidden state of your property.',
      icon: Microscope,
    },
    {
      title: 'Data Analysis',
      desc: 'We compare audit findings against building science standards for the PNW and High Desert climates.',
      icon: Ruler,
    },
    {
      title: 'Strategic Plan',
      desc: 'Instead of a patch, we provide a long-term mitigation and maintenance roadmap.',
      icon: ClipboardCheck,
    },
    {
      title: 'Precision Execution',
      desc: 'Our licensed team applies forensic-level repairs designed to eliminate the root cause of failure.',
      icon: Zap,
    },
  ];

  return (
    <main>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            The Benson Standard
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Science Over <br />
            <span className="italic opacity-60">Guesswork.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Traditional contracting relies on visual assumptions. Benson Home Solutions relies on data. Our forensic methodology ensures that we fix the cause, not just the symptom.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="mb-6 p-5 bg-oxblood/5 rounded-3xl group-hover:bg-oxblood group-hover:text-cream transition-all duration-500">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">{step.title}</h3>
                <p className="text-slate font-medium text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood leading-tight">
                Why We Are <br />Forensic.
              </h2>
              <div className="p-8 bg-surface rounded-2xl border border-oxblood/10 shadow-xl">
                <h4 className="flex items-center gap-2 font-black text-oxblood uppercase tracking-widest text-sm mb-4">
                  <Droplets className="w-4 h-4" /> Capillary Action
                </h4>
                <p className="text-slate font-medium text-sm">
                  Oregon rain doesn&apos;t just hit a wall; it climbs. Without forensic detection, moisture trapped behind siding via capillary action goes unnoticed until structural rot occurs.
                </p>
              </div>
              <div className="p-8 bg-surface rounded-2xl border border-oxblood/10 shadow-xl">
                <h4 className="flex items-center gap-2 font-black text-oxblood uppercase tracking-widest text-sm mb-4">
                  <ShieldCheck className="w-4 h-4" /> Liability Mitigation
                </h4>
                <p className="text-slate font-medium text-sm">
                  Our data-backed reports provide boards and owners with the proof of care required to maintain property value and satisfy insurance requirements.
                </p>
              </div>
            </div>
            <div className="bg-oxblood p-12 rounded-3xl text-cream relative overflow-hidden">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Built for Oregon.</h3>
              <p className="font-medium opacity-80 leading-relaxed mb-8">
                Our methodology was developed specifically for the unique climate challenges of the Mid-Willamette Valley and the High Desert. We aren&apos;t generalists; we are Oregon climate specialists.
              </p>
              <ul className="space-y-4 font-bold uppercase tracking-widest text-xs">
                <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-cream/40" /> CCB Licensed #258533</li>
                <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-cream/40" /> Forensic Moisture Certified</li>
                <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-cream/40" /> Board-Ready Reporting</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
