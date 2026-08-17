import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { serviceMap } from '@/lib/service-catalog';

export const metadata: Metadata = {
  title: 'Harney County General Contractor | Benson Home Solutions',
  description: 'Construction, repair, post-fire recovery, demolition, property maintenance, and rural project work throughout Harney County, Oregon. Oregon CCB #258533.',
  alternates: { canonical: BUSINESS.url },
};

const featured = [
  'post-fire-cleanup-recovery',
  'demolition',
  'water-damage-restoration',
  'window-door-replacement',
  'property-maintenance',
  'framing-structural-repairs',
  'sitework-excavation',
  'fire-damage-repair-reconstruction',
].map(slug => serviceMap[slug]);

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#F5F1E8]">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[#722F37]/5 lg:block" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24 lg:py-28">
          <p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">Harney County, Oregon · {BUSINESS.license}</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.08] text-[#4A1F24] md:text-6xl lg:text-7xl">Construction, repair, and recovery for properties where distance matters.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#2D2D2D] md:text-xl">Benson Home Solutions handles residential and light-commercial repair, reconstruction, demolition, property maintenance, and rural project work throughout Harney County. From Burns and Hines to Frenchglen, Fields, and remote ranch properties, we plan the logistics as carefully as the construction.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request-estimate" className="rounded-md bg-[#722F37] px-6 py-3.5 font-semibold text-white hover:bg-[#5C252C] focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2">Request an Estimate</Link>
            <a href={`tel:${BUSINESS.phoneHref}`} className="rounded-md border border-[#722F37] bg-white px-6 py-3.5 font-semibold text-[#722F37] hover:bg-[#FAF8F3]">Call {BUSINESS.phone}</a>
          </div>
          <div className="mt-10 grid gap-3 text-sm font-semibold text-[#4A1F24] sm:grid-cols-3">
            <div className="border-l-2 border-[#722F37] pl-4">Oregon contractor · CCB #258533</div>
            <div className="border-l-2 border-[#722F37] pl-4">Harney County rural & remote mobilization</div>
            <div className="border-l-2 border-[#722F37] pl-4">Repair, reconstruction & documented scopes</div>
          </div>
        </div>
      </section>

      <section className="bg-[#4A1F24] text-[#FAF8F3]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.1fr_.9fr] md:py-20">
          <div>
            <p className="font-semibold uppercase tracking-[0.16em] text-[#F5F1E8]/75">Wildfire Recovery</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">After the fire, recovery starts with a plan.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#F5F1E8]">Fire-damaged property can involve unstable structures, utilities, asbestos, contaminated ash, household hazardous waste, disposal rules, insurance documentation, and reconstruction. We help organize the construction recovery path without pretending regulated debris is ordinary jobsite waste.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services/post-fire-cleanup-recovery" className="rounded-md bg-[#F5F1E8] px-5 py-3 font-semibold text-[#722F37]">Post-Fire Cleanup & Recovery</Link>
              <Link href="/wildfire-recovery" className="rounded-md border border-[#F5F1E8]/50 px-5 py-3 font-semibold text-[#F5F1E8]">Wildfire Recovery Guide</Link>
            </div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {['1. Document & assess', '2. Stabilize the property', '3. Resolve regulated-material requirements', '4. Demolish what cannot be saved', '5. Repair & reconstruct'].map(item => <li key={item} className="rounded-lg border border-[#F5F1E8]/20 bg-white/5 p-4 font-semibold">{item}</li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">What We Handle</p>
          <h2 className="mt-2 text-3xl font-bold text-[#4A1F24] md:text-5xl">One contractor for the parts of the project that need to stay connected.</h2>
          <p className="mt-4 text-lg leading-8">Many repair jobs are not one trade. Water damage can become subfloor, drywall, paint, and flooring. Fire damage can become demolition, framing, openings, insulation, finishes, and subcontractor coordination. We scope the sequence instead of treating each symptom in isolation.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featured.map(service => <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-xl border border-[#722F37]/15 bg-[#FAF8F3] p-5 hover:border-[#722F37]/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#722F37]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#722F37]">{service.eyebrow}</p><h3 className="mt-2 text-xl font-bold text-[#4A1F24] group-hover:text-[#722F37]">{service.title}</h3><p className="mt-3 text-sm leading-6">{service.description}</p><span className="mt-4 inline-block font-semibold text-[#722F37]">Learn more →</span></Link>)}
        </div>
        <Link href="/services" className="mt-8 inline-block font-semibold text-[#722F37] underline underline-offset-4">See every service</Link>
      </section>

      <section className="border-y border-[#722F37]/10 bg-[#F5F1E8]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">Rural & Remote</p>
            <h2 className="mt-2 text-3xl font-bold text-[#4A1F24] md:text-5xl">Miles don’t stop us. Poor planning does.</h2>
            <p className="mt-5 text-lg leading-8">Rural work takes planning. Materials are farther away, subcontractors are harder to schedule, disposal can be hours from the site, and weather or road access can change the day. We work in these conditions regularly and build the route, material list, access plan, and trade sequence around them.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {['Remote ranch properties', 'Rural residences & cabins', 'Churches & nonprofits', 'Light-commercial facilities', 'Vacant & managed properties', 'South County route work'].map(item => <div key={item} className="rounded-lg border border-[#722F37]/15 bg-[#FAF8F3] p-5 font-semibold text-[#4A1F24]">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">Service Area</p>
            <h2 className="mt-2 text-3xl font-bold text-[#4A1F24] md:text-5xl">Based around Harney County.</h2>
            <p className="mt-5 text-lg leading-8">We publicly route work around Burns, Hines, Frenchglen, Fields, Diamond, Princeton, Riley, Drewsey, Crane, Lawen, surrounding ranches, and remote locations throughout the county. Exact timing depends on scope, access, weather, material availability, and route fit.</p>
            <Link href="/service-area" className="mt-6 inline-block font-semibold text-[#722F37] underline underline-offset-4">Review service-area details</Link>
          </div>
          <div className="rounded-xl bg-[#4A1F24] p-7 text-[#FAF8F3] md:p-9">
            <h3 className="text-2xl font-bold">A straightforward start</h3>
            <ol className="mt-6 space-y-5">
              <li><strong>1. Send the basics.</strong><br/><span className="text-[#F5F1E8]">Location, photos, measurements if useful, access notes, timing, and what is happening now.</span></li>
              <li><strong>2. We review the route and scope.</strong><br/><span className="text-[#F5F1E8]">We identify likely dependencies, specialty trades, materials, and whether a site visit is the next useful step.</span></li>
              <li><strong>3. You get a defined next step.</strong><br/><span className="text-[#F5F1E8]">Estimate, inspection, documented scope, or referral/coordination when another licensed specialty is required first.</span></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#722F37] text-white">
        <div className="mx-auto max-w-5xl px-5 py-14 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Tell us what the property needs.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#F5F1E8]">A clear location, short description, and useful photos are enough to start the review. We do not need a finished scope from you.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/request-estimate" className="rounded-md bg-[#F5F1E8] px-6 py-3 font-semibold text-[#722F37]">Request an Estimate</Link><a href={`tel:${BUSINESS.phoneHref}`} className="rounded-md border border-white/50 px-6 py-3 font-semibold">Call {BUSINESS.phone}</a></div>
        </div>
      </section>
    </>
  );
}
