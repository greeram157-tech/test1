import { ArrowRight } from 'lucide-react';
import { images } from '../data/images';

interface HeroProps {
  onExplore: () => void;
  onServices: () => void;
}

export default function Hero({ onExplore, onServices }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <img
        src={images.hero}
        alt="Modern luxury villa with an infinity pool overlooking the coastline at sunset"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/70 to-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/30" />

      <div className="relative flex min-h-[560px] flex-col justify-center px-6 py-20 sm:min-h-[620px] md:px-14 md:py-28">
        <div className="max-w-xl animate-fade-up">
          <span className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold" />
            Residential &amp; Investment Property
          </span>

          <h1 className="mt-6 text-[2.75rem] font-extrabold uppercase leading-[0.98] tracking-tight text-ivory sm:text-6xl lg:text-[4.25rem]">
            Property,
            <br />
            <span className="text-gold">Considered.</span>
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-ivory/75 sm:text-lg">
            Discover exceptional homes and investment opportunities, guided by a team
            that values relationships as much as results.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button type="button" onClick={onExplore} className="btn-solid">
              Explore Properties <ArrowRight size={15} />
            </button>
            <button type="button" onClick={onServices} className="btn-ghost">
              Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
