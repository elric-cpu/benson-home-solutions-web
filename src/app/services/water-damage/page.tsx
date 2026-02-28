import type { Metadata } from 'next';
import Link from 'next/link';
import { Button, Container, Section, Card, CardContent, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Water Damage Restoration | 24/7 Emergency Response',
  description:
    'Professional water damage restoration in Albany, Lebanon & the Mid-Willamette Valley. Rapid dry-out, mold prevention, structural repair, and insurance documentation. CCB #258533. Call (541) 413-0480.',
  keywords: [
    'water damage restoration Oregon',
    'water damage Albany Oregon',
    'emergency water extraction',
    'flood damage repair Mid-Willamette Valley',
    'mold prevention Oregon',
    'water damage insurance documentation',
  ],
};

const restorationProcess = [
  {
    step: '1',
    title: 'Emergency Contact & Dispatch',
    description:
      'Call our 24/7 line and speak directly with our emergency coordinator. We dispatch a licensed crew immediately — no call centers, no runaround.',
    time: 'Within minutes',
  },
  {
    step: '2',
    title: 'On-Site Assessment & Documentation',
    description:
      'We arrive, assess the scope of damage, and begin documenting everything with photos, moisture readings, and detailed notes for your insurance carrier.',
    time: 'Within 60 minutes',
  },
  {
    step: '3',
    title: 'Water Extraction & Dry-Out',
    description:
      'Industrial-grade pumps and dehumidifiers remove standing water and pull moisture from walls, floors, and substructures. We monitor daily until readings are normal.',
    time: 'Days 1-3',
  },
  {
    step: '4',
    title: 'Mold Prevention & Sanitization',
    description:
      'We apply antimicrobial treatments to prevent mold colonization. If mold is already present, we follow IICRC S520 standards for remediation.',
    time: 'Days 2-5',
  },
  {
    step: '5',
    title: 'Structural Repair & Rebuild',
    description:
      'Damaged drywall, flooring, insulation, and framing are replaced to pre-loss condition. We handle the full rebuild — you deal with one contractor, not five.',
    time: 'Week 2+',
  },
];

const faqItems = [
  {
    question: 'How quickly can you respond to water damage?',
    answer:
      'We dispatch immediately upon receiving your call. In the Mid-Willamette Valley (Albany, Lebanon, Salem, Corvallis), we are typically on-site within 60 minutes. For Harney County, response times vary but we mobilize the same day.',
  },
  {
    question: 'Do you work with insurance companies?',
    answer:
      'Yes. We provide insurance-aligned documentation from the first moment on-site: timestamped photos, moisture readings, itemized damage reports, and scope-of-work estimates formatted for adjusters. We work with all major carriers.',
  },
  {
    question: 'What should I do while waiting for your crew?',
    answer:
      'If safe to do so: turn off the water source, move valuables to dry areas, and avoid walking on wet carpet (it pushes water deeper into the pad). Do not use household vacuums on standing water. Our dispatcher will walk you through immediate steps on the phone.',
  },
  {
    question: 'Can water damage cause mold?',
    answer:
      'Mold can begin colonizing within 24-48 hours of water exposure. That is why rapid extraction and professional drying are critical. We apply antimicrobial treatments as a preventive measure on every water damage job.',
  },
  {
    question: 'Do you handle the full rebuild or just the dry-out?',
    answer:
      'We handle everything from emergency extraction through complete structural rebuild. Drywall, flooring, insulation, painting, trim — one contractor, one point of contact, one CCB license (258533) covering the entire scope.',
  },
];

export default function WaterDamagePage() {
  return (
    <>
      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/"
              className="text-sm font-medium text-oxblood hover:text-oxblood/80 transition-colors mb-4 inline-block"
            >
              &larr; Home
            </Link>
            <Badge variant="secondary" className="mb-4 block w-fit">
              24/7 Emergency Response
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-oxblood leading-tight">
              Water Damage Restoration
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate leading-relaxed max-w-2xl">
              When water invades your property, every hour counts. Benson Home
              Solutions provides rapid extraction, professional dry-out, mold
              prevention, and complete structural rebuild — with insurance-ready
              documentation from the first moment on-site.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={`tel:${BUSINESS.afterhoursPhone}`}>
                <Button variant="emergency" size="lg">
                  Emergency: {BUSINESS.afterhoursPhone}
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Request Assessment
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Urgency Banner */}
      <Section className="bg-red-900 text-white py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-400 animate-pulse" />
            <p className="text-lg font-semibold">
              Water damage worsens every hour. Mold can start in 24-48 hours.
              Don&apos;t wait — call now.
            </p>
            <a href={`tel:${BUSINESS.afterhoursPhone}`}>
              <Button variant="emergency" size="sm" className="border border-red-400">
                {BUSINESS.afterhoursPhone}
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      {/* What We Handle */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Complete Water Damage Services</h2>
            <p className="mt-4 text-lg text-slate">
              One contractor. One license. Full-scope restoration from extraction to rebuild.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-2">Emergency Water Extraction</h3>
                <p className="text-slate leading-relaxed">
                  Industrial pumps and truck-mounted extractors remove standing water fast.
                  We extract from carpets, hardwood, crawl spaces, and basements.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-2">Structural Drying & Monitoring</h3>
                <p className="text-slate leading-relaxed">
                  Commercial dehumidifiers and air movers target moisture trapped in
                  walls, subfloors, and framing. We take daily readings until the structure
                  reaches dry standard.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-2">Mold Prevention & Remediation</h3>
                <p className="text-slate leading-relaxed">
                  Antimicrobial treatments applied immediately. If mold is already present,
                  we follow IICRC S520 protocols for safe, documented remediation.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-2">Insurance Documentation</h3>
                <p className="text-slate leading-relaxed">
                  Timestamped photos, moisture maps, itemized damage reports, and
                  scope-of-work estimates formatted for adjusters. We make the claims
                  process smooth.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-2">Content & Belongings Protection</h3>
                <p className="text-slate leading-relaxed">
                  We carefully pack out, inventory, and protect your belongings during
                  restoration. Salvageable items are cleaned and stored safely.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-2">Full Structural Rebuild</h3>
                <p className="text-slate leading-relaxed">
                  Drywall, flooring, insulation, framing, painting, and trim — we restore
                  your property to pre-loss condition. No subcontractor chains.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Our Process */}
      <Section variant="cream" spacing="lg">
        <Container size="narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Restoration Process
          </h2>
          <div className="space-y-8">
            {restorationProcess.map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-oxblood text-cream flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-charcoal">{item.title}</h3>
                    <Badge variant="secondary" className="text-xs w-fit">{item.time}</Badge>
                  </div>
                  <p className="text-slate leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Common Causes */}
      <Section spacing="md">
        <Container size="narrow">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Common Causes of Water Damage</h2>
          <div className="prose prose-lg text-slate max-w-none">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Burst or frozen pipes</strong> — Oregon winters put older plumbing at risk</li>
              <li><strong>Appliance failures</strong> — water heaters, washing machines, dishwashers</li>
              <li><strong>Roof leaks</strong> — prolonged rain, missing shingles, ice dams</li>
              <li><strong>Foundation seepage</strong> — poor drainage, high water tables in the Valley</li>
              <li><strong>Sewage backups</strong> — blocked mains, tree root intrusion</li>
              <li><strong>Storm flooding</strong> — the Willamette Valley sees heavy seasonal rain</li>
            </ul>
            <div className="border-l-4 border-oxblood pl-4 italic my-8 bg-cream/50 py-4 pr-4 rounded-r-lg not-prose">
              <p className="text-slate">
                &ldquo;We treat your property with the same care and precision we would
                our own. Water damage is stressful — our job is to take that
                weight off your shoulders and get your home back to normal.&rdquo;
              </p>
              <p className="text-sm text-muted mt-2">— Elric Benson, Owner</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="cream" spacing="lg">
        <Container size="narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((faq, i) => (
              <div key={i} className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-charcoal">
                  {faq.question}
                </h3>
                <p className="mt-2 text-slate leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="oxblood" spacing="md">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-cream">
              Water Damage? We&apos;re Ready Now.
            </h2>
            <p className="mt-3 text-cream/80">
              Licensed, bonded, and insured. {BUSINESS.license}. Full-scope
              restoration from extraction to rebuild.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a href={`tel:${BUSINESS.afterhoursPhone}`}>
                <Button variant="secondary" size="lg">
                  Call 24/7: {BUSINESS.afterhoursPhone}
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-cream hover:text-cream hover:bg-cream/10"
                >
                  Request Assessment
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Water Damage Restoration',
            provider: {
              '@type': 'HomeAndConstructionBusiness',
              name: BUSINESS.name,
              telephone: BUSINESS.phone,
              url: BUSINESS.url,
            },
            description:
              'Professional water damage restoration including emergency extraction, structural drying, mold prevention, insurance documentation, and complete rebuild.',
            areaServed: [
              { '@type': 'City', name: 'Albany' },
              { '@type': 'City', name: 'Lebanon' },
              { '@type': 'City', name: 'Salem' },
              { '@type': 'City', name: 'Corvallis' },
              { '@type': 'City', name: 'Sweet Home' },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Water Damage Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Water Extraction' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Structural Drying' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mold Remediation' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full Structural Rebuild' } },
              ],
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
