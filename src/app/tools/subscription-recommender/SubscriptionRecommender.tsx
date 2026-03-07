'use client';

import { useState, useEffect } from 'react';
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
} from '@/lib/agreement-engine';
import { HERO_ASSETS } from '@/lib/constants';

type Step = 'address' | 'info' | 'email' | 'calculating' | 'results';

interface Recommendation {
  service_id: string;
  priority: 'essential' | 'recommended' | 'optional';
  reasoning: string;
  frequency: Frequency;
}

interface SelectedService extends Recommendation {
  price: number;
}

export function SubscriptionRecommender() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('address');
  const [address, setAddress] = useState<any>(null);
  const [propertyType, setPropertyType] = useState('residential');
  const [sqft, setSqft] = useState(2000);
  const [yearBuilt, setYearBuilt] = useState(1990);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedServices, setSelectedServices] = useState<Record<string, SelectedService>>({});
  const [showComparison, setShowComparison] = useState(false);

  // Address Selection
  const handleAddressSelect = (suggestion: any) => {
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
      await fetch('/api/calculator/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          propertyType,
          address,
          source: 'subscription-recommender'
        }),
      });

      // 2. Get AI Recommendations
      const pricingProperty = {
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
      const data = await recsRes.json();

      if (data.recommendations) {
        const recs = data.recommendations as Recommendation[];
        setRecommendations(recs);

        const initial: Record<string, SelectedService> = {};
        recs.forEach((r) => {
          if (r.priority !== 'optional') {
            const catalogItem = SERVICE_CATALOG.find((s) => s.id === r.service_id)!;
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

  const pricingProperty = {
    sqft,
    age: new Date().getFullYear() - yearBuilt,
    floodZone: 'X',
    buildingType: propertyType as any,
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

  const totalAnnual = Object.values(selectedServices).reduce((sum, s) => sum + s.price, 0);
  const monthlySubscription = Math.round(totalAnnual / 12);
  const deferredMaintenanceAnnual = Math.round(totalAnnual * 3.5);
  const deferredMaintenanceMonthly = Math.round(deferredMaintenanceAnnual / 12);

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
          <Container size="narrow" className="-mt-32 relative z-20">
            <Card className="shadow-elevated border-oxblood/10 bg-white/95 p-4 backdrop-blur-md">
              <CardContent>
                <Label className="mb-4 block text-center text-slate font-bold uppercase tracking-widest text-xs">Enter Your Property Address</Label>
                <AddressAutocomplete onSelect={handleAddressSelect} />
                <div className="mt-6 text-center text-[10px] text-slate/40 font-bold uppercase tracking-[0.2em]">
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
      <Section variant="cream" className="py-20 min-h-[70vh] flex items-center">
        <Container size="narrow">
          <Card className="shadow-elevated">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-oxblood text-3xl font-black mb-8">Property Details</h2>
              <form onSubmit={handleInfoSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Building Type</Label>
                    <Select id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                      <option value="residential">Residential Home</option>
                      <option value="commercial">Commercial Property</option>
                      <option value="church">Church / Community Facility</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Approx. Square Footage</Label>
                    <Input id="sqft" type="number" value={sqft} onChange={(e) => setSqft(Number(e.target.value))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearBuilt">Estimated Year Built</Label>
                  <Input id="yearBuilt" type="number" value={yearBuilt} onChange={(e) => setYearBuilt(Number(e.target.value))} />
                </div>
                <Button variant="oxblood" size="lg" className="w-full">
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
      <Section variant="cream" className="py-20 min-h-[70vh] flex items-center">
        <Container size="narrow">
          <Card className="shadow-elevated border-2 border-oxblood/20 overflow-hidden">
            <div className="bg-oxblood p-4 text-center">
              <Badge variant="secondary" className="bg-cream/10 text-cream border-cream/20 font-bold tracking-widest uppercase">
                Analysis Ready
              </Badge>
            </div>
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-charcoal text-3xl font-black mb-4">Unlock Your Plan</h2>
              <p className="text-slate mb-8 text-lg">
                We&apos;ve mapped <strong>{address?.formatted}</strong> against regional maintenance benchmarks. Where should we send your results?
              </p>
              <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto space-y-4">
                <Input 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg py-6"
                />
                <Button variant="oxblood" size="lg" className="w-full py-6 font-bold" loading={isSubmitting}>
                  Reveal My Maintenance Plan
                </Button>
                <p className="text-[10px] text-slate/50 font-bold uppercase tracking-widest">
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
      <Section variant="cream" className="py-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-oxblood/10 border-t-oxblood rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-oxblood text-2xl font-black mb-2 uppercase tracking-tight">AI Engine Processing</h2>
          <p className="text-slate font-medium">Cross-referencing building vintage with Mid-Willamette labor rates...</p>
        </div>
      </Section>
    );
  }

  // Results
  if (step === 'results') {
    return (
      <Section variant="cream" className="py-12">
        <Container>
          <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 uppercase tracking-widest">Plan Recommendation</Badge>
              <h1 className="text-oxblood text-4xl font-black md:text-5xl leading-tight">
                Systematic Oversight for {address?.city || 'Your Property'}
              </h1>
              <p className="text-slate mt-4 text-lg font-medium opacity-70">
                {pricingProperty.sqft} sqft • Built {yearBuilt} • Building Type: {propertyType}
              </p>
            </div>
            <div className="text-right">
              <div className="text-oxblood text-5xl font-black tabular-nums">${monthlySubscription}<span className="text-base font-bold opacity-40 ml-1">/mo</span></div>
              <p className="text-slate text-xs font-bold uppercase tracking-widest mt-1">Subscription Estimate</p>
            </div>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {['essential', 'recommended', 'optional'].map((prio) => {
                const items = recommendations.filter((r) => r.priority === prio);
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
                          className={`transition-all border-none shadow-sm ${selectedServices[r.service_id] ? 'bg-white ring-2 ring-oxblood' : 'bg-slate-50 opacity-60'}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <input
                                type="checkbox"
                                checked={!!selectedServices[r.service_id]}
                                onChange={() => toggleService(r)}
                                className="mt-1.5 h-5 w-5 rounded border-slate/20 text-oxblood focus:ring-oxblood"
                              />
                              <div className="flex-1">
                                <div className="mb-1 flex items-start justify-between">
                                  <h3 className="text-charcoal font-bold text-lg">
                                    {SERVICE_CATALOG.find((s) => s.id === r.service_id)?.name}
                                  </h3>
                                  <span className="text-oxblood font-bold tabular-nums">
                                    ${selectedServices[r.service_id]?.price || calculateServicePrice({
                                      service: SERVICE_CATALOG.find((s) => s.id === r.service_id)!,
                                      property: pricingProperty,
                                      frequency: r.frequency,
                                    })}
                                    <span className="text-[10px] ml-0.5 opacity-50 uppercase tracking-tighter">/yr</span>
                                  </span>
                                </div>
                                <p className="text-slate mb-3 text-sm leading-relaxed">
                                  {r.reasoning}
                                </p>
                                <div className="flex gap-2">
                                  <Badge variant="secondary" className="text-[9px] uppercase font-bold tracking-tighter">
                                    {r.frequency}
                                  </Badge>
                                  {r.climate_adjustment && (
                                    <Badge variant="secondary" className="text-[9px] uppercase font-bold tracking-tighter bg-blue-50 text-blue-700">
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
              <Card className="bg-oxblood text-cream shadow-elevated border-none overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.1H3.73L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5-2V9z" />
                  </svg>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-cream mb-6 text-xs font-bold tracking-[0.2em] uppercase opacity-60">Plan Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                      <span className="opacity-70">Annual Total</span>
                      <span className="font-bold tabular-nums">${totalAnnual.toLocaleString()}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-cream text-5xl font-black tabular-nums">${monthlySubscription}</span>
                      <span className="text-cream/60 ml-1 text-sm font-bold uppercase tracking-widest">/mo</span>
                    </div>
                  </div>

                  <Button variant="secondary" size="lg" className="w-full font-black py-6 shadow-lg">
                    Initialize Agreement
                  </Button>
                  <p className="mt-4 text-[10px] text-center font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                    Licensed & Bonded Oversight • Forensic Documentation • CCB #258533
                  </p>
                </CardContent>
              </Card>

              {/* Comparison Card */}
              <Card className="bg-slate-900 text-cream border-none shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="text-red-400 text-[10px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 bg-red-400 rounded-full animate-pulse" />
                    Reactive Cost Risk (No Plan)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-60">Est. Emergency Cost</span>
                      <span className="text-xl font-bold text-red-400 tabular-nums">${deferredMaintenanceAnnual.toLocaleString()}<span className="text-[10px] ml-1 opacity-50">/yr</span></span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full w-[85%]" />
                    </div>
                    <p className="text-[10px] opacity-40 font-medium leading-relaxed italic">
                      Based on 3.5x cost escalation for deferred building envelope failures.
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
