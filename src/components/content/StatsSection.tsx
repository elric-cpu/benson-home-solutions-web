import { Container, Section } from '@/components/ui';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, ShieldCheck, Star, Clock } from 'lucide-react';
import { getStatsContent } from '@/lib/content/site-content';

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  ShieldCheck,
  Star,
  Clock,
};

export async function StatsSection() {
  const stats = await getStatsContent();

  return (
    <Section variant="oxblood" spacing="md">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon || 'Star'] || Star;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-cream/10 rounded-2xl">
                  <IconComponent className="w-8 h-8 text-cream" />
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
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
