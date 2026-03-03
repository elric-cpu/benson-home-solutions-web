import type { Metadata } from 'next';
import { MaintenanceConfigurator } from './MaintenanceConfigurator';

export const metadata: Metadata = {
  title: 'Maintenance Plan Configurator',
  description:
    'Generate a personalized property maintenance plan using AI-powered recommendations and fixed-rate pricing.',
};

export default function MaintenanceConfiguratorPage() {
  return (
    <main className="min-h-screen">
      <MaintenanceConfigurator />
    </main>
  );
}
