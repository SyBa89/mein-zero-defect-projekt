import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getClientConfig } from '@/lib/config-loader';

// ✅ ZERO-DEFECT: Synchronous imports for Above-the-Fold (LCP & Critical Path)
import JackpotBanner from '@/components/JackpotBanner';
import HeroSection from '@/components/HeroSection';

// ✅ ZERO-DEFECT PERFORMANCE: Dynamic imports for Below-the-Fold
// Reduziert das initiale JS-Bundle massiv und befreit den Main-Thread auf Mobile (Moto G Power)
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

const config = getClientConfig();

export const metadata: Metadata = {
  title: `${config.brand.name} | ${config.brand.slogan}`,
  description: config.seo.description,
  keywords: config.seo.keywords,
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
      <DynamicSections />
      <CTASection />
      <LegalNotice />
    </>
  );
}
