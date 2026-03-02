import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { Section, Container, Card, CardContent, RichHero, ResourcesSection } from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

interface MethodologyPageData {
  title?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroVideo?: string;
  resources?: any[];
  metaDescription?: string;
  introContent?: Record<string, unknown>[];
  processSteps?: Record<string, unknown>[];
  certifications?: Record<string, unknown>[];
  qualityStandards?: Record<string, unknown>[];
}

const methodologyQuery = `*[_type == "methodologyPage"][0]`;

export const metadata: Metadata = {
  title: 'Our Methodology | Systematic Property Protection',
  description: 'Learn about our 5-phase preventive maintenance methodology and the 7-point data model behind our True Cost of Homeownership calculator.',
};

const servicePhases = [
  {
    number: '01',
    title: 'Assessment & Documentation',
    desc: 'Every engagement starts with a thorough property assessment. We document current conditions with photos, identify deferred maintenance items, and create a prioritized action plan.',
  },
  {
    number: '02',
    title: 'Critical Repairs',
    desc: 'We address the highest-risk items first — active leaks, safety hazards, and issues that will cause compounding damage if left unresolved. This stabilizes the property.',
  },
  {
    number: '03',
    title: 'Preventive Maintenance Program',
    desc: 'Once critical items are resolved, we establish a recurring maintenance schedule tailored to your property. Seasonal inspections prevent big failures.',
  },
  {
    number: '04',
    title: 'Monitoring & Reporting',
    desc: 'After each visit, you receive a documented report with photos. Over time, this creates a complete maintenance history — invaluable for insurance claims and property value.',
  },
  {
    number: '05',
    title: 'Emergency Response',
    desc: 'When the unexpected happens, our emergency line gets you rapid response. Because we already know your property, we can act faster and smarter.',
  },
];

const dataModels = [
  {
    title: 'Property Taxes',
    slug: 'property-taxes',
    icon: '📊',
    desc: 'Census tract-level tax estimation methodology.',
  },
  {
    title: 'Insurance Benchmarks',
    slug: 'insurance',
    icon: '🛡️',
    desc: 'Premium modeling via NAIC & FEMA flood data.',
  },
  {
    title: 'Maintenance Model',
    slug: 'maintenance',
    icon: '🔧',
    desc: 'preventive ROI calculations using DOE ResStock.',
  },
  {
    title: 'Energy Efficiency',
    slug: 'energy',
    icon: '⚡',
    desc: 'Utility forecasting via NOAA climate normals.',
  },
  {
    title: 'Water & Utilities',
    slug: 'water-utilities',
    icon: '💧',
    desc: 'Local utility rate analysis methodology.',
  },
  {
    title: 'Deferred Maintenance',
    slug: 'deferred-maintenance',
    icon: '⚠️',
    desc: 'Compound cost escalation modeling.',
  },
  {
    title: 'Appliance Lifecycle',
    slug: 'appliance-lifecycle',
    icon: '⏳',
    desc: 'Reserve planning for system replacements.',
  },
];

export default async function MethodologyPage() {
  let page: MethodologyPageData | null = null;
  try {
    page = await client.fetch<MethodologyPageData | null>(methodologyQuery);
  } catch (error) {
    console.error('Failed to load methodology page data', error);
  }

  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Methodology', url: `${BUSINESS.url}/methodology` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      
      {/* Hero */}
      <RichHero
        title={page?.heroHeadline || page?.title || 'Preemptive Property Protection'}
        description={page?.heroSubtext || "Most property damage isn’t accidental—it’s the result of deferred maintenance. Our methodology combines a 5-phase service framework with forensic data modeling to harden your building against predictable risks."}
        backgroundImage={HERO_ASSETS.maintenance}
        videoBackground={page?.heroVideo}
        badge="Professional Oversight"
      />

      {/* The Problem Section */}
      <Section spacing="md">
        <Container size="narrow">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              The Trade Reality
            </h2>
            <p className="text-amber-800 text-lg leading-relaxed mb-6">
              The industry average for property maintenance is 1–4% of property value annually. Most owners spend this reactively—paying for emergency repairs after the building envelope has already failed.
            </p>
            <div className="border-l-4 border-amber-500 pl-6 italic text-amber-900 text-xl font-medium">
              &quot;A $10 seal inspection in September stops a $15,000
              restoration claim in January.&quot;
            </div>
          </div>
        </Container>
      </Section>

      {/* 5 Phases (Service Methodology) */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal">
              The 5-Phase Service Framework
            </h2>
            <p className="mt-4 text-slate text-lg">
              How we engage with every property to ensure long-term stability.
            </p>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            {page?.processSteps ? (
              <PortableTextRenderer value={page.processSteps} />
            ) : (
              servicePhases.map((phase) => (
                <div key={phase.number} className="relative pl-16 md:pl-24 group block">
                  <div className="absolute left-0 top-0 text-4xl md:text-6xl font-black text-oxblood/10 select-none">
                    {phase.number}
                  </div>
                  <div className="flex items-center justify-between border-b border-slate/5 pb-8">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-charcoal mb-3">
                        {phase.title}
                      </h3>
                      <p className="text-slate text-lg leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Container>
      </Section>

      {/* Data Models (Calculator Methodology) */}
      <Section variant="charcoal" spacing="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-cream">
              The Data Behind Our Models
            </h2>
            <p className="mt-4 text-cream/80 text-lg">
              Our &quot;True Cost of Homeownership&quot; calculator isn&apos;t a guess. It&apos;s built on 
              federal datasets and rigorous engineering models. Explore the methodology below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataModels.map((model) => (
              <Link key={model.slug} href={`/methodology/${model.slug}`} className="group h-full">
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{model.icon}</div>
                    <h3 className="text-xl font-bold text-cream mb-2 group-hover:text-amber-400 transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-cream/60 text-sm leading-relaxed">
                      {model.desc}
                    </p>
                    <div className="mt-4 text-xs font-bold text-cream/40 uppercase tracking-widest group-hover:text-cream transition-colors flex items-center gap-2">
                      Read Methodology 
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Authoritative Resources */}
      {page?.resources && <ResourcesSection resources={page.resources} />}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Methodology & Data Models - Benson Home Solutions',
            description: 'Overview of Benson Home Solutions service phases and data modeling methodologies.',
            url: `${BUSINESS.url}/methodology`,
          }),
        }}
      />
    </>
  );
}
