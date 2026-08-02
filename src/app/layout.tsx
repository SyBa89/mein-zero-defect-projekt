import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CLIENT_CONFIG } from '@/lib/client.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import CookieBanner from '@/components/CookieBanner';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import ThemeProvider from '@/components/ThemeProvider';
import { COLOR_PALETTES, getThemeColor } from '@/lib/theme';

// ✅ ZERO-DEFECT: Premium-Typografie - Geist Font (Vercel/Linear/Stripe Standard)
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// ✅ Dynamische Metadata aus CLIENT_CONFIG
const themeColor = getThemeColor(CLIENT_CONFIG.brand.primaryColor);
const palette = COLOR_PALETTES[themeColor];

export const metadata: Metadata = {
  metadataBase: new URL(
    CLIENT_CONFIG.contact.mapsUrl || 'https://mein-zero-defect-projekt.vercel.app'
  ),
  title: {
    default: `${CLIENT_CONFIG.brand.name} | ${CLIENT_CONFIG.brand.slogan}`,
    template: `%s | ${CLIENT_CONFIG.brand.name}`,
  },
  description: CLIENT_CONFIG.seo.description,
  keywords: CLIENT_CONFIG.seo.keywords,
  authors: [{ name: CLIENT_CONFIG.brand.legalName }],
  creator: CLIENT_CONFIG.brand.name,
  publisher: CLIENT_CONFIG.brand.name,
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
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: CLIENT_CONFIG.contact.mapsUrl || 'https://mein-zero-defect-projekt.vercel.app',
    siteName: CLIENT_CONFIG.brand.name,
    title: `${CLIENT_CONFIG.brand.name} | ${CLIENT_CONFIG.brand.slogan}`,
    description: CLIENT_CONFIG.seo.description,
    images: [
      {
        url: '/images/fassade.png',
        width: 1200,
        height: 630,
        alt: `${CLIENT_CONFIG.brand.name} - ${CLIENT_CONFIG.brand.slogan}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CLIENT_CONFIG.brand.name} | ${CLIENT_CONFIG.brand.slogan}`,
    description: CLIENT_CONFIG.seo.description,
    images: ['/images/fassade.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': palette.meta.msTileColor,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={palette.meta.themeColor} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LocalBusinessSchema />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <MobileActionBar />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
