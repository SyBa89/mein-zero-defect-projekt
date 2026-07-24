'use client';

import { useState, useEffect, useCallback } from 'react';

interface SiteConfig {
  isClosed: boolean;
  bannerText: string;
  emergencyMessage: string;
  updatedAt: string;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  note: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export default function AdminPanel() {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Config (Tab 1)
  const [config, setConfig] = useState<SiteConfig>({
    isClosed: false,
    bannerText: '',
    emergencyMessage: '',
    updatedAt: '',
  });

  // Contacts (Tab 2)
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', note: '' });

  // Checklist (Tab 2)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Notes (Tab 2)
  const [notes, setNotes] = useState('');

  // Tab state
  const [activeTab, setActiveTab] = useState<'notfall' | 'betrieb'>('notfall');

  // ──────────────────────────────────────────────────────────────
  // PERSISTENT LOGIN: Prüfe beim Laden, ob bereits eingeloggt
  // ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin-auth');
    if (savedAuth === 'true') {
      // Automatisch einloggen und Daten laden
      setIsAuthenticated(true);
      loadConfig();
      loadContacts();
      loadChecklist();
      loadNotes();
    }
  }, []);

  // ──────────────────────────────────────────────────────────────
  // LOAD FUNCTIONS
  // ──────────────────────────────────────────────────────────────

  const loadConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setConfig(data);
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Laden der Konfiguration' });
    }
  }, []);

  const loadContacts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      setContacts(data);
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Laden der Kontakte' });
    }
  }, [password]);

  const loadChecklist = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/checklist', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      setChecklist(data);
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Laden der Checkliste' });
    }
  }, [password]);

  const loadNotes = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/notes', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      setNotes(data.notes || '');
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Laden der Notizen' });
    }
  }, [password]);

  // ──────────────────────────────────────────────────────────────
  // AUTH
  // ──────────────────────────────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        // ✅ Login-Status im localStorage speichern (persistent)
        localStorage.setItem('admin-auth', 'true');
        setIsAuthenticated(true);
        await loadConfig();
        await loadContacts();
        await loadChecklist();
        await loadNotes();
      } else {
        setMessage({ type: 'error', text: 'Falsches Passwort!' });
        setPassword('');
      }
    } catch {
      setMessage({ type: 'error', text: 'Verbindungsfehler zur API.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────
  // LOGOUT
  // ──────────────────────────────────────────────────────────────

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    setPassword('');
    setMessage(null);
  };

  // ──────────────────────────────────────────────────────────────
  // SAVE FUNCTIONS (Config)
  // ──────────────────────────────────────────────────────────────

  const saveConfig = useCallback(async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: '✅ Änderungen gespeichert!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Speichern' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Speichern' });
    } finally {
      setIsLoading(false);
    }
  }, [config, password]);

  // ──────────────────────────────────────────────────────────────
  // SAVE FUNCTIONS (Contacts)
  // ──────────────────────────────────────────────────────────────

  const addContact = useCallback(async () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      setMessage({ type: 'error', text: 'Name und Telefon sind Pflichtfelder.' });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ action: 'add', ...newContact }),
      });
      const data = await res.json();
      if (res.ok) {
        setContacts((prev) => [...prev, data.contact]);
        setNewContact({ name: '', phone: '', note: '' });
        setMessage({ type: 'success', text: '✅ Kontakt hinzugefügt!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Hinzufügen' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Hinzufügen' });
    } finally {
      setIsLoading(false);
    }
  }, [newContact, password]);

  const deleteContact = useCallback(
    async (id: string) => {
      if (!confirm('Kontakt wirklich löschen?')) return;
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify({ action: 'delete', id }),
        });
        if (res.ok) {
          setContacts((prev) => prev.filter((c) => c.id !== id));
          setMessage({ type: 'success', text: '✅ Kontakt gelöscht!' });
        }
      } catch {
        setMessage({ type: 'error', text: 'Fehler beim Löschen' });
      } finally {
        setIsLoading(false);
      }
    },
    [password]
  );

  // ──────────────────────────────────────────────────────────────
  // SAVE FUNCTIONS (Checklist)
  // ──────────────────────────────────────────────────────────────

  const addTask = useCallback(async () => {
    if (!newTaskText.trim()) {
      setMessage({ type: 'error', text: 'Bitte gib eine Aufgabe ein.' });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ action: 'add', text: newTaskText.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setChecklist((prev) => [...prev, data.item]);
        setNewTaskText('');
        setMessage({ type: 'success', text: '✅ Aufgabe hinzugefügt!' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Hinzufügen' });
    } finally {
      setIsLoading(false);
    }
  }, [newTaskText, password]);

  const toggleTask = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/checklist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify({ action: 'toggle', id }),
        });
        if (res.ok) {
          setChecklist((prev) =>
            prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
          );
        }
      } catch {
        setMessage({ type: 'error', text: 'Fehler beim Aktualisieren' });
      } finally {
        setIsLoading(false);
      }
    },
    [password]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      if (!confirm('Aufgabe wirklich löschen?')) return;
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/checklist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify({ action: 'delete', id }),
        });
        if (res.ok) {
          setChecklist((prev) => prev.filter((item) => item.id !== id));
          setMessage({ type: 'success', text: '✅ Aufgabe gelöscht!' });
        }
      } catch {
        setMessage({ type: 'error', text: 'Fehler beim Löschen' });
      } finally {
        setIsLoading(false);
      }
    },
    [password]
  );

  // ──────────────────────────────────────────────────────────────
  // SAVE FUNCTIONS (Notes)
  // ──────────────────────────────────────────────────────────────

  const saveNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: '✅ Notizen gespeichert!' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Speichern' });
    } finally {
      setIsLoading(false);
    }
  }, [notes, password]);

  // ──────────────────────────────────────────────────────────────
  // TAB CHANGE
  // ──────────────────────────────────────────────────────────────

  const handleTabChange = (tab: 'notfall' | 'betrieb') => {
    setActiveTab(tab);
    setMessage(null);
  };

  // ──────────────────────────────────────────────────────────────
  // LOGIN SCREEN
  // ──────────────────────────────────────────────────────────────

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-black text-gray-900 mb-6 text-center">Admin-Login</h1>
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Prüfe...' : 'Anmelden'}
            </button>
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────
  // MAIN DASHBOARD
  // ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-black text-gray-900">Admin-Cockpit</h1>
            <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
              Abmelden
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => handleTabChange('notfall')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'notfall'
                  ? 'bg-white shadow-md text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🚨 Notfall & Banner
            </button>
            <button
              onClick={() => handleTabChange('betrieb')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'betrieb'
                  ? 'bg-white shadow-md text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Betrieb & Kontakte
            </button>
          </div>

          {/* ─── TAB 1: NOTFALL & BANNER ─── */}
          {activeTab === 'notfall' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
                <h2 className="text-xl font-bold mb-4">🚨 Notfall-Modus</h2>
                <label className="flex items-center gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={config.isClosed}
                    onChange={(e) => setConfig({ ...config, isClosed: e.target.checked })}
                    className="w-6 h-6 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="font-medium">
                    {config.isClosed
                      ? '✅ Geschäft als "Geschlossen" markieren'
                      : '⭕ Geschäft als "Geöffnet" markieren'}
                  </span>
                </label>
                {config.isClosed && (
                  <div className="bg-white/10 rounded-lg p-4 mt-4">
                    <label className="block text-sm font-medium mb-2">
                      Grund für Schließung (optional):
                    </label>
                    <textarea
                      value={config.emergencyMessage}
                      onChange={(e) => setConfig({ ...config, emergencyMessage: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg text-gray-900"
                      rows={2}
                      placeholder="z.B. Krankheitsbedingt geschlossen bis..."
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900">📢 Aktions-Banner</h2>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text für das Banner oben auf der Seite:
                </label>
                <input
                  type="text"
                  value={config.bannerText}
                  onChange={(e) => setConfig({ ...config, bannerText: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="z.B. 🎉 Heute: Lotto Jackpot 45 Millionen!"
                />
                <p className="text-sm text-gray-500 mt-2">Leer lassen, um kein Banner anzuzeigen</p>
              </div>

              <button
                onClick={saveConfig}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {isLoading ? '💾 Speichere...' : '💾 Alle Änderungen speichern'}
              </button>

              {message && (
                <div
                  className={`p-4 rounded-xl text-center font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                >
                  {message.text}
                </div>
              )}

              {config.updatedAt && (
                <p className="text-xs text-gray-500 text-center mt-4">
                  Zuletzt aktualisiert: {new Date(config.updatedAt).toLocaleString('de-DE')}
                </p>
              )}
            </div>
          )}

          {/* ─── TAB 2: BETRIEB & KONTAKTE ─── */}
          {activeTab === 'betrieb' && (
            <div className="space-y-6">
              {/* Notfall-Kontakte */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">📞 Notfall-Kontakte</h2>
                <div className="space-y-2 mb-4">
                  {contacts.length === 0 && (
                    <p className="text-gray-500 text-sm">Noch keine Kontakte hinterlegt.</p>
                  )}
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-pink-600 text-sm hover:underline"
                        >
                          {contact.phone}
                        </a>
                        {contact.note && <p className="text-xs text-gray-500">{contact.note}</p>}
                      </div>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Telefon"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Notiz (optional)"
                      value={newContact.note}
                      onChange={(e) => setNewContact({ ...newContact, note: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                      onClick={addContact}
                      disabled={isLoading}
                      className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all whitespace-nowrap disabled:opacity-50"
                    >
                      Hinzufügen
                    </button>
                  </div>
                </div>
              </div>

              {/* Tages-Checkliste */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">✅ Tages-Checkliste</h2>
                <div className="space-y-2 mb-4">
                  {checklist.length === 0 && (
                    <p className="text-gray-500 text-sm">Noch keine Aufgaben vorhanden.</p>
                  )}
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <label className="flex items-center gap-3 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleTask(item.id)}
                          className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        />
                        <span
                          className={item.done ? 'line-through text-gray-400' : 'text-gray-900'}
                        >
                          {item.text}
                        </span>
                      </label>
                      <button
                        onClick={() => deleteTask(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Neue Aufgabe..."
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={addTask}
                    disabled={isLoading}
                    className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all disabled:opacity-50"
                  >
                    Hinzufügen
                  </button>
                </div>
              </div>

              {/* Mitarbeiter-Notizen */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Mitarbeiter-Notizen</h2>
                <p className="text-sm text-gray-500 mb-2">Notizen für die nächste Schicht:</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 min-h-[120px]"
                  placeholder="z.B. Bestellungen, Besonderheiten, Hinweise für die nächste Schicht..."
                />
                <button
                  onClick={saveNotes}
                  disabled={isLoading}
                  className="mt-3 px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Speichere...' : '💾 Notizen speichern'}
                </button>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-xl text-center font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                >
                  {message.text}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
