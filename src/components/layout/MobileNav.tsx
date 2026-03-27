'use client';

import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { Phone, AlertCircle, MessageSquare } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  if (!isOpen) return null;

  const handleEmergencyClick = () => {
    window.location.href = `tel:${BUSINESS.afterhoursPhone.replace(/[^0-9]/g, '')}`;
    setTimeout(() => {
      window.location.href = `sms:${BUSINESS.afterhoursPhone.replace(/[^0-9]/g, '')}?body=EMERGENCY: I need immediate assistance at [Address]`;
    }, 500);
  };

  return (
    <div className="border-oxblood-light bg-oxblood text-cream animate-in slide-in-from-top border-t shadow-inner duration-300 md:hidden">
      <Container>
        <nav className="space-y-2 py-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="text-cream/90 block rounded-lg px-4 py-3 text-lg font-medium transition-all hover:bg-white/10 hover:text-white"
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
            {/* Main Line */}
            <div className="flex flex-col gap-1 px-4">
              <span className="text-cream/60 text-[10px] font-bold tracking-widest uppercase">
                Main Office
              </span>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-3 text-xl font-bold text-white"
              >
                <Phone className="text-cream/80 h-5 w-5" /> {BUSINESS.phone}
              </a>
            </div>

            {/* Emergency Button */}
            <button
              onClick={handleEmergencyClick}
              className="flex w-full items-center justify-between rounded-xl border border-red-500 bg-red-700 p-4 text-white shadow-lg transition-transform hover:bg-red-600 active:scale-95"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 animate-pulse" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs font-bold text-red-100 uppercase">
                    Emergency
                  </span>
                  <span className="text-lg font-bold">Call & Text Now</span>
                </div>
              </div>
              <MessageSquare className="h-5 w-5 opacity-70" />
            </button>

            <Link
              href="/contact"
              onClick={onClose}
              className="text-oxblood hover:bg-cream block w-full rounded-xl bg-white px-5 py-4 text-center text-lg font-bold transition-colors"
            >
              Start a Repair Request
            </Link>
          </div>
        </nav>
      </Container>
    </div>
  );
}
