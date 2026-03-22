import type { Metadata } from 'next';
import { Container, Section, Badge } from '@/components/ui';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';
import { ShieldCheck, Ruler, Map, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Benson Home Solutions | Expert Oregon Contractor',
  description:
    'Licensed Oregon contractor (CCB #258533) specializing in proactive property care. Learn about our maintenance-first philosophy and commitment to the Mid-Willamette Valley and Harney County.',
  keywords: [
    'Benson Home Solutions about',
    'Elric Benson Oregon contractor',
    'maintenance-first philosophy',
    'licensed Oregon contractor CCB 258533',
    'Salem Oregon property care',
    'Burns Oregon property care',
  ],
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            Oregon CCB #258533
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            Precision in <br />
            <span className="italic text-oxblood/60">Every Dimension.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto">
            Benson Home Solutions isn&apos;t just a construction company. We are a forensic property care firm dedicated to the long-term preservation of Oregon&apos;s residential, commercial, and ecclesiastical assets.
          </p>
        </Container>
      </Section>

      {/* The Mission */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">
                The Maintenance-First Philosophy
              </h2>
              <div className="space-y-6 text-slate font-medium leading-relaxed">
                <p>
                  Founded by {BUSINESS.owner}, Benson Home Solutions was born from a simple observation: most property owners are trapped in a cycle of reactive repair. They wait for the leak to appear, the wood to rot, or the system to fail before taking action.
                </p>
                <p>
                  This &ldquo;break-fix&rdquo; model is the most expensive way to own property. It leads to insurance claim denials, structural instability, and massive unexpected capital expenditures.
                </p>
                <p>
                  We believe in a better way. By applying <strong>forensic auditing</strong> techniques and building-science metrics to regular property care, we identify vulnerabilities before they become liabilities. We don&apos;t just fix buildings; we protect them.
                </p>
              </div>
            </div>
            <div className="bg-oxblood p-12 rounded-3xl text-cream">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Our Core Standards</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <ShieldCheck className="w-6 h-6 shrink-0 text-cream/60" />
                  <div>
                    <div className="font-black uppercase tracking-widest text-sm mb-1">Full Compliance</div>
                    <div className="text-cream/80 text-sm">Licensed (CCB #258533), Bonded, and Insured for your absolute protection.</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Ruler className="w-6 h-6 shrink-0 text-cream/60" />
                  <div>
                    <div className="font-black uppercase tracking-widest text-sm mb-1">Forensic Precision</div>
                    <div className="text-cream/80 text-sm">We use thermal imaging and moisture metering on every audit. No guesswork.</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Scale className="w-6 h-6 shrink-0 text-cream/60" />
                  <div>
                    <div className="font-black uppercase tracking-widest text-sm mb-1">Total Transparency</div>
                    <div className="text-cream/80 text-sm">Board-ready reports with photos and data-backed recommendations for every visit.</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Dual Region Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Dual-Region Expertise
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              We understand the unique demands of Oregon&apos;s diverse climates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface p-10 rounded-2xl border border-oxblood/5 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4 flex items-center gap-3">
                <Map className="w-6 h-6" /> The Valley
              </h3>
              <p className="text-slate font-medium mb-6 leading-relaxed">
                In the Mid-Willamette Valley, we combat the persistent moisture and high humidity that leads to rot and mold. Our focus is building envelope integrity and drainage optimization.
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.midWillametteValley.slice(0, 5).map(city => (
                  <span key={city} className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">{city}</span>
                ))}
                <span className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">+ More</span>
              </div>
            </div>

            <div className="bg-surface p-10 rounded-2xl border border-oxblood/5 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4 flex items-center gap-3">
                <Map className="w-6 h-6" /> The High Desert
              </h3>
              <p className="text-slate font-medium mb-6 leading-relaxed">
                In Harney County, we protect against extreme temperature swings and wildfire risk. Our focus is winterization, thermal efficiency, and property hardening.
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.harneyCounty.map(city => (
                  <span key={city} className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">{city}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust & Stats */}
      <Section spacing="lg">
        <Container className="text-center">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">10+</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Years of Forensic <br />Experience</div>
            </div>
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">200+</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Projects Successfully <br />Completed</div>
            </div>
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">4.9/5</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Customer Satisfaction <br />Rating</div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto border-t border-oxblood/10 pt-16">
            <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-8">Ready to Protect Your Asset?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="inline-flex items-center justify-center h-16 px-10 text-sm font-black uppercase tracking-widest rounded-xl bg-oxblood text-cream hover:bg-oxblood/90 transition-all shadow-xl shadow-oxblood/20"
              >
                Call {BUSINESS.phone}
              </a>
              <a
                href="mailto:office@bensonhomesolutions.com"
                className="inline-flex items-center justify-center h-16 px-10 text-sm font-black uppercase tracking-widest rounded-xl border-2 border-oxblood text-oxblood hover:bg-oxblood hover:text-cream transition-all"
              >
                Email Our Office
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
