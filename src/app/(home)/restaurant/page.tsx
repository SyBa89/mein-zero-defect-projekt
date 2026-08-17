import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KontaktFormClient from '@/components/KontaktFormClient';
import Reviews from '@/components/Reviews';

export default function RestaurantHome() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero mit Bild */}
        <section className="relative h-96 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-black mb-4">Bistro Roma</h1>
            <p className="text-2xl">Authentische italienische Küche seit 1985</p>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section className="py-12 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Öffnungszeiten</h2>
            <div className="text-lg space-y-2">
              <p>Montag - Freitag: 11:30 - 14:30 & 17:30 - 22:00</p>
              <p>Samstag: 17:30 - 23:00</p>
              <p>Sonntag: 12:00 - 22:00</p>
            </div>
          </div>
        </section>

        {/* Speisekarte-Auszug */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Unsere Spezialitäten</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">🍝 Antipasti</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Bruschetta Classica</span><span className="font-bold">8,50 €</span></div>
                  <div className="flex justify-between"><span>Carpaccio di Manzo</span><span className="font-bold">12,90 €</span></div>
                  <div className="flex justify-between"><span>Vitello Tonnato</span><span className="font-bold">11,50 €</span></div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">🍕 Pizza</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Margherita</span><span className="font-bold">9,50 €</span></div>
                  <div className="flex justify-between"><span>Diavola</span><span className="font-bold">11,90 €</span></div>
                  <div className="flex justify-between"><span>Quattro Formaggi</span><span className="font-bold">12,50 €</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reservierung */}
        <section className="py-16 px-4 bg-orange-100 dark:bg-orange-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">Tisch reservieren</h2>
            <p className="text-xl mb-8">Rufen Sie uns an oder nutzen Sie unser Online-Formular</p>
            <a href="tel:022359291160" className="inline-block bg-orange-600 text-white text-2xl font-bold px-8 py-4 rounded-xl hover:bg-orange-700">
              📞 02235 9291160
            </a>
          </div>
        </section>

        <Reviews />
        <KontaktFormClient />
      </main>
      <Footer />
    </>
  );
}