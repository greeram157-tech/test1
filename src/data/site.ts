import type { Service, Testimonial } from '../types';

export const site = {
  name: 'ASHVORTH & CO.',
  tagline: 'Residential & Investment Property',
  description:
    'A luxury real estate and property investment advisory representing exceptional residences across the world\'s most considered addresses.',
  phone: '+1 (310) 555-0100',
  email: 'hello@ashvorth.co',
  address: '18 Crescent Row, Beverly Hills, CA 90210',
  hours: [
    { day: 'Monday – Friday', time: '9:00 – 18:00' },
    { day: 'Saturday', time: '10:00 – 16:00' },
    { day: 'Sunday', time: 'By appointment' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'X', href: 'https://x.com' },
  ],
} as const;

export const services: Service[] = [
  {
    id: 'sales',
    title: 'Luxury Residential Sales',
    description:
      'Discreet representation for exceptional homes, from first viewing to a considered close.',
    icon: 'home',
  },
  {
    id: 'acquisition',
    title: 'Property Acquisition',
    description:
      'Off-market access and rigorous due diligence for buyers seeking the right address.',
    icon: 'search',
  },
  {
    id: 'investment',
    title: 'Investment Advisory',
    description:
      'Portfolio strategy, yield analysis and long-term structuring for property investors.',
    icon: 'trending-up',
  },
  {
    id: 'valuation',
    title: 'Property Valuation & Consultation',
    description:
      'Independent valuations and market insight to inform confident decisions.',
    icon: 'bar-chart',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Amara Whitfield',
    role: 'Buyer — Bel Air',
    quote:
      'They understood the brief immediately and never wasted our time. Every viewing was considered, and the negotiation was handled with real discretion.',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Jonathan Reyes',
    role: 'Seller — Malibu',
    quote:
      'Our home was presented beautifully and sold above expectation. The team treated the process like a relationship, not a transaction.',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Priya Raghunathan',
    role: 'Investor — Portfolio Client',
    quote:
      'Their investment guidance has been consistently sharp. Clear analysis, honest advice and a long-term view we trust.',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

export const navLinks = [
  { label: 'Properties', href: '/#properties' },
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/#about' },
  { label: 'Insights', href: '/#insights' },
  { label: 'Contact', href: '/#contact' },
];
