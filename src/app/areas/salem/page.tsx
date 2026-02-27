import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salem Oregon Contractor',
  description:
    'Licensed contractor serving Salem, Oregon. Home maintenance, emergency restoration, remodeling, and commercial construction. CCB #258533. Free estimates.',
};

export default function SalemPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Salem, Oregon</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Serving Salem and Marion County with residential and commercial contracting services.
      </p>
      <p className="margin-note mt-6">Scaffold — local content coming Sprint 2.</p>
    </section>
  );
}
