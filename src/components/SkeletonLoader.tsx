'use client';

export function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        ))}
      </div>
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
    </div>
  );
}
