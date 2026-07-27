import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Kiosk Lollipop – Ihr Kiosk & Hermes Paketshop in Erftstadt-Liblar',
  description:
    'Kiosk Lollipop in Erftstadt-Liblar – Ihr Kiosk und Hermes Paketshop am Bürgerplatz. Mo-Fr 07:30-19:00, Sa 07:30-14:30.',
  keywords: ['Kiosk', 'Hermes', 'Paketshop', 'Erftstadt', 'Liblar', 'Lotto'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}
