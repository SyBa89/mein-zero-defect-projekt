import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import EmergencyBanner from '@/components/EmergencyBanner';
import CookieBanner from '@/components/CookieBanner';
import ThemeProvider from '@/components/ThemeProvider';
import { ConfigProvider } from '@/contexts/ConfigContext';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import { getClientConfig } from '@/lib/config-loader';

// ✅ ZERO-DEFECT: Config einmal laden für Server + Client (Hydration-Safety!)
const config = getClientConfig();

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
  adjustFontFallback: true,
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

export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  title: {
    default: `${config.brand.name} – ${config.brand.slogan}`,
    template: `%s | ${config.brand.name}`,
  },
  description: config.seo.description,
  keywords: config.seo.keywords,
  authors: [{ name: config.brand.name }],
  creator: config.brand.name,
  publisher: config.brand.name,
  alternates: {
    canonical: config.url,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: config.url,
    title: `${config.brand.name} – ${config.brand.slogan}`,
    description: config.seo.description,
    siteName: config.brand.name,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: config.brand.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.brand.name} – ${config.brand.slogan}`,
    description: config.seo.description,
    images: ['/images/og-image.png'],
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
    title: config.brand.name,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* ✅ ZERO-DEFECT: Nur benötigte Preconnects */}
        {/* Fonts werden automatisch von next/font vorgeladen */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-pink-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Zum Hauptinhalt springen
        </a>

        {/* ✅ ZERO-DEFECT: initialConfig Prop für Hydration-Safety */}
        <ConfigProvider initialConfig={config}>
          <ThemeProvider>
            <LocalBusinessSchema />
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
