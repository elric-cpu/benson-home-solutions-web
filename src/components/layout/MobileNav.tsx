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
    <div className="md:hidden border-t border-oxblood-light bg-oxblood text-cream shadow-inner animate-in slide-in-from-top duration-300">
      <Container>
        <nav className="py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-3 text-lg font-medium text-cream/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
            {/* Main Line */}
            <div className="flex flex-col gap-1 px-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-cream/60">Main Office</span>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-3 text-xl font-bold text-white"
              >
                <Phone className="w-5 h-5 text-cream/80" /> {BUSINESS.phone}
              </a>
            </div>

            {/* Emergency Button */}
            <button
              onClick={handleEmergencyClick}
              className="w-full bg-red-700 hover:bg-red-600 text-white p-4 rounded-xl flex items-center justify-between border border-red-500 shadow-lg transition-transform active:scale-95"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 animate-pulse" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs uppercase font-bold text-red-100">Emergency</span>
                  <span className="text-lg font-bold">Call & Text Now</span>
                </div>
              </div>
              <MessageSquare className="w-5 h-5 opacity-70" />
            </button>

            <Link
              href="/contact"
              onClick={onClose}
              className="block w-full text-center px-5 py-4 text-lg font-bold rounded-xl bg-white text-oxblood hover:bg-cream transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </Container>
    </div>
  );
}
