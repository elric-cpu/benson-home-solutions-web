import { Metadata } from 'next';
import { canonicalMetadata } from '@/lib/seo';

export const metadata: Metadata = canonicalMetadata({
  title: 'Oregon Maintenance Planner | Benson Home Solutions',
  description:
    'Build a seasonal maintenance checklist for Oregon homes, rentals, churches, and small commercial buildings.',
  path: '/tools/maintenance-planner',
});

export default function MaintenancePlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
