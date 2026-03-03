'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Section,
  Container,
  Button,
  Card,
  CardContent,
  Badge,
  RichHero,
} from '@/components/ui';
import { SERVICE_CATALOG, calculateServicePrice } from '@/lib/agreement-engine';
import { HERO_ASSETS } from '@/lib/constants';

interface Recommendation {
  service_id: string;
  priority: 'essential' | 'recommended' | 'optional';
  reasoning: string;
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
}

interface SelectedService extends Recommendation {
  price: number;
}

export function MaintenanceConfigurator() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedServices, setSelectedServices] = useState<
    Record<string, SelectedService>
  >({});

  // Mock property data for demo
  const property = useMemo(
    () => ({
      id: '00000000-0000-0000-0000-000000000000',
      sqft: 2400,
      age: 42,
      floodZone: 'AE',
      buildingType: 'residential' as 'residential' | 'commercial' | 'church',
      address: '123 Main St, Albany, OR 97321',
    }),
    [],
  );

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch('/api/agreements/recommend', {
          method: 'POST',
          body: JSON.stringify({ property }),
        });
        const data = await response.json();

        if (data.recommendations) {
          setRecommendations(data.recommendations);

          const initial: Record<string, SelectedService> = {};
          data.recommendations.forEach((r: Recommendation) => {
            if (r.priority !== 'optional') {
              const catalogItem = SERVICE_CATALOG.find(
                (s) => s.id === r.service_id,
              )!;
              initial[r.service_id] = {
                ...r,
                price: calculateServicePrice(
                  catalogItem,
                  property,
                  r.frequency,
                ),
              };
            }
          });
          setSelectedServices(initial);
        }
      } catch (error) {
        console.error('Failed to load recommendations', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [property]);

  const toggleService = (r: Recommendation) => {
    const catalogItem = SERVICE_CATALOG.find((s) => s.id === r.service_id)!;
    setSelectedServices((prev) => {
      const next = { ...prev };
      if (next[r.service_id]) {
        delete next[r.service_id];
      } else {
        next[r.service_id] = {
          ...r,
          price: calculateServicePrice(catalogItem, property, r.frequency),
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

  const finalizeAgreement = async () => {
    setIsFinalizing(true);
    try {
      const response = await fetch('/api/agreements/finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          clientId: '00000000-0000-0000-0000-000000000000',
          services: Object.values(selectedServices),
          totalAnnual,
          monthlySubscription,
          agreementType:
            property.buildingType === 'church'
              ? 'church-subscription'
              : 'residential-subscription',
        }),
      });

      const result = await response.json();
      if (result.success) {
        router.push(`/agreements/${result.agreementId}`);
      }
    } catch (error) {
      console.error('Finalization failed', error);
    } finally {
      setIsFinalizing(false);
    }
  };

  if (loading) {
    return (
      <Section
        variant="cream"
        className="flex min-h-[600px] items-center justify-center"
      >
        <div className="text-center">
          <div className="border-oxblood/10 border-t-oxblood mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4" />
          <p className="text-slate font-medium">
            Generating Personalized Plan...
          </p>
        </div>
      </Section>
    );
  }

  return (
    <>
      <RichHero
        title="Tailored Maintenance Plan"
        description={`Professional Oversight for ${property.address} • ${property.sqft} sqft • Built 1984 • Zone ${property.floodZone}`}
        backgroundImage={HERO_ASSETS.configurator}
        badge="Technical Recommendation"
        overlayOpacity={70}
      >
        <Link href="/tools/cost-calculator">
          <Button
            variant="outline"
            size="sm"
            className="text-cream border-cream/20 hover:bg-cream hover:text-oxblood bg-white/10"
          >
            &larr; Back to Calculator
          </Button>
        </Link>
      </RichHero>

      <Section variant="cream">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="space-y-6">
                {['essential', 'recommended', 'optional'].map((prio) => {
                  const items = recommendations.filter(
                    (r) => r.priority === prio,
                  );
                  if (items.length === 0) return null;

                  return (
                    <div key={prio}>
                      <h2 className="text-slate/50 mb-4 text-xs font-black tracking-widest uppercase">
                        {prio} Services
                      </h2>
                      <div className="space-y-4">
                        {items.map((r) => (
                          <Card
                            key={r.service_id}
                            className={`transition-all ${selectedServices[r.service_id] ? 'border-oxblood ring-oxblood/20 ring-1' : 'opacity-60 grayscale'}`}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <input
                                  type="checkbox"
                                  checked={!!selectedServices[r.service_id]}
                                  onChange={() => toggleService(r)}
                                  className="border-slate/20 text-oxblood focus:ring-oxblood mt-1.5 h-5 w-5 rounded"
                                />
                                <div className="flex-1">
                                  <div className="mb-1 flex items-start justify-between">
                                    <h3 className="text-charcoal font-bold">
                                      {
                                        SERVICE_CATALOG.find(
                                          (s) => s.id === r.service_id,
                                        )?.name
                                      }
                                    </h3>
                                    <span className="text-oxblood font-bold">
                                      $
                                      {calculateServicePrice(
                                        SERVICE_CATALOG.find(
                                          (s) => s.id === r.service_id,
                                        )!,
                                        property,
                                        r.frequency,
                                      ).toLocaleString()}
                                      /yr
                                    </span>
                                  </div>
                                  <p className="text-slate mb-2 text-sm leading-relaxed">
                                    {r.reasoning}
                                  </p>
                                  <div className="flex gap-3">
                                    <Badge
                                      variant="secondary"
                                      className="text-[10px] uppercase"
                                    >
                                      {r.frequency}
                                    </Badge>
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
            </div>

            <div className="sticky top-24">
              <Card className="bg-oxblood text-cream shadow-elevated overflow-hidden border-none">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.1H3.73L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" />
                  </svg>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-cream mb-6 text-xl font-bold">
                    Systematic Oversight
                  </h3>
                  <div className="mb-8 space-y-4">
                    <div className="text-cream/70 flex justify-between text-sm">
                      <span>Annual Operational Cost</span>
                      <span>${totalAnnual.toLocaleString()}</span>
                    </div>
                    <div className="flex items-end justify-between border-t border-white/10 pt-4">
                      <div>
                        <span className="text-cream/50 block text-xs font-bold tracking-wider uppercase">
                          Subscription
                        </span>
                        <span className="text-4xl font-black">
                          ${monthlySubscription}
                        </span>
                        <span className="text-cream/70 ml-1 text-sm font-medium">
                          /mo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full font-bold"
                      onClick={finalizeAgreement}
                      loading={isFinalizing}
                    >
                      Initialize Agreement
                    </Button>
                    <p className="text-cream/40 text-center text-[10px] leading-relaxed font-bold tracking-widest uppercase">
                      24/7 Priority Access • Forensic Photo Logs • Board-Ready
                      Reports
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate/10 mt-6 bg-slate-50 shadow-sm">
                <CardContent className="p-6">
                  <h4 className="text-charcoal mb-4 text-[10px] font-bold tracking-widest uppercase">
                    What is Professional Oversight?
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Harden the building envelope against rain & ice.',
                      'Identify deferred maintenance before loss occurs.',
                      'Maintain a forensic paper trail for insurance.',
                      'Direct access to trade professionals, no call centers.',
                    ].map((f) => (
                      <li key={f} className="text-slate flex gap-2 text-xs">
                        <span className="text-oxblood">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
