import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kitchen Remodeling',
  description:
    'Kitchen remodeling services in Salem, Keizer, Corvallis, and Albany Oregon. Licensed contractor CCB #258533. Free estimates.',
};

export default function KitchenRemodelingPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Kitchen Remodeling</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Custom kitchen remodels tailored to your home, budget, and timeline.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
