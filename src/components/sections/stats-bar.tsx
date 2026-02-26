interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: '20+', label: 'Years Experience' },
  { value: '2,500+', label: 'Projects Completed' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '24/7', label: 'Emergency Service' },
];

export function StatsBar({ stats = defaultStats }: StatsBarProps) {
  return (
    <section className="border-y border-[var(--color-border)] bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-[var(--color-oxblood)] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[var(--color-slate)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
