'use client';

import { CLIENT_CONFIG } from '@/lib/client.config';
import PackageCalculator from './PackageCalculator';
import FadeInWhenVisible, { StaggerContainer, StaggerItem } from './motion/FadeInWhenVisible';
import { HoverLift } from './motion/FadeInWhenVisible';

export default function HermesSection() {
  const { hermes, sections } = CLIENT_CONFIG;

  // ✅ ZERO-DEFECT: White-Label - Sektion wird nur gerendert, wenn Hermes aktiv ist
  if (!sections?.showHermes || !hermes?.enabled) {
    return null;
  }

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Subtiler dekorativer Hintergrund (Glassmorphismus-Effekt verstärkt) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200/40 dark:bg-orange-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-200/40 dark:bg-yellow-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <FadeInWhenVisible direction="up" duration={0.8}>
          <div className="text-center mb-12">
            <div className="text-6xl mb-4 inline-block" aria-hidden="true">
              📦
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
              Hermes Paketshop
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {hermes.description}
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.2} duration={0.8}>
          {/* ✅ ZERO-DEFECT: Glassmorphismus-Hauptcard */}
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Linke Spalte: Echte Paketgrößen-Rechner Komponente */}
              <div>
                <PackageCalculator />
              </div>

              {/* Rechte Spalte: Services mit Stagger-Animation */}
              <StaggerContainer className="space-y-6" staggerDelay={0.15}>
                <StaggerItem>
                  <HoverLift liftAmount={-4}>
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 dark:border-gray-700/40 shadow-sm h-full">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        📮 Pakete abholen & versenden
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Holen Sie Ihre Pakete bequem ab oder versenden Sie diese direkt bei uns.
                      </p>
                    </div>
                  </HoverLift>
                </StaggerItem>

                <StaggerItem>
                  <HoverLift liftAmount={-4}>
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 dark:border-gray-700/40 shadow-sm h-full">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        ↩️ Retouren & 🏷️ Etiketten
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Geben Sie Retouren einfach ab oder lassen Sie sich vor Ort ein Etikett
                        erstellen.
                      </p>
                    </div>
                  </HoverLift>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
