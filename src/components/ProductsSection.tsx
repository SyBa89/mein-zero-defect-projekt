export default function ProductsSection() {
  const products = [
    {
      icon: '🥤',
      bg: 'bg-blue-100',
      title: 'Über 100 Getränke',
      desc: 'Kalte und warme Getränke, Softdrinks, Säfte, Wasser, Bier und mehr. Immer frisch und gekühlt!',
      warn: '⚠️ Alkoholische Getränke nur an Personen ab 18 Jahren',
    },
    {
      icon: '🍫',
      bg: 'bg-yellow-100',
      title: 'Süße Versuchungen',
      desc: 'Wie früher! Große Auswahl an Schokolade, Chips, Gummibärchen, Riegeln und allen beliebten Snacks.',
    },
    {
      icon: '📰',
      bg: 'bg-green-100',
      title: 'Über 500 Zeitschriften',
      desc: 'Tageszeitungen, Magazine, Illustrierte und Fachzeitschriften. Für jeden das Richtige!',
    },
    {
      icon: '🚬',
      bg: 'bg-red-100',
      title: 'Tabakwaren',
      desc: 'Zigaretten, Zigarren, Tabak und Zubehör aller gängigen Marken. Alles vorrätig!',
      warn: '⚠️ Nur an Personen ab 18 Jahren',
    },
    {
      icon: '🎫',
      bg: 'bg-purple-100',
      title: 'Lotterie & Glücksspiel',
      desc: 'Lotto 6aus49, Eurojackpot, Rubbellose und weitere Lotterieprodukte.',
      warn: '⚠️ Die Teilnahme ist erst ab 18 Jahren erlaubt. Glücksspiel kann süchtig machen.',
    },
    {
      icon: '📱',
      bg: 'bg-indigo-100',
      title: 'Handy-Guthaben',
      desc: 'Aufladung für alle Mobilfunkanbieter: Telekom, Vodafone, O2, Aldi Talk und viele mehr.',
    },
    {
      icon: '📝',
      bg: 'bg-teal-100',
      title: 'Schreibwaren',
      desc: 'Stifte, Hefte, Briefumschläge und alles für Schule, Büro und Zuhause.',
    },
  ];

  return (
    <section id="produkte" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-gray-900 mb-14 text-center tracking-tight">
          Unser Sortiment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-700 mb-2 leading-relaxed">{item.desc}</p>
              {item.warn && (
                <p className="text-xs text-red-600 font-bold mt-3 flex items-center gap-1">
                  {item.warn}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
