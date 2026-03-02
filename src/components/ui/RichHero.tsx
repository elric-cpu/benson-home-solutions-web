'use client';

import Image from 'next/image';
import { Container } from './Container';
import { cn } from '@/lib/utils';

interface RichHeroProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  backgroundImage: string;
  videoBackground?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  badge?: string;
  className?: string;
  overlayOpacity?: number;
}

export function RichHero({
  title,
  description,
  backgroundImage,
  videoBackground,
  imageAlt = '',
  children,
  badge,
  className,
  overlayOpacity = 60,
}: RichHeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[70vh] flex items-center overflow-hidden bg-oxblood py-20 md:py-32',
        className
      )}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {videoBackground ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundImage}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoBackground} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={backgroundImage}
            alt={imageAlt}
            fill
            priority
            className="object-cover transition-transform duration-10000 hover:scale-110"
          />
        )}
        
        {/* Dynamic Branding Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-oxblood via-oxblood/90 to-transparent" 
          style={{ opacity: overlayOpacity / 100 }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-block px-3 py-1 rounded-full bg-cream/10 border border-cream/20 text-cream text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm animate-fade-in">
              {badge}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-cream leading-[1.1] tracking-tight drop-shadow-sm">
            {title}
          </h1>
          {description && (
            <div className="mt-6 text-lg md:text-xl text-cream/80 leading-relaxed max-w-2xl drop-shadow-sm">
              {description}
            </div>
          )}
          {children && (
            <div className="mt-10 flex flex-wrap gap-4 animate-slide-up">
              {children}
            </div>
          )}
        </div>
      </Container>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream/10 to-transparent pointer-events-none" />
    </section>
  );
}
