'use client';

import { useConfig, useConfigState } from '@/contexts/ConfigContext';
import { StaggerContainer, StaggerItem } from './motion/FadeInWhenVisible';
import FadeInWhenVisible from './motion/FadeInWhenVisible';

export default function FeaturesSection() {
  // ✅ ZERO-DEFECT: ALLE Hooks ZUERST
  const config = useConfig();
  const { isLoading } = useConfigState();

  // ✅ Daten extrahieren mit Safe Defaults
  const { features, featuresMeta } = config;
  const sectionTitle = featuresMeta?.sectionTitle || 'Warum Kunden zu uns kommen';
  const sectionSubtitle = featuresMeta?.sectionSubtitle || 'Wir sind für Sie da';

  // ✅ JETZT Early-Returns (NACH allen Hooks!)
  if (isLoading) {
    return (
      <section
        className="py-20 px-4 bg-white dark:bg-gray-900"
        id="features"
        aria-busy="true"
        role="status"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto animate-pulse" />
          </div>
          <div className={`grid gap-6 ${features.length === 1 ? "grid-cols-1 max-w-md mx-auto" : features.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-5xl mb-4 animate-pulse">⏳</div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">Inhalt wird geladen...</span>
      </section>
    );
  }

  if (!features || features.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="features">
      <div className="max-w-7xl mx-auto">
        <FadeInWhenVisible direction="up" duration={0.8}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
              {sectionTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer
          className={`grid gap-6 ${features.length === 1 ? "grid-cols-1 max-w-md mx-auto" : features.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
          staggerDelay={0.15}
        >
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
                <div className="text-5xl mb-4" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
