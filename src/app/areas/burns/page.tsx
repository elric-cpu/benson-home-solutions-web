import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burns Oregon Contractor',
  description:
    'Licensed contractor serving Burns, Riley, and Drewsey in Harney County, Oregon. Home maintenance and construction. CCB #258533.',
};

export default function BurnsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Burns, Oregon</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Serving Burns, Riley, and Drewsey in Harney County.
      </p>
      <p className="margin-note mt-6">Scaffold — local content coming Sprint 2.</p>
    </section>
  );
}
