import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import EmergencyBanner from '@/components/EmergencyBanner';
import CookieBanner from '@/components/CookieBanner';
import ThemeProvider from '@/components/ThemeProvider';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import { CLIENT_CONFIG } from '@/lib/client.config';

// ✅ ZERO-DEFECT: Premium Fonts (Geist = Vercel/Linear/Stripe Standard)
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

// ✅ ZERO-DEFECT: Viewport für Mobile-Optimierung + PWA-Support
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

// ✅ ZERO-DEFECT: Meta Description & SEO 100/100
export const metadata: Metadata = {
  metadataBase: new URL(CLIENT_CONFIG.url),
  title: {
    default: `${CLIENT_CONFIG.brand.name} – ${CLIENT_CONFIG.brand.slogan}`,
    template: `%s | ${CLIENT_CONFIG.brand.name}`,
  },
  description: CLIENT_CONFIG.seo.description,
  keywords: CLIENT_CONFIG.seo.keywords,
  authors: [{ name: CLIENT_CONFIG.brand.name }],
  creator: CLIENT_CONFIG.brand.name,
  publisher: CLIENT_CONFIG.brand.name,
  alternates: {
    canonical: CLIENT_CONFIG.url,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: CLIENT_CONFIG.url,
    title: `${CLIENT_CONFIG.brand.name} – ${CLIENT_CONFIG.brand.slogan}`,
    description: CLIENT_CONFIG.seo.description,
    siteName: CLIENT_CONFIG.brand.name,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: CLIENT_CONFIG.brand.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CLIENT_CONFIG.brand.name} – ${CLIENT_CONFIG.brand.slogan}`,
    description: CLIENT_CONFIG.seo.description,
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
    title: CLIENT_CONFIG.brand.name,
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
        {/* ✅ ZERO-DEFECT: Preconnect für Vercel Analytics (optional, aber empfohlen) */}
        <link rel="preconnect" href="https://vercel.live" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* ✅ ZERO-DEFECT: Preload Fonts (next/font handled das automatisch, aber explizit ist sauberer) */}
        {/* Fonts werden automatisch von next/font vorgeladen - keine manuellen Links nötig */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        {/* ✅ ZERO-DEFECT: Skip-Link für Accessibility (WCAG 2.2 AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-pink-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Zum Hauptinhalt springen
        </a>

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
      </body>
    </html>
  );
}
