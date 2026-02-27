import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Damage Restoration',
  description:
    'Professional water damage restoration in the Mid-Willamette Valley. Dry-out, mitigation, and rebuild services. Insurance-aligned documentation. CCB #258533.',
};

export default function WaterDamagePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Water Damage Restoration</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Complete dry-out, mitigation, and rebuild services with insurance-aligned documentation.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
