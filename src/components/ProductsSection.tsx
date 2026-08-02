'use client';

import { CLIENT_CONFIG } from '@/lib/client.config';
import FadeInWhenVisible, { StaggerContainer, StaggerItem } from './motion/FadeInWhenVisible';
import { HoverLift } from './motion/FadeInWhenVisible';

export default function ProductsSection() {
  const { products, sections } = CLIENT_CONFIG;

  // ✅ ZERO-DEFECT: White-Label - Wenn keine Produkte definiert sind, zeige nichts
  if (!sections.showProducts || products.categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <FadeInWhenVisible direction="up" duration={0.8}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
              Unser Sortiment
            </h2>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
          {products.categories.map((category, index) => (
            <StaggerItem key={index}>
              <HoverLift liftAmount={-6}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow h-full">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                  {category.ageRestriction && (
                    <div className="mt-4 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                        ⚠️ {category.ageRestriction}
                      </p>
                    </div>
                  )}
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
