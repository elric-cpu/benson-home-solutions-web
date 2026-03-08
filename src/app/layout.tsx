import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { sourceSans3 } from '@/lib/fonts';
import { Header, Footer, MobileActionBar } from '@/components/layout';
import { DeferredComponents } from '@/components/layout/DeferredComponents';
import { OrganizationJsonLd } from '@/components/seo/json-ld';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bensonhomesolutions.com'),
  title: {
    default: 'Oregon Contractor CCB #258533 | Benson Home Solutions',
    template: '%s | Benson Home Solutions',
  },
  description:
    'Licensed Oregon General Contractor (CCB #258533) specializing in property maintenance subscriptions, emergency water damage restoration, and commercial facility management in the Mid-Willamette Valley.',
  keywords: [
    'Oregon General Contractor',
    'Property Maintenance Subscriptions',
    'Water Damage Restoration Albany OR',
    'Emergency Mitigation Services',
    'Commercial Facility Management',
    'Benson Home Solutions',
  ],
  authors: [
    { name: 'Benson Home Solutions', url: 'https://bensonhomesolutions.com' },
  ],
  creator: 'Benson Home Solutions',
  publisher: 'Benson Home Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Benson Home Solutions',
    title: 'Oregon Contractor CCB #258533 | Benson Home Solutions',
    description:
      'Licensed Oregon General Contractor specializing in maintenance subscriptions and emergency restoration.',
    url: 'https://bensonhomesolutions.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'date-modified': new Date().toISOString(),
  },
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  themeColor: '#4C0C14',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans3.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <OrganizationJsonLd />
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Suspense fallback={null}>
          <MobileActionBar />
        </Suspense>
        <DeferredComponents />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
