import type { Metadata } from 'next';
import MobileActionBar from '@/components/MobileActionBar';
import KontaktFormClient from '@/components/KontaktFormClient';
import { getClientConfig } from '@/lib/config-loader';
const config = getClientConfig();

// âœ… ZERO-DEFECT: Dynamische Metadata fÃ¼r White-Label-FÃ¤higkeit
export async function generateMetadata(): Promise<Metadata> {
  const { brand, contact } = config;

  return {
    title: `Kontakt | ${brand.name}`,
    description: `Kontaktieren Sie ${brand.name} in ${contact.address.city}. Wir sind fÃ¼r Sie da â€“ per Telefon, E-Mail oder Ã¼ber unser sicheres Kontaktformular.`,
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
