import { TrueCostCalculator } from '../TrueCostCalculator';

export const metadata = {
  title: 'Homeownership Cost Calculator Widget | Benson Home Solutions',
  description: 'Embeddable tool to calculate the true cost of homeownership.',
  robots: 'noindex, nofollow',
};

export default function EmbedPage() {
  return (
    <main className="bg-cream min-h-screen">
      <TrueCostCalculator isEmbed={true} />
      <div className="bg-cream border-slate/10 text-slate/50 border-t px-4 py-3 text-center text-[10px]">
        Powered by{' '}
        <a
          href="https://bensonhomesolutions.com"
          target="_blank"
          rel="noopener"
          className="hover:text-oxblood font-bold underline transition-colors"
        >
          Benson Home Solutions
        </a>
      </div>
    </main>
  );
}
