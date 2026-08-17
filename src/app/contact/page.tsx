import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Benson Home Solutions',
  description: 'Contact Benson Home Solutions for construction, repair, post-fire recovery, property maintenance, and rural projects in Harney County, Oregon.',
  alternates: { canonical: `${BUSINESS.url}/contact` },
};

export default function ContactPage() {
  return <>
    <section className="bg-[#F5F1E8]"><div className="mx-auto max-w-6xl px-5 py-16 md:py-24"><p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">Contact</p><h1 className="mt-4 max-w-4xl text-4xl font-bold text-[#4A1F24] md:text-6xl">Start with the property and the problem.</h1><p className="mt-6 max-w-3xl text-lg leading-8">For estimates and project reviews, the fastest start is the project intake form. It gives us the location, service type, access information, and project description in one place.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/request-estimate" className="rounded-md bg-[#722F37] px-6 py-3 font-semibold text-white">Request an Estimate</Link><a href={`tel:${BUSINESS.phoneHref}`} className="rounded-md border border-[#722F37] bg-white px-6 py-3 font-semibold text-[#722F37]">Call {BUSINESS.phone}</a></div></div></section>
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3 md:py-20">
      <div className="rounded-xl border border-[#722F37]/15 bg-[#FAF8F3] p-6"><h2 className="text-xl font-bold text-[#4A1F24]">Phone</h2><a href={`tel:${BUSINESS.phoneHref}`} className="mt-3 block text-lg font-semibold text-[#722F37]">{BUSINESS.phone}</a><p className="mt-3 leading-7">Use for scheduling questions, active project coordination, or when a form is not practical.</p></div>
      <div className="rounded-xl border border-[#722F37]/15 bg-[#FAF8F3] p-6"><h2 className="text-xl font-bold text-[#4A1F24]">Email</h2><a href={`mailto:${BUSINESS.email}`} className="mt-3 block break-all text-lg font-semibold text-[#722F37]">{BUSINESS.email}</a><p className="mt-3 leading-7">Useful for documents, insurance correspondence, project details, and follow-up information.</p></div>
      <div className="rounded-xl border border-[#722F37]/15 bg-[#FAF8F3] p-6"><h2 className="text-xl font-bold text-[#4A1F24]">Service area</h2><p className="mt-3 leading-7">Harney County, including Burns, Hines, Frenchglen, Fields, Diamond, Princeton, Riley, Drewsey, Crane, Lawen, and surrounding rural properties.</p><Link href="/service-area" className="mt-3 inline-block font-semibold text-[#722F37] underline underline-offset-4">Service-area details</Link></div>
    </section>
    <section className="border-y border-[#722F37]/10 bg-[#4A1F24] text-[#FAF8F3]"><div className="mx-auto max-w-5xl px-5 py-12"><h2 className="text-2xl font-bold">Immediate safety hazards</h2><p className="mt-3 max-w-3xl leading-7 text-[#F5F1E8]">For fire, medical emergencies, downed power lines, active gas hazards, or an unsafe structure presenting immediate danger, contact emergency services or the responsible utility first. Construction review comes after the immediate hazard is controlled.</p></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Benson Home Solutions', url: `${BUSINESS.url}/contact`, mainEntity: { '@type': 'HomeAndConstructionBusiness', name: BUSINESS.name, telephone: BUSINESS.phone, email: BUSINESS.email, areaServed: 'Harney County, Oregon' } }) }} />
  </>;
}
