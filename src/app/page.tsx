/**
 * Benson Home Solutions Home Page - Rebuild V1 (2026)
 * Answer-First SEO Strategy.
 */
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <section className="max-w-4xl mx-auto text-center">
        <span className="bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-8 inline-block">
          Oregon CCB #258533
        </span>
        <h2 className="text-6xl font-black mb-8 leading-[1.1] tracking-tight">
          Stop Reacting to Leaks. <br />
          <span className="text-maroon/60 italic">Start Maintaining.</span>
        </h2>
        <p className="text-xl mb-12 leading-relaxed font-medium text-maroon/80 max-w-2xl mx-auto">
          We provide proactive, forensic home maintenance for the Mid-Willamette Valley and Harney County. If we aren&apos;t on your property once a month, you aren&apos;t protected.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/calculator" className="bg-maroon text-cream px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition shadow-xl shadow-maroon/20">
            True Cost Calculator
          </a>
          <a href="/maintenance" className="border-2 border-maroon text-maroon px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-maroon hover:text-cream transition">
            View Plans
          </a>
        </div>
      </section>

      <div className="mt-32 grid md:grid-cols-3 gap-12">
        <div className="group">
          <div className="h-2 w-12 bg-maroon mb-6 group-hover:w-full transition-all duration-500" />
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Forensic Audits</h3>
          <p className="text-maroon/70 font-medium leading-relaxed">
            We find moisture, heat loss, and structural decay before they become insurance claims. Standard inspections are visual; we are forensic.
          </p>
        </div>
        <div className="group">
          <div className="h-2 w-12 bg-maroon mb-6 group-hover:w-full transition-all duration-500" />
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Valley Protection</h3>
          <p className="text-maroon/70 font-medium leading-relaxed">
            Specifically engineered for the Mid-Willamette Valley climate. Gutters, drainage, and building envelopes optimized for Oregon rain.
          </p>
        </div>
        <div className="group">
          <div className="h-2 w-12 bg-maroon mb-6 group-hover:w-full transition-all duration-500" />
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">High Desert Prep</h3>
          <p className="text-maroon/70 font-medium leading-relaxed">
            Harney County winterization and wildfire hardening. We protect properties from Burns to Drewsey against extreme climate swings.
          </p>
        </div>
      </div>
    </div>
  );
}
