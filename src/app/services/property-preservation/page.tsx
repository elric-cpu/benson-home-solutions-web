import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Section,
  Container,
  Badge,
  Button,
  Card,
  CardContent,
} from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FAQPageJsonLd,
} from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Property Preservation & Asset Oversight | Forensic Field Services',
  description:
    'Forensic oversight for vacant and institutional assets in Oregon. Condition assessments, winterization, hazard mitigation, and utility coordination. Licensed CCB #258533.',
};

const faqItems = [
  {
    question: 'What is property preservation?',
    answer:
      'Property preservation involves the systematic oversight and maintenance of vacant or institutional properties to prevent deterioration, maintain compliance, and protect asset value. We provide the physical presence needed to identify risks early.',
  },
  {
    question: 'Do you provide winterization services?',
    answer:
      'Yes. We perform both dry and wet winterization methods, including draining lines, adding antifreeze to traps, and securing building envelopes against Oregon’s freeze-thaw cycles.',
  },
  {
    question: 'How often do you perform condition assessments?',
    answer:
      'We offer recurring property checks on a weekly, bi-weekly, or monthly basis. Each assessment includes a forensic photo log and a prioritized list of any identified hazards or maintenance needs.',
  },
  {
    question: 'Do you handle utility verification and coordination?',
    answer:
      'Absolutely. We coordinate with local utility providers to verify active services, manage bill-to-owner transitions, and ensure critical systems (like heat and sump pumps) remain operational.',
  },
];

export default function PropertyPreservationPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    {
      name: 'Property Preservation',
      url: `${BUSINESS.url}/services/property-preservation`,
    },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Property Preservation & Asset Oversight"
        description="Forensic field services for vacant and institutional assets including condition assessments, winterization, and hazard mitigation."
        url={`${BUSINESS.url}/services/property-preservation`}
      />
      <FAQPageJsonLd questions={faqItems} />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Asset Protection Specialists
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Property Preservation & Oversight
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Vacant properties are high-risk assets. We provide the forensic
              trade oversight and physical presence required to prevent
              avoidable deterioration and maintain board-ready compliance for
              institutional owners.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request Preservation Audit</Button>
              </Link>
              <a href={`tel:${BUSINESS.phone}`}>
                <Button variant="outline" size="lg">
                  Call Office: {BUSINESS.phone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Competencies */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Condition Assessments
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Regular, documented walkthroughs. We identify roof failures,
                  seal breaches, and security risks before they escalate into
                  major losses.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Seasonal Winterization
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Professional line clearing and envelope securement. We protect
                  your plumbing and structural systems from Oregon&apos;s harsh
                  winter elements.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Hazard Mitigation
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Immediate stabilization of life-safety issues, from emergency
                  board-ups to debris removal and mold screening.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Field Service Standards */}
      <Section variant="cream" spacing="lg">
        <Container size="narrow">
          <div className="mb-12 text-center">
            <h2 className="text-charcoal text-3xl font-black tracking-tight uppercase">
              The Forensic Field Report
            </h2>
            <p className="text-slate mt-4">
              High-fidelity data for institutional asset management.
            </p>
          </div>
          <div className="prose prose-lg text-slate max-w-none">
            <p>
              Our <strong>Preservation Program</strong> is built on the same
              forensic standards as our restoration work. We provide:
            </p>
            <ul className="ml-4 list-inside list-disc space-y-2">
              <li>
                High-resolution photo documentation of every inspection point.
              </li>
              <li>Occupancy verification and legal notice posting.</li>
              <li>Detailed maintenance bid walks for deferred repairs.</li>
              <li>
                Utility monitoring to ensure HVAC and sump systems remain
                active.
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="lg">
        <Container size="narrow">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
            Property Preservation FAQ
          </h2>
          <div className="space-y-6">
            {faqItems.map((faq, i) => (
              <div
                key={i}
                className="bg-surface border-border rounded-xl border p-6 shadow-sm"
              >
                <h3 className="text-charcoal text-lg font-semibold">
                  {faq.question}
                </h3>
                <p className="text-slate mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="charcoal" spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream mb-6 text-3xl font-bold">
            Secure Your Institutional Assets
          </h2>
          <p className="text-cream/70 mb-10 text-lg leading-relaxed">
            Need a reliable trade desk to oversee your Oregon property
            portfolio? Contact us to discuss our preservation and assessment
            service levels.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Inquire About Preservation
            </Button>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
