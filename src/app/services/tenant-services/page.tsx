import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tenant Changes & Property Maintenance',
  description:
    'Tenant move-in/move-out prep, trash-outs, board-ups, and property maintenance for landlords and property managers. CCB #258533.',
};

export default function TenantServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Tenant Changes & Property Maintenance</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Move-in/move-out prep, trash-outs, board-ups, and ongoing property maintenance for landlords.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
