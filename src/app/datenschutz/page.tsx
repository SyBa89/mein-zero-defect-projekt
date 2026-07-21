import Link from 'next/link';

export const metadata = {
  title: 'Datenschutzerklärung | Kiosk Lollipop',
  description: 'Datenschutzerklärung und Informationen zur Datenverarbeitung von Kiosk Lollipop.',
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 tracking-tight">
          Datenschutzerklärung
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Datenerfassung auf dieser Website
          </h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Wer ist verantwortlich für die Datenerfassung?</strong>
            <br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
            Kontaktdaten können Sie dem Impressum entnehmen.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Wie erfassen wir Ihre Daten?</strong>
            <br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. über
            das Kontaktformular). Andere Daten werden automatisch beim Besuch der Website durch
            unsere IT-Systeme erfasst (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des
            Seitenaufrufs).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. Hosting</h2>
          <p className="text-gray-700 leading-relaxed">
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:{' '}
            <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Die Nutzung
            erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
            zuverlässigen und schnellen Darstellung).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            3. Cookies und Einwilligungsmanagement
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unsere Internetseiten verwenden Cookies. Cookies richten auf Ihrem Rechner keinen
            Schaden an und enthalten keine Viren. Sie dienen dazu, unser Angebot nutzerfreundlicher,
            effektiver und sicherer zu machen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Rechtsgrundlage:</strong> Die Speicherung von Cookies und der Zugriff auf diese
            erfolgen gemäß § 25 TDDDG. Nicht unbedingt erforderliche Cookies werden nur mit Ihrer
            ausdrücklichen Einwilligung gesetzt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. Kontaktformular</h2>
          <p className="text-gray-700 leading-relaxed">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zwecks
            Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese
            Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf
            Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            5. Ihre Rechte als betroffene Person
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nach der Datenschutz-Grundverordnung (DSGVO) stehen Ihnen als betroffene Person
            verschiedene Rechte zu: Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung
            (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20)
            sowie Widerspruch (Art. 21).
          </p>
          <p className="text-gray-700 leading-relaxed">
            Zudem besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO).
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die im Impressum angegebenen
            Kontaktdaten.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
