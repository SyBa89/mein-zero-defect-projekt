'use client';
import { useConfig, useConfigState } from '@/contexts/ConfigContext';
import { TENANT_REVIEWS } from '@/lib/reviews-data';

export default function Reviews() {
  const config = useConfig();
  const { isLoading } = useConfigState();
  if (isLoading) return <div className="py-20 text-center">Lädt...</div>;
  const { contact } = config;
  const businessType = config.business?.type || 'kiosk';
  const reviews = TENANT_REVIEWS[businessType] || TENANT_REVIEWS.kiosk;
  const googleReviewUrl = contact?.googlePlaceId
    ? 'https://search.google.com/local/writereview?placeid=' + contact.googlePlaceId
    : 'https://www.google.com/maps';
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
          Das sagen unsere Kunden
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Kundenstimmen aus {contact?.address?.city || 'der Region'}
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">⭐</span>
            <span className="text-2xl font-bold">5.0 Google</span>
          </div>
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              ⚠️ <strong>Demo-Beispiele:</strong> Diese Bewertungen zeigen, wie Kundenstimmen
              aussehen könnten. Für den Live-Betrieb werden echte Google-Bewertungen eingebunden.
            </p>
          </div>
          <div className="space-y-4 mb-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="text-left bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--theme-primary)] text-white font-bold flex items-center justify-center">
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{review.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-600 dark:text-gray-400">{review.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--theme-primary)] hover:brightness-110 text-white font-bold rounded-[var(--theme-radius)]"
          >
            ✍️ Bewertung auf Google schreiben
          </a>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-600 dark:text-gray-400 mt-6">
          📌 <strong>Transparent:</strong> Demo-Beispiele für White-Label-Plattform.
        </p>
      </div>
    </section>
  );
}
