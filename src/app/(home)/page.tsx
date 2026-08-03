import { Metadata } from 'next';
import { CLIENT_CONFIG } from '@/lib/client.config';
import JackpotBanner from '@/components/JackpotBanner';
import DynamicSections from '@/components/DynamicSections';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import OpeningHoursSection from '@/components/OpeningHoursSection';
import ServicesSection from '@/components/ServicesSection';
import HermesSection from '@/components/HermesSection';
import ProductsSection from '@/components/ProductsSection';
import CTASection from '@/components/CTASection';
import AboutSection from '@/components/AboutSection';
import LegalNotice from '@/components/LegalNotice';
import Reviews from '@/components/Reviews';
// ❌ ENTFERNEN: import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: `${CLIENT_CONFIG.brand.name} | ${CLIENT_CONFIG.brand.slogan}`,
  description: CLIENT_CONFIG.seo.description,
  keywords: CLIENT_CONFIG.seo.keywords,
};

export default function HomePage() {
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
      {/* ❌ ENTFERNEN: <FAQ /> - wird bereits in DynamicSections gerendert */}
      <DynamicSections />
      <CTASection />
      <LegalNotice />
    </>
  );
}
