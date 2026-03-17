import { Metadata } from 'next';
import { Section, Container, Badge, Button } from '@/components/ui';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Project Gallery | Benson Home Solutions',
  description:
    'Explore our portfolio of professional maintenance and restoration projects in Oregon. From residential remodels to commercial facility care.',
};

export default async function ProjectsPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Projects', url: `${BUSINESS.url}/projects` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Our Work
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl">
              Professional Trade Portfolio
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Every project we undertake is documented with forensic precision.
              Explore our recent work across residential, commercial, and
              institutional properties in Oregon.
            </p>
          </div>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section spacing="lg">
        <Container>
          <div className="bg-slate/5 border-slate/20 rounded-2xl border border-dashed p-20 text-center">
            <h2 className="text-charcoal mb-4 text-2xl font-bold opacity-50">
              Recent Projects & Site Audits
            </h2>
            <p className="text-slate mx-auto max-w-lg opacity-40">
              We are currently documenting our 2026 site audits and
              reconstruction projects. For a physical walkthrough of our
              completed work in your area, please contact our trade desk.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a href={`tel:${BUSINESS.phone}`}>
                <Button variant="outline" size="lg">
                  Call Trade Desk: {BUSINESS.phone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust CTA */}
      <Section variant="charcoal" spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream mb-6 text-3xl font-bold">
            Ready to Start Your Project?
          </h2>
          <p className="text-cream/70 mb-10 text-lg leading-relaxed">
            Whether it&apos;s a planned remodel or an emergency restoration, we
            provide the professional oversight you need to get the job done
            right.
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
                Inquire Online
              </Badge>
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
