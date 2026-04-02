import { Metadata } from 'next';
import { canonicalMetadata } from '@/lib/seo';

export const metadata: Metadata = canonicalMetadata({
  title: 'Roof Leak Urgency Checker | Benson Home Solutions',
  description:
    'Check how urgent a roof leak, ceiling stain, attic drip, or roof vent leak is and get clear next steps for Oregon homes.',
  path: '/tools/roof-leak-urgency',
});

export default function RoofLeakUrgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
