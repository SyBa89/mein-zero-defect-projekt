export default function Loading() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-50"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="text-center">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary mx-auto"
          aria-hidden="true"
        ></div>
        <p className="mt-4 text-gray-600 sr-only">Seite wird geladen...</p>
        <p className="mt-4 text-gray-600" aria-hidden="true">Lade...</p>
      </div>
    </div>
  );
}