import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getDomainFromHost } from '@/lib/config/domain';
import { headers } from 'next/headers';
import HandwerkerHome from './handwerker/page';
import ArztHome from './arzt/page';
import FriseurHome from './friseur/page';
import RestaurantHome from './restaurant/page';
import JackpotBanner from '@/components/JackpotBanner';
import HeroSection from '@/components/HeroSection';

const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'));
const OpeningHoursSection = dynamic(() => import('@/components/OpeningHoursSection'));
const ServicesSection = dynamic(() => import('@/components/ServicesSection'));
const HermesSection = dynamic(() => import('@/components/HermesSection'));
const ProductsSection = dynamic(() => import('@/components/ProductsSection'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const Reviews = dynamic(() => import('@/components/Reviews'));
const DynamicSections = dynamic(() => import('@/components/DynamicSections'));
const CTASection = dynamic(() => import('@/components/CTASection'));
const LegalNotice = dynamic(() => import('@/components/LegalNotice'));

export const metadata: Metadata = {
  title: 'Startseite',
  description: 'Willkommen auf unserer Startseite',
};

export default async function Home() {
  const headersList = await headers();
  const domain = getDomainFromHost(headersList.get('host'));
  
  // Conditional Rendering basierend auf Domain
  if (domain === 'handwerker') return <HandwerkerHome />;
  if (domain === 'arzt') return <ArztHome />;
  if (domain === 'friseur') return <FriseurHome />;
  if (domain === 'restaurant') return <RestaurantHome />;
  
  // Default: Kiosk
  return (
    <>
      <JackpotBanner />
      <HeroSection />
      <FeaturesSection />
      <OpeningHoursSection />
      <ServicesSection />
      <HermesSection />
      <ProductsSection />
      <AboutSection />
      <Reviews />
      <DynamicSections />
      <CTASection />
      <LegalNotice />
    </>
  );
}