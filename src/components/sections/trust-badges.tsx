import { COMPANY } from '@/lib/constants';

export function TrustBadges() {
  const badges = [
    { label: COMPANY.LICENSE, icon: '🏛️' },
    { label: 'Fully Insured', icon: '🛡️' },
    { label: 'Free Estimates', icon: '📋' },
    { label: '24/7 Emergency', icon: '🚨' },
    { label: 'Satisfaction Guaranteed', icon: '✅' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2 rounded-full bg-[var(--color-cream)] px-4 py-2 text-sm font-medium text-[var(--color-charcoal)] ring-1 ring-[var(--color-border)]"
        >
          <span aria-hidden="true">{badge.icon}</span>
          {badge.label}
        </div>
      ))}
    </div>
  );
}
