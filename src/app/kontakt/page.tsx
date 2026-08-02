import type { Metadata } from 'next';
import MobileActionBar from '@/components/MobileActionBar';
import KontaktFormClient from '@/components/KontaktFormClient';
import { CLIENT_CONFIG } from '@/lib/client.config';

// ✅ ZERO-DEFECT: Dynamische Metadata für White-Label-Fähigkeit
export async function generateMetadata(): Promise<Metadata> {
  const { brand, contact } = CLIENT_CONFIG;

  return {
    title: `Kontakt | ${brand.name}`,
    description: `Kontaktieren Sie ${brand.name} in ${contact.address.city}. Wir sind für Sie da – per Telefon, E-Mail oder über unser sicheres Kontaktformular.`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-grow py-16">
        <KontaktFormClient />
      </main>

      <MobileActionBar />
    </div>
  );
}
