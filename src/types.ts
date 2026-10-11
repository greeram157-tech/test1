export type PropertyType =
  | 'Villa'
  | 'Mansion'
  | 'Penthouse'
  | 'Waterfront'
  | 'Estate'
  | 'Apartment';

export type ListingStatus = 'For Sale' | 'For Rent';

export interface Agent {
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string;
  /** Asking price in USD. For rentals this is the monthly price. */
  price: number;
  status: ListingStatus;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  /** Interior area in square feet. */
  area: number;
  lotArea?: number;
  yearBuilt: number;
  featured: boolean;
  isNew: boolean;
  images: string[];
  summary: string;
  description: string;
  features: string[];
  amenities: string[];
  coordinates: { lat: number; lng: number };
  agent: Agent;
}

export interface PropertyFilters {
  query: string;
  location: string;
  type: PropertyType | 'All';
  status: ListingStatus | 'All';
  bedrooms: number | 'Any';
  minPrice: number | '';
  maxPrice: number | '';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
