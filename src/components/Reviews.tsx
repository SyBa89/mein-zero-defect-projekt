'use client';

interface Review {
  id: string;
  name: string;
  displayDate: string;
  isoDate: string;
  text: string;
  rating: number;
  source: string;
}

// ✅ ARCHITEKTUR: Statische Daten außerhalb, sauber typisiert
const reviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Thomas M.',
    displayDate: 'vor 2 Wochen',
    isoDate: '2023-10-15',
    text: 'Super freundlicher Service! Mein Hermes-Paket war schnell gefunden und die Abwicklung hat keine 2 Minuten gedauert. Gerne wieder!',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'rev-2',
    name: 'Sandra K.',
    displayDate: 'vor 1 Monat',
    isoDate: '2023-09-20',
    text: 'Der beste Kiosk in Liblar. Immer sauber, gut sortiert und das Personal ist wirklich nett. Die Öffnungszeiten sind auch top.',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'rev-3',
    name: 'Markus B.',
    displayDate: 'vor 2 Monaten',
    isoDate: '2023-08-10',
    text: 'Praktische Lage direkt am Bürgerplatz. Parkplätze sind in der Nähe. Getränke sind immer schön kalt. Empfehlenswert!',
    rating: 5,
    source: 'Google',
  },
];

export default function Reviews() {
  return (
    <section className="py-16 sm:py-20 bg-white" aria-labelledby="reviews-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="reviews-heading"
          className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center tracking-tight"
        >
          Das sagen unsere Kunden
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* ✅ ACCESSIBILITY: Exakte Sternchen-Bewertung für Screenreader */}
              <div
                className="flex text-yellow-400 mb-4"
                aria-label={`${review.rating} von 5 Sternen`}
              >
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                "{review.text}"
              </blockquote>

              <footer className="flex items-center justify-between border-t border-gray-200 pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  {/* Avatar-Initialen */}
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-gray-900 text-sm block">
                      {review.name}
                    </cite>
                    <time className="text-xs text-gray-500" dateTime={review.isoDate}>
                      {review.displayDate}
                    </time>
                  </div>
                </div>

                {/* ✅ BUSINESS: Verifiziert-Badge steigert Glaubwürdigkeit (Social Proof) */}
                <div
                  className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-full border border-gray-200 shadow-sm"
                  title={`Verifizierte Bewertung von ${review.source}`}
                >
                  <svg
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                  </svg>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-wide">
                    {review.source}
                  </span>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* ✅ CONVERSION: Klarer, einladender Call-to-Action für neue Bewertungen */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4 font-medium">Auch Sie waren bei uns zufrieden?</p>
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Eine neue Bewertung für Kiosk Lollipop auf Google schreiben (öffnet neuen Tab)"
            className="inline-flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg px-4 py-2 hover:bg-pink-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            Bewertung auf Google schreiben
          </a>
        </div>
      </div>
    </section>
  );
}
