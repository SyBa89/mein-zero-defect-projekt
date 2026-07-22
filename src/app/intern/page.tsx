'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function InternPage() {
  // Authentifizierung & UI States
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dashboard States
  const [checklist, setChecklist] = useState({
    kasse: false,
    lotto: false,
    brot: false,
    sauberkeit: false,
  });
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState('');

  // Ref für den Banner-Generator (Zero-Defect: Vermeidet document.getElementById)
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // ✅ Initialisierung: Auth, LocalStorage laden
  useEffect(() => {
    const authStatus = sessionStorage.getItem('intern-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const savedChecklist = localStorage.getItem('kiosk-checklist');
    if (savedChecklist) {
      try {
        setChecklist(JSON.parse(savedChecklist));
      } catch (e) {
        console.error('Fehler beim Laden der Checkliste:', e);
      }
    }

    const savedNotes = localStorage.getItem('kiosk-notes');
    if (savedNotes) setNotes(savedNotes);

    setIsLoading(false);
  }, []);

  // ✅ Persistenz: Änderungen automatisch speichern
  useEffect(() => {
    localStorage.setItem('kiosk-checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('kiosk-notes', notes);
  }, [notes]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/intern/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('intern-auth', 'true');
      } else {
        setError(data.error || 'Falsches Passwort.');
        setPassword('');
      }
    } catch {
      setError('Ein Verbindungsfehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('intern-auth');
    setPassword('');
  };

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetChecklist = () => {
    setChecklist({ kasse: false, lotto: false, brot: false, sauberkeit: false });
  };

  const generateBannerCode = () => {
    const text =
      bannerInputRef.current?.value ||
      'Frische Brötchen, gekühlte Getränke & Ihr Hermes Paketshop direkt am Bürgerplatz!';
    const code = `{/* 📢 AKTIONS-BANNER */}\n<section className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 py-5">\n  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">\n    <p className="text-white font-bold text-lg drop-shadow-md">\n      🎉 ${text} 🎉\n    </p>\n  </div>\n</section>`;

    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied('banner');
        setTimeout(() => setCopied(''), 2000);
      })
      .catch(() => {
        setError('Konnte Code nicht in Zwischenablage kopieren.');
      });
  };

  // ✅ ZERO-DEFECT LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🔒</div>
          <p className="text-gray-600 font-medium">Lade Mitarbeiter-Bereich...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-10">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔒</div>
              <h1 className="text-2xl font-black text-gray-900">Mitarbeiter-Bereich</h1>
              <p className="text-sm text-gray-600 mt-2">
                Dieser Bereich ist nur für autorisiertes Personal des Kiosk Lollipop.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1.5">
                  Passwort eingeben
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                />
              </div>
              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-200 font-medium flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Prüfe...
                  </>
                ) : (
                  'Anmelden'
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-pink-600 hover:text-pink-700 font-semibold transition-colors"
              >
                ← Zurück zur öffentlichen Webseite
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Smart Kiosk Dashboard</h1>
                <p className="text-gray-600">Willkommen zurück. Hier ist deine Zentrale.</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl font-bold transition-colors text-sm"
              >
                Abmelden
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LINKE SPALTE: Organisation & Notizen */}
              <div className="space-y-8">
                {/* Schicht-Checkliste */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="mr-2 text-xl">✅</span> Schicht-Checkliste
                    </h2>
                    <button
                      onClick={resetChecklist}
                      className="text-xs text-gray-500 hover:text-red-600 font-medium"
                    >
                      Zurücksetzen
                    </button>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { key: 'kasse', label: 'Kasse gezählt & abgestimmt' },
                      { key: 'lotto', label: 'Lotto-Ziehung geprüft' },
                      { key: 'brot', label: 'Brötchen für morgen bestellt' },
                      { key: 'sauberkeit', label: 'Kiosk gereinigt & aufgeräumt' },
                    ].map((item) => (
                      <li
                        key={item.key}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer"
                        onClick={() => toggleChecklist(item.key as keyof typeof checklist)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            checklist[item.key as keyof typeof checklist]
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {checklist[item.key as keyof typeof checklist] && '✓'}
                        </div>
                        <span
                          className={`font-medium text-sm ${
                            checklist[item.key as keyof typeof checklist]
                              ? 'line-through text-gray-400'
                              : 'text-gray-700'
                          }`}
                        >
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Übergabe-Notizen */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    {/* ✅ FIX: Fehlendes Emoji hinzugefügt */}
                    <span className="mr-2 text-xl">📝</span> Übergabe-Notizen
                  </h2>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all resize-none text-sm"
                    placeholder="Notizen für die nächste Schicht (z.B. 'Kassenschublade klemmt', 'Milch fast leer')..."
                  />
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Wird automatisch lokal auf diesem Gerät gespeichert.
                  </p>
                </div>

                {/* Aktions-Banner Generator */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2 text-xl">📢</span> Aktions-Banner Generator
                  </h2>
                  <input
                    ref={bannerInputRef}
                    type="text"
                    defaultValue="Frische Brötchen, gekühlte Getränke & Ihr Hermes Paketshop direkt am Bürgerplatz!"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all mb-4 text-sm"
                    placeholder="Neuen Text eingeben..."
                  />
                  <button
                    onClick={generateBannerCode}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    {copied === 'banner' ? '✅ Code kopiert!' : 'Banner-Code generieren & kopieren'}
                  </button>
                </div>
              </div>

              {/* RECHTE SPALTE: Ressourcen & Hinweise */}
              <div className="space-y-8">
                {/* Wichtige externe Portale */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2 text-xl">🔗</span> Wichtige externe Portale
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="https://myhermes.de/partner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors group"
                    >
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                        📦
                      </span>
                      <div>
                        <span className="block font-bold text-gray-900">Hermes Partner Portal</span>
                        <span className="text-xs text-gray-600">Sendungsverfolgung & Retouren</span>
                      </div>
                    </a>
                    <a
                      href="https://www.westlotto.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
                    >
                      {/* ✅ FIX: Fehlendes Emoji hinzugefügt */}
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                        🎫
                      </span>
                      <div>
                        <span className="block font-bold text-gray-900">Lotto Annahmesystem</span>
                        <span className="text-xs text-gray-600">WestLotto Partner-Login</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Notfall- & Lieferantenkontakte */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2 text-xl">📞</span> Notfall- & Lieferantenkontakte
                  </h2>
                  <div className="space-y-3">
                    <a
                      href="tel:+492235123456"
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-pink-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700 text-sm">
                        🥤 Getränke-Großhandel (Notfall)
                      </span>
                      <span className="text-pink-600 font-bold text-sm group-hover:scale-105 transition-transform">
                        02235 / 123 456
                      </span>
                    </a>
                    <a
                      href="tel:+492235654321"
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-pink-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700 text-sm">
                        🥐 Bäckerei-Lieferant
                      </span>
                      <span className="text-pink-600 font-bold text-sm group-hover:scale-105 transition-transform">
                        02235 / 654 321
                      </span>
                    </a>
                    <a
                      href="tel:+492235987654"
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-pink-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700 text-sm">
                        🔑 Schlüsseldienst / Sicherheit
                      </span>
                      <span className="text-pink-600 font-bold text-sm group-hover:scale-105 transition-transform">
                        02235 / 987 654
                      </span>
                    </a>
                    <a
                      href="tel:+491701234567"
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-pink-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700 text-sm">
                        👤 Geschäftsleitung (Inhaber)
                      </span>
                      <span className="text-pink-600 font-bold text-sm group-hover:scale-105 transition-transform">
                        017x / 123 456 78
                      </span>
                    </a>
                  </div>
                </div>

                {/* Wichtige interne Hinweise */}
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
                    <span className="mr-2 text-xl">💡</span> Wichtige interne Hinweise
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
                    <li>
                      Bei Hermes-Retouren ohne Label: Kunde anweisen, das Label in der Hermes-App zu
                      erstellen.
                    </li>
                    <li>
                      Kassensystem Neustart: Halten Sie den roten Knopf an der Seite für 10 Sekunden
                      gedrückt.
                    </li>
                    <li>
                      Bitte achten Sie darauf, dass der Kiosk am Samstag um 13:15 Uhr geschlossen
                      wird, um pünktlich um 13:30 Uhr die Rollläden unten zu haben.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
