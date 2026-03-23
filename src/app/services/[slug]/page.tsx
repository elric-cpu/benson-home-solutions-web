import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { Button, Container, Section, Badge } from '@/components/ui';
import { SERVICES_DATA } from '@/lib/services-data';

import { BUSINESS } from '@/lib/constants';

interface Service {
  title: string;
  slug: string;
  metaDescription: string;
  heroHeadline: string;
  content: any[];
  serviceArea?: { title: string; slug: { current: string } }[];
  pricingNote?: string;
  ctaText?: string;
  ctaLink?: string;
}





export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const service: Service = SERVICES_DATA[slug];
  if (!service) return {};
  return {
    title: service.title,
    description:
      service.metaDescription ||
      `${service.title} — professional service from Benson Home Solutions. Licensed Oregon contractor CCB #258533.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const service: Service = SERVICES_DATA[slug];

  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/services"
              className="text-sm font-medium text-oxblood hover:text-oxblood/80 transition-colors mb-4 inline-block"
            >
              &larr; All Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-oxblood leading-tight">
              {service.heroHeadline || service.title}
            </h1>
            {service.metaDescription && (
              <p className="mt-4 text-lg text-slate leading-relaxed">
                {service.metaDescription}
              </p>
            )}
            {service.serviceArea && service.serviceArea.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {service.serviceArea.map((area: { title: string; slug: { current: string } }) => (
                  <Badge key={area.slug.current} variant="secondary">
                    {area.title}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>



      {/* Content */}
      {service.content && service.content.length > 0 && (
        <Section spacing="md">
          <Container size="narrow">
            {
              service.content.map((block: any, index: number) => {
                if (block.style === 'h2') {
                  return <h2 key={index} className="text-2xl md:text-3xl font-bold text-charcoal mt-10 mb-4">{block.children.map((child: any) => child.text).join('')}</h2>
                }
                return <p key={index} className="text-slate leading-relaxed mb-4">{block.children.map((child: any) => child.text).join('')}</p>
              })
            }
          </Container>
        </Section>
      )}

      {/* Pricing Note */}
      {service.pricingNote && (
        <Section variant="cream" spacing="sm">
          <Container size="narrow">
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-charcoal mb-2">
                Pricing
              </h3>
              <p className="text-slate leading-relaxed">
                {service.pricingNote}
              </p>
            </div>
          </Container>
        </Section>
      )}



      {/* CTA */}
      <Section variant="oxblood" spacing="md">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-cream">
              Ready for {service.title}?
            </h2>
            <p className="mt-3 text-cream/80">
              Get a free, no-obligation estimate from our licensed team.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link href={service.ctaLink || '/contact'}>
                <Button variant="secondary" size="lg">
                  {service.ctaText || 'Get a Free Estimate'}
                </Button>
              </Link>
              <a href={`tel:${BUSINESS.phone}`}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-cream hover:text-cream hover:bg-cream/10"
                >
                  Call {BUSINESS.phone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>


    </>
  );
}
