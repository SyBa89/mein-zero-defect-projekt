import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Datenschutzerklärung | Kiosk Lollipop',
  description: 'Datenschutzerklärung der Kiosk Lollipop Webseite',
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
          <header>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
            <p className="text-sm text-gray-500">Stand: Juni 2026</p>
          </header>

          {/* 1. Datenschutz auf einen Blick */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Allgemeine Hinweise</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Datenerfassung auf dieser Website
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
              <br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Impressum entnehmen.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Wie erfassen wir Ihre Daten?</strong>
              <br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. über
              das Kontaktformular). Andere Daten werden automatisch beim Besuch der Website durch
              unsere IT-Systeme erfasst.
            </p>
          </section>

          {/* 2. Hosting */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hosting</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:{' '}
              <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einer zuverlässigen Darstellung).
            </p>
          </section>

          {/* 3. Cookies - TDDDG + PIMS */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Cookies und Einwilligungsmanagement
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unsere Internetseiten verwenden Cookies. Cookies richten auf Ihrem Rechner keinen
              Schaden an und enthalten keine Viren. Sie dienen dazu, unser Angebot
              nutzerfreundlicher zu machen.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Rechtsgrundlage:</strong> Die Speicherung von Cookies und der Zugriff auf
              diese erfolgen gemäß <strong>§ 25 TDDDG</strong>{' '}
              (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz). Nicht unbedingt erforderliche
              Cookies werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>PIMS (Personal Information Management Services):</strong> Unsere Website
              unterstützt die Verarbeitung von PIMS-Signalen gemäß der
              Einwilligungs-Verwaltungsverordnung (EinwV). Wenn Sie Ihre Cookie-Präferenzen zentral
              in Ihrem Browser oder über eine PIMS-App festgelegt haben, wird diese Präferenz
              automatisch berücksichtigt, ohne dass ein Cookie-Banner angezeigt wird.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
              informiert werden und Cookies nur im Einzelfall erlauben.
            </p>
          </section>

          {/* 4. Kontaktformular */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Kontaktformular</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zwecks
              Bearbeitung der Anfrage bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
              Einwilligung weiter.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
              Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
              Ihrer Anfrage).
            </p>
          </section>

          {/* 5. Betroffenenrechte - DEZENT FORMULIERT */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Betroffenenrechte</h2>
            <p className="text-gray-700 leading-relaxed">
              Nach der Datenschutz-Grundverordnung stehen Ihnen als betroffene Person verschiedene
              Rechte zu. Diese umfassen das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art.
              16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
              Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO). Zudem besteht
              ein Beschwerderecht bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO). Zur Ausübung
              Ihrer Rechte wenden Sie sich bitte an die im Impressum angegebenen Kontaktdaten.
            </p>
          </section>

          {/* Platzhalter-Hinweis */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
            <p className="text-sm text-yellow-800">
              <strong>Hinweis:</strong> Diese Datenschutzerklärung ist ein Platzhalter und wurde
              nicht von einem Rechtsanwalt geprüft. Für eine abmahnsichere Webseite empfehlen wir
              die Nutzung eines Services wie{' '}
              <a
                href="https://www.it-recht-kanzlei.de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                IT-Recht Kanzlei
              </a>{' '}
              oder{' '}
              <a
                href="https://www.haendlerbund.de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                Händlerbund
              </a>
              .
            </p>
          </div>

          {/* Zurück-Link */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
