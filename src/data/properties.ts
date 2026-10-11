import type { Agent, Property, PropertyType, ListingStatus } from '../types';
import { propertyImages } from './images';

export const agents: Record<string, Agent> = {
  eleanor: {
    name: 'Eleanor Vance',
    title: 'Principal Advisor, Residential',
    phone: '+1 (310) 555-0142',
    email: 'eleanor@ashvorth.co',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
  },
  marcus: {
    name: 'Marcus Ellery',
    title: 'Director, Investment Advisory',
    phone: '+1 (212) 555-0177',
    email: 'marcus@ashvorth.co',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
  },
};

export const properties: Property[] = [
  {
    id: 'prop-001',
    slug: 'the-halcyon-residence',
    name: 'The Halcyon Residence',
    location: 'Bel Air, Los Angeles',
    city: 'Los Angeles',
    price: 18500000,
    status: 'For Sale',
    type: 'Villa',
    bedrooms: 6,
    bathrooms: 7,
    area: 9400,
    lotArea: 1.4,
    yearBuilt: 2021,
    featured: true,
    isNew: true,
    images: [...propertyImages.hillsideVilla],
    summary:
      'A glass-and-stone hillside villa with a 70-foot infinity pool and uninterrupted canyon-to-ocean views.',
    description:
      'Set behind private gates on a promontory above Bel Air, The Halcyon Residence is an exercise in restraint and light. Floor-to-ceiling glazing dissolves the line between the living spaces and a cantilevered terrace, where a 70-foot infinity pool appears to spill into the canyon below. Interiors by a celebrated Milanese studio pair honed travertine with smoked oak, while the primary suite occupies its own wing with a spa bath and dual dressing rooms. A subterranean level houses a screening room, wine gallery and wellness suite with sauna and cold plunge.',
    features: [
      '70-ft infinity-edge pool',
      'Cantilevered sunset terrace',
      'Subterranean screening room',
      'Wine gallery for 1,200 bottles',
      'Wellness suite with sauna & cold plunge',
      'Four-car gallery garage',
    ],
    amenities: [
      'Smart-home automation',
      'Radiant heated floors',
      'Chef\'s kitchen with dual islands',
      'Staff quarters',
      'Solar with battery backup',
      'Gated motor court',
    ],
    coordinates: { lat: 34.0900, lng: -118.4420 },
    agent: agents.eleanor,
  },
  {
    id: 'prop-002',
    slug: 'villa-serena',
    name: 'Villa Serena',
    location: 'Paradise Cove, Malibu',
    city: 'Malibu',
    price: 22400000,
    status: 'For Sale',
    type: 'Waterfront',
    bedrooms: 5,
    bathrooms: 6,
    area: 7600,
    lotArea: 0.9,
    yearBuilt: 2019,
    featured: true,
    isNew: false,
    images: [...propertyImages.waterfrontEstate],
    summary:
      'Beachfront living with 120 feet of private sand, a reflecting pool and a guest pavilion at the water\'s edge.',
    description:
      'Villa Serena commands 120 feet of private beachfront on one of Malibu\'s most protected coves. A single-storey composition of board-formed concrete and teak opens entirely to the Pacific, with a reflecting pool that mirrors the horizon at dusk. The primary suite and three guest suites each face the water, while a detached pavilion provides a studio, gym and additional guest accommodation. Landscape design by a noted coastal studio frames native grasses and mature olive trees.',
    features: [
      '120 ft of private beach frontage',
      'Reflecting pool & sun terrace',
      'Detached guest pavilion',
      'Outdoor kitchen and fire lounge',
      'Primary suite with ocean terrace',
      'Direct beach access',
    ],
    amenities: [
      'Solar array & battery storage',
      'Full-home water filtration',
      'Temperature-controlled cellar',
      'Gated entry with security',
      'Bocce court',
      'Two-car garage plus parking court',
    ],
    coordinates: { lat: 34.0200, lng: -118.7900 },
    agent: agents.eleanor,
  },
  {
    id: 'prop-003',
    slug: 'the-observatory-penthouse',
    name: 'The Observatory Penthouse',
    location: 'Tribeca, New York',
    city: 'New York',
    price: 31000000,
    status: 'For Sale',
    type: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    area: 5400,
    yearBuilt: 2020,
    featured: true,
    isNew: true,
    images: [...propertyImages.skyPenthouse],
    summary:
      'A full-floor penthouse with a wrap terrace, private elevator landing and 360-degree skyline views.',
    description:
      'Occupying the crown of a landmarked Tribeca tower, The Observatory Penthouse is a full-floor residence reached by private elevator landing. Eleven-foot ceilings and a 90-foot great room frame views from the Hudson to the Empire State Building. A wrap-around terrace with an outdoor kitchen and fireplace extends the living space into the sky. The primary wing includes a corner study, two dressing rooms and a limestone bath with a freestanding soaking tub positioned against the glass.',
    features: [
      'Full-floor private elevator landing',
      '90-ft great room',
      'Wrap-around terrace with fireplace',
      'Corner study with skyline views',
      'Two primary dressing rooms',
      'Chef\'s kitchen with butler\'s pantry',
    ],
    amenities: [
      '24-hour doorman & concierge',
      'Residents\' fitness and spa',
      'Private wine storage',
      'Cold storage and package room',
      'Two parking spaces',
      'Acoustic-grade glazing',
    ],
    coordinates: { lat: 40.7163, lng: -74.0086 },
    agent: agents.marcus,
  },
  {
    id: 'prop-004',
    slug: 'casa-del-mar',
    name: 'Casa del Mar',
    location: 'Montecito, Santa Barbara',
    city: 'Santa Barbara',
    price: 14750000,
    status: 'For Sale',
    type: 'Estate',
    bedrooms: 7,
    bathrooms: 8,
    area: 11200,
    lotArea: 3.2,
    yearBuilt: 2017,
    featured: false,
    isNew: false,
    images: [...propertyImages.coastalRetreat],
    summary:
      'A Mediterranean estate on three ocean-view acres with olive groves, a pool pavilion and a guest house.',
    description:
      'Casa del Mar is a Mediterranean estate set across three gently terraced acres of olive groves and lavender. The main residence centres on a vaulted great room with hand-hewn beams and a limestone fireplace, opening to loggias and a lawn that runs to the bluff edge. A pool pavilion with a summer kitchen sits above the orchard, and a two-bedroom guest house offers privacy for visitors. The property is offered with an adjacent parcel available by separate negotiation.',
    features: [
      'Three ocean-view acres',
      'Olive grove and lavender terraces',
      'Pool pavilion with summer kitchen',
      'Two-bedroom guest house',
      'Vaulted great room with limestone fireplace',
      'Loggias and bluff-edge lawn',
    ],
    amenities: [
      'Gated drive with motor court',
      'Four-car garage plus workshop',
      'Full-home generator',
      'Fruit orchard and kitchen garden',
      'Tennis court',
      'Staff quarters',
    ],
    coordinates: { lat: 34.4200, lng: -119.6300 },
    agent: agents.eleanor,
  },
  {
    id: 'prop-005',
    slug: 'the-linden-house',
    name: 'The Linden House',
    location: 'Chelsea, London',
    city: 'London',
    price: 42000,
    status: 'For Rent',
    type: 'Mansion',
    bedrooms: 5,
    bathrooms: 5,
    area: 6100,
    yearBuilt: 2015,
    featured: false,
    isNew: true,
    images: [...propertyImages.glassMansion],
    summary:
      'A contemporary townhouse arranged over five floors with a garden, lift and a lower-level wellness floor.',
    description:
      'The Linden House is a contemporary townhouse arranged over five light-filled floors behind a stucco façade. A full-height glazed stair connects a formal drawing room, a garden-level kitchen and family room, and a principal suite spanning the entire first floor. The lower level is given over to wellness — a pool, gym and treatment room — while a west-facing garden and roof terrace provide outdoor rooms in the heart of Chelsea.',
    features: [
      'Arranged over five floors',
      'Full-height glazed stair',
      'Lower-level pool & gym',
      'West-facing private garden',
      'Roof terrace with planting',
      'Passenger lift to all floors',
    ],
    amenities: [
      'Off-street parking',
      'Air conditioning throughout',
      'Wine room',
      'Media room',
      'Underfloor heating',
      'Available furnished or unfurnished',
    ],
    coordinates: { lat: 51.4875, lng: -0.1687 },
    agent: agents.marcus,
  },
  {
    id: 'prop-006',
    slug: 'azure-sky-residence',
    name: 'Azure Sky Residence',
    location: 'South Beach, Miami',
    city: 'Miami',
    price: 9800000,
    status: 'For Sale',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 4,
    area: 3900,
    yearBuilt: 2022,
    featured: false,
    isNew: false,
    images: [...propertyImages.modernEstate],
    summary:
      'A corner sky residence with a 60-foot terrace overlooking Biscayne Bay and the Miami skyline.',
    description:
      'Azure Sky Residence is a corner home in the sky with a 60-foot terrace that wraps the living and dining spaces, capturing Biscayne Bay to the west and the skyline to the north. Interiors pair pale limestone with warm walnut, and the kitchen is fitted with a full suite of European appliances. The building offers resort-grade amenities, a private marina berth and a residents\' beach club a short walk away.',
    features: [
      '60-ft wrap terrace',
      'Bay and skyline views',
      'Limestone and walnut interiors',
      'European appliance suite',
      'Primary suite with bay terrace',
      'Two assigned parking spaces',
    ],
    amenities: [
      'Residents\' beach club',
      'Infinity pool and spa deck',
      'Fitness centre and yoga studio',
      'Private marina berth available',
      'Valet and concierge',
      'Pet friendly',
    ],
    coordinates: { lat: 25.7826, lng: -80.1341 },
    agent: agents.marcus,
  },
];

export const propertyTypes: PropertyType[] = [
  'Villa',
  'Mansion',
  'Penthouse',
  'Waterfront',
  'Estate',
  'Apartment',
];

export const listingStatuses: ListingStatus[] = ['For Sale', 'For Rent'];

export const locations: string[] = Array.from(
  new Set(properties.map((p) => p.city)),
).sort();

export const getPropertyBySlug = (slug: string): Property | undefined =>
  properties.find((p) => p.slug === slug);

export const getSimilarProperties = (property: Property, limit = 3): Property[] =>
  properties
    .filter((p) => p.id !== property.id)
    .sort((a, b) => {
      const score = (x: Property) =>
        (x.type === property.type ? 2 : 0) + (x.city === property.city ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
