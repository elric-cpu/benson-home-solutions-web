import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keizer Oregon Contractor',
  description:
    'Licensed contractor serving Keizer, Oregon. Home maintenance, emergency restoration, and remodeling. CCB #258533.',
};

export default function KeizerPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Keizer, Oregon</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Serving Keizer and surrounding Marion County communities.
      </p>
      <p className="margin-note mt-6">Scaffold — local content coming Sprint 2.</p>
    </section>
  );
}
