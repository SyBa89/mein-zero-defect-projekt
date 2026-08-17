import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KontaktFormClient from '@/components/KontaktFormClient';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';

export default function HandwerkerHome() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Notdienst-Banner */}
        <section className="bg-red-600 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-black mb-4">🚨 24h Notdienst</h1>
            <a href="tel:022359291160" className="text-3xl font-bold hover:underline">
              02235 9291160
            </a>
          </div>
        </section>

        {/* Hero */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-4">Meisterbetrieb seit 1995</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ihr zuverlässiger Partner für Elektro, Sanitär und Heizung
            </p>
          </div>
        </section>

        {/* Meister-Badge */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 border-4 border-yellow-500 rounded-full p-8">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold">Meisterbetrieb</h3>
              <p className="text-gray-600 dark:text-gray-400">HWK-zertifiziert</p>
            </div>
          </div>
        </section>

        {/* Dienstleistungen */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Unsere Leistungen</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Elektroinstallation</h3>
                <p className="text-gray-600 dark:text-gray-400">Komplett-Lösungen für Privat und Gewerbe</p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-5xl mb-4">🚿</div>
                <h3 className="text-xl font-bold mb-2">Sanitär & Heizung</h3>
                <p className="text-gray-600 dark:text-gray-400">Wartung, Reparatur, Neuinstallation</p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-5xl mb-4">🔧</div>
                <h3 className="text-xl font-bold mb-2">24h Notdienst</h3>
                <p className="text-gray-600 dark:text-gray-400">Immer für Sie da, auch an Feiertagen</p>
              </div>
            </div>
          </div>
        </section>

        <KontaktFormClient />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}