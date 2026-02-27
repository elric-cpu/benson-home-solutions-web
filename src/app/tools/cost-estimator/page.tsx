import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cost Estimator',
  description:
    'AI-powered cost estimator for construction and remodeling projects. Get an instant ballpark estimate. Benson Home Solutions.',
};

export default function CostEstimatorPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Cost Estimator</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Get an instant AI-powered ballpark estimate for your project.
      </p>
      <p className="margin-note mt-6">Scaffold — AI estimator coming Sprint 3.</p>
    </section>
  );
}
