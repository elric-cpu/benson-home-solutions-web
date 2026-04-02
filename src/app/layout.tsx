import type { Metadata, Viewport } from 'next';
import { sourceSans3 } from '@/lib/fonts';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { BUSINESS } from '@/lib/constants';
import './globals.css';
import { AIChat } from '@/components/AIChat';

export const metadata: Metadata = {
  metadataBase: new URL('https://bensonhomesolutions.com'),
  title: {
    default: 'Benson Home Solutions | Licensed Oregon Contractor',
    template: '%s | Benson Home Solutions',
  },
  description:
    'Licensed Oregon contractor for home maintenance, emergency restoration, & remodeling. Serving the Mid-Willamette Valley & Harney County. CCB #258533.',
  keywords: [
    'Oregon contractor',
    'home maintenance Salem Oregon',
    'water damage restoration',
    'emergency restoration Oregon',
    'licensed contractor CCB 258533',
    'Benson Home Solutions',
  ],
  authors: [{ name: 'Benson Home Solutions' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Benson Home Solutions',
    url: 'https://bensonhomesolutions.com',
    title: 'Benson Home Solutions | Licensed Oregon Contractor',
    description: 'Licensed, bonded, and insured Oregon contractor serving the Mid-Willamette Valley and Harney County.',
    images: [
      {
        url: '/images/generated/hero-exterior.png',
        width: 1200,
        height: 630,
        alt: 'Benson Home Solutions - Professional Oregon Contractor',
      },
    ],
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
};

export const viewport: Viewport = {
  themeColor: '#4C0C14',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Root Layout - Rebuild V1 (2026)
 * Strict maintainability: Keep under 450 lines.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: BUSINESS.name,
    url: 'https://bensonhomesolutions.com',
    logo: 'https://bensonhomesolutions.com/favicon.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      contactType: 'customer service',
      areaServed: ['Albany', 'Salem', 'Corvallis', 'Keizer', 'Lebanon', 'Burns', 'Hines', 'Drewsey'],
      availableLanguage: 'en',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Albany',
      addressRegion: 'OR',
      postalCode: '97321',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Albany' },
      { '@type': 'City', name: 'Salem' },
      { '@type': 'City', name: 'Corvallis' },
      { '@type': 'City', name: 'Keizer' },
      { '@type': 'City', name: 'Lebanon' },
      { '@type': 'City', name: 'Burns' },
      { '@type': 'City', name: 'Hines' },
      { '@type': 'City', name: 'Drewsey' },
    ],
    sameAs: [
      'https://maps.app.goo.gl/ad4eywwWonPsSZXP9',
      'https://www.facebook.com/profile.php?id=61565667928376',
      'https://search.ccb.state.or.us/search/search_results.aspx?license_number=258533',
      'https://www.bbb.org/us/or/albany/profile/general-contractor/benson-home-solutions-1296-1000137452',
      'https://www.yelp.com/biz/benson-home-solutions-albany',
    ],
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
  };

  return (
    <html lang="en" className={sourceSans3.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-cream text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <AIChat />
      </body>
    </html>
  );
}
