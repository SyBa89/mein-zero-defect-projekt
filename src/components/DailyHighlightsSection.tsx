import { CLIENT_CONFIG } from '@/lib/client.config';

export default function DailyHighlightsSection() {
  const { features } = CLIENT_CONFIG;

  // White-Label: Nimm die ersten 4 Features als Highlights
  const items = features.slice(0, 4).map((f, i) => ({
    icon: f.icon,
    text: f.title,
    bg:
      ['bg-pink-100/50', 'bg-yellow-100/50', 'bg-blue-100/50', 'bg-green-100/50'][i] ||
      'bg-gray-100/50',
  }));

  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl shadow-lg border border-pink-100 dark:border-gray-700 p-8">
          <div className="flex items-center justify-center mb-6">
            <span className="text-3xl mr-3" aria-hidden="true">
              🔥
            </span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              Heute besonders gefragt
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <div key={i} className={`text-center p-5 ${item.bg} rounded-2xl backdrop-blur-sm`}>
                <div className="text-3xl mb-2" aria-hidden="true">
                  {item.icon}
                </div>
                <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6 font-medium">
            Aktualisiert täglich • Alles sofort verfügbar
          </p>
        </div>
      </div>
    </section>
  );
}
