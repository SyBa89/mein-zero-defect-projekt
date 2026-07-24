import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import EmergencyBanner from '@/components/EmergencyBanner';
import { MobileBottomNav } from '@/components/MobileBottomNav';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#db2777',
  colorScheme: 'light',
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
      { url: '/images/icon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [{ url: '/images/icon.png', sizes: '180x180', type: 'image/png' }],
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
    <html lang="de" dir="ltr" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased selection:bg-pink-200 selection:text-pink-900">
        <EmergencyBanner />
        {children}
        <MobileBottomNav />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
