import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Methodology',
  description:
    'How Benson Home Solutions delivers quality work — our process, certifications, quality standards, and commitment to transparency.',
};

export default function MethodologyPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Our Methodology</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Every project follows a defined, auditable process — from initial assessment to completion sign-off.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
