import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// ✅ ZERO-DEFECT: Umfassende SEO-Metadaten für rechtliche Seiten
export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Kiosk Lollipop',
  description:
    'Transparente Datenschutzerklärung von Kiosk Lollipop. Wir schützen Ihre Daten: Kein Tracking, keine unnötigen Cookies, volle DSGVO-Konformität.',
  robots: {
    index: true, // Datenschutzerklärungen sollten indexiert werden, damit Nutzer sie finden
    follow: true,
  },
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 tracking-tight">
            Datenschutzerklärung
          </h1>

          {/* ✅ UX-PSYCHOLOGIE: Kurzfassung baut sofort Vertrauen auf */}
          <section className="mb-10 bg-green-50 border border-green-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Kurzfassung für Eilige
            </h2>
            <ul className="space-y-2 text-green-800 font-medium">
              <li className="flex items-start gap-2">
                <span className="mt-1">✅</span>
                <span>Wir verkaufen Ihre Daten nicht und geben sie nicht an Dritte weiter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✅</span>
                <span>
                  Wir verwenden <strong>keine</strong> Tracking-Tools (wie Google Analytics oder
                  Facebook Pixel).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✅</span>
                <span>
                  Notwendige Cookies (z.B. für die Cookie-Einwilligung) werden lokal gespeichert.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Wer ist verantwortlich für die Datenerfassung?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem{' '}
              <Link
                href="/impressum"
                className="text-pink-600 hover:text-pink-700 underline font-semibold transition-colors"
              >
                Impressum
              </Link>{' '}
              entnehmen.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Wie erfassen wir Ihre Daten?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. über
              das Kontaktformular). Andere Daten werden automatisch oder nach Ihrer Einwilligung
              beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. Internetbrowser,
              Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
          </section>

          <section className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hosting</h2>
            <p className="text-gray-700 leading-relaxed">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:{' '}
              <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
              an einer sicheren und schnellen Bereitstellung). Wir haben einen{' '}
              <strong>Auftragsverarbeitungsvertrag (AVV)</strong> mit Vercel geschlossen. Vercel
              nutzt für die Auslieferung unserer Webseite primär Serverstandorte innerhalb der
              Europäischen Union, um Datenübermittlungen in Drittländer zu minimieren.
            </p>
          </section>

          <section className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Cookies und Einwilligungsmanagement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Unsere Internetseiten verwenden teilweise sogenannte Cookies. Cookies richten auf
              Ihrem Endgerät keinen Schaden an und enthalten keine Viren. Sie dienen dazu, unser
              Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Rechtsgrundlage:</strong> Die Speicherung von Cookies und der Zugriff auf
              diese erfolgen gemäß § 25 TDDDG. Technisch nicht unbedingt erforderliche Cookies
              werden nur mit Ihrer ausdrücklichen Einwilligung über unseren Cookie-Banner gesetzt
              (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit für die Zukunft
              widerrufen.
            </p>
          </section>

          {/* ✅ BUSINESS/SEO: Proaktive Erklärung der Datensparsamkeit als Qualitätsmerkmal */}
          <section className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Keine Tracking-Tools & soziale Plugins
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wir legen größten Wert auf Ihre Privatsphäre. Daher verzichten wir auf dieser Website
              bewusst auf den Einsatz von:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li>Webanalyse-Tools (wie Google Analytics, Matomo, etc.)</li>
              <li>Werbe-Tracking oder Retargeting-Pixeln (wie Facebook Pixel)</li>
              <li>Automatisch ladenden sozialen Medien Plugins (wie Facebook Like-Buttons)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              Es findet keine umfassende Profilbildung oder Weitergabe Ihrer Nutzungsdaten an Dritte
              zu Werbezwecken statt.
            </p>
          </section>

          <section className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Kontaktformular</h2>
            <p className="text-gray-700 leading-relaxed">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser
              Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit
              der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf
              unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
              Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit.
              a DSGVO).
            </p>
            <p className="text-gray-700 leading-relaxed">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns
              zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
              für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer
              Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen –
              bleiben unberührt.
            </p>
          </section>

          <section className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Ihre Rechte als betroffene Person
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nach der Datenschutz-Grundverordnung (DSGVO) stehen Ihnen als betroffene Person
              folgende Rechte zu:
            </p>
            {/* ✅ A11y/ARCHITEKTUR: Aufzählungsliste statt Fließtext für bessere Lesbarkeit */}
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>Recht auf Auskunft (Art. 15 DSGVO):</strong> Sie können eine Bestätigung
                  darüber verlangen, ob personenbezogene Daten von Ihnen verarbeitet werden.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, die
                  Berichtigung unrichtiger Sie betreffender Daten zu verlangen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie können die unverzügliche
                  Löschung Ihrer Daten verlangen, sofern die gesetzlichen Voraussetzungen dafür
                  vorliegen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</strong> und{' '}
                  <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO).</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold mt-0.5">•</span>
                <span>
                  <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, aus
                  Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die
                  Verarbeitung Ihrer Daten Widerspruch einzulegen.
                </span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Beschwerderecht:</strong> Zudem besteht ein Beschwerderecht bei der
              zuständigen Datenschutzaufsichtsbehörde (Art. 77 DSGVO). Zur Ausübung Ihrer Rechte
              wenden Sie sich bitte an die im{' '}
              <Link
                href="/impressum"
                className="text-pink-600 hover:text-pink-700 underline font-semibold transition-colors"
              >
                Impressum
              </Link>{' '}
              angegebenen Kontaktdaten.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
