import type { Metadata, Viewport } from 'next';
import { sourceSans3 } from '@/lib/fonts';
import { Header, Footer } from '@/components/layout';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: 'Benson Home Solutions | Harney County General Contractor',
    template: '%s | Benson Home Solutions',
  },
  description: 'Benson Home Solutions provides construction, repair, reconstruction, demolition, property maintenance, and rural project services throughout Harney County, Oregon. CCB #258533.',
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BUSINESS.name,
    url: BUSINESS.url,
    title: 'Benson Home Solutions | Harney County General Contractor',
    description: 'Construction, repair, post-fire recovery, property maintenance, and rural project work throughout Harney County, Oregon.',
    images: [{ url: '/images/generated/hero-exterior.png', width: 1200, height: 630, alt: 'Benson Home Solutions construction work in Oregon' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#722F37',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${BUSINESS.url}/#business`,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: BUSINESS.url,
        logo: `${BUSINESS.url}/favicon.svg`,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        identifier: BUSINESS.license,
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Harney County, Oregon' },
          ...SERVICE_AREAS.harneyCounty.map(name => ({ '@type': 'Place', name: `${name}, Oregon` })),
        ],
        sameAs: [BUSINESS.facebook, BUSINESS.gbp],
      },
      {
        '@type': 'WebSite',
        '@id': `${BUSINESS.url}/#website`,
        url: BUSINESS.url,
        name: BUSINESS.name,
        publisher: { '@id': `${BUSINESS.url}/#business` },
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <html lang="en" className={sourceSans3.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-[#FAF8F3] text-[#2D2D2D]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
