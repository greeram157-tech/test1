import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { properties } from '../data/properties';
import SectionHeading from './SectionHeading';
import PropertyExplorer from './PropertyExplorer';
import Reveal from './Reveal';

export default function FeaturedProperties() {
  return (
    <section id="properties" className="bg-ivory px-6 py-20 md:px-10 md:py-24">
      <SectionHeading
        eyebrow="Featured Listings"
        title={
          <>
            Homes worth
            <br className="hidden sm:block" /> considering.
          </>
        }
        description="A curated selection of villas, estates and penthouses — each represented with the discretion and attention it deserves."
        action={
          <Link
            to="/properties"
            className="btn border border-navy/20 px-6 py-3.5 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-ivory"
          >
            View All Properties <ArrowRight size={15} />
          </Link>
        }
      />

      <Reveal className="mt-12">
        <PropertyExplorer properties={properties} featureFirst />
      </Reveal>
    </section>
  );
}
