import type { Metadata, Viewport } from 'next';
import { sourceSans3 } from '@/lib/fonts';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { getOrganizationSchema } from '@/lib/schema/organization';
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
