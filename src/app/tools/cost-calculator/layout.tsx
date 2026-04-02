import { Metadata } from 'next';
import { canonicalMetadata } from '@/lib/seo';

export const metadata: Metadata = canonicalMetadata({
  title: 'Rot Risk Simulator | Benson Home Solutions',
  description:
    'Project your property’s structural risk with the Benson Rot Risk Simulator. See how deferred maintenance impacts Oregon home values in Salem, Corvallis, and Harney County.',
  path: '/tools/cost-calculator',
});

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
