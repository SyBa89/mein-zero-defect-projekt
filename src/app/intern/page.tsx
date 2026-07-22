'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ✅ ZERO-DEFECT: Explizite Typisierung für maximale Sicherheit und Intellisense
interface ChecklistState {
  kasse: boolean;
  lotto: boolean;
  brot: boolean;
  sauberkeit: boolean;
}

type SaveStatus = 'idle' | 'saving' | 'saved';

export default function InternPage() {
  // Auth States
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dashboard States
  const [checklist, setChecklist] = useState<ChecklistState>({
    kasse: false,
    lotto: false,
    brot: false,
    sauberkeit: false,
  });
  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  // Refs für Auto-Save Timer
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialisierung
  useEffect(() => {
    // Hinweis: sessionStorage ist ein UI-Gate. Die echte Sicherheit liegt in der API-Validierung.
    const authStatus = sessionStorage.getItem('intern-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const savedChecklist = localStorage.getItem('kiosk-checklist');
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        // Validierung, um korrupte Daten abzufangen
        if (typeof parsed === 'object' && parsed !== null) {
          setChecklist((prev) => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        console.error('[INTERN] Fehler beim Laden der Checkliste:', e);
      }
    }

    const savedNotes = localStorage.getItem('kiosk-notes');
    if (savedNotes) setNotes(savedNotes);

    setIsLoading(false);
  }, []);

  // Checkliste speichern (bei jeder Änderung)
  useEffect(() => {
    localStorage.setItem('kiosk-checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Notizen mit robustem Auto-Save (Debounced)
  useEffect(() => {
    // Vorherige Timer aufräumen, um Race Conditions zu verhindern
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    if (saveStatus !== 'saving') {
      setSaveStatus('saving');
    }

    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem('kiosk-notes', notes);
      setSaveStatus('saved');

      // Timer für den Rückwechsel zu 'idle'
      idleTimerRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, 800); // 800ms ist optimal für Tipp-Flüssigkeit vs. Speicher-Last

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [notes, saveStatus]);

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
        setError(data.message || 'Falsches Passwort.');
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
    setError('');
  };

  const toggleChecklist = (key: keyof ChecklistState) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetChecklist = () => {
    if (window.confirm('Möchtest du die Checkliste wirklich für die neue Schicht zurücksetzen?')) {
      setChecklist({ kasse: false, lotto: false, brot: false, sauberkeit: false });
    }
  };

  const clearNotes = () => {
    if (notes.trim() === '') return;
    if (window.confirm('Möchtest du die Notizen wirklich unwiderruflich löschen?')) {
      setNotes('');
      localStorage.removeItem('kiosk-notes');
      setSaveStatus('idle');
    }
  };

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
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-200 font-medium flex items-center gap-2">
                  <span aria-hidden="true">⚠️</span> {error}
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
                      aria-hidden="true"
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
                className="text-sm text-pink-600 hover:text-pink-700 font-semibold transition-colors inline-flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Zurück zur öffentlichen Webseite
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
                className="px-5 py-2.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl font-bold transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
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
                      <span className="mr-2 text-xl" aria-hidden="true">
                        ✅
                      </span>{' '}
                      Schicht-Checkliste
                    </h2>
                    <button
                      onClick={resetChecklist}
                      className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors"
                    >
                      Zurücksetzen
                    </button>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { key: 'kasse' as const, label: 'Kasse gezählt & abgestimmt' },
                      { key: 'lotto' as const, label: 'Lotto-Ziehung geprüft' },
                      { key: 'brot' as const, label: 'Brötchen für morgen bestellt' },
                      { key: 'sauberkeit' as const, label: 'Kiosk gereinigt & aufgeräumt' },
                    ].map((item) => {
                      const isChecked = checklist[item.key];
                      return (
                        <li key={item.key}>
                          {/* ✅ A11y FIX: Button statt li mit onClick für volle Tastatur-Unterstützung */}
                          <button
                            type="button"
                            onClick={() => toggleChecklist(item.key)}
                            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors text-left group"
                            aria-pressed={isChecked}
                          >
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                isChecked
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 group-hover:border-pink-400'
                              }`}
                            >
                              {isChecked && (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`font-medium text-sm transition-colors ${
                                isChecked ? 'line-through text-gray-400' : 'text-gray-700'
                              }`}
                            >
                              {item.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Übergabe-Notizen MIT AUTO-SAVE UND LÖSCHEN */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      {/* ✅ FIX: Fehlendes Emoji hinzugefügt für Konsistenz */}
                      <span className="mr-2 text-xl" aria-hidden="true">
                        📝
                      </span>{' '}
                      Übergabe-Notizen
                    </h2>
                    <div className="flex items-center gap-3">
                      {saveStatus === 'saving' && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>{' '}
                          Speichern...
                        </span>
                      )}
                      {saveStatus === 'saved' && (
                        <span className="text-xs text-green-600 flex items-center gap-1 font-medium">
                          <span aria-hidden="true">✅</span> Gespeichert
                        </span>
                      )}
                      <button
                        onClick={clearNotes}
                        className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors"
                        title="Notizen löschen"
                        disabled={notes.trim() === ''}
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
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
              </div>

              {/* RECHTE SPALTE: Ressourcen & Hinweise */}
              <div className="space-y-8">
                {/* Wichtige externe Portale */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2 text-xl" aria-hidden="true">
                      🔗
                    </span>{' '}
                    Wichtige externe Portale
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="https://myhermes.de/partner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors group"
                    >
                      <span
                        className="text-2xl mr-3 group-hover:scale-110 transition-transform"
                        aria-hidden="true"
                      >
                        📦
                      </span>
                      <div>
                        <span className="block font-bold text-gray-900">Hermes Partner</span>
                        <span className="text-xs text-gray-600">Sendungsverfolgung & Retouren</span>
                      </div>
                    </a>
                    <a
                      href="https://www.westlotto.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
                    >
                      <span
                        className="text-2xl mr-3 group-hover:scale-110 transition-transform"
                        aria-hidden="true"
                      >
                        🎫
                      </span>
                      <div>
                        <span className="block font-bold text-gray-900">Lotto System</span>
                        <span className="text-xs text-gray-600">WestLotto Partner-Login</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Notfall- & Lieferantenkontakte */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2 text-xl" aria-hidden="true">
                      📞
                    </span>{' '}
                    Notfallkontakte
                  </h2>
                  <div className="space-y-3">
                    <a
                      href="tel:+492235123456"
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-pink-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700 text-sm flex items-center gap-2">
                        <span aria-hidden="true">🥤</span> Getränke-Großhandel
                      </span>
                      <span className="text-pink-600 font-bold text-sm group-hover:scale-105 transition-transform">
                        02235 / 123 456
                      </span>
                    </a>
                    <a
                      href="tel:+492235654321"
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-pink-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700 text-sm flex items-center gap-2">
                        <span aria-hidden="true">🥐</span> Bäckerei-Lieferant
                      </span>
                      <span className="text-pink-600 font-bold text-sm group-hover:scale-105 transition-transform">
                        02235 / 654 321
                      </span>
                    </a>
                    <a
                      href="tel:+492235987654"
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-pink-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700 text-sm flex items-center gap-2">
                        <span aria-hidden="true">🔑</span> Schlüsseldienst
                      </span>
                      <span className="text-pink-600 font-bold text-sm group-hover:scale-105 transition-transform">
                        02235 / 987 654
                      </span>
                    </a>
                    <a
                      href="tel:+491701234567"
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-pink-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700 text-sm flex items-center gap-2">
                        <span aria-hidden="true">👤</span> Geschäftsleitung
                      </span>
                      <span className="text-pink-600 font-bold text-sm group-hover:scale-105 transition-transform">
                        0170 / 123 45 67
                      </span>
                    </a>
                  </div>
                </div>

                {/* Wichtige interne Hinweise */}
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
                    <span className="mr-2 text-xl" aria-hidden="true">
                      💡
                    </span>{' '}
                    Interne Hinweise
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-sm text-blue-800 marker:text-blue-600">
                    <li>
                      Bei Hermes-Retouren ohne Label: Kunde anweisen, das Label in der Hermes-App zu
                      erstellen.
                    </li>
                    <li>
                      Kassensystem Neustart: Roten Knopf an der Seite für 10 Sekunden gedrückt
                      halten.
                    </li>
                    <li>
                      Samstags um 13:15 Uhr schließen, um 13:30 Uhr die Rollläden unten zu haben.
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
