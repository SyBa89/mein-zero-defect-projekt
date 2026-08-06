'use client';

import React from 'react';
import FAQ from '@/components/FAQ';
import DailyHighlightsSection from '@/components/DailyHighlightsSection';
import BrandsSection from '@/components/BrandsSection';

interface DynamicSectionsProps {
  children?: React.ReactNode;
}

export default function DynamicSections({ children }: DynamicSectionsProps) {
  return (
    <>
      {/* ✅ ZERO-DEFECT: Statische Imports für bessere Performance */}
      <FAQ />
      <DailyHighlightsSection />
      <BrandsSection />
      {children}
    </>
  );
}
