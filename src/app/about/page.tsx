import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section, Badge, Button } from '@/components/ui';
import { SERVICE_AREAS } from '@/lib/constants';
import { ShieldCheck, Ruler, Map, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Benson Home Solutions | A Message from Elric Benson',
  description:
    'Meet Elric Benson, a licensed Oregon contractor (CCB #258533) with a passion for proactive property care. Learn about our maintenance-first philosophy.',
  keywords: [
    'Benson Home Solutions about',
    'Elric Benson Oregon contractor',
    'maintenance-first philosophy',
    'licensed Oregon contractor CCB 258533',
    'Salem Oregon property care',
    'Burns Oregon property care',
  ],
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            A Note from Our Founder
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            I got tired of <br />
            <span className="italic text-oxblood/60">fixing preventable problems.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto">
            After a decade in construction, I saw the same story over and over: a small, hidden issue like a clogged gutter or a pinhole leak turning into a $30,000 restoration project. I started Benson Home Solutions to get property owners out of that expensive, reactive cycle.
          </p>
        </Container>
      </Section>

      {/* Bio Section */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1">
              <Image
                src="/images/elric-benson.jpg"
                alt="Elric Benson, Founder of Benson Home Solutions"
                width={400}
                height={500}
                className="rounded-3xl object-cover shadow-2xl"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">
                Elric Benson
              </h2>
              <p className="text-slate font-medium leading-relaxed mb-6">
                {"I'm a licensed general contractor (CCB #258533) with over 15 years of experience in the field. I'm not a salesman; I'm a builder. My team and I use the same tools and techniques on your property that we'd use on our own. We don't believe in quick fixes or cutting corners. We believe in doing the job right, the first time."}
              </p>
              <div className="bg-oxblood p-8 rounded-2xl text-cream">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6">Our Core Standards</h3>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-cream/60" />
                    <div>
                      <div className="font-black uppercase tracking-widest text-xs mb-1">Fully Licensed & Insured</div>
                      <div className="text-cream/80 text-sm">We are fully licensed (CCB #258533), bonded, and insured for your protection.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Ruler className="w-5 h-5 shrink-0 text-cream/60" />
                    <div>
                      <div className="font-black uppercase tracking-widest text-xs mb-1">Forensic Precision</div>
                      <div className="text-cream/80 text-sm">We use thermal imaging, moisture meters, and other specialized tools to find problems you can&apos;t see.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Scale className="w-5 h-5 shrink-0 text-cream/60" />
                    <div>
                      <div className="font-black uppercase tracking-widest text-xs mb-1">Total Transparency</div>
                      <div className="text-cream/80 text-sm">We provide detailed, data-backed reports after every visit. No jargon, just facts.</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Dual Region Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Proudly Serving Oregon
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              Our methods are tailored to the unique challenges of Oregon&apos;s climates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface p-10 rounded-2xl border border-oxblood/5 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4 flex items-center gap-3">
                <Map className="w-6 h-6" /> The Mid-Willamette Valley
              </h3>
              <p className="text-slate font-medium mb-6 leading-relaxed">
                In the Valley, our focus is on managing moisture to prevent rot and mold.
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.midWillametteValley.slice(0, 5).map(city => (
                  <span key={city} className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">{city}</span>
                ))}
                <span className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">+ More</span>
              </div>
            </div>

            <div className="bg-surface p-10 rounded-2xl border border-oxblood/5 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4 flex items-center gap-3">
                <Map className="w-6 h-6" /> The High Desert
              </h3>
              <p className="text-slate font-medium mb-6 leading-relaxed">
                In Harney County, we focus on winterization and wildfire protection.
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.harneyCounty.map(city => (
                  <span key={city} className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">{city}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust & Stats */}
      <Section spacing="lg">
        <Container className="text-center">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">15+</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Years of In-The-Field <br />Experience</div>
            </div>
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">200+</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Properties Protected in <br />Oregon</div>
            </div>
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">4.9/5</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Average Client <br />Rating</div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto border-t border-oxblood/10 pt-16">
            <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-8">Ready to Switch to Proactive Maintenance?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/plans">
                <Button size="lg" className="w-full sm:w-auto px-10 py-7 text-base md:text-lg font-black uppercase tracking-widest shadow-xl shadow-oxblood/20">
                  Explore Our Plans
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-7 text-base md:text-lg font-black uppercase tracking-widest border-2 border-oxblood text-oxblood">
                  Request a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
