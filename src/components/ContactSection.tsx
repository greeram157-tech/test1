import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { images } from '../data/images';
import { site } from '../data/site';
import ContactForm from './ContactForm';
import Reveal from './Reveal';

export default function ContactSection() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-navy px-6 py-20 md:px-10 md:py-24">
      <img
        src={images.contactArchitecture}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-midnight" />

      <div className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow text-gold">Contact &amp; Consultation</span>
          <h2 className="mt-5 text-3xl font-bold uppercase leading-[1.1] tracking-tight text-ivory sm:text-4xl">
            Let&apos;s find your next property.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70">
            Share a few details and an advisor will respond personally. Every conversation
            is held in confidence.
          </p>

          <div className="mt-10 space-y-5">
            <ContactDetail icon={MapPin} label="Office">
              {site.address}
            </ContactDetail>
            <ContactDetail icon={Phone} label="Phone">
              <a href={`tel:${site.phone}`} className="transition-colors hover:text-gold">
                {site.phone}
              </a>
            </ContactDetail>
            <ContactDetail icon={Mail} label="Email">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                {site.email}
              </a>
            </ContactDetail>
            <ContactDetail icon={Clock} label="Business Hours">
              <ul className="space-y-1">
                {site.hours.map((entry) => (
                  <li key={entry.day} className="flex justify-between gap-6 text-ivory/60">
                    <span>{entry.day}</span>
                    <span>{entry.time}</span>
                  </li>
                ))}
              </ul>
            </ContactDetail>
          </div>

          <div className="mt-8 flex gap-6">
            {site.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-ivory/12 bg-white/[0.03] p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/15 text-gold">
        <Icon size={16} />
      </span>
      <div className="flex-1">
        <div className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ivory/40">
          {label}
        </div>
        <div className="mt-1 text-sm text-ivory/80">{children}</div>
      </div>
    </div>
  );
}
