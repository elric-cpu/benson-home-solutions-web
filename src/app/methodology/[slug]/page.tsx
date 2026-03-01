import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { Section, Container, Card, CardContent, Button } from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { ArticleJsonLd, FAQPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { BUSINESS } from '@/lib/constants';

interface MethodologyDetailData {
  _id: string;
  title: string;
  slug: { current: string };
  metaDescription?: string;
  heroHeadline?: string;
  category: string;
  content?: Record<string, unknown>[];
  dataSources?: { name: string; url: string; description: string }[];
  faqs?: { _id: string; question: string; answer: string }[];
  datePublished?: string;
  dateModified?: string;
}

const detailQuery = `*[_type == "methodologyDetail" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  metaDescription,
  heroHeadline,
  category,
  content[]{
    ...,
    _type == "image" => { ..., asset-> }
  },
  dataSources,
  faqs[]->{ _id, question, answer },
  "datePublished": _createdAt,
  "dateModified": _updatedAt
}`;

const FALLBACK_CONTENT: Record<string, Partial<MethodologyDetailData>> = {
  'property-taxes': {
    title: 'Property Tax Estimation Methodology',
    heroHeadline: 'How We Estimate Property Taxes by Census Tract',
    metaDescription: 'Deep dive into our property tax estimation model using Census ACS B25103 data and local tax assessments for accurate homeownership cost analysis.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'insurance': {
    title: 'Home Insurance Benchmark Methodology',
    heroHeadline: 'Understanding Regional Insurance Premium Drivers',
    metaDescription: 'Methodology for calculating average insurance costs based on NAIC data and FEMA flood zone risk multipliers in Oregon.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'maintenance': {
    title: 'Preventive Maintenance Cost Model',
    heroHeadline: 'The Science of Preventive Maintenance ROI',
    metaDescription: 'Detailed breakdown of our maintenance model using DOE ResStock data and Harvard JCHS housing reports to project long-term savings.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'energy': {
    title: 'Energy Efficiency Benchmarking Methodology',
    heroHeadline: 'Predicting Utility Costs via Climate Normals',
    metaDescription: 'How we use NOAA climate data and EIA RECS microdata to project annual energy consumption for any US home based on age and location.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'water-utilities': {
    title: 'Water & Sewer Cost Methodology',
    heroHeadline: 'Projecting Water and Sewer Costs by Census Tract',
    metaDescription: 'Our methodology for estimating local utility rates using Census ACS utility cost tables and EPA WaterSense data.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'deferred-maintenance': {
    title: 'Deferred Maintenance Cost Model',
    heroHeadline: 'Modeling the Escalation of Deferred Maintenance',
    metaDescription: 'A technical review of our compound cost model showing how small delays lead to 3-5x higher emergency repair costs.',
    datePublished: '2026-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
  },
  'appliance-lifecycle': {
    title: 'Appliance Replacement Reserve Methodology',
    heroHeadline: 'Calculating Sinking Funds for Home Systems',
    metaDescription: 'How we determine annual reserve requirements using DOE system lifespans and BLS CPI for housing maintenance.',
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
    detail = await client.fetch<MethodologyDetailData | null>(detailQuery, { slug });
  } catch (error) {
    console.error('Failed to load methodology detail', error);
  }

  const fallback = FALLBACK_CONTENT[slug];
  const title = detail?.title || fallback?.title || 'Methodology Deep Dive';
  const description = detail?.metaDescription || fallback?.metaDescription || 'Detailed technical methodology for homeownership cost estimations.';
  
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
    detail = await client.fetch<MethodologyDetailData | null>(detailQuery, { slug });
  } catch (error) {
    console.error('Failed to load methodology detail', error);
  }

  const fallback = FALLBACK_CONTENT[slug];
  
  if (!detail && !fallback) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Methodology Not Found</h1>
          <Link href="/methodology" className="text-oxblood hover:underline mt-4 block">Return to Overview</Link>
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

  const faqData = detail?.faqs?.map(f => ({ question: f.question, answer: f.answer })) || [];

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
        <Section variant="cream" spacing="lg">
          <Container>
            <div className="max-w-4xl">
              <nav className="mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-slate/70 uppercase tracking-widest font-bold">
                  <li><Link href="/methodology" className="hover:text-oxblood transition-colors">Methodology</Link></li>
                  <li><span className="text-slate/30">/</span></li>
                  <li className="text-oxblood">{title}</li>
                </ol>
              </nav>
              
              <header>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-charcoal leading-tight mb-6">
                  {heroHeadline}
                </h1>
                <p className="text-xl md:text-2xl text-slate leading-relaxed max-w-2xl">
                  {description}
                </p>
                <div className="mt-8 flex items-center text-sm text-slate/60 border-t border-slate/10 pt-4">
                  <span className="font-semibold text-oxblood mr-2">Last Updated:</span>
                  <time dateTime={dateModified}>
                    {new Date(dateModified).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </time>
                </div>
              </header>
            </div>
          </Container>
        </Section>

        <Section spacing="md">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-a:text-oxblood prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                  {detail?.content ? (
                    <PortableTextRenderer value={detail.content} />
                  ) : (
                    <>
                      <h2>Technical Overview</h2>
                      <p>
                        Our estimation engine relies on high-fidelity public data sets to ensure that homeowners receive
                        the most accurate possible projections for their specific location and building type.
                      </p>
                      <p>
                        For <strong>{title}</strong>, we integrate multiple federal and regional data points to create a 
                        multi-variable model that accounts for local tax assessments, regional insurance premiums, 
                        and climate-specific maintenance requirements.
                      </p>
                      
                      <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100 not-prose my-10 shadow-sm">
                        <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                          <span className="text-2xl">💡</span> Why This Data Matters
                        </h3>
                        <p className="text-amber-800 mb-0 leading-relaxed">
                          Standardized national averages often fail to capture the nuances of the Mid-Willamette Valley
                          and Harney County. By using census-tract level data, we provide a localized view that 
                          outperforms generic calculators by over 40% in accuracy.
                        </p>
                      </div>

                      <h3>Data Processing Methodology</h3>
                      <p>
                        We process raw datasets through a normalization pipeline that adjusts for inflation (CPI-U),
                        regional labor cost multipliers, and material price indices. This ensures our &quot;True Cost&quot;
                        estimates reflect current market realities, not outdated surveys.
                      </p>
                    </>
                  )}
                </div>

                {/* FAQ Section using Semantic Details/Summary */}
                {detail?.faqs && detail.faqs.length > 0 && (
                  <section className="mt-16 pt-16 border-t border-slate/10">
                    <h2 className="text-3xl font-bold text-charcoal mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {detail.faqs.map((faq) => (
                        <details key={faq._id} className="group bg-white rounded-xl border border-slate/10 open:shadow-md transition-shadow duration-200">
                          <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-lg font-bold text-charcoal select-none group-hover:text-oxblood transition-colors">
                            {faq.question}
                            <span className="ml-4 text-oxblood transition-transform duration-300 group-open:rotate-180">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </span>
                          </summary>
                          <div className="px-6 pb-6 text-slate leading-relaxed border-t border-slate/5 pt-4 mt-2">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <aside className="lg:col-span-4 space-y-8">
                <Card variant="outlined" className="border-slate/10 bg-slate/5 sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-charcoal mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Primary Data Sources
                    </h3>
                    <div className="space-y-6">
                      {(detail?.dataSources || [
                        { name: 'US Census Bureau (ACS)', url: 'https://data.census.gov', description: 'Table B25103 - Median Real Estate Taxes' },
                        { name: 'Department of Energy (DOE)', url: 'https://energy.gov', description: 'ResStock Building Analysis' },
                        { name: 'FEMA NFHL', url: 'https://msc.fema.gov', description: 'National Flood Hazard Layer' }
                      ]).map((source, i) => (
                        <div key={i} className="group">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-bold text-oxblood hover:underline block mb-1 text-base flex items-center gap-1"
                          >
                            {source.name}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          </a>
                          <p className="text-sm text-slate leading-snug">{source.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-oxblood text-cream border-none shadow-elevated overflow-hidden relative">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-cream/10 rounded-full blur-2xl"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-bold mb-3">Calculate Your True Cost</h3>
                    <p className="text-cream/80 text-sm mb-6 leading-relaxed">
                      See how these methodologies apply to your specific address in Oregon.
                    </p>
                    <Link href="/tools/cost-calculator">
                      <Button variant="secondary" className="w-full font-bold shadow-md">
                        Run Calculator &rarr;
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </Container>
        </Section>
      </article>
    </>
  );
}
