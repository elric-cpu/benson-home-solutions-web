import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';
import { serviceMap, services } from '@/lib/service-catalog';

const baseUrl = BUSINESS.url;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceMap[slug];
  if (!service) return {};
  const url = `${baseUrl}/services/${slug}`;
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: { title: `${service.title} | Benson Home Solutions`, description: service.description, url, type: 'website' },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceMap[slug];
  if (!service) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `${baseUrl}/services/${service.slug}`,
        provider: { '@type': 'HomeAndConstructionBusiness', name: BUSINESS.name, url: baseUrl },
        areaServed: { '@type': 'AdministrativeArea', name: 'Harney County, Oregon' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${baseUrl}/services` },
          { '@type': 'ListItem', position: 3, name: service.title, item: `${baseUrl}/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-[#F5F1E8] border-b border-[#722F37]/15">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#5C252C]">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/services">Services</Link> <span aria-hidden="true">/</span> <span>{service.title}</span>
          </nav>
          <p className="mb-3 font-semibold uppercase tracking-[0.16em] text-[#722F37]">{service.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[#4A1F24] md:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#2D2D2D]">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request-estimate" className="rounded-md bg-[#722F37] px-6 py-3 font-semibold text-[#FAF8F3] hover:bg-[#5C252C] focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2">Request an Estimate</Link>
            <a href={`tel:${BUSINESS.phoneHref}`} className="rounded-md border border-[#722F37] px-6 py-3 font-semibold text-[#722F37] hover:bg-white">Call {BUSINESS.phone}</a>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div className="space-y-14">
            <section>
              <h2 className="text-3xl font-bold text-[#4A1F24]">What this service covers</h2>
              <p className="mt-4 text-lg leading-8 text-[#2D2D2D]">{service.intro}</p>
            </section>
            <section>
              <h2 className="text-3xl font-bold text-[#4A1F24]">Typical problems we solve</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">{service.problems.map(item => <li key={item} className="rounded-lg border border-[#722F37]/15 bg-[#FAF8F3] p-4">{item}</li>)}</ul>
            </section>
            <section>
              <h2 className="text-3xl font-bold text-[#4A1F24]">Scope of work</h2>
              <ul className="mt-5 space-y-3">{service.scope.map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="font-bold text-[#722F37]">—</span><span>{item}</span></li>)}</ul>
            </section>
            <section>
              <h2 className="text-3xl font-bold text-[#4A1F24]">How we approach the job</h2>
              <ol className="mt-5 space-y-4">{service.process.map((item, i) => <li key={item} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#722F37] font-semibold text-white">{i + 1}</span><span className="pt-1 leading-7">{item}</span></li>)}</ol>
            </section>
            <section className="rounded-xl bg-[#F5F1E8] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#4A1F24]">Rural and remote work</h2>
              <p className="mt-3 leading-7">{service.rural}</p>
            </section>
            {service.insurance && <section><h2 className="text-3xl font-bold text-[#4A1F24]">Insurance and regulated-work considerations</h2><p className="mt-4 leading-8">{service.insurance}</p></section>}
            <section>
              <h2 className="text-3xl font-bold text-[#4A1F24]">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-[#722F37]/15 border-y border-[#722F37]/15">{service.faq.map(item => <details key={item.question} className="group py-5"><summary className="cursor-pointer list-none font-semibold text-[#4A1F24]">{item.question}</summary><p className="mt-3 max-w-3xl leading-7">{item.answer}</p></details>)}</div>
            </section>
          </div>

          <aside className="h-fit rounded-xl border border-[#722F37]/20 bg-[#FAF8F3] p-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold text-[#4A1F24]">Service area</h2>
            <p className="mt-3 leading-7">Harney County, Oregon, including Burns, Hines, Frenchglen, Fields, Diamond, Princeton, Riley, Drewsey, Crane, Lawen, surrounding ranches, and remote properties.</p>
            <h2 className="mt-8 text-xl font-bold text-[#4A1F24]">Related services</h2>
            <ul className="mt-3 space-y-2">{service.related.map(relatedSlug => { const related = serviceMap[relatedSlug]; return related ? <li key={relatedSlug}><Link className="font-semibold text-[#722F37] underline-offset-4 hover:underline" href={`/services/${relatedSlug}`}>{related.title}</Link></li> : null; })}</ul>
          </aside>
        </div>
      </article>

      <section className="bg-[#4A1F24] text-[#FAF8F3]">
        <div className="mx-auto max-w-5xl px-5 py-14 text-center">
          <h2 className="text-3xl font-bold">Start with the property, not a generic quote.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#F5F1E8]">Send the location, a short description, access notes, timing, and useful photos. We’ll review the scope and the practical next step.</p>
          <Link href="/request-estimate" className="mt-7 inline-block rounded-md bg-[#F5F1E8] px-6 py-3 font-semibold text-[#722F37]">Request an Estimate</Link>
        </div>
      </section>
    </>
  );
}
