import type { Metadata } from 'next';
import './globals.css';
import MobileActionBar from '@/components/MobileActionBar';

export const metadata: Metadata = {
  title: 'Kiosk Lollipop | Erftstadt-Liblar - Hermes Paketshop & Kiosk',
  description:
    'Kiosk Lollipop in Erftstadt-Liblar - Ihr Hermes Paketshop mit Kioskwaren, Lotto, Tabak und mehr. Theodor-Heuss-Straße 35, 50374 Erftstadt. Täglich geöffnet.',
  keywords:
    'Kiosk Erftstadt, Hermes Paketshop Liblar, Späti 50374, Kiosk Nähe Bahnhof Liblar, Lotto Erftstadt, Paketshop Erftstadt',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-gray-50 text-gray-900 pb-20 md:pb-0">
        {/* Demo Banner */}
        <div className="bg-yellow-100 border-b border-yellow-200 text-yellow-800 text-center text-sm py-2 px-4 font-medium">
          ⚠️ Konzept-Präsentation - Noch nicht live geschaltet
        </div>

        {/* Strukturierte Daten für Google (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ConvenienceStore',
              name: 'Kiosk Lollipop',
              image: 'https://mein-zero-defect-projekt.vercel.app/kiosk-lollipop.jpg',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Theodor-Heuss-Straße 35',
                addressLocality: 'Erftstadt',
                addressRegion: 'NRW',
                postalCode: '50374',
                addressCountry: 'DE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 50.8069582,
                longitude: 6.8238405,
              },
              telephone: '+4922359291160',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Friday'],
                  opens: '07:30',
                  closes: '19:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Wednesday', 'Thursday'],
                  opens: '14:00',
                  closes: '19:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '07:30',
                  closes: '13:30',
                },
              ],
              priceRange: '€',
              servesCuisine: 'Snacks',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Kioskwaren & Paketdienstleistungen',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Hermes Paketshop',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Product',
                      name: 'Getränke & Snacks',
                    },
                  },
                ],
              },
            }),
          }}
        />

        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}
