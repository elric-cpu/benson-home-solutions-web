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
import { BreadcrumbJsonLd, ServiceJsonLd, FAQPageJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Bathroom Remodeling & Structural Finish | Benson Home Solutions',
  description:
    'High-fidelity bathroom remodeling in Oregon. We handle full-scope reconstruction, waterproofing, and high-end finishing. Licensed CCB #258533.',
};

const faqItems = [
  {
    question: 'How long does a bathroom remodel typically take?',
    answer:
      'Most standard bathroom remodels take between 3 to 6 weeks, depending on the complexity and scope of work. Projects involving structural changes or custom features may take longer. We provide a detailed timeline during the planning phase.',
  },
  {
    question: 'What is the average cost of a bathroom remodel?',
    answer:
      'For a comprehensive bathroom remodel in the Mid-Willamette Valley, costs typically range from $15,000 to $30,000. Factors like fixture selection, tile work, and structural modifications influence the final price. We offer transparent, itemized quotes.',
  },
  {
    question: 'Do you offer design services?',
    answer:
      'While we specialize in construction and remodeling, we can collaborate with your preferred interior designer or recommend local design partners to help bring your vision to life.',
  },
  {
    question: 'How do you ensure waterproofing and prevent leaks?',
    answer:
      'Our approach to waterproofing is forensic. We use advanced, multi-layer membrane systems and strict installation protocols to create a completely sealed wet-area enclosure, protecting your home from moisture intrusion for decades.',
  },
  {
    question: 'What kind of warranty do you provide?',
    answer:
      'Benson Home Solutions offers a robust warranty on all our remodeling work, covering both materials and labor. Specific warranty details are provided in your contract, ensuring your investment is protected.',
  },
];

export default function BathroomRemodelingPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    {
      name: 'Bathroom Remodeling',
      url: `${BUSINESS.url}/services/bathroom-remodeling`,
    },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Bathroom Remodeling"
        description="Full-scope bathroom reconstruction focused on forensic waterproofing and professional trade finishing."
        url={`${BUSINESS.url}/services/bathroom-remodeling`}
      />
      <FAQPageJsonLd questions={faqItems} />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Trade Precision
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              High-Fidelity Bathroom Reconstruction
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Bathrooms are the highest-risk environments in any building. We
              provide the expert oversight needed to ensure forensic-level
              waterproofing combined with a premium structural finish.
            </p>
            <p className="text-slate mt-2 text-lg font-medium">
              Typical projects: $15,000 - $30,000
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request Assessment</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Forensic Waterproofing
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We use advanced membrane systems to ensure your building
                  envelope is protected from the inside out. No shortcuts on
                  moisture barriers.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Layout Optimization
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Maximize your square footage with sound structural re-routing.
                  We handle complex plumbing and electrical moves with trade
                  precision.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Premium Finishing
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  The difference is in the details. Plumb walls, level floors,
                  and flawless tile alignment define the Benson Standard of
                  work.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Before/After Placeholder */}
      <Section spacing="lg" variant="cream">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-charcoal text-3xl font-bold md:text-4xl">
              Bathroom Before & After
            </h2>
            <p className="text-slate mt-4 text-lg">
              (Placeholder for a dynamic image gallery showcasing past bathroom
              remodeling projects. Images will be pulled from Sanity CMS.)
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200 text-gray-500">
                Before Image Placeholder
              </div>
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200 text-gray-500">
                After Image Placeholder
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
    </main>
  );
}
