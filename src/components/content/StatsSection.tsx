import { Container, Section } from '@/components/ui';
import { TrendingUp, ShieldCheck, Star, Clock } from 'lucide-react';

const stats = [
  {
    label: 'Maintenance ROI',
    value: '3x',
    description:
      'Every $1 spent on proactive care saves $3 in emergency repairs.',
    icon: TrendingUp,
    citation: 'Industry Standard (BOMA)',
  },
  {
    label: 'Property Protection',
    value: '100%',
    description:
      'Zero undetected leaks for clients on our monthly protection plan.',
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
    description:
      'Based on maintenance, restoration, and repair work across Oregon properties.',
    icon: Star,
  },
];

export function StatsSection() {
  return (
    <Section variant="oxblood" spacing="md">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-cream/10 mb-4 rounded-2xl p-3">
                <stat.icon className="text-cream h-8 w-8" />
              </div>
              <div className="text-cream mb-2 text-4xl font-black md:text-5xl">
                {stat.value}
              </div>
              <div className="text-cream/60 mb-3 text-sm font-bold tracking-widest uppercase">
                {stat.label}
              </div>
              <p className="text-cream/80 max-w-[200px] text-sm leading-relaxed">
                {stat.description}
              </p>
              {stat.citation && (
                <span className="text-cream/40 mt-2 text-[10px] tracking-tighter uppercase italic">
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
