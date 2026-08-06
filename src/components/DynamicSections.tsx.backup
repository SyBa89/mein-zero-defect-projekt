'use client';

import dynamic from 'next/dynamic';

// ✅ ZERO-DEFECT: Lazy Loading für nicht-kritische Client Components
const FAQ = dynamic(() => import('@/components/FAQ'));
const DailyHighlightsSection = dynamic(() => import('@/components/DailyHighlightsSection'));
const BrandsSection = dynamic(() => import('@/components/BrandsSection'));

interface DynamicSectionsProps {
  children?: React.ReactNode;
}

export default function DynamicSections({ children }: DynamicSectionsProps) {
  return (
    <>
      {/* ✅ ZERO-DEFECT: FAQ reaktiviert – Hydration-Fixes sind verifiziert */}
      <FAQ />
      <DailyHighlightsSection />
      <BrandsSection />
      {children}
    </>
  );
}
