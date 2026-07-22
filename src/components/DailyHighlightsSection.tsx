export default function DailyHighlightsSection() {
  const items = [
    { icon: '🥤', text: 'Gekühlte Getränke', bg: 'bg-pink-100/50' },
    { icon: '🍦', text: 'Eis & Snacks', bg: 'bg-yellow-100/50' },
    { icon: '📰', text: 'Tageszeitungen', bg: 'bg-blue-100/50' },
    { icon: '📦', text: 'Hermes Versand', bg: 'bg-green-100/50' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-lg border border-pink-100 p-8">
          <div className="flex items-center justify-center mb-6">
            <span className="text-3xl mr-3" aria-hidden="true">
              🔥
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Heute besonders gefragt
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <div key={i} className={`text-center p-5 ${item.bg} rounded-2xl backdrop-blur-sm`}>
                <div className="text-3xl mb-2" aria-hidden="true">
                  {item.icon}
                </div>
                <p className="font-bold text-gray-900 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-6 font-medium">
            Aktualisiert täglich • Alles sofort verfügbar
          </p>
        </div>
      </div>
    </section>
  );
}
