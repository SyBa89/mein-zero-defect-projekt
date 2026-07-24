'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';

const INTERN_PASSWORD = process.env.NEXT_PUBLIC_INTERN_PASSWORD || 'lollipop2024';

export default function InternPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [checklist, setChecklist] = useState({
    kasse: false,
    lager: false,
    sauberkeit: false,
    werbung: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      const savedNotes = localStorage.getItem('intern-notes');
      if (savedNotes) setNotes(savedNotes);
      const savedChecklist = localStorage.getItem('intern-checklist');
      if (savedChecklist) {
        try {
          setChecklist(JSON.parse(savedChecklist));
        } catch {}
      }
    }
  }, [isAuthenticated]);

  const saveChecklist = (key: keyof typeof checklist) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    localStorage.setItem('intern-checklist', JSON.stringify(updated));
  };

  const saveNotes = () => {
    localStorage.setItem('intern-notes', notes);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === INTERN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Falsches Passwort!');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
            <h1 className="text-2xl font-black text-gray-900 mb-6 text-center">
              Mitarbeiter-Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Passwort eingeben"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                Anmelden
              </button>
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-gray-900">Mitarbeiter-Dashboard</h1>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword('');
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Abmelden
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Tages-Checkliste</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.kasse}
                  onChange={() => saveChecklist('kasse')}
                  className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-gray-700">Kasse gezählt & abgeschlossen</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.lager}
                  onChange={() => saveChecklist('lager')}
                  className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-gray-700">Lager aufgefüllt</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.sauberkeit}
                  onChange={() => saveChecklist('sauberkeit')}
                  className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-gray-700">Sauberkeit geprüft</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.werbung}
                  onChange={() => saveChecklist('werbung')}
                  className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-gray-700">Werbematerial aktualisiert</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📝 Notizen für die nächste Schicht
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={saveNotes}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent min-h-[150px]"
              placeholder="z.B. Bestellungen, Besonderheiten, Hinweise..."
            />
            <p className="text-xs text-gray-500 mt-2">
              💾 Wird automatisch gespeichert (lokal im Browser)
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
