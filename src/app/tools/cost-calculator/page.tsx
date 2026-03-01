import type { Metadata } from 'next';
import { TrueCostCalculator } from './TrueCostCalculator';

export const metadata: Metadata = {
  title: 'True Cost of Homeownership Calculator',
  description:
    'Calculate the true annual cost of owning your home beyond the mortgage. Get a realistic breakdown of taxes, insurance, maintenance, and energy costs.',
  openGraph: {
    title: 'True Cost of Homeownership Calculator | Benson Home Solutions',
    description: 'Find out the hidden costs of your home beyond the mortgage.',
    type: 'website',
  },
};

export default function CostCalculatorPage() {
  return (
    <main className="min-h-screen">
      <TrueCostCalculator />
    </main>
  );
}
