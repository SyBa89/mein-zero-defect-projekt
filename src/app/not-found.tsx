import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-orange-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seite nicht gefunden</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Entschuldigung, die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
          Vielleicht sind Sie auf dem Weg zum Kiosk falsch abgebogen?
        </p>
        <Link href="/">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md">
            Zurück zur Startseite
          </button>
        </Link>
      </div>
    </div>
  );
}
