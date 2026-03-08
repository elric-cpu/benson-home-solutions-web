'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Section,
  Container,
  Button,
  Card,
  CardContent,
  Badge,
  RichHero,
  Input,
  Select,
  Label,
} from '@/components/ui';
import { AddressAutocomplete } from '@/components/ui/AddressAutocomplete';
import {
  SERVICE_CATALOG,
  calculateServicePrice,
  type Frequency,
  type BuildingType,
  type PropertyData,
} from '@/lib/agreement-engine';
import { HERO_ASSETS } from '@/lib/constants';

type Step = 'address' | 'info' | 'email' | 'calculating' | 'results';

interface Recommendation {
  service_id: string;
  priority: 'essential' | 'recommended' | 'optional';
  reasoning: string;
  frequency: Frequency;
  climate_adjustment?: boolean;
}

interface SelectedService extends Recommendation {
  price: number;
}

interface AddressData {
  formatted: string;
  postcode: string;
  city: string;
  state: string;
  county: string;
  lat: number;
  lon: number;
}

export function SubscriptionRecommender() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('address');
  const [address, setAddress] = useState<AddressData | null>(null);
  const [propertyType, setPropertyType] = useState<BuildingType>('residential');
  const [sqft, setSqft] = useState(2000);
  const [yearBuilt, setYearBuilt] = useState(1990);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedServices, setSelectedServices] = useState<
    Record<string, SelectedService>
  >({});

  // Address Selection
  const handleAddressSelect = (suggestion: AddressData) => {
    setAddress(suggestion);
    setStep('info');
  };

  // Info Submission
  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('email');
  };

  // Lead Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStep('calculating');

    try {
      // 1. Capture Lead
      const leadRes = await fetch('/api/calculator/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          propertyType,
          address,
          source: 'subscription-recommender',
        }),
      });
      const leadData = (await leadRes.json()) as {
        clientId?: string;
        propertyId?: string;
      };

      if (leadData.clientId) setClientId(leadData.clientId);
      if (leadData.propertyId) setPropertyId(leadData.propertyId);

      // 2. Get AI Recommendations
      const pricingProperty: PropertyData = {
        sqft,
        age: new Date().getFullYear() - yearBuilt,
        floodZone: 'X', // Default if not found
        buildingType: propertyType,
      };

      const recsRes = await fetch('/api/agreements/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property: pricingProperty }),
      });
      const data = (await recsRes.json()) as {
        recommendations?: Recommendation[];
      };

      if (data.recommendations) {
        const recs = data.recommendations;
        setRecommendations(recs);

        const initial: Record<string, SelectedService> = {};
        recs.forEach((r) => {
          if (r.priority !== 'optional') {
            const catalogItem = SERVICE_CATALOG.find(
              (s) => s.id === r.service_id,
            )!;
            initial[r.service_id] = {
              ...r,
              price: calculateServicePrice({
                service: catalogItem,
                property: pricingProperty,
                frequency: r.frequency,
              }),
            };
          }
        });
        setSelectedServices(initial);
      }

      setStep('results');
    } catch (error) {
      console.error('Recommender flow failed:', error);
      setStep('info'); // Fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  // Finalize Agreement
  const handleInitializeAgreement = async () => {
    if (!clientId || !propertyId) {
      alert('Session expired. Please try again.');
      return;
    }

    setIsFinalizing(true);
    try {
      const res = await fetch('/api/agreements/finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          propertyId,
          services: Object.values(selectedServices),
          totalAnnual,
          monthlySubscription,
          agreementType: `${propertyType}-subscription`,
        }),
      });

      const data = (await res.json()) as {
        success: boolean;
        agreementId?: string;
        error?: string;
      };
      if (data.success && data.agreementId) {
        router.push(`/agreements/${data.agreementId}`);
      } else {
        throw new Error(data.error || 'Failed to finalize');
      }
    } catch (error) {
      console.error('Finalization failed:', error);
      alert('Failed to initialize agreement. Please contact our office.');
    } finally {
      setIsFinalizing(false);
    }
  };

  const pricingProperty: PropertyData = {
    sqft,
    age: new Date().getFullYear() - yearBuilt,
    floodZone: 'X',
    buildingType: propertyType,
  };

  const toggleService = (r: Recommendation) => {
    const catalogItem = SERVICE_CATALOG.find((s) => s.id === r.service_id)!;
    setSelectedServices((prev) => {
      const next = { ...prev };
      if (next[r.service_id]) {
        delete next[r.service_id];
      } else {
        next[r.service_id] = {
          ...r,
          price: calculateServicePrice({
            service: catalogItem,
            property: pricingProperty,
            frequency: r.frequency,
          }),
        };
      }
      return next;
    });
  };

  const totalAnnual = Object.values(selectedServices).reduce(
    (sum, s) => sum + s.price,
    0,
  );
  const monthlySubscription = Math.round(totalAnnual / 12);
  const deferredMaintenanceAnnual = Math.round(totalAnnual * 3.5);

  // Address Input
  if (step === 'address') {
    return (
      <>
        <RichHero
          title="Maintenance Subscription Recommender"
          description="Identify predictable property failures and receive a customized oversight plan based on your property's specific profile."
          backgroundImage={HERO_ASSETS.configurator}
          badge="Lead Generator"
        />
        <Section variant="cream">
          <Container size="narrow" className="relative z-20 -mt-32">
            <Card className="shadow-elevated border-oxblood/10 bg-white/95 p-4 backdrop-blur-md">
              <CardContent>
                <Label className="text-slate mb-4 block text-center text-xs font-bold tracking-widest uppercase">
                  Enter Your Property Address
                </Label>
                <AddressAutocomplete onSelect={handleAddressSelect} />
                <div className="text-slate/60 mt-6 text-center text-[10px] font-bold tracking-[0.2em] uppercase">
                  Real-time Benchmarking vs. Oregon CCB Standards
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      </>
    );
  }

  // Info Input
  if (step === 'info') {
    return (
      <Section variant="cream" className="flex min-h-[70vh] items-center py-20">
        <Container size="narrow">
          <Card className="shadow-elevated">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-oxblood mb-8 text-3xl font-black">
                Property Details
              </h2>
              <form onSubmit={handleInfoSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Building Type</Label>
                    <Select
                      id="propertyType"
                      value={propertyType}
                      onChange={(e) =>
                        setPropertyType(e.target.value as BuildingType)
                      }
                    >
                      <option value="residential">Residential Home</option>
                      <option value="commercial">Commercial Property</option>
                      <option value="church">
                        Church / Community Facility
                      </option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Approx. Square Footage</Label>
                    <Input
                      id="sqft"
                      type="number"
                      value={sqft}
                      onChange={(e) => setSqft(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearBuilt">Estimated Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(Number(e.target.value))}
                  />
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  Analyze Maintenance Requirements &rarr;
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Section>
    );
  }

  // Email Capture (The "Sooner" Change)
  if (step === 'email') {
    return (
      <Section variant="cream" className="flex min-h-[70vh] items-center py-20">
        <Container size="narrow">
          <Card className="shadow-elevated border-oxblood/20 overflow-hidden border-2">
            <div className="bg-oxblood p-4 text-center">
              <Badge
                variant="secondary"
                className="bg-cream/10 text-cream border-cream/20 font-bold tracking-widest uppercase"
              >
                Analysis Ready
              </Badge>
            </div>
            <CardContent className="p-8 text-center md:p-12">
              <h2 className="text-charcoal mb-4 text-3xl font-black">
                Unlock Your Plan
              </h2>
              <p className="text-slate mb-8 text-lg">
                We&apos;ve mapped <strong>{address?.formatted}</strong> against
                regional maintenance benchmarks. Where should we send your
                results?
              </p>
              <form
                onSubmit={handleLeadSubmit}
                className="mx-auto max-w-md space-y-4"
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-6 text-lg"
                />
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full py-6 font-bold"
                  loading={isSubmitting}
                >
                  Reveal My Maintenance Plan
                </Button>
                <p className="text-slate/70 text-[10px] font-bold tracking-widest uppercase">
                  Secure Data • No Spam • Professional Consultation
                </p>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Section>
    );
  }

  // Calculating
  if (step === 'calculating') {
    return (
      <Section
        variant="cream"
        className="flex min-h-[70vh] items-center justify-center py-20"
      >
        <div className="text-center">
          <div className="border-oxblood/10 border-t-oxblood mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4" />
          <h2 className="text-oxblood mb-2 text-2xl font-black tracking-tight uppercase">
            AI Engine Processing
          </h2>
          <p className="text-slate font-medium">
            Cross-referencing building vintage with Mid-Willamette labor
            rates...
          </p>
        </div>
      </Section>
    );
  }

  // Results
  if (step === 'results') {
    return (
      <Section variant="cream" className="py-12">
        <Container>
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="max-w-2xl">
              <Badge
                variant="secondary"
                className="mb-4 tracking-widest uppercase"
              >
                Plan Recommendation
              </Badge>
              <h1 className="text-oxblood text-4xl leading-tight font-black md:text-5xl">
                Systematic Oversight for {address?.city || 'Your Property'}
              </h1>
              <p className="text-slate mt-4 text-lg font-medium opacity-70">
                {pricingProperty.sqft} sqft • Built {yearBuilt} • Building Type:{' '}
                {propertyType}
              </p>
            </div>
            <div className="text-right">
              <div className="text-oxblood text-5xl font-black tabular-nums">
                ${monthlySubscription}
                <span className="ml-1 text-base font-bold opacity-70">/mo</span>
              </div>
              <p className="text-slate mt-1 text-xs font-bold tracking-widest uppercase">
                Subscription Estimate
              </p>
            </div>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {['essential', 'recommended', 'optional'].map((prio) => {
                const items = recommendations.filter(
                  (r) => r.priority === prio,
                );
                if (items.length === 0) return null;

                return (
                  <div key={prio}>
                    <h2 className="text-slate/40 mb-4 text-[10px] font-black tracking-[0.2em] uppercase">
                      {prio} Services
                    </h2>
                    <div className="space-y-4">
                      {items.map((r) => (
                        <Card
                          key={r.service_id}
                          className={`border-none shadow-sm transition-all ${selectedServices[r.service_id] ? 'ring-oxblood bg-white ring-2' : 'bg-slate-50 opacity-60'}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <input
                                type="checkbox"
                                checked={!!selectedServices[r.service_id]}
                                onChange={() => toggleService(r)}
                                aria-label={`Select ${SERVICE_CATALOG.find((s) => s.id === r.service_id)?.name}`}
                                className="border-slate/20 text-oxblood focus:ring-oxblood mt-1.5 h-5 w-5 rounded"
                              />
                              <div className="flex-1">
                                <div className="mb-1 flex items-start justify-between">
                                  <h3 className="text-charcoal text-lg font-bold">
                                    {
                                      SERVICE_CATALOG.find(
                                        (s) => s.id === r.service_id,
                                      )?.name
                                    }
                                  </h3>
                                  <span className="text-oxblood font-bold tabular-nums">
                                    $
                                    {selectedServices[r.service_id]?.price ||
                                      calculateServicePrice({
                                        service: SERVICE_CATALOG.find(
                                          (s) => s.id === r.service_id,
                                        )!,
                                        property: pricingProperty,
                                        frequency: r.frequency,
                                      })}
                                    <span className="ml-0.5 text-[10px] tracking-tighter uppercase opacity-70">
                                      /yr
                                    </span>
                                  </span>
                                </div>
                                <p className="text-slate mb-3 text-sm leading-relaxed">
                                  {r.reasoning}
                                </p>
                                <div className="flex gap-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-[9px] font-bold tracking-tighter uppercase"
                                  >
                                    {r.frequency}
                                  </Badge>
                                  {r.climate_adjustment && (
                                    <Badge
                                      variant="secondary"
                                      className="bg-blue-50 text-[9px] font-bold tracking-tighter text-blue-700 uppercase"
                                    >
                                      Climate Adjusted
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sticky top-24 space-y-6">
              {/* Summary Card */}
              <Card className="bg-oxblood text-cream shadow-elevated overflow-hidden border-none">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.1H3.73L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5-2V9z" />
                  </svg>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-cream mb-6 text-xs font-bold tracking-[0.2em] uppercase opacity-60">
                    Plan Summary
                  </h3>

                  <div className="mb-8 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
                      <span className="opacity-70">Annual Total</span>
                      <span className="font-bold tabular-nums">
                        ${totalAnnual.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2">
                      <span className="text-cream text-5xl font-black tabular-nums">
                        ${monthlySubscription}
                      </span>
                      <span className="text-cream/60 ml-1 text-sm font-bold tracking-widest uppercase">
                        /mo
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full py-6 font-black shadow-lg"
                    onClick={handleInitializeAgreement}
                    loading={isFinalizing}
                  >
                    Initialize Agreement
                  </Button>
                  <p className="mt-4 text-center text-[10px] leading-relaxed font-bold tracking-widest uppercase opacity-40">
                    Licensed & Bonded Oversight • Forensic Documentation • CCB
                    #258533
                  </p>
                </CardContent>
              </Card>

              {/* Comparison Card */}
              <Card className="text-cream overflow-hidden border-none bg-slate-900 shadow-sm">
                <CardContent className="p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-widest text-red-400 uppercase">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                    Reactive Cost Risk (No Plan)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <span className="text-xs opacity-60">
                        Est. Emergency Cost
                      </span>
                      <span className="text-xl font-bold text-red-400 tabular-nums">
                        ${deferredMaintenanceAnnual.toLocaleString()}
                        <span className="ml-1 text-[10px] opacity-50">/yr</span>
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[85%] bg-red-500" />
                    </div>
                    <p className="text-[10px] leading-relaxed font-medium italic opacity-40">
                      Based on 3.5x cost escalation for deferred building
                      envelope failures.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return null;
}
