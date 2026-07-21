import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Seite nicht gefunden</h2>
        <p className="mt-2 text-lg text-gray-600">
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-pink-500/30 transition-all hover:-translate-y-1"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
