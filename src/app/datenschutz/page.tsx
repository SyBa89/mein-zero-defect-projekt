import { Metadata } from 'next';
import Link from 'next/link';
import { getClientConfig } from '@/lib/config-loader';
const config = getClientConfig();

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = config;

  return {
    title: `Datenschutz â€“ ${brand.name}`,
    description: 'DatenschutzerklÃ¤rung gemÃ¤ÃŸ DSGVO',
  };
}

export default function DatenschutzPage() {
  const { brand, contact } = config;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-8">
          DatenschutzerklÃ¤rung
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            1. Datenschutz auf einen Blick
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Allgemeine Hinweise
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Die folgenden Hinweise geben einen einfachen Ãœberblick darÃ¼ber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persÃ¶nlich identifiziert werden kÃ¶nnen.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            2. Verantwortliche Stelle
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">
              Die verantwortliche Stelle fÃ¼r die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>{brand.name}</strong>
              <br />
              {contact.address.street}
              <br />
              {contact.address.zip} {contact.address.city}
              <br />
              Telefon: {contact.phone}
              <br />
              E-Mail: {contact.email}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">3. Hosting</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Vercel</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              gehostet. Wenn Sie unsere Website besuchen, werden verschiedene personenbezogene Daten
              erfasst, darunter Ihre IP-Adresse und Informationen darÃ¼ber, welche Seiten Sie
              besuchen.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Weitere Informationen finden Sie in der DatenschutzerklÃ¤rung von Vercel:{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="text-pink-600 dark:text-pink-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vercel.com/legal/privacy-policy
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            4. Datenerfassung auf dieser Website
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Kontaktformular
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
              Bearbeitung der Anfrage und fÃ¼r den Fall von Anschlussfragen bei uns gespeichert.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
              sofern Ihre Anfrage mit der ErfÃ¼llung eines Vertrags zusammenhÃ¤ngt oder zur
              DurchfÃ¼hrung vorvertraglicher MaÃŸnahmen erforderlich ist. In allen Ã¼brigen FÃ¤llen
              beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            5. Speicherdauer
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">
              Soweit innerhalb der DSGVO keine konkrete Speicherdauer genannt wird, verbleiben Ihre
              personenbezogenen Daten bei uns, bis der Zweck fÃ¼r die Datenverarbeitung entfÃ¤llt
              oder Sie eine LÃ¶schung verlangen.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            6. Ihre Rechte
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft Ã¼ber Herkunft, EmpfÃ¤nger
              und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben auÃŸerdem ein Recht,
              die Berichtigung oder LÃ¶schung dieser Daten zu verlangen.
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link href="/" className="text-pink-600 dark:text-pink-400 hover:underline font-semibold">
            â† ZurÃ¼ck zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
