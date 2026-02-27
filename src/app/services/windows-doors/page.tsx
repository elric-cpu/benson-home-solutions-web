import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Window & Door Replacement',
  description:
    'Window and door replacement services in Oregon. Residential and commercial. Measurements, installation, and warranty documentation. CCB #258533.',
};

export default function WindowsDoorsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Window & Door Replacement</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Residential and commercial window and door replacement with full warranty documentation.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
