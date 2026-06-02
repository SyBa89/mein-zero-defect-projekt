import type { Metadata } from 'next';
import './globals.css';
import MobileActionBar from '@/components/MobileActionBar';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Kiosk Lollipop | Erftstadt-Liblar - Hermes Paketshop & Kiosk',
  description:
    'Ihr lokaler Kiosk und Hermes Paketshop in Erftstadt-Liblar am Bürgerplatz. Getränke, Snacks, Lotto, Eis & mehr. Täglich geöffnet!',
  keywords:
    'Kiosk Erftstadt, Hermes Paketshop Liblar, Kiosk Bürgerplatz, Späti 50374, Lotto Erftstadt',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍭</text></svg>',
  },
  openGraph: {
    title: 'Kiosk Lollipop | Erftstadt-Liblar',
    description: 'Ihr freundlicher Nachbarschaftskiosk am Bürgerplatz. Jetzt besuchen!',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-gray-50 text-gray-900 pb-20 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ConvenienceStore',
              name: 'Kiosk Lollipop',
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
                latitude: 50.806945,
                longitude: 6.823683,
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
            }),
          }}
        />

        {children}
        <MobileActionBar />
        <CookieBanner />
      </body>
    </html>
  );
}
