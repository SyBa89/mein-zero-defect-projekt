import { CLIENT_CONFIG } from '@/lib/client.config';
import PackageCalculator from './PackageCalculator';

export default function HermesSection() {
  const { hermes, sections } = CLIENT_CONFIG;

  // White-Label: Sektion wird nur gerendert, wenn Hermes aktiv ist
  if (!sections?.showHermes || !hermes?.enabled) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4" aria-hidden="true">
            📦
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
            Hermes Paketshop
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {hermes.description}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Linke Spalte: Echte Paketgrößen-Rechner Komponente */}
            <div>
              <PackageCalculator />
            </div>

            {/* Rechte Spalte: Services */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  📮 Pakete abholen & versenden
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Holen Sie Ihre Pakete bequem ab oder versenden Sie diese direkt bei uns.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  ↩️ Retouren & 🏷️ Etiketten
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Geben Sie Retouren einfach ab oder lassen Sie sich vor Ort ein Etikett erstellen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
