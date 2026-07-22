export default function ServicesSection() {
  const extraServices = [
    { icon: '💰', title: 'Geld abheben', sub: 'EC-Karte' },
    { icon: '🖨️', title: 'Druckservice', sub: 'Kopien & Ausdrucke' },
    { icon: '☕', title: 'Heiße Getränke', sub: 'Kaffee & Tee to go' },
    { icon: '🔌', title: 'Handy-Ladestation', sub: 'Smartphone aufladen' },
  ];

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-4xl mb-3" aria-hidden="true">
              💳
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Zahlungsmethoden</h3>
            <p className="text-sm text-gray-700">
              Bar · EC-Karte · Kontaktlos
              <br />
              Apple Pay · Google Pay
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3" aria-hidden="true">
              🚗
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Parken</h3>
            <p className="text-sm text-gray-700">
              Kurze Haltezone direkt vor dem Laden
              <br />
              Öffentliche Parkplätze am Bürgerplatz
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3" aria-hidden="true">
              ♿
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Barrierefreiheit</h3>
            <p className="text-sm text-gray-700">
              Stufenfreier Zugang
              <br />
              Rollstuhlgerecht
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-gray-200">
          {extraServices.map((s, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white hover:bg-pink-50 transition-colors duration-300"
            >
              <div className="text-3xl mb-2" aria-hidden="true">
                {s.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
