import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bensonhomesolutions.com'),
  title: {
    default: 'Benson Home Solutions | Licensed Oregon Contractor CCB #258533',
    template: '%s | Benson Home Solutions',
  },
  description:
    'Licensed, bonded, and insured Oregon contractor serving the Mid-Willamette Valley and Harney County. Home maintenance, emergency restoration, remodeling, and commercial construction. CCB #258533.',
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {/* TODO: Agent 06 — Header/Nav component */}
        <main id="main-content">{children}</main>
        {/* TODO: Agent 06 — Footer component */}
      </body>
    </html>
  );
}
