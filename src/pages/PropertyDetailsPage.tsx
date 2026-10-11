import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Calendar,
  Check,
  LandPlot,
  MapPin,
  Maximize,
  Phone,
  Mail,
} from 'lucide-react';
import { getPropertyBySlug, getSimilarProperties } from '../data/properties';
import { formatArea, formatPrice } from '../lib/format';
import PropertyGallery from '../components/PropertyGallery';
import MortgageCalculator from '../components/MortgageCalculator';
import PropertyInquiryForm from '../components/PropertyInquiryForm';
import PropertyCard from '../components/PropertyCard';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import Reveal from '../components/Reveal';
import NotFoundPage from './NotFoundPage';

export default function PropertyDetailsPage() {
  const { slug = '' } = useParams();
  const property = getPropertyBySlug(slug);

  useEffect(() => {
    if (!property) return;
    document.title = `${property.name} — ${property.location} | ASHVORTH & CO.`;
    return () => {
      document.title = 'ASHVORTH & CO. — Luxury Real Estate & Property Investment';
    };
  }, [property]);

  if (!property) return <NotFoundPage />;

  const specs = [
    { icon: BedDouble, label: 'Bedrooms', value: String(property.bedrooms) },
    { icon: Bath, label: 'Bathrooms', value: String(property.bathrooms) },
    { icon: Maximize, label: 'Interior', value: formatArea(property.area) },
    {
      icon: LandPlot,
      label: 'Lot',
      value: property.lotArea ? `${property.lotArea} acres` : '—',
    },
    { icon: Building2, label: 'Type', value: property.type },
    { icon: Calendar, label: 'Built', value: String(property.yearBuilt) },
  ];

  const similar = getSimilarProperties(property);
  const { lat, lng } = property.coordinates;
  const bbox = `${lng - 0.02}%2C${lat - 0.02}%2C${lng + 0.02}%2C${lat + 0.02}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="bg-ivory">
      <div className="border-b border-navy/10 bg-white px-6 py-4 md:px-10">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-navy/60 transition-colors hover:text-navy"
        >
          <ArrowLeft size={14} /> Back to Properties
        </Link>
      </div>

      <div className="px-6 py-10 md:px-10 md:py-14">
        <Reveal>
          <PropertyGallery images={property.images} name={property.name} />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* Main column */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
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
                <span className="border border-navy/15 px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy/60">
                  {property.status}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-extrabold uppercase leading-[1.08] tracking-tight text-navy sm:text-4xl">
                {property.name}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-navy/60">
                <MapPin size={15} className="text-ocean" />
                {property.location}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6 border-y border-navy/10 py-5">
                <div>
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-navy/45">
                    {property.status === 'For Rent' ? 'Monthly Rent' : 'Asking Price'}
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold text-navy">
                    {formatPrice(property.price, property.status)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <FavoriteButton
                    propertyId={property.id}
                    propertyName={property.name}
                    variant="full"
                  />
                  <ShareButton title={property.name} text={property.summary} />
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-navy">
                Specifications
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-3">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white p-5">
                    <Icon size={18} className="text-ocean" />
                    <div className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                      {label}
                    </div>
                    <div className="mt-1 font-display text-sm font-bold text-navy">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-navy">
                About This Property
              </h2>
              <p className="mt-5 whitespace-pre-line text-[0.95rem] leading-relaxed text-navy/70">
                {property.description}
              </p>
            </Reveal>

            <Reveal className="mt-10 grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-navy">
                  Features
                </h2>
                <ul className="mt-5 space-y-3">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-navy/70">
                      <Check size={15} className="mt-0.5 shrink-0 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-navy">
                  Amenities
                </h2>
                <ul className="mt-5 space-y-3">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-3 text-sm text-navy/70">
                      <Check size={15} className="mt-0.5 shrink-0 text-gold" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-navy">
                Location
              </h2>
              <p className="mt-3 text-sm text-navy/60">{property.location}</p>
              <div className="mt-5 overflow-hidden border border-navy/10">
                <iframe
                  title={`Map showing the location of ${property.name}`}
                  src={mapSrc}
                  loading="lazy"
                  className="h-[340px] w-full"
                />
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="border border-navy/10 bg-white p-6 shadow-card sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-display text-sm font-bold uppercase tracking-[0.1em] text-navy">
                      {property.agent.name}
                    </div>
                    <div className="text-xs text-navy/55">{property.agent.title}</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center gap-3 text-navy/70 transition-colors hover:text-ocean"
                  >
                    <Phone size={15} className="text-ocean" /> {property.agent.phone}
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-3 text-navy/70 transition-colors hover:text-ocean"
                  >
                    <Mail size={15} className="text-ocean" /> {property.agent.email}
                  </a>
                </div>

                <div className="mt-7 border-t border-navy/10 pt-6">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-navy">
                    Enquire About This Property
                  </h3>
                  <div className="mt-5">
                    <PropertyInquiryForm
                      propertyName={property.name}
                      propertySlug={property.slug}
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <MortgageCalculator price={property.price} />
            </Reveal>
          </aside>
        </div>

        {similar.length > 0 && (
          <Reveal className="mt-20 border-t border-navy/10 pt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-navy">
              Similar Properties
            </h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
