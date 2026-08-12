'use client';

import { useConfig, useConfigState } from '@/contexts/ConfigContext';
import FadeInWhenVisible, { StaggerContainer, StaggerItem } from './motion/FadeInWhenVisible';
import { HoverLift } from './motion/FadeInWhenVisible';

export default function DailyHighlightsSection() {
  const config = useConfig();
  const { isLoading } = useConfigState();

  // ✅ ZERO-DEFECT: Skeleton UI während Config lädt
  if (isLoading) {
    return (
      <section
        className="relative py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
        aria-busy="true"
        role="status"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="flex items-center justify-center mb-8">
              <span className="text-4xl mr-3" aria-hidden="true">
                🔥
              </span>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="text-center p-6 bg-gray-100/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-white/40 dark:border-gray-700/40 shadow-sm flex flex-col justify-center"
                >
                  <div className="text-4xl mb-3 animate-pulse" aria-hidden="true">
                    ⏳
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mt-8 animate-pulse"></div>
          </div>
        </div>
        <span className="sr-only">Inhalt wird geladen...</span>
      </section>
    );
  }

  const { features } = config;

  // ✅ ZERO-DEFECT: White-Label - Nimm die ersten 4 Features als Highlights
  const items = features.slice(0, 4).map((f, i) => ({
    icon: f.icon,
    text: f.title,
    bg:
      [
        'bg-pink-100/60 dark:bg-pink-900/20',
        'bg-yellow-100/60 dark:bg-yellow-900/20',
        'bg-blue-100/60 dark:bg-blue-900/20',
        'bg-green-100/60 dark:bg-green-900/20',
      ][i] || 'bg-gray-100/60 dark:bg-gray-900/20',
  }));

  // ✅ ZERO-DEFECT: Fallback - Wenn keine Features vorhanden, zeige nichts
  if (items.length === 0) return null;

  return (
    <section className="relative py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Dekorative Hintergrund-Blobs für Glassmorphismus-Tiefe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ ZERO-DEFECT: Glass-Card Haupt-Container */}
        <FadeInWhenVisible direction="up" duration={0.8}>
          <div className="glass-card rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="flex items-center justify-center mb-8">
              <span className="text-4xl mr-3" aria-hidden="true">
                🔥
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                Heute besonders gefragt
              </h2>
            </div>

            {/* ✅ ZERO-DEFECT: Stagger-Grid für die 4 Highlights */}
            <StaggerContainer className={`grid gap-4 ${items.length === 1 ? "grid-cols-1 max-w-xs mx-auto" : items.length === 2 ? "grid-cols-2 max-w-2xl mx-auto" : items.length === 3 ? "grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto" : "grid-cols-2 md:grid-cols-4"}`} staggerDelay={0.12}>
              {items.map((item, i) => (
                <StaggerItem key={i}>
                  <HoverLift liftAmount={-6}>
                    <div
                      className={`text-center p-6 ${item.bg} rounded-2xl backdrop-blur-sm border border-white/40 dark:border-gray-700/40 shadow-sm h-full flex flex-col justify-center transition-colors duration-300`}
                    >
                      <div className="text-4xl mb-3" aria-hidden="true">
                        {item.icon}
                      </div>
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight">
                        {item.text}
                      </p>
                    </div>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInWhenVisible direction="up" delay={0.6} duration={0.6}>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8 font-medium">
                ✨ Aktualisiert täglich • Alles sofort verfügbar
              </p>
            </FadeInWhenVisible>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
