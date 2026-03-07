'use client';

import { Button } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

export function EmergencyActionBar() {
  const emergencyPhone = BUSINESS.afterhoursPhone;
  const smsBody = encodeURIComponent(
    'I need emergency assistance for [Address/Problem]. Please call me back immediately.',
  );

  return (
    <div
      className="border-oxblood/10 shadow-up animate-in slide-in-from-bottom bg-cream/95 pb-safe fixed right-0 bottom-0 left-0 z-[60] border-t p-4 backdrop-blur-md duration-300 md:hidden"
      role="complementary"
      aria-label="Emergency Actions"
    >
      <div className="mb-3 text-center">
        <p className="text-oxblood/80 text-[10px] font-bold tracking-widest uppercase">
          🚨 24/7 Emergency Dispatch: Mid-Willamette Valley & Harney County
        </p>
      </div>
      <div className="flex gap-3">
        <a
          href={`tel:${emergencyPhone}`}
          className="flex-[2]"
          aria-label={`Call emergency number ${emergencyPhone}`}
        >
          <Button
            variant="emergency"
            className="animate-emergency-pulse w-full font-bold shadow-lg"
            size="lg"
            aria-label="Call Emergency Number Now"
          >
            CALL NOW: {emergencyPhone}
          </Button>
        </a>
        <a
          href={`sms:${emergencyPhone}?body=${smsBody}`}
          className="flex-1"
          aria-label={`Text emergency number ${emergencyPhone}`}
        >
          <Button
            variant="outline"
            className="border-oxblood text-oxblood hover:bg-oxblood/5 w-full font-bold shadow-sm"
            size="lg"
            aria-label="Send Emergency Help Text"
          >
            TEXT HELP
          </Button>
        </a>
      </div>
    </div>
  );
}
