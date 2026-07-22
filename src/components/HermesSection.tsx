import PackageCalculator from './PackageCalculator';

export default function HermesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/70 backdrop-blur-sm p-10 rounded-[2rem] border border-yellow-200/50 shadow-xl">
          <div className="text-6xl mb-5" aria-hidden="true">
            📦
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Hermes Paketshop
          </h2>
          <p className="text-lg text-gray-700 mb-8 font-light">
            Wir sind Ihr offizieller Hermes Paketshop in Erftstadt-Liblar!
          </p>
          <PackageCalculator />
          <details className="bg-white rounded-2xl p-6 mb-8 text-left shadow-sm border border-gray-100">
            <summary className="font-bold text-gray-900 cursor-pointer hover:text-pink-600 transition-colors text-lg">
              📋 Alle Paketgrößen im Detail anzeigen
            </summary>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="border border-gray-200 rounded-xl p-4 text-center bg-gray-50">
                <span className="block font-black text-pink-600 text-lg mb-1">S-Paket</span>
                <span className="text-gray-700">Max. 31,5 × 23,5 × 3,5 cm</span>
              </div>
              <div className="border border-pink-200 rounded-xl p-4 text-center bg-pink-50">
                <span className="block font-black text-pink-600 text-lg mb-1">M-Paket</span>
                <span className="text-gray-700">Max. 50 × 30 × 10 cm</span>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 text-center bg-gray-50">
                <span className="block font-black text-pink-600 text-lg mb-1">L-Paket</span>
                <span className="text-gray-700">Max. 120 × 60 × 60 cm</span>
              </div>
            </div>
          </details>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                📮 Pakete abholen & versenden
              </h3>
              <p className="text-sm text-gray-700">
                Holen Sie Ihre Pakete bequem ab oder versenden Sie diese direkt bei uns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">↩️ Retouren & 🏷️ Etiketten</h3>
              <p className="text-sm text-gray-700">
                Geben Sie Retouren einfach ab oder lassen Sie sich vor Ort ein Etikett erstellen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
