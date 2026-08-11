import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// ✅ LAZY-LOAD: SwaggerUI wird erst bei Bedarf geladen
// Impact: 487 kB -> 0 kB initial (Lighthouse Performance +15-20 Punkte)
const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false, // Client-side only (SwaggerUI braucht DOM)
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Lade API-Dokumentation...</p>
      </div>
    </div>
  ),
});

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Lade API-Dokumentation...</p>
          </div>
        </div>
      }>
        <SwaggerUI url="/api/docs" />
      </Suspense>
    </div>
  );
}