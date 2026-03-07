import { Metadata } from 'next';
import { TrueCostCalculator } from './TrueCostCalculator';

export const metadata: Metadata = {
  title: 'True Cost of Homeownership Calculator | Benson Home Solutions',
  description:
    'Calculate the real annual cost of owning a home in Oregon. Property taxes, insurance, maintenance, and hidden expenses.',
};

export default function CostCalculatorPage() {
  return <TrueCostCalculator />;
}
