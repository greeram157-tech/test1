import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { PropertyFilters as Filters, PropertyType, ListingStatus } from '../types';
import { listingStatuses, locations, propertyTypes } from '../data/properties';
import { hasActiveFilters } from '../lib/filterProperties';

interface PropertyFiltersProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  onSearch: () => void;
  resultCount: number;
}

const bedroomOptions: Array<number | 'Any'> = ['Any', 1, 2, 3, 4, 5, 6];

export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  onSearch,
  resultCount,
}: PropertyFiltersProps) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="border border-navy/10 bg-white p-5 shadow-card sm:p-6"
      role="search"
      aria-label="Property search and filters"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy/70">
          <SlidersHorizontal size={15} className="text-ocean" />
          Refine Search
        </span>
        <span className="text-xs text-navy/50" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'property' : 'properties'}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <label htmlFor="filter-query" className="field-label">
            Keyword
          </label>
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/35"
            />
            <input
              id="filter-query"
              type="search"
              value={filters.query}
              onChange={(e) => set('query', e.target.value)}
              placeholder="Search by name, city or property type"
              className="field pl-11"
            />
          </div>
        </div>

        <div>
          <label htmlFor="filter-location" className="field-label">
            Location
          </label>
          <select
            id="filter-location"
            value={filters.location}
            onChange={(e) => set('location', e.target.value)}
            className="field"
          >
            <option value="All">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-type" className="field-label">
            Property Type
          </label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(e) => set('type', e.target.value as PropertyType | 'All')}
            className="field"
          >
            <option value="All">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-status" className="field-label">
            Listing
          </label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => set('status', e.target.value as ListingStatus | 'All')}
            className="field"
          >
            <option value="All">For Sale or Rent</option>
            {listingStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-bedrooms" className="field-label">
            Bedrooms
          </label>
          <select
            id="filter-bedrooms"
            value={String(filters.bedrooms)}
            onChange={(e) =>
              set('bedrooms', e.target.value === 'Any' ? 'Any' : Number(e.target.value))
            }
            className="field"
          >
            {bedroomOptions.map((option) => (
              <option key={String(option)} value={String(option)}>
                {option === 'Any' ? 'Any' : `${option}+`}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:col-span-1 lg:col-span-2">
          <div>
            <label htmlFor="filter-min" className="field-label">
              Min Price (USD)
            </label>
            <input
              id="filter-min"
              type="number"
              min={0}
              inputMode="numeric"
              value={filters.minPrice}
              onChange={(e) =>
                set('minPrice', e.target.value === '' ? '' : Number(e.target.value))
              }
              placeholder="0"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="filter-max" className="field-label">
              Max Price (USD)
            </label>
            <input
              id="filter-max"
              type="number"
              min={0}
              inputMode="numeric"
              value={filters.maxPrice}
              onChange={(e) =>
                set('maxPrice', e.target.value === '' ? '' : Number(e.target.value))
              }
              placeholder="Any"
              className="field"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-navy">
          <Search size={15} /> Search Properties
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters(filters)}
          className="btn border border-navy/15 px-6 py-3.5 text-navy/70 transition-colors hover:border-navy/40 hover:text-navy disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X size={15} /> Clear Filters
        </button>
      </div>
    </form>
  );
}
