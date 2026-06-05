import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Kiosk Lollipop | Ihr Kiosk & Hermes Paketshop in Erftstadt-Liblar',
    template: '%s | Kiosk Lollipop',
  },
  description:
    'Kiosk Lollipop in Erftstadt-Liblar - Ihr Kiosk und Hermes Paketshop am Bürgerplatz. Mo-Fr 07:30-19:00, Sa 07:30-14:30. ★★★★★ 5,0 Sterne bei Google.',
  keywords: ['Kiosk Erftstadt', 'Kiosk Liblar', 'Hermes Paketshop Erftstadt', 'Kiosk Lollipop'],
  metadataBase: new URL('https://mein-zero-defect-projekt.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://mein-zero-defect-projekt.vercel.app',
    siteName: 'Kiosk Lollipop',
    title: 'Kiosk Lollipop | Ihr Kiosk & Hermes Paketshop in Erftstadt-Liblar',
    description: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz. ★★★★★ 5,0 Sterne bei Google.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
