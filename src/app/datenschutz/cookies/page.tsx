'use client';

import Link from 'next/link';

const cookies = [
  {
    category: 'Notwendig',
    name: 'session',
    provider: 'Eigene Website',
    purpose: 'Session-Management für den Admin-Bereich',
    duration: 'Session (bis Browser geschlossen)',
  },
  {
    category: 'Notwendig',
    name: 'cookie-consent',
    provider: 'Eigene Website',
    purpose: 'Speichert Ihre Cookie-Einwilligung',
    duration: '1 Jahr',
  },
  {
    category: 'Analyse',
    name: '_ga, _gid',
    provider: 'Google Analytics',
    purpose: 'Anonymisierte Nutzungsanalyse',
    duration: '_ga: 2 Jahre, _gid: 24 Stunden',
  },
  {
    category: 'Marketing',
    name: '_fbp, _fbc',
    provider: 'Facebook / Meta',
    purpose: 'Tracking für personalisierte Werbung',
    duration: '3 Monate',
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-[var(--theme-radius)] shadow-lg p-8 md:p-12">
        <Link
          href="/datenschutz"
          className="inline-flex items-center text-sm text-[var(--theme-primary)] hover:underline mb-6"
        >
          ← Zurück zur Datenschutzerklärung
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
          Cookie-Richtlinie
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Diese Website verwendet Cookies. Nachfolgend eine vollständige Übersicht.
        </p>
        <div className="space-y-8">
          {['Notwendig', 'Analyse', 'Marketing'].map((category) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {category === 'Notwendig' && '🔒 '}
                {category === 'Analyse' && '📊 '}
                {category === 'Marketing' && '📢 '}
                {category}e Cookies
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-[var(--theme-radius)] overflow-hidden">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                        Name
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                        Anbieter
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                        Zweck
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                        Dauer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookies
                      .filter((c) => c.category === category)
                      .map((cookie) => (
                        <tr
                          key={cookie.name}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          <td className="p-3 font-mono text-xs text-gray-900 dark:text-white">
                            {cookie.name}
                          </td>
                          <td className="p-3 text-gray-600 dark:text-gray-400">
                            {cookie.provider}
                          </td>
                          <td className="p-3 text-gray-600 dark:text-gray-400">{cookie.purpose}</td>
                          <td className="p-3 text-gray-600 dark:text-gray-400">
                            {cookie.duration}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
        <section className="mt-12 p-6 bg-[var(--theme-primary)]/10 rounded-[var(--theme-radius)] border border-[var(--theme-primary)]/20">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            ⚙️ Einstellungen verwalten
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie Ihren Browser-Cache
            löschen oder die folgende Schaltfläche anklicken.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('cookie-consent');
              window.location.reload();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-[var(--theme-primary)] hover:brightness-110 rounded-[var(--theme-radius)]"
          >
            Cookie-Einstellungen zurücksetzen
          </button>
        </section>
      </article>
    </main>
  );
}
