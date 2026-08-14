// src/app/layout.tsx
// ✅ ZERO-DEFECT: Server-Komponente, Config wird serverseitig geladen
// ✅ WHITE-LABEL: Dynamische CSS-Variablen aus Tenant-Theme
// ✅ SEO: Globale Metadaten aus Tenant-Config

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { getTenantConfig } from '@/lib/config-loader';
import { MobileActionBar } from '@/components/MobileActionBar';
import type { BorderRadius } from '@/types/config';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export async function generateMetadata(): Promise<Metadata> {
  const config = getTenantConfig();
  // ✅ SEO-FIX: Korrektes Feld aus Zod-Schema (description, nicht defaultDescription)
  const metaDescription = config.seo.description;
  const metaTitle = config.brand.name;

  return {
    metadataBase: new URL(config.url),
    title: {
      default: metaTitle,
      template: `%s | ${config.brand.name}`,
    },
    description: metaDescription,
    keywords: config.seo.keywords,
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: config.brand.name,
      title: metaTitle,
      description: metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
    alternates: {
      canonical: config.url,
    },
  };
}

// ✅ ZERO-DEFECT: Mapping statt String-Interpolation für Tailwind-Kompatibilität
const radiusMap: Record<BorderRadius, string> = {
  none: '0px',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  full: '9999px',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getTenantConfig();

  // ✅ ZERO-DEFECT: CSS Custom Properties für Theme (vermeidet inline-style Drift)
  const cssVars = {
    '--theme-primary': config.theme.primaryColor,
    '--theme-secondary': config.theme.secondaryColor,
    '--theme-accent': config.theme.accentColor,
    '--theme-radius': radiusMap[config.theme.borderRadius],
    '--font-heading': config.theme.fontHeading,
    '--font-body': config.theme.fontBody,
  } as React.CSSProperties;

  return (
    <html lang="de" className={inter.variable} suppressHydrationWarning>
      <body
        className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased font-body"
        style={cssVars}
      >
        <ConfigProvider initialConfig={config}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
          >
            Zum Hauptinhalt springen
          </a>
          <main id="main-content" className="pb-24 md:pb-0">
            {children}
          </main>
          <MobileActionBar />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: config.brand.name,
                description: config.seo.description,
                url: config.url,
                telephone: config.contact.phoneDisplay ?? config.contact.phone,
                email: config.contact.email,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: config.contact.address.street,
                  addressLocality: config.contact.address.city,
                  postalCode: config.contact.address.zip,
                  addressCountry: config.contact.address.country || 'DE',
                },
                openingHoursSpecification: (config.openingHours?.items ?? [])
                  .filter((item) => item.isOpen)
                  .map((item) => {
                    const times = item.hours.match(/\d{1,2}:\d{2}/g) ?? [];
                    const dayOfWeekMap: Record<string, string> = {
                      Montag: 'Monday',
                      Dienstag: 'Tuesday',
                      Mittwoch: 'Wednesday',
                      Donnerstag: 'Thursday',
                      Freitag: 'Friday',
                      Samstag: 'Saturday',
                      Sonntag: 'Sunday',
                    };
                    return {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: dayOfWeekMap[item.day] ?? item.day,
                      opens: times[0] ?? '00:00',
                      closes: times[1] ?? '23:59',
                    };
                  }),
                priceRange: '€€',
                image: config.url + '/images/logo.png',
              }),
            }}
          />
        </ConfigProvider>
      </body>
    </html>
  );
}