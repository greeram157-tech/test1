import Hero from '../components/Hero';
import Statistics from '../components/Statistics';
import FeaturedProperties from '../components/FeaturedProperties';
import AboutSection from '../components/AboutSection';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Insights from '../components/Insights';
import ContactSection from '../components/ContactSection';

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function HomePage() {
  return (
    <>
      <Hero onExplore={() => scrollTo('properties')} onServices={() => scrollTo('services')} />
      <Statistics />
      <FeaturedProperties />
      <AboutSection />
      <Services />
      <Testimonials />
      <Insights />
      <ContactSection />
    </>
  );
}
