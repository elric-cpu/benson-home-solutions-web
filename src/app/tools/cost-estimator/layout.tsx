import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asset Lifecycle Planner | Benson Home Solutions',
  description: 'Calculate 10-year capital expenditure and hidden maintenance liability for commercial and church properties in the Willamette Valley.',
};

export default function EstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}