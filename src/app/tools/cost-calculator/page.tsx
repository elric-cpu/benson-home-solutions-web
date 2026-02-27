import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'True Cost Calculator',
  description:
    'Calculate the true cost of your home improvement project. Powered by local data and 1build pricing. Benson Home Solutions.',
};

export default function CostCalculatorPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">True Cost Calculator</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Get a realistic cost estimate for your project using local pricing data.
      </p>
      <p className="margin-note mt-6">Scaffold — interactive tool coming Sprint 3.</p>
    </section>
  );
}
