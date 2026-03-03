'use client';

import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="border-border bg-surface border-t md:hidden">
      <Container>
        <nav className="space-y-1 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="text-charcoal hover:text-oxblood hover:bg-cream/50 block rounded-lg px-3 py-2.5 text-base font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="border-border mt-4 space-y-3 border-t pt-4">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-oxblood block px-3 py-2 text-base font-semibold"
            >
              {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="bg-oxblood text-cream hover:bg-oxblood/90 block rounded-lg px-5 py-3 text-center text-base font-semibold transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </Container>
    </div>
  );
}
