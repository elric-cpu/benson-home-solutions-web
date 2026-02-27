import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Services | 24/7 Response',
  description:
    'Emergency board-up, water damage response, and restoration services in the Mid-Willamette Valley. On-site within 60 minutes. Call (541) 413-0480 after hours.',
};

export default function EmergencyPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">
        Emergency Services
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        24/7 emergency response for water damage, fire damage, and storm damage.
        Call <a href="tel:+15414130480" className="font-semibold text-accent underline">(541) 413-0480</a> now.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
