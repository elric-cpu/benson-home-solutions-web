import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { Snowflake, CloudRain, Wind, FileSearch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Essential Roofing Maintenance for Oregon Winters | Benson Home Solutions',
  description:
    'Protect your home from Oregon winter damage. Professional roof maintenance, moss removal, and forensic inspections in Salem, Albany, and Harney County. CCB #258533.',
  keywords: [
    'Oregon roof maintenance winter',
    'roof moss removal Salem',
    'winter roof inspection Albany',
    'high desert roofing prep',
    'proactive roofing care Oregon',
    'Benson Home Solutions roofing',
  ],
};

const roofingFaqs = [
  {
    question: "Why is winter roof maintenance critical in Oregon?",
    answer: "Oregon winters bring persistent rain in the Valley and heavy snow/ice in the High Desert. Without maintenance, clogged gutters and moss buildup cause water to back up under shingles, leading to structural rot and interior leaks that are often excluded from insurance coverage if deemed 'preventable.'",
  },
  {
    question: "When should I schedule my winter roofing audit?",
    answer: "The ideal window is between September and November. This allows us to clear debris, inspect flashings, and ensure the building envelope is sealed before the first major freeze or atmospheric river event.",
  },
  {
    question: "How does moss affect my roof during the winter?",
    answer: "Moss acts like a sponge, holding moisture against your shingles and lifting their edges. During freeze-thaw cycles, this trapped water expands, cracking the roofing material and creating direct paths for water to enter your home.",
  },
  {
    question: "What is a 'Forensic Roof Inspection'?",
    answer: "Standard inspections are visual. Our forensic audits use moisture meters at the roof-to-wall transitions and thermal imaging in the attic to detect heat loss and moisture intrusion that haven't yet caused visible ceiling stains.",
  },
];

export default function RoofMaintenancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Prepare Your Oregon Roof for Winter",
    "description": "A step-by-step guide to winterizing your roof in the Pacific Northwest and High Desert climates.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Debris Removal",
        "text": "Clear all needles, leaves, and moss sponges from roof valleys and gutter systems."
      },
      {
        "@type": "HowToStep",
        "name": "Flashing Audit",
        "text": "Inspect all chimney, vent, and valley flashings for cracks or sealant failure."
      },
      {
        "@type": "HowToStep",
        "name": "Gutter Tension Check",
        "text": "Ensure gutters are securely fastened to handle the weight of heavy ice or persistent rain."
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Seasonal Protection Guide
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Winter-Proof <br />
            <span className="italic opacity-60">Your Shelter.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Oregon winters are relentless. From the atmospheric rivers of the Valley to the sub-zero freezes of Harney County, your roof is your first line of defense.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact?service=roofing">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                Get a Winter Audit
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* The Threats */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <CloudRain className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Valley Saturation</h3>
              <p className="text-slate font-medium leading-relaxed">
                Persistent rain leads to moss growth and shingle lifting. We clear debris and treat surfaces to ensure water flows off, not into, your home.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Snowflake className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">High Desert Ice</h3>
              <p className="text-slate font-medium leading-relaxed">
                In Burns and Drewsey, ice dams are a major threat. We audit insulation and ventilation to prevent ice buildup at the eaves.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-oxblood/5 rounded-2xl">
                <Wind className="w-10 h-10 text-oxblood" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-oxblood">Wind Scouring</h3>
              <p className="text-slate font-medium leading-relaxed">
                Oregon storm winds can lift unsecured shingles. Our forensic team checks every perimeter for mechanical fastening integrity.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Checklist Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">
                The 22-Point <br />Forensic Audit
              </h2>
              <p className="text-lg text-slate font-medium mb-8">
                We don&apos;t just look at the roof. We analyze the system. Every winter audit includes:
              </p>
              <ul className="space-y-4">
                {[
                  'Attic Thermal Imaging (Heat Loss Check)',
                  'Chimney Cap & Seal Inspection',
                  'Vent Pipe Boot Integrity Audit',
                  'Gutter Pitch & Drainage Validation',
                  'Skylight Flashing Forensic Check',
                  'Branch & Debris Mitigation',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-bold text-oxblood">
                    <FileSearch className="w-5 h-5 opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-oxblood p-12 rounded-3xl text-cream shadow-2xl">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">ROI of Prevention</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-cream/10 pb-4">
                  <div>
                    <div className="text-xs uppercase font-bold opacity-60">Maintenance Cost</div>
                    <div className="text-3xl font-black">$250 - $600</div>
                  </div>
                  <Badge variant="secondary">Annual</Badge>
                </div>
                <div className="flex justify-between items-end border-b border-cream/10 pb-4">
                  <div>
                    <div className="text-xs uppercase font-bold opacity-60">Emergency Repair</div>
                    <div className="text-3xl font-black">$2,500+</div>
                  </div>
                  <Badge className="bg-red-500">Unplanned</Badge>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs uppercase font-bold opacity-60">Full Replacement</div>
                    <div className="text-3xl font-black">$15,000 - $40,000</div>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-sm opacity-60 italic">
                *Based on Mid-Willamette Valley average property sizes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Custom FAQ for this page */}
      <Section spacing="lg">
        <Container size="narrow">
          <h2 className="text-3xl font-black uppercase tracking-tight text-oxblood mb-12 text-center">Roofing FAQ</h2>
          <div className="space-y-8">
            {roofingFaqs.map((faq, i) => (
              <div key={i} className="border-b border-oxblood/10 pb-8">
                <h4 className="text-xl font-black text-charcoal mb-4">{faq.question}</h4>
                <p className="text-slate font-medium leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section variant="oxblood" spacing="md">
        <Container className="text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-6">Don&apos;t Wait for the Leak.</h2>
          <p className="text-xl opacity-80 mb-10 max-w-xl mx-auto font-medium">
            Join the 200+ Oregon property owners who trust Benson Home Solutions for forensic seasonal protection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact?service=roofing">
              <Button variant="secondary" size="lg" className="font-black uppercase tracking-widest px-12 py-8">Schedule My Audit</Button>
            </Link>
            <a href={`tel:${BUSINESS.phone}`}>
              <Button variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-oxblood px-12 py-8 font-black uppercase tracking-widest">Call {BUSINESS.phone}</Button>
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
