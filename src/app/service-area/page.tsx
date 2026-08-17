import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Harney County Contractor Service Area',
  description: 'Benson Home Solutions serves Burns, Hines, Frenchglen, Fields, Diamond, Princeton, Riley, Drewsey, Crane, Lawen, ranches, and remote Harney County properties.',
  alternates: { canonical: `${BUSINESS.url}/service-area` },
};

export default function ServiceAreaPage() {
  return <>
    <section className="bg-[#F5F1E8]"><div className="mx-auto max-w-6xl px-5 py-16 md:py-24"><p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">Service Area</p><h1 className="mt-4 max-w-4xl text-4xl font-bold text-[#4A1F24] md:text-6xl">Harney County construction without treating distance as an afterthought.</h1><p className="mt-6 max-w-3xl text-lg leading-8">Benson Home Solutions provides construction, repair, reconstruction, property maintenance, and rural project services across Harney County. Remote jobs are reviewed around access, route timing, materials, weather, disposal, and specialty-trade availability before a schedule is promised.</p></div></section>
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20"><h2 className="text-3xl font-bold text-[#4A1F24]">Communities and rural routes</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">{SERVICE_AREAS.harneyCounty.map(area => <div key={area} className="rounded-lg border border-[#722F37]/15 bg-[#FAF8F3] p-5 font-semibold text-[#4A1F24]">{area}</div>)}</div><p className="mt-7 max-w-4xl leading-8">Coverage also includes surrounding ranches, rural residences, agricultural properties, cabins, remote commercial facilities, and other locations within the county when the scope and access are workable.</p></section>
    <section className="border-y border-[#722F37]/10 bg-[#4A1F24] text-[#FAF8F3]"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3"><div><h2 className="text-xl font-bold">Route planning</h2><p className="mt-3 leading-7 text-[#F5F1E8]">Grouped stops can make smaller repair and maintenance work practical in remote communities.</p></div><div><h2 className="text-xl font-bold">Material planning</h2><p className="mt-3 leading-7 text-[#F5F1E8]">Measurements, photos, product details, and a clear material list reduce avoidable repeat trips.</p></div><div><h2 className="text-xl font-bold">Access & weather</h2><p className="mt-3 leading-7 text-[#F5F1E8]">Road conditions, gates, winter weather, wildfire conditions, and equipment access are part of scheduling.</p></div></div></section>
    <section className="mx-auto max-w-5xl px-5 py-14 text-center"><h2 className="text-3xl font-bold text-[#4A1F24]">Have a property outside town?</h2><p className="mx-auto mt-4 max-w-2xl leading-7">Send the exact location, photos, access notes, priority, and timing constraints. That is enough to determine whether the scope fits a current route or needs its own mobilization.</p><Link href="/request-estimate" className="mt-7 inline-block rounded-md bg-[#722F37] px-6 py-3 font-semibold text-white">Request a Project Review</Link></section>
  </>;
}
