import CalculatorPageWithSuspense from './page-with-suspense';

export const metadata = {
  title: 'Maintenance Service Cost Calculator',
  description:
    'Calculate exact Benson Home Solutions maintenance plan pricing and compare it against common maintenance budgeting standards.',
  alternates: {
    canonical: '/calculator',
  },
  openGraph: {
    title: 'Maintenance Service Cost Calculator | Benson Home Solutions',
    description:
      'Calculate exact Benson Home Solutions maintenance plan pricing and compare it against common maintenance budgeting standards.',
    url: 'https://www.bensonhomesolutions.com/calculator',
    images: ['/opengraph-image'],
  },
};

export default function Page() {
  return <CalculatorPageWithSuspense />;
}
