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
        'bg-oxblood relative flex min-h-[70vh] items-center overflow-hidden py-20 md:py-32',
        className,
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
            className="absolute inset-0 h-full w-full object-cover"
            // @ts-expect-error - fetchPriority is supported in modern browsers but not yet in all TS types
            fetchPriority="high"
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
          className="from-oxblood via-oxblood/90 absolute inset-0 bg-gradient-to-r to-transparent"
          style={{ opacity: overlayOpacity / 100 }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {badge && (
            <div className="bg-cream/10 border-cream/20 text-cream animate-fade-in mb-6 inline-block rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
              {badge}
            </div>
          )}
          <h1 className="text-cream text-4xl leading-[1.1] font-black tracking-tight drop-shadow-sm md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <div className="text-cream/80 mt-6 max-w-2xl text-lg leading-relaxed drop-shadow-sm md:text-xl">
              {description}
            </div>
          )}
          {children && (
            <div className="animate-slide-up mt-10 flex flex-wrap gap-4">
              {children}
            </div>
          )}
        </div>
      </Container>

      {/* Bottom Accent */}
      <div className="from-cream/10 pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t to-transparent" />
    </section>
  );
}
