import type { Metadata, Viewport } from 'next';
import { sourceSans3 } from '@/lib/fonts';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { getOrganizationSchema } from '@/lib/schema/organization';
import './globals.css';
import { AIChat } from '@/components/AIChat';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bensonhomesolutions.com'),
  title: {
    default: 'Benson Home Solutions | Repairs, Restoration, and Maintenance',
    template: '%s | Benson Home Solutions',
  },
  description:
    'Licensed Oregon contractor for post-inspection repairs, water damage restoration, mold mitigation, maintenance, property preservation, and weatherization. Serving the Mid-Willamette Valley and Harney County.',
  keywords: [
    'Oregon contractor',
    'post inspection repairs Oregon',
    'lender required repairs Oregon',
    'water damage restoration',
    'mold mitigation Oregon',
    'licensed contractor CCB 258533',
    'Benson Home Solutions',
  ],
  authors: [{ name: 'Benson Home Solutions' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Benson Home Solutions',
    url: 'https://www.bensonhomesolutions.com',
    title: 'Benson Home Solutions | Repairs, Restoration, and Maintenance',
    description: 'Licensed, bonded, and insured Oregon contractor serving the Mid-Willamette Valley and Harney County.',
    images: ['/opengraph-image'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className={sourceSans3.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-cream text-charcoal">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:text-black focus:z-50 focus:top-0 focus:left-0">
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
