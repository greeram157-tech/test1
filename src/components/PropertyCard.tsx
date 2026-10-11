import { Link } from 'react-router-dom';
import { ArrowUpRight, Bath, BedDouble, Maximize, MapPin } from 'lucide-react';
import type { Property } from '../types';
import { formatArea, formatPrice } from '../lib/format';
import FavoriteButton from './FavoriteButton';

interface PropertyCardProps {
  property: Property;
  /** Large editorial card for the featured grid. */
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const specs = [
    { icon: BedDouble, value: `${property.bedrooms} Beds` },
    { icon: Bath, value: `${property.bathrooms} Baths` },
    { icon: Maximize, value: formatArea(property.area) },
  ];

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden border border-navy/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_36px_70px_-32px_rgba(16,30,56,0.55)] ${
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      <Link
        to={`/properties/${property.slug}`}
        className={`relative block overflow-hidden ${
          featured ? 'aspect-[16/10]' : 'aspect-[4/3]'
        }`}
        aria-label={`View details for ${property.name}`}
      >
        <img
          src={property.images[0]}
          alt={`${property.name}, a ${property.type.toLowerCase()} in ${property.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent opacity-80" />

        <div className="absolute left-4 top-4 flex gap-2">
          {property.featured && (
            <span className="bg-gold px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy">
              Featured
            </span>
          )}
          {property.isNew && (
            <span className="bg-ocean px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ivory">
              New Listing
            </span>
          )}
        </div>

        <div className="absolute right-4 top-4">
          <FavoriteButton propertyId={property.id} propertyName={property.name} />
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium text-ivory/90">
          <MapPin size={13} className="text-gold" />
          {property.location}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
          <span>{property.type}</span>
          <span className="text-ocean">{property.status}</span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-navy">
          <Link to={`/properties/${property.slug}`} className="transition-colors hover:text-ocean">
            {property.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/60">
          {property.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-navy/10 py-4 text-xs font-medium text-navy/70">
          {specs.map(({ icon: Icon, value }) => (
            <span key={value} className="flex items-center gap-2">
              <Icon size={14} className="text-ocean" />
              {value}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
              {property.status === 'For Rent' ? 'Monthly' : 'Asking Price'}
            </div>
            <div className="font-display text-lg font-bold text-navy">
              {formatPrice(property.price, property.status)}
            </div>
          </div>
          <Link
            to={`/properties/${property.slug}`}
            className="btn border border-navy/20 px-5 py-3 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-ivory"
          >
            View Details <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
