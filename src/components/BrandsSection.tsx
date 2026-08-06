'use client';

import { useConfig, useConfigState } from '@/contexts/ConfigContext';

export default function BrandsSection() {
  const config = useConfig();
  const { isLoading } = useConfigState();

  // ✅ ZERO-DEFECT: Fallback brands wenn nicht in Config definiert
  const fallbackBrands = [
    '🥤 Coca-Cola & Fanta',
    '🍫 Milka & Ritter Sport',
    '🚬 Marlboro & Camel',
    '🎫 Lotto 6aus49 & Eurojackpot',
    '📰 Express & Kölner Stadt-Anzeiger',
    '📱 Vodafone & Telekom',
  ];

  // ✅ ZERO-DEFECT: Nutze brands aus Config oder Fallback
  const brands = config.brands && config.brands.length > 0 ? config.brands : fallbackBrands;

  // ✅ ZERO-DEFECT: Skeleton UI während Config lädt
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50" aria-busy="true" role="status">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-10 animate-pulse"></div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="px-5 py-3 bg-white text-transparent rounded-full font-bold shadow-sm border border-pink-100 animate-pulse"
              >
                <span className="invisible">🥤 Placeholder Brand</span>
              </span>
            ))}
          </div>
        </div>
        <span className="sr-only">Inhalt wird geladen...</span>
      </section>
    );
  }

  // ✅ ZERO-DEFECT: Guard - Wenn keine Brands, zeige nichts
  if (brands.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">
          Beliebte Marken bei uns
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {brands.map((brand, i) => (
            <span
              key={i}
              className="px-5 py-3 bg-white text-pink-700 rounded-full font-bold shadow-sm border border-pink-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
