import { Container } from './Container';

export function TrustBar() {
  return (
    <div className="bg-cream border-y border-slate/5 py-4">
      <Container>
        <div className="flex flex-wrap justify-center gap-6 opacity-90 md:gap-12">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">CCB #258533</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate/80">
              Oregon Licensed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Fully Insured</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate/80">
              General Liability
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">24/7 Response</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate/80">
              Emergency Only
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}
