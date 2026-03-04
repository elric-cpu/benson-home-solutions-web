import React from 'react';
import { Container, Section } from '@/components/ui';
import { TrueCostCalculator } from '../TrueCostCalculator';

export const metadata = {
  title: 'Home Cost Calculator Widget',
  description: 'Embeddable True Cost of Homeownership Calculator by Benson Home Solutions.',
  robots: 'noindex, follow', // Don't index the embed page itself
};

/**
 * Embeddable version of the calculator for third-party websites.
 * Minimalist design with backlink.
 */
export default function CalculatorEmbedPage() {
  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <main className="flex-1">
        <Section spacing="sm">
          <Container size="narrow">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-oxblood text-cream text-center">
                <h1 className="text-lg font-bold">True Cost of Homeownership</h1>
              </div>
              <div className="p-6">
                <TrueCostCalculator isEmbed={true} />
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <a 
                  href="https://bensonhomesolutions.com" 
                  target="_blank" 
                  rel="noopener"
                  className="text-xs font-bold text-slate-400 hover:text-oxblood transition-colors"
                >
                  Powered by Benson Home Solutions
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
