import type { Metadata, Viewport } from 'next';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import { Inter } from 'next/font/google';
import './globals.css';
import EmergencyBanner from '@/components/EmergencyBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ConditionalAnalytics from '@/components/ConditionalAnalytics';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import ToastContainer from '@/components/ToastContainer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#db2777' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' },
  ],
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mein-zero-defect-projekt.vercel.app'),
  title: {
    default: 'Kiosk Lollipop | Ihr Kiosk & Hermes Paketshop in Erftstadt-Liblar',
    template: '%s | Kiosk Lollipop',
  },
  description:
    'Ihr lokaler Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar. Mo-Fr 07:30-19:00, Sa 07:30-14:30. Getränke, Snacks, Lotto und Paketversand.',
  keywords: [
    'Kiosk Erftstadt',
    'Hermes Liblar',
    'Paketshop 50374',
    'Lotto Erftstadt',
    'Kiosk Lollipop',
    'Bürgerplatz',
  ],
  authors: [{ name: 'Kiosk Lollipop' }],
  creator: 'Kiosk Lollipop',
  publisher: 'Kiosk Lollipop',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Kiosk Lollipop',
  },
  other: {
    'msapplication-TileColor': '#db2777',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://mein-zero-defect-projekt.vercel.app',
    siteName: 'Kiosk Lollipop',
    title: 'Kiosk Lollipop | Erftstadt-Liblar',
    description: 'Ihr lokaler Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar.',
    images: [
      {
        url: '/images/fassade.png',
        width: 1200,
        height: 630,
        alt: 'Kiosk Lollipop Erftstadt-Liblar',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiosk Lollipop | Erftstadt-Liblar',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" dir="ltr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme-preference');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored === 'dark' || (stored !== 'light' && systemDark);
                  if (isDark) document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased selection:bg-pink-200 dark:selection:bg-pink-800 selection:text-pink-900 dark:selection:text-pink-100 transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <a href="#main-content" className="skip-link">
              Zum Hauptinhalt springen
            </a>

            <EmergencyBanner />
            <Header />

            <main id="main-content" aria-label="Hauptinhalt der Webseite">
              {children}
            </main>

            <Footer />
            <CookieBanner />
            <ConditionalAnalytics />

            <ToastContainer />
            <ServiceWorkerRegistration />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
