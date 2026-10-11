import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { navLinks, site } from '../data/site';
import { propertyTypes } from '../data/properties';
import NewsletterForm from './NewsletterForm';

const socialIcons = [Instagram, Linkedin, Twitter];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy px-6 pb-8 pt-16 text-ivory md:rounded-b-[28px] md:px-10">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-extrabold uppercase tracking-[0.18em] text-ivory">
              Ashvorth
            </span>
            <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold">
              &amp; Co.
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
            {site.description}
          </p>
          <div className="mt-6 flex gap-3">
            {site.social.map((item, i) => {
              const Icon = socialIcons[i] ?? Instagram;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="eyebrow text-gold">Navigate</h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Property categories">
          <h3 className="eyebrow text-gold">Properties</h3>
          <ul className="mt-5 space-y-3">
            {propertyTypes.map((type) => (
              <li key={type}>
                <Link
                  to={`/properties?type=${encodeURIComponent(type)}`}
                  className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                >
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-gold">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/65">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-ivory/40" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-ivory/40" />
              <a href={`tel:${site.phone}`} className="transition-colors hover:text-ivory">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-ivory/40" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-ivory">
                {site.email}
              </a>
            </li>
          </ul>

          <h3 className="eyebrow mt-8 text-gold">Newsletter</h3>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-ivory/12 pt-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name} All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="/" className="transition-colors hover:text-ivory">
            Privacy Policy
          </Link>
          <Link to="/" className="transition-colors hover:text-ivory">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
