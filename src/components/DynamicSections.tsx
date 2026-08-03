'use client';

import dynamic from 'next/dynamic';

// ✅ ZERO-DEFECT: Lazy Loading für nicht-kritische Client Components
// TEMPORÄR: FAQ auskommentiert für Hydration-Test
// const FAQ = dynamic(() => import('@/components/FAQ'));
const DailyHighlightsSection = dynamic(() => import('@/components/DailyHighlightsSection'));
const BrandsSection = dynamic(() => import('@/components/BrandsSection'));

interface DynamicSectionsProps {
  children?: React.ReactNode;
}

export default function DynamicSections({ children }: DynamicSectionsProps) {
  return (
    <>
      {/* TEMPORÄR: FAQ auskommentiert für Hydration-Test */}
      {/* <FAQ /> */}
      <DailyHighlightsSection />
      <BrandsSection />
      {children}
    </>
  );
}
