'use client';

import dynamic from 'next/dynamic';

// ✅ Lazy Loading für nicht-kritische Komponenten
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });
const Reviews = dynamic(() => import('@/components/Reviews'), { ssr: false });
const DailyHighlightsSection = dynamic(() => import('@/components/DailyHighlightsSection'), {
  ssr: false,
});
const BrandsSection = dynamic(() => import('@/components/BrandsSection'), { ssr: false });

interface DynamicSectionsProps {
  children?: React.ReactNode;
}

export default function DynamicSections({ children }: DynamicSectionsProps) {
  return (
    <>
      <FAQ />
      <Reviews />
      <DailyHighlightsSection />
      <BrandsSection />
      {children}
    </>
  );
}
