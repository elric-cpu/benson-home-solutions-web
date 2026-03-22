import RotRiskSimulator from './client';

export const metadata = {
  title: 'Rot Risk Simulator | Benson Home Solutions',
  description: 'How long until a $150 gutter cleaning turns into a $15,000 siding restoration? Use our interactive Rot Clock to find out.',
};

export default function Page() {
  return <RotRiskSimulator />;
}
