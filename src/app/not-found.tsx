import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-lg w-full text-center">
        <p className="text-8xl font-black bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Seite nicht gefunden</h1>
        <p className="mt-4 text-gray-600">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[var(--theme-primary)] hover:brightness-110 text-white font-semibold rounded-[var(--theme-radius)] transition-all shadow-lg hover:shadow-xl"
          >
            ← Zur Startseite
          </Link>
          <Link
            href="/kontakt"
            className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-[var(--theme-primary)] text-gray-700 font-semibold rounded-[var(--theme-radius)] transition-all"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </div>
  );
}
