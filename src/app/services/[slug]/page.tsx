import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { Button, Container, Section, Badge } from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS } from '@/lib/constants';

interface ServicePageData {
  _id: string;
  title: string;
  slug: { current: string };
  metaDescription?: string;
  heroImage?: unknown;
  heroHeadline?: string;
  content?: unknown[];
  serviceArea?: { title: string; slug: { current: string } }[];
  ctaText?: string;
  ctaLink?: string;
  pricingNote?: string;
  faqItems?: { _id: string; question: string; answer: string }[];
  relatedServices?: { _id: string; title: string; slug: { current: string }; heroImage?: unknown }[];
}

const serviceQuery = `*[_type == "servicePage" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  metaDescription,
  heroImage,
  heroHeadline,
  content[]{
    ...,
    _type == "image" => { ..., asset-> }
  },
  serviceArea[]->{ title, slug },
  ctaText,
  ctaLink,
  pricingNote,
  faqItems[]->{ _id, question, answer },
  relatedServices[]->{ _id, title, slug, heroImage }
}`;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "servicePage" && defined(slug.current)]{ slug }`
    );
    return slugs.map((s) => ({ slug: s.slug.current }));
  } catch (error) {
    console.warn('Failed to fetch slugs from Sanity for static generation:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await client.fetch<ServicePageData | null>(serviceQuery, { slug });
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await client.fetch<ServicePageData | null>(serviceQuery, { slug });

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
                {service.serviceArea.map((area) => (
                  <Badge key={area.slug.current} variant="secondary">
                    {area.title}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Hero Image */}
      {service.heroImage && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={urlForImage(service.heroImage).width(1600).height(600).url()}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      {service.content && service.content.length > 0 && (
        <Section spacing="md">
          <Container size="narrow">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <PortableTextRenderer value={service.content as any} />
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

      {/* FAQ */}
      {service.faqItems && service.faqItems.length > 0 && (
        <Section spacing="md">
          <Container size="narrow">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {service.faqItems.map((faq) => (
                <div key={faq._id}>
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

      {/* Related Services */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <Section spacing="md">
          <Container>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.relatedServices.map((related) => (
                <Link
                  key={related._id}
                  href={`/services/${related.slug.current}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden bg-surface shadow-card hover:shadow-elevated transition-shadow">
                    {!!related.heroImage && (
                      <div className="relative h-40">
                        <Image
                          src={urlForImage(related.heroImage)
                            .width(400)
                            .height(200)
                            .url()}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-charcoal group-hover:text-oxblood transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
