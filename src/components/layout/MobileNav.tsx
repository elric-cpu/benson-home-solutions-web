'use client';

import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { Phone } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  if (!isOpen) return null;
  return (
    <div className="border-t border-[#722F37]/15 bg-[#FAF8F3] md:hidden">
      <Container>
        <nav className="space-y-1 py-4" aria-label="Mobile navigation">
          {navigation.map(item => <Link key={item.name} href={item.href} onClick={onClose} className="block rounded-md px-3 py-3 text-base font-semibold text-[#2D2D2D] hover:bg-[#F5F1E8] hover:text-[#722F37]">{item.name}</Link>)}
          <div className="mt-4 space-y-3 border-t border-[#722F37]/15 pt-4">
            <a href={`tel:${BUSINESS.phoneHref}`} className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-[#722F37]"><Phone className="h-4 w-4" aria-hidden="true" /> {BUSINESS.phone}</a>
            <Link href="/request-estimate" onClick={onClose} className="block rounded-md bg-[#722F37] px-5 py-3 text-center text-base font-semibold text-white hover:bg-[#5C252C]">Request an Estimate</Link>
          </div>
        </nav>
      </Container>
    </div>
  );
}
