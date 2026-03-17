import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Button,
  Container,
  Section,
  Card,
  CardContent,
  Badge,
} from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FAQPageJsonLd,
} from '@/components/seo/json-ld';
import { FAQSection } from '@/components/seo/FAQSection';

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
      'We dispatch immediately upon receiving your call. In the Mid-Willamette Valley (Albany, Lebanon, Sweet Home), we are typically on-site within 60 minutes. For Harney County (Burns, Riley, Drewsey), we mobilize the same day. We prioritize active water mitigation to prevent costly secondary damage.',
  },
  {
    question: 'Do you work with insurance companies?',
    answer:
      'Yes. We provide insurance-aligned documentation from the first moment on-site: timestamped photos, moisture readings, itemized damage reports, and scope-of-work estimates formatted for adjusters. We work with all major carriers to ensure your Oregon home repair claims are processed smoothly.',
  },
  {
    question: 'What should I do while waiting for your crew?',
    answer:
      'If safe to do so: turn off the water source, move valuables to dry areas, and avoid walking on wet carpet. Do not use household vacuums on standing water. Our local dispatcher will walk you through immediate steps on the phone while our emergency crew routes to your property.',
  },
  {
    question: 'Can water damage cause mold?',
    answer:
      'Mold can begin colonizing within 24-48 hours of water exposure. That is why rapid extraction and professional drying are critical. We apply antimicrobial treatments as a preventive measure on every water damage job across the Willamette Valley and Harney County.',
  },
  {
    question: 'Do you handle the full rebuild or just the dry-out?',
    answer:
      'We handle everything from emergency extraction through complete structural rebuild. Drywall, flooring, insulation, painting, trim — one general contractor, one point of contact, one CCB license (258533) covering the entire scope. We do not chain subcontractors, ensuring higher quality control.',
  },
];

export default function WaterDamagePage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    {
      name: 'Water Damage Restoration',
      url: `${BUSINESS.url}/services/water-damage`,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Water Damage Restoration"
        description="Professional water damage restoration including emergency extraction, structural drying, mold prevention, and complete rebuild."
        url={`${BUSINESS.url}/services/water-damage`}
      />
      <FAQPageJsonLd questions={faqItems} />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/"
              className="text-oxblood hover:text-oxblood/80 mb-4 inline-block text-sm font-medium transition-colors"
            >
              &larr; Home
            </Link>
            <Badge variant="secondary" className="mb-4 block w-fit">
              24/7 Emergency Response
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Water Damage Restoration
            </h1>
            <p className="text-slate mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
              When water invades your property, structural integrity is on the
              clock. Benson Home Solutions provides forensic extraction,
              professional dry-out, and complete reconstruction—with the
              board-ready documentation required for insurance alignment from
              hour one.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
      <Section className="bg-red-900 py-6 text-white">
        <Container>
          <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row">
            <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-red-400" />
            <p className="text-lg font-semibold">
              Water damage worsens every hour. Mold can start in 24-48 hours.
              Don&apos;t wait — call now.
            </p>
            <a href={`tel:${BUSINESS.afterhoursPhone}`}>
              <Button
                variant="emergency"
                size="sm"
                className="border border-red-400"
              >
                {BUSINESS.afterhoursPhone}
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      {/* What We Handle */}
      <Section spacing="lg">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Complete Water Damage Services
            </h2>
            <p className="text-slate mt-4 text-lg">
              One contractor. One license. Full-scope restoration from
              extraction to rebuild.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-2 text-xl font-bold">
                  Emergency Water Extraction
                </h3>
                <p className="text-slate leading-relaxed">
                  Industrial pumps and truck-mounted extractors remove standing
                  water fast. We extract from carpets, hardwood, crawl spaces,
                  and basements.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-2 text-xl font-bold">
                  Structural Drying & Monitoring
                </h3>
                <p className="text-slate leading-relaxed">
                  Commercial dehumidifiers and air movers target moisture
                  trapped in walls, subfloors, and framing. We take daily
                  readings until the structure reaches dry standard.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-2 text-xl font-bold">
                  Mold Prevention & Remediation
                </h3>
                <p className="text-slate leading-relaxed">
                  Antimicrobial treatments applied immediately. If mold is
                  already present, we follow IICRC S520 protocols for safe,
                  documented remediation.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-2 text-xl font-bold">
                  Insurance Documentation
                </h3>
                <p className="text-slate leading-relaxed">
                  Timestamped photos, moisture maps, itemized damage reports,
                  and scope-of-work estimates formatted for adjusters. We make
                  the claims process smooth.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-2 text-xl font-bold">
                  Content & Belongings Protection
                </h3>
                <p className="text-slate leading-relaxed">
                  We carefully pack out, inventory, and protect your belongings
                  during restoration. Salvageable items are cleaned and stored
                  safely.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-2 text-xl font-bold">
                  Full Structural Rebuild
                </h3>
                <p className="text-slate leading-relaxed">
                  Drywall, flooring, insulation, framing, painting, and trim —
                  we restore your property to pre-loss condition. No
                  subcontractor chains.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Our Process */}
      <Section variant="cream" spacing="lg">
        <Container size="narrow">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Our Restoration Process
          </h2>
          <div className="space-y-8">
            {restorationProcess.map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="bg-oxblood text-cream flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <h3 className="text-charcoal text-xl font-bold">
                      {item.title}
                    </h3>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {item.time}
                    </Badge>
                  </div>
                  <p className="text-slate leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Common Causes */}
      <Section spacing="md">
        <Container size="narrow">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">
            Common Causes of Water Damage
          </h2>
          <div className="prose prose-lg text-slate max-w-none">
            <ul className="ml-4 list-inside list-disc space-y-2">
              <li>
                <strong>Burst or frozen pipes</strong> — Oregon winters put
                older plumbing at risk
              </li>
              <li>
                <strong>Appliance failures</strong> — water heaters, washing
                machines, dishwashers
              </li>
              <li>
                <strong>Roof leaks</strong> — prolonged rain, missing shingles,
                ice dams
              </li>
              <li>
                <strong>Foundation seepage</strong> — poor drainage, high water
                tables in the Valley
              </li>
              <li>
                <strong>Sewage backups</strong> — blocked mains, tree root
                intrusion
              </li>
              <li>
                <strong>Storm flooding</strong> — the Willamette Valley sees
                heavy seasonal rain
              </li>
            </ul>
            <div className="border-oxblood bg-cream/50 not-prose my-8 rounded-r-lg border-l-4 py-4 pr-4 pl-4 italic">
              <p className="text-slate">
                &ldquo;We treat your property with the same care and precision
                we would our own. Water damage is stressful — our job is to take
                that weight off your shoulders and get your home back to
                normal.&rdquo;
              </p>
              <p className="text-muted mt-2 text-sm">— Elric Benson, Owner</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <FAQSection items={faqItems} className="bg-cream" />

      {/* CTA */}
      <Section variant="oxblood" spacing="md">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-cream text-2xl font-bold md:text-3xl">
              Water Damage? We&apos;re Ready Now.
            </h2>
            <p className="text-cream/80 mt-3">
              Licensed, bonded, and insured. {BUSINESS.license}. Full-scope
              restoration from extraction to rebuild.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
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
    </>
  );
}
