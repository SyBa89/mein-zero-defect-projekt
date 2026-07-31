import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-7xl font-black text-white">4</span>
          </div>
          <div className="absolute top-16 left-1/2 w-2 h-20 bg-gradient-to-b from-pink-400 to-purple-500 -translate-x-1/2 -z-10 rounded-full" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Seite nicht gefunden</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oh nein! Diese Seite scheint sich verirrt zu haben. Vielleicht ist sie gerade auf dem Weg
          zu uns – wie ein Paket über Hermes. 📦
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Zurück zur Startseite
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </div>
  );
}


