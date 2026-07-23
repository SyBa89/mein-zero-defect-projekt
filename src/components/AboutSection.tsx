import { KIOSK_CONFIG } from '@/lib/config';

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-gray-900 mb-10 text-center tracking-tight">
          Über uns
        </h2>
        <div className="bg-white p-10 rounded-3xl border border-pink-100 shadow-lg">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong className="text-gray-900">{KIOSK_CONFIG.name}</strong> ist Ihr freundlicher
            Nachbarschaftskiosk und Hermes Paketshop am Bürgerplatz im Herzen von Erftstadt-Liblar.
            Wir befinden uns in der {KIOSK_CONFIG.address}, in der Nähe des Bahnhofs und weiterer
            lokaler Geschäfte.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Ob Sie morgens Ihre Zeitung holen, mittags einen schnellen Snack brauchen, Pakete
            versenden oder abends noch Getränke für den Feierabend kaufen möchten - wir sind für Sie
            da.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Als offizieller Hermes Paketshop bieten wir Ihnen zusätzlich alle Dienstleistungen rund
            um Paketversand, -abholung und Retouren. Schnell, freundlich und zu fairen Preisen.
          </p>
        </div>
      </div>
    </section>
  );
}
