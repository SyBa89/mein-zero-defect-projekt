import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ✅ ZERO-DEFECT: Jede Seite benötigt SEO-Metadaten für korrekte Indexierung und Browser-Tabs
export const metadata = {
  title: 'Über das Projekt | Zero-Defect OS & Kiosk Lollipop',
  description:
    'Erfahre mehr über die technische Exzellenz, den Zero-Defect-Ansatz und den Technologie-Stack hinter der Kiosk Lollipop Webseite.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-8 text-center">
          Über <span className="text-pink-600">Zero-Defect OS</span>
        </h1>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unsere Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zero-Defect OS steht für professionelle Webentwicklung ohne Kompromisse. Wir glauben,
              dass Qualität kein Zufall ist, sondern das Ergebnis konsequenter Automatisierung,
              strenger Guardrails und moderner Technologien.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Dieser Ansatz wurde für den Kiosk Lollipop umgesetzt, um eine Webseite zu schaffen,
              die nicht nur ästhetisch überzeugt, sondern auch technisch unzerstörbar, barrierefrei
              und blitzschnell ist.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologie-Stack</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-pink-600 mr-3 text-xl" aria-hidden="true">
                  ⚡
                </span>
                <div>
                  <strong className="text-gray-900">Next.js (App Router)</strong> – Modernes
                  React-Framework mit Server-Side Rendering und optimierten Core Web Vitals.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-3 text-xl" aria-hidden="true">
                  🛡️
                </span>
                <div>
                  <strong className="text-gray-900">TypeScript</strong> – Strikte Typsicherheit für
                  robuste, wartbare Anwendungen ohne Laufzeitfehler.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-3 text-xl" aria-hidden="true">
                  🎨
                </span>
                <div>
                  <strong className="text-gray-900">Tailwind CSS</strong> – Utility-First CSS für
                  konsistentes, responsives und performantes Design.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-3 text-xl" aria-hidden="true">
                  ✅
                </span>
                <div>
                  <strong className="text-gray-900">CI/CD & Linting</strong> – Automatische Quality
                  Gates (ESLint, Prettier, Husky) bei jedem Commit, um Fehler an der Quelle zu
                  stoppen.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Das Zero-Defect Prinzip</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unser Ansatz bedeutet in der Praxis:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1" aria-hidden="true">
                  ✓
                </span>
                <span>Automatische Code-Prüfung und Formatierung vor jedem Commit.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1" aria-hidden="true">
                  ✓
                </span>
                <span>Serverseitige Validierung aller Nutzereingaben (XSS/DoS-Schutz).</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1" aria-hidden="true">
                  ✓
                </span>
                <span>WCAG-konforme Barrierefreiheit für alle Nutzergruppen.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1" aria-hidden="true">
                  ✓
                </span>
                <span>Proaktive Fehlerbehandlung statt hässlicher Standard-Abstürze.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
