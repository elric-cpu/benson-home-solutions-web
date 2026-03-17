import { Metadata } from 'next';
import { Section, Container, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Benson Home Solutions',
  description:
    'Common questions about our maintenance subscriptions, water damage restoration, and remodeling services in Oregon.',
};

export default async function FAQPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'FAQ', url: `${BUSINESS.url}/faq` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Resources
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Knowledge Base & FAQ
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Transparent answers to common trade questions. We believe informed
              property owners make better long-term decisions for their
              investments.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ Content */}
      <Section spacing="lg">
        <Container size="narrow">
          <div className="bg-slate/5 border-slate/10 rounded-3xl border-2 border-dashed p-20 text-center">
            <h2 className="text-charcoal mb-2 text-2xl font-bold opacity-40">
              Knowledge Base Loading
            </h2>
            <p className="text-slate opacity-40">
              We are currently indexing common questions from our recent
              projects.
            </p>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="charcoal" spacing="md">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream mb-6 text-3xl font-bold">
            Still Have Questions?
          </h2>
          <p className="text-cream/70 mb-10 text-lg">
            Our trade professionals are ready to provide the specific technical
            answers you need for your property.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href={`tel:${BUSINESS.phone}`}>
              <Badge
                variant="secondary"
                className="hover:bg-cream hover:text-oxblood cursor-pointer px-8 py-3 text-lg transition-colors"
              >
                Call {BUSINESS.phone}
              </Badge>
            </a>
            <a href="/contact">
              <Badge
                variant="secondary"
                className="text-cream border-cream hover:bg-cream hover:text-oxblood cursor-pointer px-8 py-3 text-lg transition-colors"
              >
                Message Trade Desk
              </Badge>
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
