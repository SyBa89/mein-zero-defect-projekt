export default function Reviews() {
  const reviews = [
    {
      name: 'Markus S.',
      rating: 5,
      date: 'vor 2 Wochen',
      text: 'Super freundlicher Service! Ich musste ein großes Paket versenden und der Inhaber hat mir sofort geholfen, das richtige Hermes-Paket zu finden. Top Kiosk in Liblar!',
    },
    {
      name: 'Julia M.',
      rating: 5,
      date: 'vor 1 Monat',
      text: 'Mein täglicher Stopp für die Zeitung und einen Kaffee. Immer sauber, immer freundlich und die Öffnungszeiten passen perfekt. Die neue Webseite hilft mir auch, schnell zu sehen, ob sie sonntags zu haben (zum Glück nicht, aber man weiß es ja dann 😉).',
    },
    {
      name: 'Thomas K.',
      rating: 5,
      date: 'vor 3 Monaten',
      text: 'Endlich ein Kiosk, der auch EC-Karte und kontaktlos akzeptiert. Die Hermes-Annahme funktioniert reibungslos. Sehr zu empfehlen!',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Das sagen unsere Kunden</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 font-medium">4.8 von 5 Sternen bei Google</span>
          </div>
          <p className="text-lg text-gray-600">Basierend auf über 50+ echten Bewertungen</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Sterne */}
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.text}"</p>

              {/* Autor & Datum */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500">Lokalguide</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action für neue Bewertungen */}
        <div className="text-center mt-12">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJeWG_1d8Xv0cRInW4W6roiP0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold transition-colors border-b-2 border-pink-200 hover:border-pink-600 pb-1"
          >
            Auch Sie waren zufrieden? Schreiben Sie eine Bewertung
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
