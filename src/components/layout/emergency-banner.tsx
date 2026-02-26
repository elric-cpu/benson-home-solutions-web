import { BUSINESS } from '@/lib/constants';

export function EmergencyBanner() {
  return (
    <div className="bg-primary text-cream">
      <div className="container-page flex items-center justify-between py-2 text-sm">
        <p className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-400" aria-hidden="true" />
          <span className="font-semibold">24/7 Emergency Service Available</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${BUSINESS.emergencyPhoneRaw}`}
            className="font-bold text-cream no-underline hover:text-cream-dark transition-colors"
          >
            {BUSINESS.emergencyPhone}
          </a>
          <span className="hidden text-cream/60 sm:inline">|</span>
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="hidden font-medium text-cream/90 no-underline hover:text-cream sm:inline transition-colors"
          >
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
