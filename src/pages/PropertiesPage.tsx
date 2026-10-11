import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { properties } from '../data/properties';
import type { ListingStatus, PropertyFilters, PropertyType } from '../types';
import { emptyFilters } from '../lib/filterProperties';
import PropertyExplorer from '../components/PropertyExplorer';
import Reveal from '../components/Reveal';

export default function PropertiesPage() {
  const [params] = useSearchParams();

  const initialFilters = useMemo<Partial<PropertyFilters>>(() => {
    const next: Partial<PropertyFilters> = { ...emptyFilters };
    const type = params.get('type');
    const status = params.get('status');
    const location = params.get('location');
    const query = params.get('q');
    if (type) next.type = type as PropertyType;
    if (status) next.status = status as ListingStatus;
    if (location) next.location = location;
    if (query) next.query = query;
    return next;
  }, [params]);

  return (
    <div className="bg-ivory">
      <header className="border-b border-navy/10 bg-white px-6 py-16 md:px-10 md:py-20">
        <Reveal className="max-w-2xl">
          <span className="eyebrow text-ocean">Our Portfolio</span>
          <h1 className="mt-4 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-navy sm:text-5xl">
            Properties worth considering.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy/65">
            Browse our full collection of villas, estates, penthouses and waterfront
            residences. Refine by location, price, type and bedrooms to find the right
            address.
          </p>
        </Reveal>
      </header>

      <div className="px-6 py-14 md:px-10 md:py-16">
        <PropertyExplorer
          key={JSON.stringify(initialFilters)}
          properties={properties}
          initialFilters={initialFilters}
        />
      </div>
    </div>
  );
}
