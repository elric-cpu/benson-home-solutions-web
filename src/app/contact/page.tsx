import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Send the repair list, address, photos, or scope details. Benson Home Solutions handles repair, mitigation, maintenance, and emergency work across Oregon.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Benson Home Solutions',
    description:
      'Send the repair list, address, photos, or scope details. Benson Home Solutions handles repair, mitigation, maintenance, and emergency work across Oregon.',
    url: 'https://www.bensonhomesolutions.com/contact',
    images: ['/opengraph-image'],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
