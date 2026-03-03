'use client';

import Link from 'next/link';
import { Button, RichHero } from '@/components/ui';
import { HERO_ASSETS, HERO_VIDEOS } from '@/lib/constants';

interface HeroSectionProps {
  headline?: string | React.ReactNode;
  description?: string;
  video?: string;
}

export function HeroSection({
  headline,
  description,
  video,
}: HeroSectionProps) {
  return (
    <RichHero
      title={
        headline || (
          <>
            Property Protection
            <br className="hidden sm:inline" />
            Built on Reliability
          </>
        )
      }
      description={
        description ||
        'We don’t just fix damage; we prevent it. From local maintenance programs to 24/7 emergency restoration, Benson Home Solutions provides the professional oversight your property deserves. Licensed, bonded, and ready to work.'
      }
      backgroundImage={HERO_ASSETS.homepage}
      videoBackground={video || HERO_VIDEOS.homepage}
      badge="Mid-Willamette Valley | CCB #258533"
    >
      <Link href="/tools/cost-calculator">
        <Button size="lg" variant="secondary">
          Calculate True Home Cost
        </Button>
      </Link>
      <Link href="/contact">
        <Button
          variant="outline"
          size="lg"
          className="text-cream border-cream/20 hover:bg-cream hover:text-oxblood bg-white/10"
        >
          Request a Quote
        </Button>
      </Link>
    </RichHero>
  );
}
