'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

export function MobileActionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on emergency page to avoid UI conflict
  if (!isVisible || pathname === '/emergency') return null;

  return (
    <div
      className="border-slate/10 shadow-up animate-in slide-in-from-bottom fixed right-0 bottom-0 left-0 z-50 border-t bg-white/95 p-4 backdrop-blur-md duration-300 md:hidden"
      role="complementary"
      aria-label="Quick Actions"
    >
      <div className="flex gap-3">
        <a href={`tel:${BUSINESS.phone}`} className="flex-1">
          <Button className="w-full font-bold shadow-md" size="lg">
            Call Now
          </Button>
        </a>
        <a href="/contact" className="flex-1">
          <Button
            variant="outline"
            className="w-full font-bold shadow-sm"
            size="lg"
          >
            Get Quote
          </Button>
        </a>
      </div>
    </div>
  );
}
