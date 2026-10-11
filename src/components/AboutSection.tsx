import { ArrowRight } from 'lucide-react';
import { images } from '../data/images';
import Reveal from './Reveal';

export default function AboutSection() {
  const goToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="about" className="bg-midnight px-6 py-20 text-ivory md:px-10 md:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-3 -top-3 hidden h-full w-full border border-gold/40 md:block" />
            <img
              src={images.aboutAdvisor}
              alt="A senior Ashvorth & Co. real estate advisor beside a model of a luxury property"
              loading="lazy"
              className="relative h-[420px] w-full object-cover sm:h-[520px]"
            />
            <div className="absolute bottom-6 left-6 right-6 border border-ivory/15 bg-navy/90 px-6 py-5 sm:left-auto sm:w-64">
              <div className="font-display text-3xl font-extrabold text-gold">25+</div>
              <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory/60">
                Years of trusted advisory
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow text-gold">Your Trusted Partner</span>
          <h2 className="mt-5 text-3xl font-bold uppercase leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.6rem]">
            From acquisition to close, considered at every step.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70">
            We believe great homes begin with great relationships. From buying and selling
            to strategic property investment, our team makes every step simple, transparent,
            and built to last.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              'Discreet, relationship-led representation',
              'Off-market access and private listings',
              'Data-informed valuation and strategy',
              'A single advisor from brief to close',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ivory/75">
                <span className="mt-2 h-px w-5 shrink-0 bg-gold" />
                {item}
              </li>
            ))}
          </ul>

          <button type="button" onClick={goToContact} className="btn-gold mt-10">
            Speak With an Advisor <ArrowRight size={15} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
