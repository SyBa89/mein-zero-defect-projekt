import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Poppins, Montserrat, Roboto, Lora, Source_Sans_3 } from 'next/font/google';
import { getClientConfig } from '@/lib/config-loader';
import { generateSchemaOrg } from '@/lib/schema-generator';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import EmergencyBanner from '@/components/EmergencyBanner';
import CookieBanner from '@/components/CookieBanner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  colorScheme: 'light dark',
};

export async function generateMetadata(): Promise<Metadata> {
  const config = getClientConfig();
  const { brand, seo, contact, business } = config;

  const businessKeywords: Record<string, string[]> = {
    kiosk: ['Kiosk', 'Späti', 'Hermes Paketshop', 'Lotto', 'Getränke', contact.address.city],
    handwerk: ['Sanitär', 'Heizung', 'Klempner', 'Notdienst', 'Badsanierung', contact.address.city],
    arzt: ['Hausarzt', 'Allgemeinmedizin', 'Praxis', 'Vorsorge', contact.address.city],
  };

  const keywords = [...seo.keywords, ...(businessKeywords[business.type] || [])];

  return {
    metadataBase: new URL(config.url),
    title: {
      default: brand.name + ' | ' + brand.slogan,
      template: '%s | ' + brand.name,
    },
    description: seo.description,
    keywords: keywords,
    authors: [{ name: brand.legalName }],
    creator: brand.legalName,
    publisher: brand.legalName,
    alternates: { canonical: config.url },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.ico',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: brand.name,
    },
    formatDetection: { telephone: true, email: true, address: true },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      url: config.url,
      siteName: brand.name,
      title: brand.name + ' | ' + brand.slogan,
      description: seo.description,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: brand.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brand.name + ' | ' + brand.slogan,
      description: seo.description,
      images: ['/images/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION || '' },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const config = getClientConfig();
  const schema = generateSchemaOrg(config);

  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={
        inter.variable +
        ' ' +
        poppins.variable +
        ' ' +
        montserrat.variable +
        ' ' +
        roboto.variable +
        ' ' +
        lora.variable +
        ' ' +
        sourceSans.variable
      }
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-body antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-pink-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Zum Hauptinhalt springen
        </a>
        <ConfigProvider initialConfig={config}>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <EmergencyBanner />
              <Header />
              <main id="main-content" className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <MobileActionBar />
            <CookieBanner />
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
