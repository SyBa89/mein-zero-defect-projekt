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
  description: `${KIOSK_CONFIG.name} in Erftstadt-Liblar - Ihr Kiosk und Hermes Paketshop am Bürgerplatz. Mo-Fr 07:30-19:00, Sa 07:30-14:30. ★★★★★ 5,0 Sterne bei Google.`,
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
    description: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz. ★★★★★ 5,0 Sterne bei Google.',
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
  description: `Ihr Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar. ★★★★★ 5,0 Sterne bei Google.`,
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '60',
    reviewCount: '60',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-pink-200 selection:text-pink-900">
      {/* ✅ SEO: Schema.org für strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ✅ Accessibility: Skip-Link (nur bei Tab-Fokus sichtbar - ROBUST mit Inline-Styles) */}
      <a
        href="#main-content"
        className="fixed top-0 left-0 z-50 px-4 py-2 bg-pink-600 text-white rounded-lg shadow-lg focus:translate-y-2 focus:outline-none focus:ring-2 focus:ring-white"
        style={{
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: '1px',
          overflow: 'hidden',
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onFocus={(e) => {
          e.currentTarget.style.clip = 'auto';
          e.currentTarget.style.clipPath = 'none';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.overflow = 'visible';
          e.currentTarget.style.position = 'fixed';
          e.currentTarget.style.top = '1rem';
          e.currentTarget.style.left = '1rem';
        }}
        onBlur={(e) => {
          e.currentTarget.style.clip = 'rect(0 0 0 0)';
          e.currentTarget.style.clipPath = 'inset(50%)';
          e.currentTarget.style.height = '1px';
          e.currentTarget.style.width = '1px';
          e.currentTarget.style.overflow = 'hidden';
          e.currentTarget.style.position = 'absolute';
        }}
      >
        Zum Hauptinhalt springen
      </a>

      {/* ✅ Dynamischer Jackpot-Banner (Admin-editierbar) */}
      <JackpotBanner />

      {/* ✅ Hauptinhalt mit ARIA-Label für Screenreader */}
      <main id="main-content" aria-label="Hauptinhalt der Webseite">
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
      </main>

      {/* ✅ Mobile Action Bar (nur auf Mobile sichtbar) */}
      <MobileActionBar />

      {/* ✅ Cookie Notice (nur wenn nicht zugestimmt) */}
      <CookieNotice />
    </div>
  );
}
