'use client';

import dynamic from 'next/dynamic';

// ✅ ZERO-DEFECT: Lazy Loading für nicht-kritische Client Components
// WICHTIG: ssr: true (oder weglassen) für Hydration-Konsistenz
const FAQ = dynamic(() => import('@/components/FAQ'));
const DailyHighlightsSection = dynamic(() => import('@/components/DailyHighlightsSection'));
const BrandsSection = dynamic(() => import('@/components/BrandsSection'));

interface DynamicSectionsProps {
  children?: React.ReactNode;
}

export default function DynamicSections({ children }: DynamicSectionsProps) {
  return (
    <>
      <FAQ />
      {/* ✅ Reviews wird jetzt direkt in page.tsx gerendert (Server Component) */}
      <DailyHighlightsSection />
      <BrandsSection />
      {children}
    </>
  );
}
