import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maintenance Subscriptions',
  description:
    'Home, commercial, and church maintenance subscription programs. Defined SLAs, board-ready documentation, and preventive care plans. Benson Home Solutions.',
};

export default function MaintenanceSubscriptionsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Maintenance Subscriptions</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Proactive maintenance programs for homes, commercial properties, and churches — with defined SLAs and board-ready documentation.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
