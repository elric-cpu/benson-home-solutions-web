import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Projects & Documented Work',
  description: 'Documented Benson Home Solutions project work and the portfolio structure used for future Harney County construction case studies.',
  alternates: { canonical: `${BUSINESS.url}/projects` },
};

export default function ProjectsPage() {
  return <>
    <section className="bg-[#4A1F24] text-[#FAF8F3]"><div className="mx-auto max-w-6xl px-5 py-16 md:py-24"><p className="font-semibold uppercase tracking-[0.16em] text-[#F5F1E8]/75">Documented Work</p><h1 className="mt-4 max-w-4xl text-4xl font-bold md:text-6xl">Real projects, without manufactured case studies.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[#F5F1E8]">We publish project examples only when the scope and media are tied to actual Benson work. The portfolio will grow as verified before-and-after documentation is organized for public use.</p></div></section>

    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <article className="overflow-hidden rounded-xl border border-[#722F37]/15 bg-[#FAF8F3]">
        <div className="grid md:grid-cols-[.8fr_1.2fr]">
          <div className="bg-[#F5F1E8] p-7 md:p-9"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#722F37]">Frenchglen, Oregon</p><h2 className="mt-3 text-3xl font-bold text-[#4A1F24]">RV sanitation dump pad rebuild</h2><p className="mt-4 leading-7">Small concrete and sanitation-site reconstruction in a remote South County location.</p></div>
          <div className="p-7 md:p-9"><h3 className="text-xl font-bold text-[#4A1F24]">Problem</h3><p className="mt-2 leading-7">The existing dump area had a failing concrete pad and needed a practical rebuild around the drain and vehicle approach.</p><h3 className="mt-6 text-xl font-bold text-[#4A1F24]">Scope</h3><ul className="mt-3 space-y-2 leading-7"><li>— Remove failed concrete and prepare the work area.</li><li>— Rebuild the pad around the sanitation drain.</li><li>— Form the curb and approach/taper for usable drainage and access.</li><li>— Coordinate a remote concrete placement where haul time and batch timing materially affected execution.</li></ul><div className="mt-7 flex flex-wrap gap-3"><Link href="/services/concrete-small-projects" className="font-semibold text-[#722F37] underline underline-offset-4">Small concrete projects</Link><Link href="/services/sitework-excavation" className="font-semibold text-[#722F37] underline underline-offset-4">Sitework & excavation</Link></div></div>
        </div>
      </article>

      <section className="mt-12 grid gap-6 md:grid-cols-3"><div className="rounded-xl border border-[#722F37]/15 p-6"><h2 className="text-xl font-bold text-[#4A1F24]">What future case studies include</h2><p className="mt-3 leading-7">Location, problem, approved scope, solution, before/after media when available, and links to the related services.</p></div><div className="rounded-xl border border-[#722F37]/15 p-6"><h2 className="text-xl font-bold text-[#4A1F24]">Insurance work</h2><p className="mt-3 leading-7">Loss projects are published only when the project status, documentation, and permission support a truthful public case study.</p></div><div className="rounded-xl border border-[#722F37]/15 p-6"><h2 className="text-xl font-bold text-[#4A1F24]">No filler</h2><p className="mt-3 leading-7">No invented client names, quotes, star ratings, project counts, or stock-photo projects are presented as Benson work.</p></div></section>
    </section>

    <section className="bg-[#F5F1E8]"><div className="mx-auto max-w-5xl px-5 py-14 text-center"><h2 className="text-3xl font-bold text-[#4A1F24]">Need to discuss a similar scope?</h2><p className="mx-auto mt-4 max-w-2xl leading-7">Send the property location, problem, access notes, timing, and useful photos. We can review the project on its own facts.</p><Link href="/request-estimate" className="mt-7 inline-block rounded-md bg-[#722F37] px-6 py-3 font-semibold text-white">Request a Project Review</Link></div></section>
  </>;
}
