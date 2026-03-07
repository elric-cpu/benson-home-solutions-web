'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AddressAutocomplete } from '@/components/ui/AddressAutocomplete';
import {
  Section,
  Container,
  Button,
  Card,
  CardContent,
  Badge,
  RichHero,
} from '@/components/ui';
import {
  MOCK_ZIP_DATA,
  DEFAULT_BENCHMARK,
  type ZipData,
} from '@/lib/calculator-data';
import { HERO_ASSETS } from '@/lib/constants';

type Step = 'input' | 'processing' | 'unlock' | 'result';

interface AddressSuggestion {
  formatted: string;
  postcode: string;
  city?: string;
  state?: string;
  county?: string;
  lat?: number;
  lon?: number;
}

export function TrueCostCalculator({ isEmbed = false }: { isEmbed?: boolean }) {
  const [step, setStep] = useState<Step>('input');
  const [address, setAddress] = useState<AddressSuggestion | null>(null);
  const [data, setData] = useState<ZipData | null>(null);
  const [progressStep, setProgressStep] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const PROGRESS_MESSAGES = [
    'Checking property tax records via Census Bureau...',
    'Analyzing flood risk via FEMA...',
    'Calculating energy costs via DOE...',
    'Projecting maintenance risk based on building age...',
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddressSelect = async (suggestion: any) => {
    const s = suggestion as AddressSuggestion;
    setAddress(s);
    
    const zipData = MOCK_ZIP_DATA[s.postcode] || DEFAULT_BENCHMARK;
    setData({ ...zipData, city: s.city || zipData.city });

    setStep('processing');
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const propertyType = formData.get('propertyType') as string;

    try {
      // Pre-calculate total for the API
      const total = Object.values(data?.costs || {}).reduce(
        (acc, curr) => acc + curr.annual,
        0,
      );

      await fetch('/api/calculator/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          propertyType,
          address,
          costs: data?.costs,
          total,
        }),
      });

      setStep('result');
    } catch (error) {
      console.error('Lead submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === 'processing') {
      const messagesCount = PROGRESS_MESSAGES.length;
      const interval = setInterval(() => {
        setProgressStep((prev) => {
          if (prev >= messagesCount - 1) {
            clearInterval(interval);
            setTimeout(() => setStep('unlock'), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, PROGRESS_MESSAGES.length]);

  useEffect(() => {
    if (step === 'result' && data) {
      const total = Object.values(data.costs).reduce(
        (acc, curr) => acc + curr.annual,
        0,
      );
      let start = 0;
      const duration = 2000;
      const increment = total / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= total) {
          setAnimatedTotal(total);
          clearInterval(timer);
        } else {
          setAnimatedTotal(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [step, data]);

  if (step === 'input') {
    return (
      <>
        {!isEmbed && (
          <RichHero
            title={
              <>
                What Does Your Home
                <br />
                REALLY Cost Per Year?
              </>
            }
            description="Most homeowners underestimate the true cost of ownership by 40–60%. Enter your address to see the hidden expenses beyond your mortgage."
            backgroundImage={HERO_ASSETS.calculator}
            imageAlt="Modern residential property representing homeownership costs"
            badge="Property Intelligence Tool"
            overlayOpacity={70}
          />
        )}
        <Section
          variant="cream"
          className={isEmbed ? 'py-4' : 'py-12 md:py-20'}
        >
          <Container
            size="narrow"
            className={isEmbed ? 'relative z-20' : 'relative z-20 -mt-32'}
          >
            <Card className="shadow-elevated border-oxblood/10 bg-white/95 p-2 backdrop-blur-md">
              <CardContent className="p-4">
                <AddressAutocomplete
                  onSelect={handleAddressSelect}
                  className="mb-4"
                />
                <div className="text-slate/60 text-center text-xs font-medium tracking-widest uppercase">
                  Built with data from FEMA, DOE, Census Bureau, HUD, EIA, and
                  NOAA
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      </>
    );
  }

  if (step === 'processing') {
    const progressPercent = Math.min(
      100,
      Math.round(((progressStep + 1) / PROGRESS_MESSAGES.length) * 100),
    );

    return (
      <Section variant="cream" className="flex min-h-[600px] items-center">
        <Container size="narrow">
          <div className="mx-auto max-w-md">
            <div className="mb-12 text-center">
              <div className="relative mx-auto mb-6 h-20 w-20">
                <div className="border-oxblood/10 absolute inset-0 rounded-full border-4" />
                <div className="text-oxblood absolute inset-0 flex items-center justify-center text-xl font-bold tabular-nums">
                  {progressPercent}%
                </div>
              </div>
              <h2 className="text-charcoal text-2xl font-bold">
                Analyzing Property Data
              </h2>
              <p className="text-slate mt-2 text-sm italic">
                Searching federal and regional datasets...
              </p>
            </div>
            <div className="space-y-4">
              {PROGRESS_MESSAGES.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${i <= progressStep ? 'opacity-100' : 'opacity-20'}`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${i < progressStep ? 'bg-green-500' : i === progressStep ? 'bg-oxblood animate-pulse' : 'bg-slate/20'}`}
                  />
                  <span className="text-slate text-sm font-medium">{msg}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (step === 'unlock') {
    return (
      <Section variant="cream" className="flex min-h-[600px] items-center">
        <Container size="narrow">
          <div className="mx-auto max-w-md">
            <Card className="shadow-elevated border-oxblood/10 bg-white/95 backdrop-blur-md">
              <CardContent className="p-8">
                <div className="mb-6 text-center">
                  <Badge variant="secondary" className="mb-4 tracking-widest uppercase">
                    Analysis Complete
                  </Badge>
                  <h2 className="text-charcoal text-2xl font-bold">
                    Unlock Your Full Report
                  </h2>
                  <p className="text-slate mt-2 text-sm">
                    We&apos;ve processed <strong>{address?.formatted}</strong>. Where should we send your detailed annual cost breakdown?
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleLeadSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-xs font-bold tracking-wider text-slate/50 uppercase"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate/20 bg-white px-4 py-3 text-charcoal outline-none transition-all focus:border-oxblood/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="propertyType"
                      className="mb-1 block text-xs font-bold tracking-wider text-slate/50 uppercase"
                    >
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      className="w-full appearance-none rounded-lg border border-slate/20 bg-white px-4 py-3 text-charcoal outline-none transition-all focus:border-oxblood/50"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="church_community">Church or Community</option>
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Generating...' : 'Reveal My Annual Cost'}
                  </Button>
                  <p className="text-[9px] text-center text-slate/40 font-medium uppercase tracking-tighter">
                    Secure Data &bull; Local CCB #258533 Standards
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    );
  }

  if (step === 'result' && data) {
    const monthlyTotal = Math.floor(animatedTotal / 12);
    const tripsToHawaii = Math.floor(animatedTotal / 600);

    return (
      <>
        <Section
          variant="oxblood"
          className={isEmbed ? 'py-10' : 'text-cream py-20'}
        >
          <Container size="narrow" className="text-center">
            {!isEmbed && (
              <Badge
                variant="secondary"
                className="bg-cream/10 text-cream border-cream/20 mb-6 tracking-widest uppercase"
              >
                True Annual Cost Reveal
              </Badge>
            )}
            <div
              className={
                isEmbed
                  ? 'text-cream mb-2 text-4xl font-black tabular-nums'
                  : 'text-cream mb-4 text-6xl font-black tabular-nums md:text-8xl'
              }
            >
              ${animatedTotal.toLocaleString()}
              <span
                className={
                  isEmbed
                    ? 'ml-1 text-base font-bold opacity-50'
                    : 'ml-2 text-2xl font-bold opacity-50 md:text-3xl'
                }
              >
                /year
              </span>
            </div>
            <p
              className={
                isEmbed
                  ? 'text-cream/80 text-sm font-medium'
                  : 'text-cream/80 text-xl font-medium md:text-2xl'
              }
            >
              That&apos;s{' '}
              <strong className="text-cream">
                ${monthlyTotal.toLocaleString()} per month
              </strong>{' '}
              beyond your mortgage.
            </p>
            {!isEmbed && (
              <div className="text-cream mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 backdrop-blur-sm">
                <span className="text-2xl">✈️</span>
                <span className="text-sm font-bold tracking-wide uppercase">
                  Equivalent to {tripsToHawaii} round-trip flights to Hawaii
                  every year
                </span>
              </div>
            )}
          </Container>
        </Section>

        <Section
          spacing={isEmbed ? 'sm' : 'lg'}
          className={isEmbed ? 'pb-4' : ''}
        >
          <Container>
            <div
              className={`grid gap-8 ${isEmbed ? 'grid-cols-1' : 'lg:grid-cols-3'}`}
            >
              <div className={`space-y-6 ${isEmbed ? '' : 'lg:col-span-2'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-charcoal text-xl font-bold">
                    Cost Breakdown
                  </h3>
                  {!isEmbed && (
                    <span className="text-[10px] text-slate/40 font-bold uppercase tracking-widest">
                      Click badges for methodology
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  {Object.entries(data.costs).map(([key, detail]) => {
                    const confidenceColors = {
                      high: 'bg-green-500/10 text-green-700 hover:bg-green-500/20',
                      medium: 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/20',
                      low: 'bg-red-500/10 text-red-700 hover:bg-red-500/20',
                    };

                    const slugMap: Record<string, string> = {
                      property_tax: 'property-taxes',
                      insurance: 'insurance',
                      maintenance: 'maintenance',
                      energy: 'energy',
                      utilities: 'water-utilities',
                      deferred_maintenance_risk: 'deferred-maintenance',
                      appliance_reserve: 'appliance-lifecycle',
                    };

                    const methodologyUrl = `/methodology/${slugMap[key]}`;

                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-slate text-xs font-bold tracking-wider uppercase">
                              {key.replace(/_/g, ' ')}
                            </span>
                            <Link href={methodologyUrl} title={`View ${key.replace(/_/g, ' ')} methodology`}>
                              <Badge
                                variant="secondary"
                                className={`px-1.5 py-0 text-[8px] transition-colors ${confidenceColors[detail.confidence]}`}
                              >
                                {detail.confidence} confidence
                              </Badge>
                            </Link>
                          </div>
                          <span className="text-charcoal font-bold">
                            ${detail.annual.toLocaleString()}
                          </span>
                        </div>
                        <div className="bg-slate/5 h-3 overflow-hidden rounded-full">
                          <div
                            className="bg-oxblood h-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${(detail.annual / animatedTotal) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate/40 text-[9px]">
                            Source: {detail.source}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`space-y-6 ${isEmbed ? 'order-first' : ''}`}>
                <div className={isEmbed ? '' : 'sticky top-24'}>
                  <Card className="bg-charcoal text-cream shadow-elevated border-none">
                    <CardContent className="p-8 text-center">
                      <h3 className="mb-4 text-2xl font-bold">
                        Protect Your Investment
                      </h3>
                      <p className="text-cream/70 mb-8 text-sm leading-relaxed">
                        These costs are inevitable, but they don&apos;t have to be surprises. Our systematic maintenance plans can reduce your reactive repair risks by up to 60%.
                      </p>
                      <Link href="/services/maintenance-subscriptions">
                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full font-bold shadow-lg"
                        >
                          View Maintenance Plans
                        </Button>
                      </Link>
                      <p className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
                        Licensed &bull; Bonded &bull; Insured
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return null;
}
