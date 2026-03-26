import ProjectBuilderClient from './client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Project Cost Builder | Oregon Contractor Pricing',
  description:
    'Plan your next repair or remodeling project using our transparent, real-time local cost database (powered by 1build). Build your estimate line-by-line.',
  alternates: {
    canonical: '/tools/project-builder',
  },
  openGraph: {
    title: 'Interactive Project Cost Builder | Benson Home Solutions',
    description:
      'Plan your next repair or remodeling project using our transparent, real-time local cost database (powered by 1build). Build your estimate line-by-line.',
    url: 'https://www.bensonhomesolutions.com/tools/project-builder',
    images: ['/opengraph-image'],
  },
};

export default function ProjectBuilderPage() {
  return <ProjectBuilderClient />;
}