'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Container, Section, Badge, Card, Button } from '@/components/ui';
import { CalendarClock, CloudRain, Home, Warehouse } from 'lucide-react';

const PROPERTY_TYPES = [
  { value: 'home', label: 'Single-family home' },
  { value: 'rental', label: 'Rental or duplex' },
  { value: 'commercial', label: 'Small commercial building' },
  { value: 'church', label: 'Church or nonprofit facility' },
];

const REGIONS = [
  {
    value: 'valley',
    label: 'Mid-Willamette Valley',
    tasks: {
      spring: ['Flush gutters and downspouts', 'Check crawlspace ventilation and standing water', 'Inspect roof vent flashing after winter storms'],
      summer: ['Reseal failed exterior caulk', 'Clean moss-prone roof edges and valleys', 'Inspect siding bottoms for soft spots'],
      fall: ['Clear leaves before first storm cycle', 'Test drainage away from foundation', 'Verify attic airflow and bath fan venting'],
      winter: ['Monitor active leaks during heavy rain', 'Inspect interior ceilings and window heads monthly', 'Respond fast to overflow at problem gutters'],
    },
  },
  {
    value: 'desert',
    label: 'Harney County / high desert',
    tasks: {
      spring: ['Inspect wind-damaged roofing and fasteners', 'Service swamp coolers or HVAC transitions', 'Check outbuildings for freeze damage'],
      summer: ['Review UV-exposed sealants and vent boots', 'Inspect irrigation overspray against siding', 'Clean vents and wildfire fuel zones'],
      fall: ['Winterize hose bibs and vulnerable plumbing runs', 'Seal attic bypasses before hard freezes', 'Inspect skirting and crawlspace access panels'],
      winter: ['Watch for ice dams around warm roof penetrations', 'Check pipe rooms and utility spaces after freezes', 'Stage emergency response materials for remote access delays'],
    },
  },
];

export default function MaintenancePlannerPage() {
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0].value);
  const [region, setRegion] = useState(REGIONS[0].value);

  const selectedRegion = useMemo(
    () => REGIONS.find((item) => item.value === region) ?? REGIONS[0],
    [region],
  );

  const specialTask = useMemo(() => {
    switch (propertyType) {
      case 'rental':
        return 'Add quarterly tenant-reported moisture checks and turnover inspections around kitchens, baths, and laundry zones.';
      case 'commercial':
        return 'Track roof drains, downspout discharge, and deferred sealant work in a shared maintenance log with budget dates.';
      case 'church':
        return 'Document sanctuary, fellowship hall, and classroom leaks separately so trustees can phase work responsibly.';
      default:
        return 'Photograph recurring trouble spots so seasonal comparisons show whether moisture exposure is accelerating.';
    }
  }, [propertyType]);

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            Seasonal Planning Tool
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            Oregon Maintenance <span className="italic text-oxblood/60">Planner.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl font-medium leading-relaxed text-oxblood/80">
            Build a practical seasonal checklist for gutters, roof penetrations, drainage, siding, attic ventilation, and freeze protection.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <Card className="p-8 border-oxblood/10">
              <h2 className="mb-8 text-2xl font-black uppercase tracking-tight text-oxblood">
                Set your profile
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="property-type" className="mb-2 block text-sm font-black uppercase tracking-widest text-oxblood/60">
                    Property type
                  </label>
                  <select
                    id="property-type"
                    value={propertyType}
                    onChange={(event) => setPropertyType(event.target.value)}
                    className="w-full rounded-xl border border-oxblood/15 bg-white p-4 font-bold text-oxblood outline-none focus:border-oxblood"
                  >
                    {PROPERTY_TYPES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="region" className="mb-2 block text-sm font-black uppercase tracking-widest text-oxblood/60">
                    Region
                  </label>
                  <select
                    id="region"
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                    className="w-full rounded-xl border border-oxblood/15 bg-white p-4 font-bold text-oxblood outline-none focus:border-oxblood"
                  >
                    {REGIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-oxblood/5 p-5 text-slate">
                <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-oxblood/60">
                  {propertyType === 'commercial' || propertyType === 'church' ? (
                    <Warehouse className="h-4 w-4" />
                  ) : (
                    <Home className="h-4 w-4" />
                  )}
                  Special focus
                </div>
                <p className="font-medium leading-relaxed">{specialTask}</p>
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(selectedRegion.tasks).map(([season, tasks]) => (
                <Card key={season} className="p-6 border-oxblood/10">
                  <div className="mb-4 flex items-center gap-3">
                    {season === 'winter' ? (
                      <CloudRain className="h-5 w-5 text-oxblood" />
                    ) : (
                      <CalendarClock className="h-5 w-5 text-oxblood" />
                    )}
                    <h2 className="text-xl font-black uppercase tracking-tight text-oxblood">
                      {season}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {tasks.map((task) => (
                      <li key={task} className="rounded-xl bg-cream/50 p-3 text-sm font-medium leading-relaxed text-slate">
                        {task}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-oxblood/10 bg-oxblood p-8 text-cream">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
              Turn the list into a field plan
            </h2>
            <p className="max-w-3xl font-medium leading-relaxed text-cream/85">
              A checklist is useful. A repeatable inspection route, photo log, and repair sequence is better. Benson can turn these seasonal tasks into a monthly subscription scope or a targeted repair plan.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Link href="/services/maintenance-subscriptions">
                <Button variant="secondary" className="font-black uppercase tracking-widest">
                  Review Maintenance Plans
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-cream text-cream hover:bg-cream hover:text-oxblood font-black uppercase tracking-widest">
                  Request a Site Audit
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
