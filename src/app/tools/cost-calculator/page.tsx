import RotRiskSimulator from './client';

export const metadata = {
  title: 'Dry Rot and Deferred Maintenance Cost Calculator',
  description:
    'Estimate how deferred exterior maintenance can turn a small moisture fix into a larger repair bill for an Oregon property, with methodology and pricing context.',
  alternates: {
    canonical: '/tools/cost-calculator',
  },
  openGraph: {
    title: 'Dry Rot and Deferred Maintenance Cost Calculator | Benson Home Solutions',
    description:
      'Estimate how deferred exterior maintenance can turn a small moisture fix into a larger repair bill for an Oregon property, with methodology and pricing context.',
    url: 'https://www.bensonhomesolutions.com/tools/cost-calculator',
    images: ['/opengraph-image'],
  },
};

export default function Page() {
  return <RotRiskSimulator />;
}
