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
    <div className="md:hidden border-t border-border bg-surface">
      <Container>
        <nav className="py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="block px-3 py-2.5 text-base font-medium text-charcoal hover:text-oxblood hover:bg-cream/50 rounded-lg transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-border space-y-3">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="block px-3 py-2 text-base font-semibold text-oxblood"
            >
              📞 {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="block text-center px-5 py-3 text-base font-semibold rounded-lg bg-oxblood text-cream hover:bg-oxblood/90 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </Container>
    </div>
  );
}
