import type { Metadata } from 'next';
import Link from 'next/link';
import { services, wildfireServiceSlugs } from '@/lib/service-catalog';

export const metadata: Metadata = {
  title: 'Construction, Repair & Property Services in Harney County',
  description: 'Benson Home Solutions provides demolition, post-fire recovery, water-damage reconstruction, windows and doors, framing, sitework, property maintenance, and rural construction services across Harney County, Oregon.',
  alternates: { canonical: 'https://bensonhomesolutions.com/services' },
};

export default function ServicesPage() {
  const wildfire = services.filter(service => wildfireServiceSlugs.includes(service.slug));
  const core = services.filter(service => !wildfireServiceSlugs.includes(service.slug));

  return (
    <>
      <section className="bg-[#4A1F24] text-[#FAF8F3]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="font-semibold uppercase tracking-[0.16em] text-[#F5F1E8]/80">Harney County · Oregon CCB #258533</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">Construction, repair, recovery, and rural property services.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#F5F1E8]">Each service page explains the actual scope, constraints, related work, and what we need to review the job. Rural work is planned around distance, weather, material availability, access, disposal, and subcontractor scheduling.</p>
          <Link href="/request-estimate" className="mt-8 inline-block rounded-md bg-[#F5F1E8] px-6 py-3 font-semibold text-[#722F37]">Request an Estimate</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="font-semibold uppercase tracking-[0.14em] text-[#722F37]">High Priority</p>
          <h2 className="mt-2 text-3xl font-bold text-[#4A1F24] md:text-4xl">Post-Fire Cleanup & Recovery</h2>
          <p className="mt-4 leading-7">For wildfire-damaged properties, we separate regulated debris and hazardous-material requirements from the construction scope, then help move the property through stabilization, demolition, repair, and reconstruction.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">{wildfire.map(service => <ServiceCard key={service.slug} {...service} />)}</div>
      </section>

      <section className="border-y border-[#722F37]/10 bg-[#F5F1E8]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <h2 className="text-3xl font-bold text-[#4A1F24] md:text-4xl">Core Services</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{core.map(service => <ServiceCard key={service.slug} {...service} />)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 text-center">
        <h2 className="text-3xl font-bold text-[#4A1F24]">The project crosses more than one category?</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7">Send the whole scope. Reconstruction, remote maintenance, and loss work often involve several trades and are better reviewed as one sequence.</p>
        <Link href="/request-estimate" className="mt-7 inline-block rounded-md bg-[#722F37] px-6 py-3 font-semibold text-white">Tell Us About the Project</Link>
      </section>
    </>
  );
}

function ServiceCard({ slug, title, description, eyebrow }: { slug: string; title: string; description: string; eyebrow: string }) {
  return <Link href={`/services/${slug}`} className="group rounded-xl border border-[#722F37]/15 bg-[#FAF8F3] p-6 transition hover:-translate-y-0.5 hover:border-[#722F37]/35 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#722F37]">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#722F37]">{eyebrow}</p>
    <h3 className="mt-2 text-xl font-bold text-[#4A1F24] group-hover:text-[#722F37]">{title}</h3>
    <p className="mt-3 leading-7 text-[#2D2D2D]">{description}</p>
    <span className="mt-5 inline-block font-semibold text-[#722F37]">View service →</span>
  </Link>;
}
