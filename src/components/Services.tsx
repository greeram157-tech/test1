import {
  ArrowRight,
  BarChart3,
  Home,
  Search,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { services } from '../data/site';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const icons: Record<string, LucideIcon> = {
  home: Home,
  search: Search,
  'trending-up': TrendingUp,
  'bar-chart': BarChart3,
};

export default function Services() {
  return (
    <section id="services" className="bg-white px-6 py-20 md:px-10 md:py-24">
      <SectionHeading
        eyebrow="Our Services"
        title="Considered advice, end to end."
        description="From first viewing to long-term portfolio strategy, every service is delivered by specialists who know their market intimately."
      />

      <div className="mt-12 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = icons[service.icon] ?? Home;
          return (
            <Reveal key={service.id} delay={index * 80}>
              <article className="group flex h-full flex-col bg-white p-8 transition-colors duration-500 hover:bg-ivory md:p-10">
                <div className="flex h-12 w-12 items-center justify-center border border-navy/15 text-ocean transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold leading-snug text-navy">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/60">
                  {service.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-navy/70 transition-colors group-hover:text-gold">
                  Learn More
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
