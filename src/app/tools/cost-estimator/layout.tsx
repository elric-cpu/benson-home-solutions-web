import { Metadata } from 'next';
import { canonicalMetadata } from '@/lib/seo';

export const metadata: Metadata = canonicalMetadata({
  title: 'Asset Lifecycle Planner | Benson Home Solutions',
  description:
    'Calculate 10-year capital expenditure and hidden maintenance liability for commercial, nonprofit, and church properties in Oregon.',
  path: '/tools/cost-estimator',
});

export default function EstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
