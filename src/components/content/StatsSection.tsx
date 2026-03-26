import { Container, Section } from '@/components/ui';
import { TrendingUp, ShieldCheck, Star, Clock } from 'lucide-react';

const stats = [
  {
    label: 'Maintenance ROI',
    value: '3x',
    description: 'Every $1 spent on proactive care saves $3 in emergency repairs.',
    icon: TrendingUp,
    citation: 'Industry Standard (BOMA)',
  },
  {
    label: 'Property Protection',
    value: '100%',
    description: 'Zero undetected leaks for clients on our monthly protection plan.',
    icon: ShieldCheck,
  },
  {
    label: 'Response Time',
    value: '< 4hr',
    description: 'Guaranteed emergency response for subscription members.',
    icon: Clock,
  },
  {
    label: 'Customer Rating',
    value: '4.9/5',
    description: 'Based on maintenance, restoration, and repair work across Oregon properties.',
    icon: Star,
  },
];

export function StatsSection() {
  return (
    <Section variant="oxblood" spacing="md">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-cream/10 rounded-2xl">
                <stat.icon className="w-8 h-8 text-cream" />
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-cream">
                {stat.value}
              </div>
              <div className="text-sm font-bold uppercase tracking-widest mb-3 text-cream/60">
                {stat.label}
              </div>
              <p className="text-sm text-cream/80 leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
              {stat.citation && (
                <span className="mt-2 text-[10px] uppercase tracking-tighter text-cream/40 italic">
                  Source: {stat.citation}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
