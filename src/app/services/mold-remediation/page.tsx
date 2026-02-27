import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mold Remediation',
  description:
    'Professional mold remediation and mitigation services. Post-remediation verification and lab testing. Licensed Oregon contractor CCB #258533.',
};

export default function MoldRemediationPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Mold Remediation</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Remediation, post-mitigation verification, and lab testing for residential and commercial properties.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
