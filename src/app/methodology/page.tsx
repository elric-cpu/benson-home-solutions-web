import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Badge, Button } from '@/components/ui';
import { Microscope, ClipboardCheck, Zap, Ruler, Droplets, Thermometer, Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Methodology | Data-Driven Home Maintenance',
  description:
    'Learn how Benson Home Solutions uses a data-driven methodology to protect your property. We use forensic auditing and building science to prevent expensive repairs. CCB #258533.',
};

export default function MethodologyPage() {
  const steps = [
    {
      title: '1. The Forensic Audit',
      desc: 'We start by looking for what can\'t be seen. Our audit goes beyond a visual inspection to identify hidden moisture, heat loss, and potential failure points.',
      icon: Microscope,
    },
    {
      title: '2. Data-Backed Analysis',
      desc: 'The audit data is compared against building science standards for your specific climate—whether it\'s the Valley\'s rain or the High Desert\'s heat.',
      icon: Ruler,
    },
    {
      title: '3. A Clear, Proactive Plan',
      desc: 'You get a straightforward, prioritized plan with clear costs. No technical jargon, just a roadmap to a healthier, more resilient property.',
      icon: ClipboardCheck,
    },
    {
      title: '4. Precision Repairs',
      desc: 'Our in-house, licensed team executes the plan. We focus on fixing the root cause, not just patching the symptoms, to prevent the problem from returning.',
      icon: Zap,
    },
  ];

  return (
    <main>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Our Process
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            We Don&apos;t Guess. <br />
            <span className="italic opacity-60">We Measure.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Your property is your biggest investment. We treat it like one. Our methodology is built on verifiable data, not guesswork, so you can make informed decisions and prevent small issues from becoming costly disasters.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="mb-8 p-6 bg-oxblood/5 rounded-full group-hover:bg-oxblood group-hover:text-cream transition-all duration-300">
                  <step.icon className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">{step.title}</h3>
                <p className="text-slate font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              The Tools We Use
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              We own and operate specialized equipment to get the job done right.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-surface p-8 rounded-2xl border border-oxblood/10 shadow-lg">
              <Thermometer className="w-10 h-10 text-oxblood mx-auto mb-4" />
              <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Thermal Imaging</h3>
              <p className="text-slate font-medium text-sm">Detects hidden heat loss and moisture intrusion behind walls and ceilings.</p>
            </div>
            <div className="bg-surface p-8 rounded-2xl border border-oxblood/10 shadow-lg">
              <Droplets className="w-10 h-10 text-oxblood mx-auto mb-4" />
              <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Moisture Meters</h3>
              <p className="text-slate font-medium text-sm">Measures the exact moisture content of building materials to quantify risk.</p>
            </div>
            <div className="bg-surface p-8 rounded-2xl border border-oxblood/10 shadow-lg">
              <Camera className="w-10 h-10 text-oxblood mx-auto mb-4" />
              <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Borescope Cameras</h3>
              <p className="text-slate font-medium text-sm">Allows us to visually inspect inside wall cavities and other tight spaces without demolition.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="text-center max-w-3xl">
          <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">
            Ready for a Real Inspection?
          </h2>
          <p className="text-xl text-slate font-medium mb-12">
            Stop relying on visual inspections that only tell you what&apos;s already broken. A forensic audit from Benson Home Solutions gives you the data you need to protect your property for the long term.
          </p>
          <Link href="/contact?service=audit">
            <Button size="lg" className="px-12 py-8 text-lg font-black uppercase tracking-widest shadow-xl shadow-oxblood/20">
              Schedule Your Forensic Audit
            </Button>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
