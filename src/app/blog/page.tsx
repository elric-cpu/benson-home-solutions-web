import { Metadata } from 'next';
import { Section, Container, Badge, Button } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Insights & Resources | Benson Home Solutions Blog',
  description:
    'Expert advice on property maintenance, restoration, and homeownership costs from Oregon trade professionals.',
};

export default async function BlogPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Blog', url: `${BUSINESS.url}/blog` },
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
              Property Intelligence Blog
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              We share forensic insights on building science, maintenance ROI,
              and restoration methodology to help Oregon property owners make
              informed decisions.
            </p>
          </div>
        </Container>
      </Section>

      {/* Posts Grid */}
      <Section spacing="lg">
        <Container>
          <div className="border-slate/10 bg-slate/5 rounded-3xl border-2 border-dashed p-20 text-center">
            <h2 className="text-charcoal mb-2 text-2xl font-bold opacity-40">
              Insights Loading
            </h2>
            <p className="text-slate opacity-40">
              We are currently drafting our first few forensic trade guides.
              Check back soon.
            </p>
          </div>
        </Container>
      </Section>

      {/* Newsletter / CTA */}
      <Section variant="oxblood" spacing="md">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream mb-6 text-3xl font-bold">Stay Informed</h2>
          <p className="text-cream/70 mb-10 text-lg">
            Get monthly maintenance alerts and property intelligence reports
            delivered to your inbox. No fluff, just trade facts.
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-xl border-white/20 bg-white/10 px-6 py-4 text-white outline-none focus:bg-white/20"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
