import { useReveal } from '../hooks/useReveal';
import { useCountUp } from '../hooks/useCountUp';
import { formatCompact } from '../lib/format';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 1200, suffix: '+', label: 'Properties Sold' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 35, suffix: '+', label: 'Cities Served' },
  { value: 25, suffix: 'K', label: 'Clients Worldwide' },
];

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.value, start);

  return (
    <div className="px-4 py-8 text-center sm:py-10">
      <div className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.6rem]">
        {stat.prefix}
        {formatCompact(Math.round(value))}
        {stat.suffix}
      </div>
      <div className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-navy/50">
        {stat.label}
      </div>
    </div>
  );
}

export default function Statistics() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);

  return (
    <section ref={ref} className="border-y border-navy/10 bg-ivory">
      <div className="grid grid-cols-2 divide-x divide-y divide-navy/10 sm:grid-cols-4 sm:divide-y-0">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} start={visible} />
        ))}
      </div>
    </section>
  );
}
