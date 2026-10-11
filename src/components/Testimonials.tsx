import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../data/site';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <section className="bg-ivory px-6 py-20 md:px-10 md:py-24">
      <SectionHeading
        eyebrow="Client Stories"
        title="Trusted by discerning clients."
        align="center"
      />

      <Reveal className="mx-auto mt-12 max-w-3xl">
        <div className="relative border border-navy/10 bg-white px-7 py-10 shadow-card sm:px-12 sm:py-14">
          <Quote size={40} className="text-gold/40" aria-hidden="true" />

          <blockquote aria-live="polite" className="mt-6">
            <p className="font-display text-xl leading-relaxed text-navy sm:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="mt-7 flex items-center gap-4">
              <img
                src={current.image}
                alt={current.name}
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <div className="font-display text-sm font-bold uppercase tracking-[0.12em] text-navy">
                  {current.name}
                </div>
                <div className="text-xs text-navy/55">{current.role}</div>
                <div
                  className="mt-1 flex gap-0.5"
                  aria-label={`${current.rating} out of 5 stars`}
                >
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </div>
          </blockquote>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-2" aria-hidden="true">
              {testimonials.map((t, i) => (
                <span
                  key={t.id}
                  className={`h-1.5 transition-all duration-300 ${
                    i === index ? 'w-8 bg-gold' : 'w-4 bg-navy/15'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center border border-navy/15 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-ivory"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center border border-navy/15 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-ivory"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-navy/40">
          Sample testimonials shown for demonstration — replace with verified client reviews.
        </p>
      </Reveal>
    </section>
  );
}
