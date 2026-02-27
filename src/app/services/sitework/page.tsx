import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitework Services',
  description:
    'Driveway installations, utility replacements, grading, stump removal, and residential sitework in the Mid-Willamette Valley. CCB #258533.',
};

export default function SiteworkPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Sitework</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Driveways, utility replacements, grading, stump removal, and all residential sitework.
      </p>
      <p className="margin-note mt-6">Scaffold — full content coming Sprint 2.</p>
    </section>
  );
}
