'use client';

import { useConfig, useConfigState } from '@/contexts/ConfigContext';
import FadeInWhenVisible from './motion/FadeInWhenVisible';

export default function AboutSection() {
  // ✅ ZERO-DEFECT: ALLE Hooks ZUERST
  const config = useConfig();
  const { isLoading } = useConfigState();

  // ✅ Daten extrahieren mit Safe Defaults
  const about = config.about;
  const hasAbout = about?.showSection !== false && about?.introText;

  // ✅ Early-Return NACH Hooks
  if (isLoading) {
    return (
      <section
        className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
        id="about"
        aria-busy="true"
        role="status"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-6 animate-pulse" />
          <div className="space-y-3 mb-8">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
          </div>
        </div>
        <span className="sr-only">Inhalt wird geladen...</span>
      </section>
    );
  }

  if (!hasAbout) return null;

  const sectionTitle = about?.sectionTitle || 'Über uns';

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800" id="about">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInWhenVisible direction="up" duration={0.8}>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-6">
            {sectionTitle}
          </h2>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.2} duration={0.8}>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {about?.introText}
          </p>
        </FadeInWhenVisible>

        {about?.mainDescription && (
          <FadeInWhenVisible direction="up" delay={0.4} duration={0.8}>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {about.mainDescription}
            </p>
          </FadeInWhenVisible>
        )}
      </div>
    </section>
  );
}
