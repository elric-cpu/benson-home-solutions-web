import type { Metadata } from 'next';
import './globals.css';
import { AIChat } from '@/components/AIChat';

export const metadata: Metadata = {
  title: 'Benson Home Solutions | Maintenance-First General Contractor',
  description: 'Oregon CCB #258533. Specialized home maintenance and restoration for the Mid-Willamette Valley and Harney County.',
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
  return (
    <html lang="en">
      <body className="bg-cream text-maroon font-calibri antialiased">
        <header className="border-b border-maroon/10 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">Benson Home Solutions</h1>
            <nav>
              <ul className="flex space-x-6 font-bold uppercase text-xs tracking-widest">
                <li><a href="/" className="hover:text-maroon/70">Home</a></li>
                <li><a href="/calculator" className="hover:text-maroon/70">Calculator</a></li>
                <li><a href="/maintenance" className="hover:text-maroon/70">Plans</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main min-h-screen>{children}</main>
        <footer className="bg-maroon text-cream py-12 mt-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Benson Home Solutions</h2>
            <p className="opacity-80">Oregon CCB #258533</p>
            <div className="mt-8 text-sm space-y-2 opacity-60 font-medium">
              <p>Mid-Willamette Valley: Albany, Lebanon, Sweet Home, Corvallis</p>
              <p>Harney County: Burns, Riley, Drewsey, Hines</p>
            </div>
          </div>
        </footer>
        <AIChat />
      </body>
    </html>
  );
}
