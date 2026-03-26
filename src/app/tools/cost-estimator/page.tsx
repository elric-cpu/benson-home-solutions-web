import AssetLifecyclePlanner from './client';

export const metadata = {
  title: '10-Year Building Reserve and Maintenance Cost Estimator',
  description:
    'Estimate reserve needs and maintenance liability for commercial and nonprofit properties, with methodology and planning context.',
  alternates: {
    canonical: '/tools/cost-estimator',
  },
  openGraph: {
    title: '10-Year Building Reserve and Maintenance Cost Estimator | Benson Home Solutions',
    description:
      'Estimate reserve needs and maintenance liability for commercial and nonprofit properties, with methodology and planning context.',
    url: 'https://www.bensonhomesolutions.com/tools/cost-estimator',
    images: ['/opengraph-image'],
  },
};

export default function Page() {
  return <AssetLifecyclePlanner />;
}
