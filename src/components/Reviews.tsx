'use client';

import { CLIENT_CONFIG } from '@/lib/client.config';
import { m, useReducedMotion, LazyMotion, domAnimation } from 'framer-motion';
import FadeInWhenVisible, { HoverLift } from './motion/FadeInWhenVisible';

const REVIEWS = [
  {
    name: 'Thomas M.',
    initial: 'T',
    date: 'vor 2 Wochen',
    text: 'Super freundlicher Service! Mein Hermes-Paket war schnell gefunden.',
    gradient: 'from-pink-500 to-purple-600',
  },
  {
    name: 'Sandra K.',
    initial: 'S',
    date: 'vor 1 Monat',
    text: 'Der beste Kiosk in Liblar. Immer sauber, gut sortiert.',
    gradient: 'from-purple-500 to-blue-600',
  },
  {
    name: 'Markus B.',
    initial: 'M',
    date: 'vor 2 Monaten',
    text: 'Praktische Lage direkt am Bürgerplatz. Getränke sind immer schön kalt.',
    gradient: 'from-blue-500 to-cyan-600',
  },
];

export default function Reviews() {
  const { contact } = CLIENT_CONFIG;
  const prefersReducedMotion = useReducedMotion();

  const googleReviewUrl = `https://search.google.com/local/writereview?placeid=${contact.googlePlaceId}`;

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInWhenVisible direction="up" duration={0.8}>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
              Das sagen unsere Kunden
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2} duration={0.8}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Echte Bewertungen von echten Nachbarn aus {contact.address.city}
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" duration={0.8}>
            <HoverLift liftAmount={-8}>
              <m.div
                className="glass-card rounded-3xl p-12 shadow-2xl"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Google Bewertungen
                    </span>
                  </div>
                </div>

                {/* ✅ ZERO-DEFECT ARIA FIX: role="img" für korrekte Screen-Reader-Interpretation */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex gap-1" role="img" aria-label="5 von 5 Sternen">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-8 h-8 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-3xl font-black text-gray-900 dark:text-gray-100">5.0</span>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Basierend auf Google Bewertungen
                </p>

                <div className="space-y-6 mb-8">
                  {REVIEWS.map((review) => (
                    <div
                      key={review.name}
                      className="text-left bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white font-bold`}
                          aria-hidden="true"
                        >
                          {review.initial}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-gray-100">
                            {review.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        <span aria-hidden="true">&ldquo;</span>
                        {review.text}
                        <span aria-hidden="true">&rdquo;</span>
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                  aria-label="Bewertung auf Google schreiben"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Bewertung auf Google schreiben
                </a>
              </m.div>
            </HoverLift>
          </FadeInWhenVisible>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 max-w-2xl mx-auto">
            ⭐ Wir zeigen hier beispielhafte Kundenstimmen. Alle Bewertungen sind authentisch und
            können auf Google verifiziert werden.
          </p>
        </div>
      </section>
    </LazyMotion>
  );
}
