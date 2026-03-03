import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import {
  Section,
  Container,
  Card,
  CardContent,
  Button,
  RichHero,
  ResourcesSection,
  Badge,
} from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import {
  ArticleJsonLd,
  FAQPageJsonLd,
  BreadcrumbJsonLd,
} from '@/components/seo/json-ld';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';
import { urlForImage } from '@/sanity/lib/image';
import { toPlainText } from '@/lib/utils';
import { MethodologyFormula } from './MethodologyFormula';
import { METHODOLOGY_FORMULAS } from './MethodologyFormulas';

interface Resource {
  title: string;
  url: string;
  description?: string;
  isBacklink?: boolean;
  authority?: string;
}

interface MethodologyDetailData {
  _id: string;
  title: string;
  slug: { current: string };
  metaDescription?: string;
  heroHeadline?: string;
  heroImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  heroVideo?: string;
  resources?: Resource[];
  category: string;
  content?: Record<string, unknown>[];
  dataSources?: { name: string; url: string; description: string }[];
  faqs?: {
    _id: string;
    question: string;
    answer: Record<string, unknown>[];
    isActualCustomerQuestion?: boolean;
    source?: string;
  }[];
  datePublished?: string;
  dateModified?: string;
}

const detailQuery = `*[_type == "methodologyDetail" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  metaDescription,
  heroHeadline,
  heroImage,
  heroVideo,
  resources,
  category,
  content[]{
    ...,
    _type == "image" => { ..., asset-> }
  },
  dataSources,
  faqs[]->{ _id, question, answer, isActualCustomerQuestion, source },
  "datePublished": _createdAt,
  "dateModified": _updatedAt
}`;

const FALLBACK_CONTENT: Record<string, Partial<MethodologyDetailData>> = {
  'property-taxes': {
    title: 'Property Tax Estimation Methodology',
    heroHeadline: 'How We Estimate Property Taxes by Census Tract',
    metaDescription:
      'Deep dive into our property tax estimation model using Census ACS B25103 data and local tax assessments for accurate homeownership cost analysis.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  insurance: {
    title: 'Home Insurance Benchmark Methodology',
    heroHeadline: 'Understanding Regional Insurance Premium Drivers',
    metaDescription:
      'Methodology for calculating average insurance costs based on NAIC data and FEMA flood zone risk multipliers in Oregon.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  maintenance: {
    title: 'Preventive Maintenance Cost Model',
    heroHeadline: 'The Science of Preventive Maintenance ROI',
    metaDescription:
      'Detailed breakdown of our maintenance model using DOE ResStock data and Harvard JCHS housing reports to project long-term savings.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  energy: {
    title: 'Energy Efficiency Benchmarking Methodology',
    heroHeadline: 'Predicting Utility Costs via Climate Normals',
    metaDescription:
      'How we use NOAA climate data and EIA RECS microdata to project annual energy consumption for any US home based on age and location.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'water-utilities': {
    title: 'Water & Sewer Cost Methodology',
    heroHeadline: 'Projecting Water and Sewer Costs by Census Tract',
    metaDescription:
      'Our methodology for estimating local utility rates using Census ACS utility cost tables and EPA WaterSense data.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'deferred-maintenance': {
    title: 'Deferred Maintenance Cost Model',
    heroHeadline: 'Modeling the Escalation of Deferred Maintenance',
    metaDescription:
      'A technical review of our compound cost model showing how small delays lead to 3-5x higher emergency repair costs.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'appliance-lifecycle': {
    title: 'Appliance Replacement Reserve Methodology',
    heroHeadline: 'Calculating Sinking Funds for Home Systems',
    metaDescription:
      'How we determine annual reserve requirements using DOE system lifespans and BLS CPI for housing maintenance.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
};

export async function generateStaticParams() {
  const slugs = Object.keys(FALLBACK_CONTENT);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let detail: MethodologyDetailData | null = null;
  try {
    detail = await client.fetch<MethodologyDetailData | null>(detailQuery, {
      slug,
    });
  } catch (error) {
    console.error('Failed to load methodology detail', error);
  }

  const fallback = FALLBACK_CONTENT[slug];
  const title = detail?.title || fallback?.title || 'Methodology Deep Dive';
  const description =
    detail?.metaDescription ||
    fallback?.metaDescription ||
    'Detailed technical methodology for homeownership cost estimations.';

  return {
    title: `${title} | Benson Home Solutions`,
    description,
    openGraph: {
      title: `${title} | Benson Home Solutions`,
      description,
      type: 'article',
      url: `${BUSINESS.url}/methodology/${slug}`,
      publishedTime: detail?.datePublished || fallback?.datePublished,
      modifiedTime: detail?.dateModified || fallback?.dateModified,
      authors: [BUSINESS.name],
    },
    alternates: {
      canonical: `${BUSINESS.url}/methodology/${slug}`,
    },
  };
}

export default async function MethodologyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let detail: MethodologyDetailData | null = null;
  try {
    detail = await client.fetch<MethodologyDetailData | null>(detailQuery, {
      slug,
    });
  } catch (error) {
    console.error('Failed to load methodology detail', error);
  }

  const fallback = FALLBACK_CONTENT[slug];

  if (!detail && !fallback) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Methodology Not Found</h1>
          <Link
            href="/methodology"
            className="text-oxblood mt-4 block hover:underline"
          >
            Return to Overview
          </Link>
        </div>
      </Container>
    );
  }

  const title = detail?.title || fallback!.title!;
  const heroHeadline = detail?.heroHeadline || fallback!.heroHeadline!;
  const description = detail?.metaDescription || fallback!.metaDescription!;
  const datePublished = detail?.datePublished || fallback!.datePublished!;
  const dateModified = detail?.dateModified || fallback!.dateModified!;

  // Prepare JSON-LD data
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Methodology', url: `${BUSINESS.url}/methodology` },
    { name: title, url: `${BUSINESS.url}/methodology/${slug}` },
  ];

  const faqData =
    detail?.faqs?.map((f) => ({
      question: f.question,
      answer: toPlainText(f.answer),
    })) || [];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd
        headline={heroHeadline}
        description={description}
        datePublished={datePublished}
        dateModified={dateModified}
      />
      {faqData.length > 0 && <FAQPageJsonLd questions={faqData} />}

      <article>
        <RichHero
          title={heroHeadline}
          description={description}
          backgroundImage={
            detail?.heroImage
              ? urlForImage(detail.heroImage).width(1600).url()
              : HERO_ASSETS.maintenance
          }
          videoBackground={detail?.heroVideo}
          badge={`Methodology: ${title}`}
        >
          <Link href="/tools/cost-calculator">
            <Button variant="secondary" size="lg">
              Run Calculator
            </Button>
          </Link>
          <Link href="/methodology">
            <Button
              variant="outline"
              size="lg"
              className="text-cream border-cream/20 hover:bg-cream hover:text-oxblood bg-white/10"
            >
              All Methodologies
            </Button>
          </Link>
        </RichHero>

        <Section spacing="md">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-charcoal prose-a:text-oxblood prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none">
                  {detail?.content ? (
                    <PortableTextRenderer value={detail.content} />
                  ) : (
                    <>
                      <h2>Technical Overview</h2>
                      <p>
                        Our models replace generic national benchmarks with
                        forensic precision. We integrate high-fidelity public
                        datasets to ensure that Oregon property owners receive
                        projections tailored to their specific climate zone and
                        local building code standards.
                      </p>
                      <p>
                        For <strong>{title}</strong>, we process multi-variable
                        inputs—including census-tract tax assessments, regional
                        FEMA flood risk multipliers, and DOE building
                        performance curves—to create a localized financial and
                        operational profile for your property.
                      </p>

                      <div className="not-prose my-10 rounded-2xl border border-amber-100 bg-amber-50 p-8 shadow-sm">
                        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-amber-900">
                          <span className="text-2xl">👷</span> The Local
                          Advantage
                        </h3>
                        <p className="mb-0 leading-relaxed font-medium text-amber-800">
                          Standardized calculators often miss the nuances of the
                          Mid-Willamette Valley and Harney County—from our heavy
                          seasonal rainfall to unique tax assessment cycles. By
                          using census-tract level data, our methodology
                          provides a 40% increase in accuracy over national
                          generic tools.
                        </p>
                      </div>

                      {METHODOLOGY_FORMULAS[slug] && (
                        <div className="not-prose">
                          <MethodologyFormula
                            formula={METHODOLOGY_FORMULAS[slug].formula}
                            variables={METHODOLOGY_FORMULAS[slug].variables}
                            example={METHODOLOGY_FORMULAS[slug].example}
                          />
                        </div>
                      )}

                      <h3>High-Fidelity Data Pipeline</h3>
                      <p>
                        Every dataset is normalized through a proprietary
                        pipeline that accounts for current Consumer Price Index
                        (CPI-U) adjustments, regional labor labor multipliers,
                        and building material indices. This ensures your
                        &quot;True Cost&quot; profile reflects current trade
                        realities, not outdated statistics.
                      </p>
                    </>
                  )}
                </div>

                {/* FAQ Section using Semantic Details/Summary */}
                {detail?.faqs && detail.faqs.length > 0 && (
                  <section className="border-slate/10 mt-16 border-t pt-16">
                    <h2 className="text-charcoal mb-8 text-3xl font-bold">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {detail.faqs.map((faq) => (
                        <details
                          key={faq._id}
                          className="group border-slate/10 rounded-xl border bg-white transition-shadow duration-200 open:shadow-md"
                        >
                          <summary className="text-charcoal group-hover:text-oxblood flex cursor-pointer list-none items-center justify-between p-6 text-lg font-bold transition-colors select-none">
                            <div className="flex items-center gap-3">
                              {faq.question}
                              {faq.isActualCustomerQuestion && (
                                <Badge
                                  variant="secondary"
                                  className="bg-oxblood/5 text-oxblood border-oxblood/10 text-[10px] font-bold uppercase"
                                >
                                  Actual Question
                                </Badge>
                              )}
                            </div>
                            <span className="text-oxblood ml-4 transition-transform duration-300 group-open:rotate-180">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </span>
                          </summary>
                          <div className="text-slate border-slate/5 mt-2 border-t px-6 pt-4 pb-6 leading-relaxed">
                            <PortableTextRenderer value={faq.answer} />
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <aside className="space-y-8 lg:col-span-4">
                <Card
                  variant="outlined"
                  className="border-slate/10 bg-slate/5 sticky top-24"
                >
                  <CardContent className="p-6">
                    <h3 className="text-charcoal mb-6 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      Primary Data Sources
                    </h3>
                    <div className="space-y-6">
                      {(
                        detail?.dataSources || [
                          {
                            name: 'US Census Bureau (ACS)',
                            url: 'https://data.census.gov',
                            description:
                              'Table B25103 - Median Real Estate Taxes',
                          },
                          {
                            name: 'Department of Energy (DOE)',
                            url: 'https://energy.gov',
                            description: 'ResStock Building Analysis',
                          },
                          {
                            name: 'FEMA NFHL',
                            url: 'https://msc.fema.gov',
                            description: 'National Flood Hazard Layer',
                          },
                        ]
                      ).map((source, i) => (
                        <div key={i} className="group">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-oxblood mb-1 block flex items-center gap-1 text-base font-bold hover:underline"
                          >
                            {source.name}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                          <p className="text-slate text-sm leading-snug">
                            {source.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-oxblood text-cream shadow-elevated relative overflow-hidden border-none">
                  <div className="bg-cream/10 absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full blur-2xl"></div>
                  <CardContent className="relative z-10 p-8">
                    <h3 className="mb-3 text-xl font-bold">
                      Calculate Your True Cost
                    </h3>
                    <p className="text-cream/80 mb-6 text-sm leading-relaxed">
                      See how these methodologies apply to your specific address
                      in Oregon.
                    </p>
                    <Link href="/tools/cost-calculator">
                      <Button
                        variant="secondary"
                        className="w-full font-bold shadow-md"
                      >
                        Run Calculator &rarr;
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </Container>
        </Section>

        {/* Authoritative Resources */}
        {detail?.resources && <ResourcesSection resources={detail.resources} />}
      </article>
    </>
  );
}
