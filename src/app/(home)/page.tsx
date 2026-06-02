import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Professionelle Webentwicklung <br />
          <span className="text-blue-600">ohne Kompromisse.</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10">
          Deine erste professionelle Webseite läuft lokal mit Next.js, TypeScript und Tailwind CSS.
          Geschützt durch automatische Zero-Defect Guardrails.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
            Dokumentation lesen
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-sm">
            GitHub Repository
          </button>
        </div>

        {/* Feature Grid als Vorschau */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">🛡️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Zero-Defect</h3>
            <p className="text-gray-600">
              Automatische Prüfungen bei jedem Commit verhindern Fehler, bevor sie entstehen.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Blitzschnell</h3>
            <p className="text-gray-600">
              Next.js und Turbopack sorgen für sofortiges Feedback und optimale Performance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Modernes Design</h3>
            <p className="text-gray-600">
              Tailwind CSS ermöglicht schnelles, responsives und wartbares Styling.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
