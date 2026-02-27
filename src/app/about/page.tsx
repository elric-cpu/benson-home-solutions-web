import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Benson Home Solutions — licensed Oregon contractor CCB #258533. Serving the Mid-Willamette Valley since 2014 with 200+ completed projects.',
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">About Benson Home Solutions</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Licensed, bonded, and insured Oregon contractor. CCB #258533. Over 200 projects completed across the Mid-Willamette Valley and Harney County.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
