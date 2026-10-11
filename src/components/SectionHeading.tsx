import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  action?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  action,
}: SectionHeadingProps) {
  const isLight = tone === 'light';
  const centered = align === 'center';

  return (
    <Reveal
      className={`flex flex-col gap-6 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={`max-w-2xl ${centered ? 'mx-auto' : ''}`}>
        <span className={`eyebrow ${isLight ? 'text-gold' : 'text-ocean'}`}>
          {eyebrow}
        </span>
        <h2
          className={`mt-4 text-3xl font-bold uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
            isLight ? 'text-ivory' : 'text-navy'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-5 text-base leading-relaxed ${
              isLight ? 'text-ivory/70' : 'text-navy/65'
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
