import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Benson Home Solutions handles website project requests, contact information, property details, and service communications.',
  alternates: { canonical: `${BUSINESS.url}/privacy` },
};

export default function PrivacyPage() {
  return <main className="mx-auto max-w-4xl px-5 py-14 md:py-20">
    <p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">Privacy</p>
    <h1 className="mt-3 text-4xl font-bold text-[#4A1F24] md:text-5xl">Privacy Policy</h1>
    <p className="mt-4 text-sm text-[#2D2D2D]/70">Last updated August 16, 2026</p>
    <div className="mt-10 space-y-8 leading-8">
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Information you provide</h2><p className="mt-3">When you submit a project request or contact us, we may collect your name, phone number, email address, property address or location, service requested, project description, preferred contact method, and information you later choose to provide such as photos, measurements, documents, or access notes.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">How we use it</h2><p className="mt-3">We use submitted information to review project fit, respond to requests, prepare or discuss scopes and estimates, schedule work, communicate about active projects, maintain business records, prevent abuse of website forms, and improve website operations.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Service providers</h2><p className="mt-3">Website and business operations may use hosting, database, email, analytics, spam-prevention, and other technical service providers. Information may be processed by those providers to deliver the service. We do not publish property details submitted through the estimate form as public project content without a separate basis to do so.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Security and retention</h2><p className="mt-3">We use reasonable technical and administrative measures intended to protect submitted information. No internet transmission or storage system can be guaranteed completely secure. Information may be retained as reasonably needed for project review, contracting, recordkeeping, dispute prevention, legal obligations, and normal business operations.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Cookies and analytics</h2><p className="mt-3">The site may use essential browser storage and legitimate analytics needed to operate, secure, and understand website performance. We avoid adding unnecessary tracking technologies. If analytics or consent requirements materially change, this policy should be updated with the implementation.</p></section>
      <section><h2 className="text-2xl font-bold text-[#4A1F24]">Contact</h2><p className="mt-3">Questions about website privacy can be sent to <a className="font-semibold text-[#722F37] underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or discussed by phone at <a className="font-semibold text-[#722F37] underline" href={`tel:${BUSINESS.phoneHref}`}>{BUSINESS.phone}</a>.</p></section>
    </div>
  </main>;
}
