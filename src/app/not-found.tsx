import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export default function NotFound() {
  return (
    <section className="bg-[#F5F1E8]">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center md:py-28">
        <p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">404 · Page Not Found</p>
        <h1 className="mt-4 text-4xl font-bold text-[#4A1F24] md:text-6xl">That page is no longer on this route.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">Use the current service directory, wildfire recovery hub, or project intake page. If you followed an old Benson Home Solutions link and it should still work, contact us so we can correct the route.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/services" className="rounded-md bg-[#722F37] px-6 py-3 font-semibold text-white">Browse Services</Link>
          <Link href="/request-estimate" className="rounded-md border border-[#722F37] bg-white px-6 py-3 font-semibold text-[#722F37]">Request an Estimate</Link>
          <a href={`tel:${BUSINESS.phoneHref}`} className="rounded-md border border-[#722F37] px-6 py-3 font-semibold text-[#722F37]">Call {BUSINESS.phone}</a>
        </div>
      </div>
    </section>
  );
}
