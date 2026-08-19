// src/app/about/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTenantConfig, getEffectiveConfig } from '@/lib/config-loader';

export async function generateMetadata(): Promise<Metadata> {
  const config = getTenantConfig();
  return {
    title: `Ãœber das Projekt`,
    description: `Erfahre mehr Ã¼ber die technische Exzellenz, den Zero-Defect-Ansatz und den modernen Technologie-Stack hinter der ${config.brand.name} Webseite.`,
    keywords: [
      'Zero-Defect',
      'Webentwicklung',
      'Next.js',
      config.brand.name,
      'SoftwarequalitÃ¤t',
      'Barrierefreiheit',
    ],
    openGraph: {
      title: `Ãœber das Projekt | Zero-Defect OS & ${config.brand.name}`,
      description: `Technische Exzellenz ohne Kompromisse. Der Technologie-Stack hinter ${config.brand.name}.`,
      type: 'website',
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Ãœber das Projekt | Zero-Defect OS & ${config.brand.name}`,
      description: `Technische Exzellenz ohne Kompromisse. Der Technologie-Stack hinter ${config.brand.name}.`,
    },
  };
}

export default async function AboutPage() {
  const config = await getEffectiveConfig();
  const { brand, url } = config;

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Ãœber das Projekt | Zero-Defect OS & ${brand.name}`,
    description:
      'Erfahre mehr Ã¼ber die technische Exzellenz, den Zero-Defect-Ansatz und den Technologie-Stack.',
    isPartOf: {
      '@type': 'WebSite',
      name: brand.name,
      url,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[var(--theme-primary)] transition-colors duration-200 mb-6 group"
            aria-label="ZurÃ¼ck zur Startseite"
          >
            <svg
              className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ZurÃ¼ck zur Startseite
          </Link>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tight mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Ãœber{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${config.theme.primaryColor}, ${config.theme.accentColor})` }}
            >
              Zero-Defect OS
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed">
            Professionelle Webentwicklung ohne Kompromisse. Gebaut fÃ¼r StabilitÃ¤t, Geschwindigkeit
            und Vertrauen.
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 sm:p-10 transition-shadow duration-300 hover:shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" style={{ color: config.theme.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Unsere Mission
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              <p>
                Zero-Defect OS steht fÃ¼r professionelle Webentwicklung ohne Kompromisse. Wir glauben,
                dass QualitÃ¤t kein Zufall ist, sondern das Ergebnis konsequenter Automatisierung,
                strenger Guardrails und moderner Technologien.
              </p>
              <p>
                Dieser Ansatz wurde fÃ¼r{' '}
                <strong className="text-gray-900 dark:text-gray-100">{brand.name}</strong>{' '}
                umgesetzt, um eine Webseite zu schaffen, die nicht nur Ã¤sthetisch Ã¼berzeugt, sondern
                auch technisch unzerstÃ¶rbar, barrierefrei und blitzschnell ist.
              </p>
            </div>
          </section>

          <section className="text-center pt-8 pb-4">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ãœberzeugt von diesem Ansatz? Erlebe das Ergebnis live.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: config.theme.primaryColor }}
            >
              ZurÃ¼ck zu {brand.name}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
