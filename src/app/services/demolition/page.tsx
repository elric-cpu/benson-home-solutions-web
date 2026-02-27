import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demolition Services',
  description:
    'Interior and exterior demolition services — selective or full. Permits, debris removal, and documentation included. CCB #258533.',
};

export default function DemolitionPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Demolition Services</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Interior and exterior demolition — selective or full, with permits and debris removal.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
