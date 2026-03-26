import type { Metadata } from 'next'
import PlansPageClient from './PlansPageClient'

export const metadata: Metadata = {
  title: 'Maintenance Plans',
  description:
    'Recurring maintenance plans for residential, commercial, and church properties that help prevent bigger repair and emergency costs.',
  alternates: {
    canonical: '/plans',
  },
  openGraph: {
    title: 'Maintenance Plans | Benson Home Solutions',
    description:
      'Recurring maintenance plans for residential, commercial, and church properties that help prevent bigger repair and emergency costs.',
    url: 'https://www.bensonhomesolutions.com/plans',
    images: ['/opengraph-image'],
  },
}

export default function PlansPage() {
  return <PlansPageClient />
}
