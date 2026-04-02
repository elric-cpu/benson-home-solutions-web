import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'True Cost Calculator | Benson Home Solutions',
  description: 'Estimate your true annual home maintenance costs and deferred repair liability for Oregon properties. Use building science to project 5-year maintenance risks in the Mid-Valley and Harney County.',
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}