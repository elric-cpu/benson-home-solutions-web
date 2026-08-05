import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Benson Construction ERP',
  description: 'Modular project, estimating, cost-catalog, and AI workspace for Benson Home Solutions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ErpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
