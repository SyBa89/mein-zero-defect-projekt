import JackpotBanner from '@/components/JackpotBanner';
import DynamicSections from '@/components/DynamicSections';
import MobileActionBar from '@/components/MobileActionBar';
import CookieNotice from '@/components/CookieNotice';
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
import { KIOSK_CONFIG } from '@/lib/config';
import type { Metadata } from 'next';

// ✅ ZERO-DEFECT: Umfassende SEO-Metadaten
export const metadata: Metadata = {
  title: `${KIOSK_CONFIG.name} | Ihr Kiosk & Hermes Paketshop in Erftstadt-Liblar`,
  description: `${KIOSK_CONFIG.name} in Erftstadt-Liblar - Ihr Kiosk und Hermes Paketshop am Bürgerplatz. Mo-Fr 07:30-19:00, Sa 07:30-14:30. Ihr lokaler Nachbar mit echtem Service.`,
  keywords: [
    'Kiosk Erftstadt',
    'Kiosk Liblar',
    'Hermes Paketshop Erftstadt',
    KIOSK_CONFIG.name,
    'Bürgerplatz Liblar',
    'Kiosk 50374',
    'Paketshop Erftstadt',
    'Kiosk in der Nähe',
    'Paketshop in der Nähe',
    'Lotto Erftstadt',
  ],
  metadataBase: new URL(KIOSK_CONFIG.url),
  alternates: { canonical: '/' },
  openGraph: {
    title: `${KIOSK_CONFIG.name} | Erftstadt-Liblar`,
    description: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz. Ihr lokaler Nachbar mit echtem Service.',
    type: 'website',
    locale: 'de_DE',
    url: KIOSK_CONFIG.url,
    siteName: KIOSK_CONFIG.name,
    images: [
      {
        url: '/images/fassade.png',
        width: 1200,
        height: 630,
        alt: `${KIOSK_CONFIG.name} Fassade am Bürgerplatz in Erftstadt-Liblar`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${KIOSK_CONFIG.name} | Erftstadt-Liblar`,
    description: 'Ihr lokaler Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar.',
    images: ['/images/fassade.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ✅ ZERO-DEFECT: Schema.org für maximale SEO-Relevanz
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ConvenienceStore',
  '@id': `${KIOSK_CONFIG.url}/#store`,
  name: KIOSK_CONFIG.name,
  url: KIOSK_CONFIG.url,
  logo: `${KIOSK_CONFIG.url}/images/logo.png`,
  image: `${KIOSK_CONFIG.url}/images/fassade.png`,
  description: `Ihr Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar. Ihr lokaler Nachbar mit echtem Service.`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Theodor-Heuss-Straße 35',
    postalCode: '50374',
    addressLocality: 'Erftstadt',
    addressRegion: 'NRW',
    addressCountry: 'DE',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 50.806945, longitude: 6.823683 },
  telephone: '+4922359291160',
  priceRange: '€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  openingHours: ['Mo,Tu,We,Th,Fr 07:30-19:00', 'Sa 07:30-14:30'],
  sameAs: [KIOSK_CONFIG.facebook],
  // TODO: Füge echte Bewertungen hinzu, sobald verfügbar
  // aggregateRating: {
  //   '@type': 'AggregateRating',
  //   ratingValue: '5.0',
  //   bestRating: '5',
  //   worstRating: '1',
  //   ratingCount: '60',
  //   reviewCount: '60',
  // },
};

// ✅ ZERO-DEFECT: Server Component (KEINE Event-Handler, KEIN <main>)
export default function HomePage() {
  return (
    <>
      {/* ✅ SEO: Schema.org für strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ✅ Dynamischer Jackpot-Banner (Admin-editierbar) */}
      <JackpotBanner />

      {/* ✅ KEIN <main> hier - das ist bereits in layout.tsx (HTML5-konform!) */}
      <HeroSection />
      <FeaturesSection />
      <OpeningHoursSection />
      <ServicesSection />
      <HermesSection />
      <ProductsSection />
      <AboutSection />

      {/* ✅ Reviews ist Server Component - direkt hier gerendert für beste Performance */}
      <Reviews />

      {/* ✅ Dynamische Sections (Lazy Loaded für Performance) */}
      <DynamicSections />

      <CTASection />
      <LegalNotice />

      {/* ✅ Mobile Action Bar (nur auf Mobile sichtbar) */}
      <MobileActionBar />

      {/* ✅ Cookie Notice (nur wenn nicht zugestimmt) */}
      <CookieNotice />
    </>
  );
}

