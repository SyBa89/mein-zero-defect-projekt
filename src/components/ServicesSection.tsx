'use client';

import { useConfig, useConfigState } from '@/contexts/ConfigContext';
import FadeInWhenVisible, { StaggerContainer, StaggerItem } from './motion/FadeInWhenVisible';

export default function ServicesSection() {
  const config = useConfig();
  const { isLoading } = useConfigState();

  // ✅ ZERO-DEFECT: Skeleton UI während Config lädt
  if (isLoading) {
    return (
      <section
        className="py-16 bg-gray-50 dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700"
        id="services"
        aria-busy="true"
        role="status"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="text-center p-6 radius-token-lg bg-white dark:bg-gray-900 flex flex-col justify-center"
              >
                <div className="text-3xl mb-2 animate-pulse" aria-hidden="true">
                  ⏳
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mt-1 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">Inhalt wird geladen...</span>
      </section>
    );
  }

  const { extraServices } = config;

  // ✅ ZERO-DEFECT: White-Label - Wenn keine Services definiert sind, zeige nichts
  if (!extraServices || extraServices.length === 0) {
    return null;
  }

  return (
    <FadeInWhenVisible direction="up" duration={0.8}>
      <section
        className="py-16 bg-gray-50 dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700"
        id="services"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.15}>
            {extraServices.map((service, i) => (
              <StaggerItem key={i}>
                <div className="text-center p-6 radius-token-lg bg-white dark:bg-gray-900 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors duration-300 h-full flex flex-col justify-center">
                  <div className="text-3xl mb-2" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{service.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
