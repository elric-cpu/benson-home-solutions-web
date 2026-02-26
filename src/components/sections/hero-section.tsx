'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { COMPANY, ROUTES } from '@/lib/constants';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    lqip?: string;
  };
  overlay?: boolean;
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function HeroSection({
  title,
  subtitle,
  ctaText = 'Get a Free Estimate',
  ctaHref = ROUTES.CONTACT,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  overlay = true,
  centered = true,
  size = 'lg',
}: HeroSectionProps) {
  const heights = {
    sm: 'min-h-[40vh]',
    md: 'min-h-[55vh]',
    lg: 'min-h-[70vh]',
  };

  return (
    <section
      className={`relative flex items-center ${heights[size]} w-full overflow-hidden`}
    >
      {backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          fill
          priority
          className="object-cover"
          placeholder={backgroundImage.lqip ? 'blur' : 'empty'}
          blurDataURL={backgroundImage.lqip}
          sizes="100vw"
        />
      )}

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-oxblood)]/85 to-[var(--color-oxblood)]/60" />
      )}

      <div
        className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${
          centered ? 'text-center' : 'text-left'
        }`}
      >
        <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            {subtitle}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>

          {secondaryCtaText && secondaryCtaHref && (
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
            </Button>
          )}
        </div>

        <p className="mt-4 text-sm text-white/70">
          {COMPANY.LICENSE} &middot; Serving the Mid-Willamette Valley &amp; Harney County
        </p>
      </div>
    </section>
  );
}
