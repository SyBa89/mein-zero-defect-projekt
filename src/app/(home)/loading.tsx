export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero Skeleton */}
      <div className="relative h-[80vh] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-64 bg-gray-400 rounded-lg mx-auto" />
          <div className="h-6 w-96 bg-gray-400 rounded-lg mx-auto" />
          <div className="h-12 w-48 bg-gray-400 rounded-[var(--theme-radius)] mx-auto" />
        </div>
      </div>
      {/* Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-8 w-64 bg-gray-200 rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-[var(--theme-radius)]" />
          ))}
        </div>
      </div>
    </div>
  );
}
