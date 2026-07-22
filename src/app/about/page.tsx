import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

// ✅ ZERO-DEFECT: Umfassende SEO-Metadaten für korrekte Indexierung und Social Sharing
export const metadata: Metadata = {
  title: 'Über das Projekt | Zero-Defect OS & Kiosk Lollipop',
  description:
    'Erfahre mehr über die technische Exzellenz, den Zero-Defect-Ansatz und den modernen Technologie-Stack hinter der Kiosk Lollipop Webseite.',
  keywords: [
    'Zero-Defect',
    'Webentwicklung',
    'Next.js',
    'Kiosk Lollipop',
    'Softwarequalität',
    'Barrierefreiheit',
  ],
  openGraph: {
    title: 'Über das Projekt | Zero-Defect OS',
    description:
      'Technische Exzellenz ohne Kompromisse. Der Technologie-Stack hinter Kiosk Lollipop.',
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über das Projekt | Zero-Defect OS',
    description:
      'Technische Exzellenz ohne Kompromisse. Der Technologie-Stack hinter Kiosk Lollipop.',
  },
};

// ✅ Schema.org WebPage für maximale SEO-Relevanz
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Über das Projekt | Zero-Defect OS & Kiosk Lollipop',
  description:
    'Erfahre mehr über die technische Exzellenz, den Zero-Defect-Ansatz und den Technologie-Stack.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Kiosk Lollipop',
    url: 'https://mein-zero-defect-projekt.vercel.app',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-pink-600 transition-colors duration-200 mb-6 group"
          >
            <svg
              className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Zurück zur Startseite
          </Link>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4 text-center">
            Über{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Zero-Defect OS
            </span>
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
            Professionelle Webentwicklung ohne Kompromisse. Gebaut für Stabilität, Geschwindigkeit
            und Vertrauen.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Mission Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 transition-shadow duration-300 hover:shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Unsere Mission
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                Zero-Defect OS steht für professionelle Webentwicklung ohne Kompromisse. Wir
                glauben, dass Qualität kein Zufall ist, sondern das Ergebnis konsequenter
                Automatisierung, strenger Guardrails und moderner Technologien.
              </p>
              <p>
                Dieser Ansatz wurde für den{' '}
                <strong className="text-gray-900">Kiosk Lollipop</strong> umgesetzt, um eine
                Webseite zu schaffen, die nicht nur ästhetisch überzeugt, sondern auch technisch
                unzerstörbar, barrierefrei und blitzschnell ist.
              </p>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 transition-shadow duration-300 hover:shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Technologie-Stack
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-1">Next.js (App Router)</strong>
                  <span className="text-gray-600">
                    Modernes React-Framework mit Server-Side Rendering, optimierten Core Web Vitals
                    und nahtlosem Routing.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-1">TypeScript</strong>
                  <span className="text-gray-600">
                    Strikte Typsicherheit für robuste, wartbare Anwendungen. Eliminiert ganze
                    Klassen von Laufzeitfehlern.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-1">Tailwind CSS</strong>
                  <span className="text-gray-600">
                    Utility-First CSS für konsistentes, responsives und extrem performantes Design
                    ohne überflüssiges CSS.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-1">CI/CD & Linting</strong>
                  <span className="text-gray-600">
                    Automatische Quality Gates (ESLint, Prettier) bei jedem Commit, um Fehler an der
                    Quelle zu stoppen.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* Zero-Defect Principle Section */}
          <section className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-100 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Das Zero-Defect Prinzip in der Praxis
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Unser Ansatz ist keine leere Marketing-Phrase, sondern gelebter Standard:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                'Automatische Code-Prüfung vor jedem Commit',
                'Serverseitige Validierung aller Eingaben (XSS/DoS-Schutz)',
                'WCAG-konforme Barrierefreiheit für alle Nutzergruppen',
                'Proaktive Fehlerbehandlung statt hässlicher Abstürze',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 bg-white/60 p-4 rounded-xl border border-pink-100/50"
                >
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA Section */}
          <section className="text-center pt-8 pb-4">
            <p className="text-gray-600 mb-6">
              Überzeugt von diesem Ansatz? Erlebe das Ergebnis live.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Zurück zum Kiosk Lollipop
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
