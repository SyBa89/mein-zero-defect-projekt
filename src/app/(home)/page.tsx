// src/app/(home)/page.tsx
// ✅ ZERO-DEFECT: Startseite rendert wieder ALLE Sektionen (kein Black-Screen)

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getClientConfig } from '@/lib/config-loader';
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

const config = getClientConfig();

export const metadata: Metadata = {
  title: config.brand.name + ' | ' + config.brand.slogan,
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