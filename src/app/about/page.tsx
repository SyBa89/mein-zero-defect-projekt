import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-8 text-center">
          Über <span className="text-blue-600">Zero-Defect OS</span>
        </h1>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unsere Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zero-Defect OS steht für professionelle Webentwicklung ohne Kompromisse. Wir glauben,
              dass Qualität kein Zufall ist, sondern das Ergebnis konsequenter Automatisierung und
              moderner Technologien.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Unser Ansatz kombiniert die neuesten Frameworks mit automatischen Quality Gates, die
              Fehler abfangen, bevor sie überhaupt entstehen können.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologie-Stack</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">⚡</span>
                <div>
                  <strong className="text-gray-900">Next.js 16</strong> – Modernes React-Framework
                  mit Server-Side Rendering
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">🛡️</span>
                <div>
                  <strong className="text-gray-900">TypeScript</strong> – Typsicherheit für robuste
                  Anwendungen
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">🎨</span>
                <div>
                  <strong className="text-gray-900">Tailwind CSS</strong> – Utility-First CSS für
                  schnelles Design
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✅</span>
                <div>
                  <strong className="text-gray-900">CI/CD Pipeline</strong> – Automatische Quality
                  Gates bei jedem Commit
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Zero-Defect Prinzip</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Unser Zero-Defect-Ansatz bedeutet:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Automatische Code-Prüfung bei jedem Commit
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                TypeScript Strict Mode für maximale Typsicherheit
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                ESLint + Prettier für konsistenten Code-Style
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                GitHub Actions für Continuous Integration
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
