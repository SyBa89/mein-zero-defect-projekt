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

export const metadata: Metadata = {
  title: `${CLIENT_CONFIG.brand.name} | ${CLIENT_CONFIG.brand.slogan}`,
  description: CLIENT_CONFIG.seo.description,
  keywords: CLIENT_CONFIG.seo.keywords,
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ConvenienceStore',
  '@id': `${CLIENT_CONFIG.url}/#store`,
  name: CLIENT_CONFIG.brand.name,
  url: CLIENT_CONFIG.url,
  logo: `${CLIENT_CONFIG.url}/images/logo.png`,
  image: `${CLIENT_CONFIG.url}/images/fassade.png`,
  description: CLIENT_CONFIG.seo.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CLIENT_CONFIG.contact.address.street,
    postalCode: CLIENT_CONFIG.contact.address.zip,
    addressLocality: CLIENT_CONFIG.contact.address.city,
    addressRegion: 'NRW',
    addressCountry: CLIENT_CONFIG.contact.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: 50.806945, longitude: 6.823683 },
  telephone: CLIENT_CONFIG.contact.phone,
  priceRange: '€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  openingHours: ['Mo,Tu,We,Th,Fr 07:30-19:00', 'Sa 07:30-14:30'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wo genau befindet sich der Kiosk Lollipop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Wir befinden uns direkt am Bürgerplatz in der ${CLIENT_CONFIG.contact.address.street}, ${CLIENT_CONFIG.contact.address.zip} ${CLIENT_CONFIG.contact.address.city}, in unmittelbarer Nähe zum Bahnhof.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich bei Ihnen Pakete mit Hermes versenden und abholen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, wir sind ein offizieller Hermes Paketshop. Sie können bei uns Pakete versenden, abholen und Retouren abgeben.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Zahlungsmethoden akzeptieren Sie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wir akzeptieren Bar, EC-Karte, Kontaktlos, Apple Pay und Google Pay.',
      },
    },
    {
      '@type': 'Question',
      name: 'Haben Sie an Sonn- und Feiertagen geöffnet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An Sonntagen ist der Kiosk geschlossen. An Feiertagen passen wir unsere Öffnungszeiten an, was Sie unserem Notfall-Banner oder den aktuellen Öffnungszeiten auf der Startseite entnehmen können.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
