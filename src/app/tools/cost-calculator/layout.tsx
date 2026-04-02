import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rot Risk Simulator | Benson Home Solutions',
  description: 'Project your property\'s structural risk with our diagnostic Rot Risk Simulator. See how deferred maintenance impacts Oregon home values in Salem, Corvallis, and Harney County.',
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}