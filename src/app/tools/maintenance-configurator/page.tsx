import type { Metadata } from 'next';
import { MaintenanceConfigurator } from './MaintenanceConfigurator';

export const metadata: Metadata = {
  title: 'Maintenance Plan Configurator',
  description:
    'Generate a personalized property maintenance plan using AI-powered recommendations and fixed-rate pricing.',
};

interface Props {
  searchParams: Promise<{ propertyHash?: string }>;
}

export default async function MaintenanceConfiguratorPage({
  searchParams,
}: Props) {
  const { propertyHash } = await searchParams;

  return (
    <main className="min-h-screen">
      <MaintenanceConfigurator propertyHash={propertyHash} />
    </main>
  );
}
