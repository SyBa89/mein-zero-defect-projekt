import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import CookieNotice from '@/components/CookieNotice';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import OpeningHoursSection from '@/components/OpeningHoursSection';
import ServicesSection from '@/components/ServicesSection';
import HermesSection from '@/components/HermesSection';
import DailyHighlightsSection from '@/components/DailyHighlightsSection';
import BrandsSection from '@/components/BrandsSection';
import ProductsSection from '@/components/ProductsSection';
import CTASection from '@/components/CTASection';
import AboutSection from '@/components/AboutSection';
import LegalNotice from '@/components/LegalNotice';

export const KIOSK_CONFIG = {
  name: 'Kiosk Lollipop',
  phoneDisplay: '02235 9291160',
  phoneHref: 'tel:+4922359291160',
  address: 'Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683',
  facebook: 'https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/',
  url: 'https://mein-zero-defect-projekt.vercel.app',
};

export const metadata = {
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
    description: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz. ★★★★★ 5,0 Sterne bei Google.',
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

export const schemaOrg = {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <Header />
      <main>
        <div className="sr-only">
          <a
            href="#main-content"
            className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-pink-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          >
            Zum Hauptinhalt springen
          </a>
        </div>
        <HeroSection />
        <FeaturesSection />
        <OpeningHoursSection />
        <ServicesSection />
        <HermesSection />
        <DailyHighlightsSection />
        <BrandsSection />
        <ProductsSection />
        <FAQ />
        <Reviews />
        <AboutSection />
        <CTASection />
        <LegalNotice />
      </main>
      <Footer />
      <MobileActionBar />
      <CookieNotice />
    </div>
  );
}
