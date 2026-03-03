import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client, isConfigured } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { toPlainText } from '@/lib/utils';
import {
  Button,
  Container,
  Section,
  Badge,
  RichHero,
  ResourcesSection,
} from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';

interface Resource {
  title: string;
  url: string;
  description?: string;
  isBacklink?: boolean;
  authority?: string;
}

interface ServicePageData {
  _id: string;
  title: string;
  slug: { current: string };
  metaDescription?: string;
  heroImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  heroVideo?: string;
  resources?: Resource[];
  heroHeadline?: string;
  content?: Record<string, unknown>[];
  serviceArea?: { title: string; slug: { current: string } }[];
  ctaText?: string;
  ctaLink?: string;
  pricingNote?: string;
  faqItems?: {
    _id: string;
    question: string;
    answer: Record<string, unknown>[];
    isActualCustomerQuestion?: boolean;
    source?: string;
  }[];
  relatedServices?: {
    _id: string;
    title: string;
    slug: { current: string };
    heroImage?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  }[];
}

const serviceQuery = `*[_type == "servicePage" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  metaDescription,
  heroImage,
  heroVideo,
  heroHeadline,
  content[]{
    ...,
    _type == "image" => { ..., asset-> }
  },
  serviceArea[]->{ title, slug },
  resources,
  ctaText,
  ctaLink,
  pricingNote,
  faqItems[]->{ _id, question, answer, isActualCustomerQuestion, source },
  relatedServices[]->{ _id, title, slug, heroImage }
}`;

// Helper to format slugs into readable titles if CMS data is missing
function formatSlugToTitle(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('And', '&');
}

export async function generateStaticParams() {
  if (!isConfigured) {
    return [];
  }

  try {
    const slugs = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "servicePage" && defined(slug.current)]{ slug }`,
    );
    return (slugs || []).map((s) => ({ slug: s.slug.current }));
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const service = await client.fetch<ServicePageData | null>(serviceQuery, {
      slug,
    });
    const title = service?.title || formatSlugToTitle(slug);

    return {
      title: title,
      description:
        service?.metaDescription ||
        `${title} services from Benson Home Solutions. Professional, licensed, bonded, and insured Oregon contractor serving the Mid-Willamette Valley. CCB #258533.`,
    };
  } catch {
    const fallbackTitle = formatSlugToTitle(slug);
    return { title: fallbackTitle };
  }
}

import {
  ServiceJsonLd,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
} from '@/components/seo/json-ld';

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let fetchedService: ServicePageData | null = null;

  try {
    fetchedService = await client.fetch<ServicePageData | null>(serviceQuery, {
      slug,
    });
  } catch {
    // Fail silently, fallback data will be used
  }

  const fallbackTitle = formatSlugToTitle(slug);

  const service: ServicePageData = fetchedService || {
    _id: `fallback-${slug}`,
    title: fallbackTitle,
    slug: { current: slug },
    heroHeadline: `Professional ${fallbackTitle} Services`,
    metaDescription: `Expert ${fallbackTitle.toLowerCase()} services by Benson Home Solutions. Licensed, bonded, and insured. We bring over a decade of experience to every project.`,
    pricingNote:
      'We provide transparent, upfront pricing. Contact us for a custom quote based on your specific property needs.',
  };

  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: service.title, url: `${BUSINESS.url}/services/${slug}` },
  ];

  const faqData =
    service.faqItems?.map((f) => ({
      question: f.question,
      answer: toPlainText(f.answer),
    })) || [];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name={service.title}
        description={service.metaDescription || ''}
        url={`${BUSINESS.url}/services/${slug}`}
        image={
          service.heroImage
            ? urlForImage(service.heroImage).width(1200).url()
            : undefined
        }
      />
      {faqData.length > 0 && <FAQPageJsonLd questions={faqData} />}

      {/* Hero */}
      <RichHero
        title={service.heroHeadline || service.title}
        description={service.metaDescription}
        backgroundImage={
          service.heroImage
            ? urlForImage(service.heroImage).width(1600).url()
            : HERO_ASSETS.maintenance
        }
        videoBackground={service.heroVideo}
        badge={service.title}
      >
        <Link href={service.ctaLink || '/contact'}>
          <Button variant="secondary" size="lg">
            {service.ctaText || 'Get a Free Estimate'}
          </Button>
        </Link>
        <a href={`tel:${BUSINESS.phone}`}>
          <Button
            variant="outline"
            size="lg"
            className="text-cream border-cream/20 hover:bg-cream hover:text-oxblood bg-white/10"
          >
            Call {BUSINESS.phone}
          </Button>
        </a>
      </RichHero>

      {/* Content */}
      <Section spacing="md">
        <Container size="narrow">
          {/* AEO/GEO Summary Block - Targeted for AI Retrieval */}
          <div className="border-oxblood not-prose mb-12 rounded-r-2xl border-l-4 bg-slate-50 p-8 shadow-sm">
            <h2 className="text-charcoal mb-6 text-xl font-black tracking-widest uppercase">
              {service.title} at a Glance
            </h2>
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-oxblood mb-1 text-xs font-bold tracking-tighter uppercase">
                  Provider
                </dt>
                <dd className="text-charcoal font-semibold">
                  Benson Home Solutions
                </dd>
              </div>
              <div>
                <dt className="text-oxblood mb-1 text-xs font-bold tracking-tighter uppercase">
                  License
                </dt>
                <dd className="text-charcoal font-semibold">
                  Oregon CCB #258533
                </dd>
              </div>
              <div>
                <dt className="text-oxblood mb-1 text-xs font-bold tracking-tighter uppercase">
                  Service Area
                </dt>
                <dd className="text-charcoal font-semibold">
                  Mid-Willamette Valley & Harney County
                </dd>
              </div>
              <div>
                <dt className="text-oxblood mb-1 text-xs font-bold tracking-tighter uppercase">
                  Emergency Availability
                </dt>
                <dd className="text-charcoal font-semibold">
                  24/7 Rapid Response
                </dd>
              </div>
            </dl>
          </div>

          {service.content && service.content.length > 0 ? (
            <PortableTextRenderer value={service.content} />
          ) : (
            <div className="prose prose-lg text-slate max-w-none">
              <h2 className="text-charcoal mt-10 mb-4 text-2xl font-bold md:text-3xl">
                Reliable {service.title} Solutions
              </h2>
              <p className="mb-4 leading-relaxed">
                When you need high-quality{' '}
                <strong>{service.title.toLowerCase()}</strong>, Benson Home
                Solutions delivers. We follow a strict methodology to ensure
                every detail is handled correctly the first time. As a fully
                licensed and insured contractor (CCB #258533), we provide
                board-ready documentation and guaranteed service levels.
              </p>
              <ul className="mb-8 ml-4 list-inside list-disc space-y-2">
                <li>Prompt, professional communication</li>
                <li>Upfront estimates with no hidden fees</li>
                <li>High-quality materials and craftsmanship</li>
                <li>Fully licensed, bonded, and insured</li>
              </ul>
              <div className="border-oxblood bg-cream/50 my-6 rounded-r-lg border-l-4 py-4 pr-4 pl-4 italic">
                &quot;We treat your property with the same care and precision we
                would our own. Our reputation is built on reliability and doing
                things the right way.&quot;
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Pricing Note */}
      {service.pricingNote && (
        <Section variant="cream" spacing="sm">
          <Container size="narrow">
            <div className="bg-surface border-border rounded-xl border p-6">
              <h3 className="text-charcoal mb-2 text-lg font-semibold">
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
            <h2 className="text-charcoal mb-8 text-2xl font-bold md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {service.faqItems.map((faq) => (
                <div
                  key={faq._id}
                  className="border-oxblood/10 border-b pb-6 last:border-0"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-charcoal text-lg font-bold">
                      {faq.question}
                    </h3>
                    {faq.isActualCustomerQuestion && (
                      <Badge
                        variant="secondary"
                        className="bg-oxblood/5 text-oxblood border-oxblood/10 text-[10px] font-bold uppercase"
                      >
                        Actual Customer Question
                      </Badge>
                    )}
                  </div>
                  <div className="text-slate leading-relaxed">
                    <PortableTextRenderer value={faq.answer} />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Authoritative Resources */}
      {service.resources && <ResourcesSection resources={service.resources} />}

      {/* CTA */}
      <Section variant="oxblood" spacing="md">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-cream text-2xl font-bold md:text-3xl">
              Ready for {service.title}?
            </h2>
            <p className="text-cream/80 mt-3">
              Get a free, no-obligation estimate from our licensed team.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
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
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">
              Related Services
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {service.relatedServices.map((related) => (
                <Link
                  key={related._id}
                  href={`/services/${related.slug.current}`}
                  className="group"
                >
                  <div className="bg-surface shadow-card hover:shadow-elevated overflow-hidden rounded-xl transition-shadow">
                    {related.heroImage && (
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
                      <h3 className="text-charcoal group-hover:text-oxblood font-semibold transition-colors">
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
