import { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import type { Property, PropertyFilters as Filters } from '../types';
import { emptyFilters, filterProperties } from '../lib/filterProperties';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';

interface PropertyExplorerProps {
  properties: Property[];
  initialFilters?: Partial<Filters>;
  /** Cap the number of rendered cards (used on the homepage). */
  limit?: number;
  /** Render the first card as a large editorial feature. */
  featureFirst?: boolean;
}

export default function PropertyExplorer({
  properties,
  initialFilters,
  limit,
  featureFirst = false,
}: PropertyExplorerProps) {
  const [filters, setFilters] = useState<Filters>({
    ...emptyFilters,
    ...initialFilters,
  });

  const results = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters],
  );

  const visible = typeof limit === 'number' ? results.slice(0, limit) : results;

  const reset = () => setFilters({ ...emptyFilters, ...initialFilters });

  return (
    <div>
      <PropertyFilters
        filters={filters}
        onChange={setFilters}
        onReset={reset}
        onSearch={() => {
          const el = document.getElementById('property-results');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        resultCount={results.length}
      />

      <div id="property-results" className="mt-10 scroll-mt-28">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-navy/20 bg-white/60 px-6 py-20 text-center">
            <SearchX size={32} className="text-navy/30" />
            <h3 className="mt-4 font-display text-lg font-bold text-navy">
              No properties match your search
            </h3>
            <p className="mt-2 max-w-sm text-sm text-navy/55">
              Try broadening your price range or clearing a filter to see more homes.
            </p>
            <button type="button" onClick={reset} className="btn-navy mt-6">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                featured={featureFirst && index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
