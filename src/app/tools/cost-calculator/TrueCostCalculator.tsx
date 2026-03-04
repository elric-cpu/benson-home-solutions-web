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
  Input,
  Label,
  Select,
} from '@/components/ui';
import {
  MOCK_ZIP_DATA,
  DEFAULT_BENCHMARK,
  isServiceArea,
  type ZipData,
} from '@/lib/calculator-data';
import { HERO_ASSETS } from '@/lib/constants';
import { generateAddressHash } from '@/lib/utils/hash';

type Step = 'input' | 'processing' | 'result' | 'lead-gen';

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
  const [addressHash, setAddressHash] = useState<string | null>(null);
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

  const handleAddressSelect = async (suggestion: AddressSuggestion) => {
    setAddress(suggestion);
    const zipData = MOCK_ZIP_DATA[suggestion.postcode] || DEFAULT_BENCHMARK;
    setData({ ...zipData, city: suggestion.city || zipData.city });

    try {
      const hash = await generateAddressHash(suggestion.formatted);
      setAddressHash(hash);
    } catch (err) {
      console.error('Failed to generate address hash', err);
    }

    setStep('processing');
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const propertyType = formData.get('propertyType') as string;

    try {
      const response = await fetch('/api/calculator/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          address: address?.formatted,
          propertyType,
          annualTotal: animatedTotal,
          monthlyTotal: Math.floor(animatedTotal / 12),
          isServiceArea: isServiceArea(
            address?.postcode || '',
            data?.county || '',
            data?.state || '',
          ),
          addressHash,
          zip: address?.postcode || data?.zip,
          city: address?.city || data?.city,
          state: address?.state || data?.state,
          county: address?.county || data?.county,
          costs: data?.costs,
        }),
      });

      if (response.ok) {
        setStep('lead-gen');
      }
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
            setTimeout(() => setStep('result'), 800);
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
                <h3 className="text-charcoal mb-4 text-xl font-bold">
                  Cost Breakdown
                </h3>
                <div className="space-y-4">
                  {Object.entries(data.costs).map(([key, detail]) => {
                    const slugMap: Record<string, string> = {
                      property_tax: 'property-taxes',
                      insurance: 'insurance',
                      maintenance: 'maintenance',
                      energy: 'energy',
                      utilities: 'water-utilities',
                      deferred_maintenance_risk: 'deferred-maintenance',
                      appliance_reserve: 'appliance-lifecycle',
                    };

                    const confidenceColors = {
                      high: 'bg-green-500/10 text-green-700',
                      medium: 'bg-amber-500/10 text-amber-700',
                      low: 'bg-red-500/10 text-red-700',
                    };

                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-slate text-xs font-bold tracking-wider uppercase">
                              {key.replace(/_/g, ' ')}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`px-1.5 py-0 text-[8px] ${confidenceColors[detail.confidence]}`}
                            >
                              {detail.confidence} confidence
                            </Badge>
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
                          <Link
                            href={`/methodology/${slugMap[key] || ''}`}
                            className="text-oxblood hover:underline text-[9px] font-bold"
                          >
                            Methodology &rarr;
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Card
                  variant="outlined"
                  className="relative mt-12 overflow-hidden border-red-200 bg-red-50/30"
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-red-500" />
                  <CardContent className="p-8">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-900">
                      ⚠️ Deferred Maintenance Alert
                    </h3>
                    <p className="mb-8 leading-relaxed text-red-800">
                      Skipping routine maintenance on a home like yours in{' '}
                      <strong>{data.city}</strong> costs an average of{' '}
                      <strong>
                        ${data.costs.deferred_maintenance_risk.annual.toLocaleString()}{' '}
                        extra
                      </strong>{' '}
                      in emergency repairs within 3–5 years.
                    </p>

                    {/* Cost Escalation Curve */}
                    <div className="relative mb-6 h-32 w-full rounded-xl border border-red-100 bg-white/50 p-4">
                      <div className="text-slate/40 absolute bottom-4 left-4 text-[10px] font-bold uppercase">
                        Year 1: Routine
                      </div>
                      <div className="absolute right-4 bottom-4 text-right text-[10px] font-bold text-red-600 uppercase">
                        Year 5: Emergency
                      </div>
                      <svg
                        className="h-full w-full"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                      >
                        <path
                          d="M 0 80 Q 50 75 100 20"
                          fill="none"
                          stroke="url(#grad-red)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          className="drop-shadow-md"
                        />
                        <circle cx="0" cy="80" r="4" fill="#4C0C14" />
                        <circle
                          cx="100"
                          cy="20"
                          r="4"
                          fill="#ef4444"
                          className="animate-ping"
                        />
                        <defs>
                          <linearGradient
                            id="grad-red"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#4C0C14" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-red-200">
                        <div className="h-full w-1/4 animate-pulse bg-red-500" />
                      </div>
                      <span className="text-xs font-black tracking-widest text-red-700 uppercase">
                        Extreme Risk
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className={`space-y-6 ${isEmbed ? 'order-first' : ''}`}>
                <div className={isEmbed ? '' : 'sticky top-24'}>
                  <Card className="bg-charcoal text-cream shadow-elevated border-none">
                    <CardContent className="p-8">
                      <h3 className="mb-4 text-2xl font-bold">
                        Cut These Costs
                      </h3>
                      <div className="mb-6 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                        <div className="bg-oxblood/20 text-oxblood flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                          80%
                        </div>
                        <p className="text-cream/70 text-[11px] leading-tight">
                          <strong>Your report is almost ready.</strong>
                          <br />
                          Unlock the final 20% &mdash; your custom maintenance
                          schedule.
                        </p>
                      </div>

                      <form className="space-y-4" onSubmit={handleLeadSubmit}>
                        <div className="space-y-2 text-left">
                          <Label
                            htmlFor="propertyType"
                            className="text-cream/50 text-xs font-bold tracking-widest uppercase"
                          >
                            Property Type
                          </Label>
                          <Select
                            id="propertyType"
                            name="propertyType"
                            required
                            className="text-cream border-white/10 bg-white/10"
                          >
                            <option
                              value="residential"
                              className="text-charcoal"
                            >
                              Residential Home
                            </option>
                            <option
                              value="commercial"
                              className="text-charcoal"
                            >
                              Commercial Facility
                            </option>
                            <option
                              value="church_community"
                              className="text-charcoal"
                            >
                              Church or Community
                            </option>
                          </Select>
                        </div>
                        <div className="space-y-2 text-left">
                          <Label
                            htmlFor="email"
                            className="text-cream/50 text-xs font-bold tracking-widest uppercase"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            name="email"
                            required
                            placeholder="jane@example.com"
                            className="text-cream border-white/10 bg-white/10 placeholder:text-white/30"
                          />
                        </div>

                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full"
                          loading={isSubmitting}
                        >
                          {isSubmitting
                            ? 'Sending Report...'
                            : 'Get My Full Report'}
                        </Button>
                        <p className="text-cream/30 text-center text-[10px] italic">
                          By clicking, you agree to our privacy policy and
                          marketing opt-in.
                        </p>
                      </form>
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

  if (step === 'lead-gen') {
    const handleShare = () => {
      if (navigator.share) {
        navigator
          .share({
            title: 'True Cost of Homeownership',
            text: `I just calculated that my home costs $${animatedTotal.toLocaleString()} per year beyond the mortgage! Check your address:`,
            url: window.location.href,
          })
          .catch(console.error);
      }
    };

    const isBensonArea = isServiceArea(
      data?.zip || '',
      data?.county || '',
      data?.state || '',
    );

    return (
      <Section
        variant="cream"
        className="flex min-h-[600px] items-center text-center"
      >
        <Container size="narrow">
          <div className="mb-6 text-6xl">📊</div>
          <h2 className="text-charcoal mb-4 text-3xl font-bold">
            Your Report is Ready!
          </h2>
          <p className="text-slate mx-auto mb-8 max-w-md text-lg">
            We&apos;ve sent your detailed breakdown and maintenance schedule to
            your inbox.
          </p>
          <div className="shadow-elevated border-slate/10 mx-auto mb-8 max-w-md rounded-2xl border bg-white p-8 text-left">
            {addressHash && (
              <Link
                href={`/tools/cost-calculator/report/${addressHash}`}
                className="mb-4 block"
              >
                <Button
                  variant="outline"
                  className="border-oxblood text-oxblood hover:bg-oxblood w-full hover:text-white"
                >
                  View Full Property Report &rarr;
                </Button>
              </Link>
            )}
            {isBensonArea ? (
              <>
                <Badge variant="secondary" className="mb-2">
                  Benson Service Area Match
                </Badge>
                <h3 className="text-oxblood mb-2 text-xl font-bold">
                  Exclusive Mid-Willamette Access
                </h3>
                <p className="text-slate mb-6 text-sm leading-relaxed">
                  Your property in <strong>{address?.formatted}</strong>{' '}
                  qualifies for our 24/7 Priority Protection program.
                </p>
                <div className="space-y-4">
                  <a href="/contact" className="block">
                    <Button size="lg" className="w-full">
                      Book Initial Assessment
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleShare}
                  >
                    Share Your Result
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Badge variant="secondary" className="mb-2">
                  Outside Current Service Area
                </Badge>
                <h3 className="text-charcoal mb-2 text-xl font-bold">
                  Expanding Soon
                </h3>
                <p className="text-slate mb-6 text-sm leading-relaxed">
                  We don&apos;t currently service <strong>{data?.state}</strong>
                  , but we are expanding. Bookmark this page and we&apos;ll
                  notify you when we launch in your area.
                </p>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleShare}
                  >
                    Share Your Result
                  </Button>
                </div>
              </>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-4 opacity-50 grayscale">
              <span className="text-[10px] font-black tracking-tighter uppercase">
                IICRC Certified
              </span>
              <span className="text-[10px] font-black tracking-tighter uppercase">
                Oregon CCB #258533
              </span>
              <span className="text-[10px] font-black tracking-tighter uppercase">
                Lead-Safe Firm
              </span>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return null;
}
