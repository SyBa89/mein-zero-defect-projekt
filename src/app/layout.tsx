import type { Metadata } from 'next';
import './globals.css';
import MobileActionBar from '@/components/MobileActionBar';

export const metadata: Metadata = {
  title: 'Kiosk Lollipop | Erftstadt-Liblar - Hermes Paketshop & Kiosk',
  description:
    'Ihr lokaler Kiosk und Hermes Paketshop in Erftstadt-Liblar. Getränke, Snacks, Lotto & mehr. Täglich geöffnet!',
  keywords:
    'Kiosk Erftstadt, Hermes Paketshop Liblar, Späti 50374, Kiosk Nähe Bahnhof Liblar, Lotto Erftstadt',
  openGraph: {
    title: 'Kiosk Lollipop | Erftstadt-Liblar',
    description: 'Ihr freundlicher Nachbarschaftskiosk und Hermes Paketshop. Jetzt besuchen!',
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
            }),
          }}
        />

        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}
