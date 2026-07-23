import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import KontaktFormClient from '@/components/KontaktFormClient';

// ✅ ZERO-DEFECT: Metadata ist NUR in Server Components erlaubt
export const metadata: Metadata = {
  title: 'Kontakt | Kiosk Lollipop',
  description:
    'Kontaktieren Sie den Kiosk Lollipop in Erftstadt-Liblar. Wir sind für Sie da – per Telefon, E-Mail oder über unser sicheres Kontaktformular.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <KontaktFormClient />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
