export default function FeaturesSection() {
  const features = [
    {
      icon: '📦',
      title: 'Hermes Paketshop',
      desc: 'Komplett-Service für Paketversand, Abholung und Retouren. Schnell und zuverlässig.',
    },
    {
      icon: '🕒',
      title: 'Lange Öffnungszeiten',
      desc: 'Mo-Fr bis 19:00 Uhr, Sa bis 14:30 Uhr. Wir sind da, wenn Sie uns brauchen.',
    },
    {
      icon: '📍',
      title: 'Zentrale Lage',
      desc: 'Direkt am Bürgerplatz in Liblar. Gut zu Fuß oder mit dem Auto erreichbar.',
    },
    {
      icon: '🅿️',
      title: 'Parkplätze vor der Tür',
      desc: 'Kurze Haltezone direkt vor dem Laden und öffentliche Parkplätze in der Nähe.',
    },
    {
      icon: '💳',
      title: 'Moderne Zahlung',
      desc: 'Bar, EC-Karte, Kontaktlos, Apple Pay und Google Pay. Sie zahlen, wie Sie wollen.',
    },
    {
      icon: '🤝',
      title: 'Persönlicher Service',
      desc: 'Seit 2020 für Liblar da. Wir kennen unsere Kunden und beraten mit Herz und Verstand.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Warum Kunden zu uns kommen
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light">
            Mehr als nur ein Kiosk - wir sind Ihr Nachbar mit echtem Service
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/40 hover:shadow-2xl hover:-translate-y-2 hover:border-pink-300 transition-all duration-500 group"
            >
              <div
                className="text-5xl mb-5 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
