import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const articles = [
  {
    id: 'i1',
    tag: 'Market Report',
    title: 'Where the prime market is heading this year',
    excerpt:
      'A considered look at pricing, inventory and the neighbourhoods drawing long-term capital.',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'i2',
    tag: 'Advisory',
    title: 'Five questions to ask before you buy a second home',
    excerpt:
      'How to weigh lifestyle, yield and liquidity when a property is both a home and an asset.',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'i3',
    tag: 'Design',
    title: 'The architecture defining modern coastal living',
    excerpt:
      'Light, materiality and the quiet luxury shaping the most desirable homes on the water.',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
  },
];

export default function Insights() {
  return (
    <section id="insights" className="bg-white px-6 py-20 md:px-10 md:py-24">
      <SectionHeading
        eyebrow="Insights"
        title="Perspective from the market."
        description="Notes, reports and guidance from the advisors who work the market every day."
      />

      <div className="mt-12 grid gap-7 md:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal key={article.id} delay={index * 90}>
            <article className="group flex h-full flex-col">
              <div className="overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                />
              </div>
              <span className="mt-5 font-display text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold">
                {article.tag}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/60">
                {article.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-navy/70 transition-colors group-hover:text-ocean">
                Read Article
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
