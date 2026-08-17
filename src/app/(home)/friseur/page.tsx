import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KontaktFormClient from '@/components/KontaktFormClient';
import Reviews from '@/components/Reviews';

export default function FriseurHome() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative h-96 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-black mb-4">Hair Studio Elegance</h1>
            <p className="text-2xl">Ihr Style. Unsere Leidenschaft.</p>
          </div>
        </section>

        {/* Preisliste */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Unsere Preise</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
                <div><h3 className="text-xl font-bold">Damen-Haarschnitt</h3><p className="text-gray-600 dark:text-gray-400">Inkl. Waschen & Föhnen</p></div>
                <span className="text-2xl font-bold text-pink-600">45 €</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
                <div><h3 className="text-xl font-bold">Herren-Haarschnitt</h3><p className="text-gray-600 dark:text-gray-400">Inkl. Waschen & Styling</p></div>
                <span className="text-2xl font-bold text-pink-600">28 €</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
                <div><h3 className="text-xl font-bold">Färben</h3><p className="text-gray-600 dark:text-gray-400">Komplett-Paket</p></div>
                <span className="text-2xl font-bold text-pink-600">ab 65 €</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <div><h3 className="text-xl font-bold">Balayage</h3><p className="text-gray-600 dark:text-gray-400">Moderne Strähnentechnik</p></div>
                <span className="text-2xl font-bold text-pink-600">ab 120 €</span>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Unser Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="w-32 h-32 bg-pink-200 dark:bg-pink-900/30 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">👩‍🦰</div>
                <h3 className="text-xl font-bold">Sarah Müller</h3>
                <p className="text-pink-600">Meisterin & Inhaberin</p>
              </div>
              <div className="text-center bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="w-32 h-32 bg-purple-200 dark:bg-purple-900/30 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">👩</div>
                <h3 className="text-xl font-bold">Lisa Schmidt</h3>
                <p className="text-pink-600">Senior Stylistin</p>
              </div>
              <div className="text-center bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="w-32 h-32 bg-blue-200 dark:bg-blue-900/30 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">👨</div>
                <h3 className="text-xl font-bold">Tom Weber</h3>
                <p className="text-pink-600">Barber & Stylist</p>
              </div>
            </div>
          </div>
        </section>

        {/* Termin-Buchung */}
        <section className="py-16 px-4 bg-pink-100 dark:bg-pink-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">Termin buchen</h2>
            <p className="text-xl mb-8">Rufen Sie uns an oder buchen Sie online</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:022359291160" className="inline-block bg-pink-600 text-white text-xl font-bold px-8 py-4 rounded-xl hover:bg-pink-700">
                📞 Anrufen
              </a>
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-purple-600 text-white text-xl font-bold px-8 py-4 rounded-xl hover:bg-purple-700">
                📅 Online buchen
              </a>
            </div>
          </div>
        </section>

        <Reviews />
        <KontaktFormClient />
      </main>
      <Footer />
    </>
  );
}