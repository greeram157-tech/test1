import type { Property, PropertyFilters } from '../types';

export const emptyFilters: PropertyFilters = {
  query: '',
  location: 'All',
  type: 'All',
  status: 'All',
  bedrooms: 'Any',
  minPrice: '',
  maxPrice: '',
};

export const hasActiveFilters = (f: PropertyFilters): boolean =>
  f.query.trim() !== '' ||
  f.location !== 'All' ||
  f.type !== 'All' ||
  f.status !== 'All' ||
  f.bedrooms !== 'Any' ||
  f.minPrice !== '' ||
  f.maxPrice !== '';

export function filterProperties(
  list: Property[],
  filters: PropertyFilters,
): Property[] {
  const query = filters.query.trim().toLowerCase();

  return list.filter((property) => {
    if (query) {
      const haystack = `${property.name} ${property.location} ${property.city} ${property.type}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.location !== 'All' && property.city !== filters.location) return false;
    if (filters.type !== 'All' && property.type !== filters.type) return false;
    if (filters.status !== 'All' && property.status !== filters.status) return false;
    if (filters.bedrooms !== 'Any' && property.bedrooms < filters.bedrooms) return false;
    if (filters.minPrice !== '' && property.price < filters.minPrice) return false;
    if (filters.maxPrice !== '' && property.price > filters.maxPrice) return false;
    return true;
  });
}
