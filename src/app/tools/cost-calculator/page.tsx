import { Metadata } from 'next';
import { TrueCostCalculator } from './TrueCostCalculator';
import { FAQSection } from '@/components/seo/FAQSection';

export const metadata: Metadata = {
  title: 'True Cost of Homeownership Calculator | Oregon | Benson Home Solutions',
  description:
    'Calculate the real annual cost of owning a home in Albany, Lebanon, or Harney County. Factor in property taxes, insurance, deferred maintenance, and hidden repair expenses.',
};

const faqItems = [
  {
    question: 'How much does home maintenance cost per year in Oregon?',
    answer: 'The true cost of home maintenance in Oregon typically ranges from 1% to 4% of your home\'s value annually. However, deferred maintenance can exponentially increase this cost. For a $400,000 home in the Mid-Willamette Valley, expect to budget $4,000 to $16,000 per year to avoid five-figure emergency restoration claims.'
  },
  {
    question: 'What is the biggest hidden cost of homeownership?',
    answer: 'Deferred maintenance is the largest hidden cost. Skipping routine checks on roofing, gutters, and plumbing can lead to catastrophic water damage. Our data shows that unaddressed building envelope issues escalate into repair costs averaging 3.5x more than proactive maintenance.'
  },
  {
    question: 'How can I reduce my annual home repair costs?',
    answer: 'The most effective way to lower long-term repair costs is through systematic, proactive oversight. Benson Home Solutions offers preventative maintenance subscriptions starting around $150-$250/month in Albany and Harney County, which include seasonal inspections and priority emergency dispatch to catch issues before they become expensive.'
  }
];

export default function CostCalculatorPage() {
  return (
    <main>
      <TrueCostCalculator />
      <FAQSection items={faqItems} className="bg-white" title="Understanding the True Cost of Homeownership" />
    </main>
  );
}
