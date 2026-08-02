'use client';

import { CLIENT_CONFIG } from '@/lib/client.config';
import { motion } from 'framer-motion';
import FadeInWhenVisible from './motion/FadeInWhenVisible';
import { HoverLift } from './motion/FadeInWhenVisible';

export default function Reviews() {
  const { contact, brand } = CLIENT_CONFIG;

  return (
    <section className="relative py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Dekorative Hintergrund-Blobs für Glassmorphismus */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-pink-200/30 dark:bg-pink-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <FadeInWhenVisible direction="up" duration={0.8}>
          <HoverLift liftAmount={-8}>
            <motion.div
              className="glass-card rounded-3xl p-12 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Google Logo */}
              <div className="mb-6 flex justify-center">
                <svg className="w-16 h-16" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-6">
                Warst du auch bei uns zufrieden?
              </h2>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Wir freuen uns über jede ehrliche Bewertung! Dein Feedback hilft uns, besser zu
                werden und anderen Nachbarn in {contact.address.city}, uns zu finden.
              </p>

              {/* CTA Button mit Glow-Effekt */}
              <motion.a
                href={`https://search.google.com/local/writereview?placeid=${contact.googlePlaceId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-pink-500 text-gray-800 dark:text-gray-100 font-bold text-lg rounded-2xl shadow-lg transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                Jetzt auf Google bewerten
              </motion.a>

              {/* Trust Indicator */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                ⚡ Dauert nur 30 Sekunden • Unterstütze {brand.name}
              </p>
            </motion.div>
          </HoverLift>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
