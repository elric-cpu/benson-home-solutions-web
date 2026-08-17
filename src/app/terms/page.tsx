import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Website Terms of Use',
  description: 'Terms governing use of the Benson Home Solutions website.',
  alternates: { canonical: `${BUSINESS.url}/terms` },
};

export default function TermsPage() {
  return <main className="mx-auto max-w-4xl px-5 py-14 md:py-20">
    <p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">Website Terms</p>
    <h1 className="mt-3 text-4xl font-bold text-[#4A1F24] md:text-5xl">Terms of Use</h1>
    <p className="mt-4 text-sm text-[#2D2D2D]/70">Last updated August 16, 2026</p>
    <div className="mt-10 space-y-8 leading-8">
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Website information</h2><p className="mt-3">This website provides general information about Benson Home Solutions, construction services, service areas, project intake, and property-recovery topics. Website content is not a contract, engineering opinion, insurance coverage determination, hazardous-material clearance, code approval, or guarantee that a particular service is appropriate for a specific property.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Estimates and project scope</h2><p className="mt-3">A website submission, phone call, photo review, or preliminary discussion does not create a construction contract. Scope, price, schedule, exclusions, payment terms, and other project requirements are established in the applicable written estimate, proposal, change order, or contract.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Site and safety conditions</h2><p className="mt-3">Property owners should not enter unsafe structures or disturb suspected asbestos, contaminated ash, hazardous waste, energized utilities, active gas hazards, or other dangerous conditions merely to obtain photos or information for Benson Home Solutions. Emergency services, utilities, regulators, insurers, and licensed specialty contractors may need to be involved before ordinary construction work begins.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Third-party services and links</h2><p className="mt-3">Projects may require independent engineers, licensed trade subcontractors, testing firms, abatement contractors, disposal facilities, insurers, agencies, or other third parties. External links are provided for convenience; their content and availability are controlled by their respective operators.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Website availability</h2><p className="mt-3">We may update, correct, reorganize, or remove website content as services, regulations, project requirements, or business operations change. We do not guarantee uninterrupted website availability.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Contact</h2><p className="mt-3">Questions about these terms can be sent to <a className="font-semibold text-[#722F37] underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. See the <Link className="font-semibold text-[#722F37] underline" href="/privacy">Privacy Policy</Link> for information about website submissions.</p></section>
    </div>
  </main>;
}
