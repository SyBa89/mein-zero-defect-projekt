'use client';

import { CLIENT_CONFIG } from '@/lib/client.config';
import { motion, useReducedMotion } from 'framer-motion';
import FadeInWhenVisible from './motion/FadeInWhenVisible';
import { HoverLift } from './motion/FadeInWhenVisible';

export default function CTASection() {
  const { contact } = CLIENT_CONFIG;
  const prefersReducedMotion = useReducedMotion();
  const phoneFormatted = contact.phone.replace('+49', '0').replace(/(\d{4})(\d{7})/, '$1 $2');

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animierte Hintergrund-Blobs (subtil pulsierend) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-20 left-1/4 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </>
        )}
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeInWhenVisible direction="up" duration={0.8}>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-6">
            Besuchen Sie uns!
          </h2>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.2} duration={0.8}>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            {contact.address.street}, {contact.address.zip} {contact.address.city}
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.4} duration={0.8}>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Wir freuen uns auf Ihren Besuch!
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.6} duration={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <HoverLift liftAmount={-4}>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-colors"
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Exakte Route planen
              </a>
            </HoverLift>

            <HoverLift liftAmount={-4}>
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-colors border-2 border-gray-200 dark:border-gray-700"
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {phoneFormatted}
              </a>
            </HoverLift>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
