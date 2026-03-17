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
  title: 'Kitchen Remodeling & Reconstruction | Benson Home Solutions',
  description:
    'Professional kitchen remodeling and structural reconstruction in the Mid-Willamette Valley. We provide the trade precision required for a high-fidelity structural finish. Licensed CCB #258533.',
};

const faqItems = [
  {
    question: 'How long does a typical kitchen remodel take?',
    answer:
      'The timeline for a kitchen remodel can vary significantly based on the scope. A minor refresh might take 2-4 weeks, while a full structural reconstruction with layout changes could take 8-12 weeks or more. We provide a detailed project schedule during our consultation.',
  },
  {
    question: 'What is the average cost of a kitchen remodel?',
    answer:
      'Kitchen remodeling costs in the Mid-Willamette Valley typically range from $25,000 to $45,000 for a comprehensive project, but can go higher for high-end finishes or extensive structural changes. We provide transparent, itemized estimates.',
  },
  {
    question: 'Do you handle permits and inspections?',
    answer:
      'Yes, Benson Home Solutions manages all necessary permits and coordinates with local building inspectors. Our team ensures all work meets current building codes and safety standards.',
  },
  {
    question: 'Can you help with kitchen design?',
    answer:
      'While we are primarily a construction company, we work closely with trusted local designers and architects. We can integrate seamlessly with your chosen design professionals or recommend partners who align with your vision.',
  },
  {
    question: 'What kind of warranty do you offer?',
    answer:
      'We stand behind our work with a comprehensive warranty on all craftsmanship. Specific details are outlined in your project contract, ensuring your peace of mind long after completion.',
  },
];

export default function KitchenRemodelingPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    {
      name: 'Kitchen Remodeling',
      url: `${BUSINESS.url}/services/kitchen-remodeling`,
    },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Kitchen Remodeling"
        description="High-fidelity kitchen remodeling and structural reconstruction focused on building envelope integrity and trade precision."
        url={`${BUSINESS.url}/services/kitchen-remodeling`}
      />
      <FAQPageJsonLd questions={faqItems} />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Structural Reconstruction
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Precision Kitchen Remodeling
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              A kitchen is more than a showroom—it is a high-utility environment
              that requires absolute structural integrity. We provide the trade
              precision needed to handle everything from layout reconstruction
              to professional finishing.
            </p>
            <p className="text-slate mt-2 text-lg font-medium">
              Typical projects: $25,000 - $45,000
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request Design Consultation</Button>
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

      {/* Focus Areas */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Layout Reconstruction
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We specialize in moving structural walls and re-routing
                  utility lines to optimize your workflow. No
                  &quot;surface-level&quot; patches—just sound engineering.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Material Precision
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  From quartz surfacing to custom millwork, we use materials
                  that withstand the test of time and high-moisture
                  environments.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Utility Integration
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Electrical and plumbing re-routes handled with trade
                  precision. We ensure your high-end appliances have the
                  dedicated infrastructure they require.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Before/After Gallery */}
      <Section spacing="lg" variant="cream">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-charcoal text-3xl font-bold md:text-4xl">
              Kitchen Before & After
            </h2>
            <p className="text-slate mt-4 text-lg">
              Transforming outdated spaces into forensic-grade, high-fidelity
              living environments.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="bg-charcoal/5 border-slate/20 relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-dashed">
                <div className="text-center">
                  <span className="text-oxblood block text-sm font-black tracking-widest uppercase opacity-40">
                    Before
                  </span>
                  <p className="text-slate mt-2 text-xs italic opacity-50">
                    Outdated Finishes • Moisture Risk
                  </p>
                </div>
              </div>
              <div className="bg-oxblood/5 border-oxblood/20 relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-dashed">
                <div className="text-center">
                  <span className="text-oxblood block text-sm font-black tracking-widest uppercase">
                    After
                  </span>
                  <p className="text-slate mt-2 text-xs italic opacity-50">
                    High-Fidelity Finish • Forensic Seal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="lg" variant="cream">
        <Container size="narrow">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((faq, i) => (
              <div
                key={i}
                className="bg-surface border-border rounded-xl border p-6"
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

      {/* The Benson Standard */}
      <Section variant="charcoal" spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream mb-6 text-3xl font-bold">
            The Reconstruction Standard
          </h2>
          <p className="text-cream/70 mb-10 text-lg leading-relaxed">
            We don&apos;t just install cabinets. We ensure the floor is level,
            the framing is plumb, and the building envelope is secure. That is
            the Benson Standard of precision.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Start Your Project
            </Button>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
