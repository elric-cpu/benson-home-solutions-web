'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';


const sidingTypes = [
  { name: 'Wood / Cedar', risk: 0.9, maintenance: 'High' },
  { name: 'Hardie / Fiber Cement', risk: 0.3, maintenance: 'Medium' },
  { name: 'Vinyl', risk: 0.4, maintenance: 'Low' },
  { name: 'Brick / Stone', risk: 0.1, maintenance: 'Low' },
];

const locations = [
  { name: 'Mid-Willamette Valley', rainfall: 45, humidity: 80 },
  { name: 'Harney County', rainfall: 10, humidity: 20 },
  { name: 'Oregon Coast', rainfall: 80, humidity: 90 },
];

export default function RotRiskSimulator() {
  const [yearsDeferred, setYearsDeferred] = useState(0);
  const [siding, setSiding] = useState(sidingTypes[0]);
  const [location, setLocation] = useState(locations[0]);

  const baseMaint = 150 * (yearsDeferred || 1);
  const mult = location.rainfall > 40 ? 1.8 : 1.3;
  const baseRest = 1500 * Math.pow(mult, yearsDeferred) * siding.risk;

  const repairCost = Math.round(baseMaint);
  const restorationCost = Math.round(baseRest);

  const riskScore = Math.min(100, Math.round((yearsDeferred * 15) * siding.risk * (location.rainfall / 30)));

  return (
    <main>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            A Benson Home Solutions Tool
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            The Oregon <br />
            <span className="italic text-oxblood/60">Dry Rot Calculator</span>
          </h1>
          <p className="text-xl text-oxblood/80 max-w-2xl mx-auto font-medium">
            A small leak can rot out a wall in a single season. Use this tool to understand your property&apos;s real-world risk, and how much it could cost if left unchecked.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="p-8 shadow-2xl border-oxblood/5">
              <h2 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-8">1. Set Your Property&apos;s Parameters</h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-4">
                    Years of Deferred Maintenance: {yearsDeferred}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={yearsDeferred}
                    onChange={(e) => setYearsDeferred(parseInt(e.target.value))}
                    className="w-full h-3 bg-oxblood/10 rounded-lg appearance-none cursor-pointer accent-oxblood"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-oxblood/40 uppercase">
                    <span>Proactive</span>
                    <span>Neglected</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-2">Location</label>
                    <select 
                      className="w-full p-3 bg-cream border-2 border-oxblood/10 rounded-xl font-bold text-oxblood outline-none focus:border-oxblood"
                      onChange={(e) => setLocation(locations.find(l => l.name === e.target.value) || locations[0])}
                    >
                      {locations.map(l => <option key={l.name}>{l.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-2">Siding</label>
                    <select 
                      className="w-full p-3 bg-cream border-2 border-oxblood/10 rounded-xl font-bold text-oxblood outline-none focus:border-oxblood"
                      onChange={(e) => setSiding(sidingTypes.find(s => s.name === e.target.value) || sidingTypes[0])}
                    >
                      {sidingTypes.map(s => <option key={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              <Card className={`p-8 border-none text-cream transition-all duration-500 ${riskScore > 50 ? 'bg-red-900' : 'bg-oxblood'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-sm font-black uppercase tracking-widest opacity-60 mb-1">Your Dry Rot Risk Score</div>
                    <div className="text-6xl font-black italic">{riskScore}%</div>
                  </div>
                  <AlertTriangle className={`w-12 h-12 ${riskScore > 50 ? 'animate-pulse' : 'opacity-20'}`} />
                </div>
                
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-cream/10">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Proactive Maintenance</div>
                    <div className="text-2xl font-black">${repairCost.toLocaleString()}</div>
                    <div className="text-[10px] opacity-60 mt-1 italic">The cost to fix it now.</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Reactive Restoration</div>
                    <div className="text-2xl font-black text-red-400">${restorationCost.toLocaleString()}</div>
                    <div className="text-[10px] opacity-60 mt-1 italic">The cost to fix it later.</div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-medium leading-relaxed opacity-80 mb-6">
                    <span className="font-bold">A Note from Elric:</span>
                    {" "}
                    {riskScore < 20 
                      ? "Your risk is low, but in Oregon, it's never zero. A maintenance plan is your best defense."
                      : riskScore < 60
                      ? "This is a serious risk. At this stage, there's a high probability of hidden moisture that needs to be addressed."
                      : "This is a critical situation. Your property is likely sustaining damage right now. I recommend a forensic audit immediately."
                    }
                  </p>
                  <div className="flex gap-4">
                    <Link href="/contact" className="flex-1">
                      <Button variant="secondary" className="w-full font-black uppercase tracking-widest">
                        Schedule a Forensic Audit
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section variant="cream">
        <Container size="narrow" className="text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-6">Don&apos;t Wait for the Stain</h3>
          <p className="text-slate font-medium leading-relaxed mb-8">
            By the time you see evidence of dry rot on a wall, the structural damage behind it is already significant. We find the moisture before it becomes a problem. That&apos;s the difference between a simple repair and a major restoration.
          </p>
          <Link href="/plans">
            <Button size="lg" className="font-black uppercase tracking-widest">
                Explore Our Maintenance Plans
            </Button>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
