import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks, site } from '../data/site';
import { useScrollPosition } from '../hooks/useScrollPosition';

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollPosition(20);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const goToSection = (href: string) => {
    setOpen(false);
    const [path, hash] = href.split('#');
    const targetPath = path || '/';
    const id = hash;

    const scroll = () => {
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (pathname !== targetPath) {
      navigate(targetPath);
      // Wait for the target route to paint before scrolling.
      window.setTimeout(scroll, 120);
    } else {
      scroll();
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 rounded-t-none bg-ivory transition-shadow duration-300 md:rounded-t-[28px] ${
        scrolled ? 'shadow-[0_10px_30px_-18px_rgba(16,30,56,0.5)]' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-baseline gap-2"
          aria-label={`${site.name} home`}
        >
          <span className="font-display text-lg font-extrabold uppercase tracking-[0.18em] text-navy md:text-xl">
            Ashvorth
          </span>
          <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold">
            &amp; Co.
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => goToSection(link.href)}
              className="group relative font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy/70 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToSection('/#contact')}
            className="btn-gold !px-5 !py-3"
          >
            Book a Consultation
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-navy/15 p-2.5 text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-navy/10 bg-ivory transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-3" aria-label="Mobile">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => goToSection(link.href)}
              className="border-b border-navy/5 py-4 text-left font-display text-sm font-semibold uppercase tracking-[0.16em] text-navy/80 transition-colors hover:text-ocean"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToSection('/#contact')}
            className="btn-solid mt-5 mb-2 w-full"
          >
            Book a Consultation
          </button>
        </nav>
      </div>
    </header>
  );
}
