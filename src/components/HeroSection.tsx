'use client';

import { CLIENT_CONFIG } from '@/lib/client.config';
import { m, useReducedMotion, LazyMotion, domAnimation } from 'framer-motion';
import Image from 'next/image';
import FadeInWhenVisible from './motion/FadeInWhenVisible';

export default function HeroSection() {
  const { brand, hero } = CLIENT_CONFIG;
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900"
        id="hero"
      >
        {/* âœ… ZERO-DEFECT: q=75 statt q=85 (17 KiB savings, visuelle QualitÃ¤t bleibt) */}
        <Image
          src="/images/fassade.png"
          alt={`${brand.name} â€“ Fassade am BÃ¼rgerplatz in Erftstadt-Liblar`}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-pink-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <m.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
            style={{ willChange: 'transform' }}
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={
              prefersReducedMotion
                ? { scale: 1, x: 0, y: 0 }
                : { scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -20, 0] }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <m.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            style={{ willChange: 'transform' }}
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={
              prefersReducedMotion
                ? { scale: 1, x: 0, y: 0 }
                : { scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 20, 0] }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20 z-10">
          <m.div
            className="mb-6 text-7xl md:text-8xl inline-block drop-shadow-2xl"
            style={{ willChange: 'transform, opacity' }}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: prefersReducedMotion ? 0 : [0, -8, 0],
            }}
            transition={{
              opacity: { duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' },
              scale: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.34, 1.56, 0.64, 1] },
              rotate: { duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' },
              y: prefersReducedMotion
                ? {}
                : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 },
            }}
          >
            ðŸ­
          </m.div>

          <FadeInWhenVisible delay={0.2} direction="up">
            <p className="text-lg md:text-2xl text-white/90 mb-3 font-medium drop-shadow-lg">
              Willkommen bei
            </p>
          </FadeInWhenVisible>

          <m.h1
            style={{ willChange: 'transform, opacity' }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl"
          >
            {brand.name}
          </m.h1>

          <FadeInWhenVisible delay={0.6} direction="up">
            <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              {hero.subheadline}
            </p>
          </FadeInWhenVisible>

          {/* âœ… ZERO-DEFECT: Composited Animations (nur transform + opacity) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <m.a
              href={hero.primaryCta.href}
              style={{ willChange: 'transform' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.8, ease: 'easeOut' }}
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-pink-500/50 transition-colors backdrop-blur-sm"
              aria-label={`${hero.primaryCta.label} - Anrufen`}
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
              {hero.primaryCta.label}
            </m.a>

            <m.a
              href={hero.secondaryCta.href}
              style={{ willChange: 'transform' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 1.0, ease: 'easeOut' }}
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/95 hover:bg-white text-gray-900 font-bold text-lg rounded-2xl shadow-2xl transition-colors backdrop-blur-sm border-2 border-white/50"
              aria-label={`${hero.secondaryCta.label} - Route anzeigen`}
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
              {hero.secondaryCta.label}
            </m.a>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
