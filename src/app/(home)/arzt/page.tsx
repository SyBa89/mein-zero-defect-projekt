import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KontaktFormClient from '@/components/KontaktFormClient';
import FAQ from '@/components/FAQ';

export default function ArztHome() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative h-96 bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-black mb-4">Praxis Dr. Schmidt</h1>
            <p className="text-2xl">Allgemeinmedizin & Vorsorge</p>
          </div>
        </section>

        {/* Sprechzeiten */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Sprechzeiten</h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700"><span className="font-bold">Montag</span><span>08:00 - 12:00 & 15:00 - 18:00</span></div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700"><span className="font-bold">Dienstag</span><span>08:00 - 12:00 & 15:00 - 18:00</span></div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700"><span className="font-bold">Mittwoch</span><span>08:00 - 12:00</span></div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700"><span className="font-bold">Donnerstag</span><span>08:00 - 12:00 & 15:00 - 18:00</span></div>
              <div className="flex justify-between py-3"><span className="font-bold">Freitag</span><span>08:00 - 12:00</span></div>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Unsere Leistungen</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🩺</div>
                <h3 className="text-xl font-bold mb-2">Allgemeinmedizin</h3>
                <p className="text-gray-600 dark:text-gray-400">Diagnostik und Behandlung akuter und chronischer Erkrankungen</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">💉</div>
                <h3 className="text-xl font-bold mb-2">Vorsorgeuntersuchungen</h3>
                <p className="text-gray-600 dark:text-gray-400">Check-up 35, Hautkrebs-Screening, Darmkrebsvorsorge</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🫁</div>
                <h3 className="text-xl font-bold mb-2">Lungenfunktion</h3>
                <p className="text-gray-600 dark:text-gray-400">Spirometrie und Bodyplethysmographie</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-bold mb-2">EKG & Langzeit-EKG</h3>
                <p className="text-gray-600 dark:text-gray-400">Ruhe-EKG, Belastungs-EKG, 24h-EKG</p>
              </div>
            </div>
          </div>
        </section>

        {/* Termin */}
        <section className="py-16 px-4 bg-blue-100 dark:bg-blue-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">Termin vereinbaren</h2>
            <p className="text-xl mb-8">Bitte rufen Sie uns während der Sprechzeiten an</p>
            <a href="tel:022359291160" className="inline-block bg-blue-600 text-white text-2xl font-bold px-8 py-4 rounded-xl hover:bg-blue-700">
              📞 02235 9291160
            </a>
          </div>
        </section>

        <FAQ />
        <KontaktFormClient />
      </main>
      <Footer />
    </>
  );
}