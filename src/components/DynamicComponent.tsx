import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const LoadingFallback = () => (
  <div className="animate-pulse bg-gray-100 rounded-lg p-4">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export function createDynamicComponent<T>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  loading?: ReactNode
) {
  return dynamic(importFn, {
    loading: () => <>{loading || <LoadingFallback />}</>,
    ssr: false,
  });
}
