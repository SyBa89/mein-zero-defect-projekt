'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  HomeIcon,
  BellIcon,
  PhoneIcon,
  TruckIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BellIcon as BellIconSolid,
  PhoneIcon as PhoneIconSolid,
  TruckIcon as TruckIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from '@heroicons/react/24/solid';

// ──────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────

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

interface Supplier {
  id: string;
  name: string;
  phone: string;
  category: string;
  note: string;
}

interface DashboardData {
  today: string;
  revenue: number;
  openTasks: number;
  totalContacts: number;
  lastWeekRevenue: number[];
}

// ──────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────

export default function AdminPanel() {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // Navigation
  const [activePage, setActivePage] = useState<
    'dashboard' | 'notfall' | 'betrieb' | 'lieferanten' | 'einstellungen'
  >('dashboard');

  // Data
  const [config, setConfig] = useState<SiteConfig>({
    isClosed: false,
    bannerText: '',
    emergencyMessage: '',
    updatedAt: '',
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [notes, setNotes] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    today: '',
    revenue: 0,
    openTasks: 0,
    totalContacts: 0,
    lastWeekRevenue: [0, 0, 0, 0, 0, 0, 0],
  });

  // Form states
  const [newContact, setNewContact] = useState({ name: '', phone: '', note: '' });
  const [newTaskText, setNewTaskText] = useState('');
  const [newSupplier, setNewSupplier] = useState({ name: '', phone: '', category: '', note: '' });
  const [dailyRevenue, setDailyRevenue] = useState('');

  // ──────────────────────────────────────────────────────────────
  // PERSISTENT LOGIN
  // ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin-auth');
    const savedDarkMode = localStorage.getItem('admin-dark-mode');
    if (savedDarkMode === 'true') setDarkMode(true);
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admin-dark-mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ──────────────────────────────────────────────────────────────
  // LOAD FUNCTIONS
  // ──────────────────────────────────────────────────────────────

  const loadAllData = useCallback(async () => {
    await Promise.all([
      loadConfig(),
      loadContacts(),
      loadChecklist(),
      loadSuppliers(),
      loadNotes(),
      loadDashboard(),
    ]);
  }, [loadConfig, loadContacts, loadChecklist, loadSuppliers, loadNotes, loadDashboard]);

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

  const loadSuppliers = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/suppliers', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      setSuppliers(data);
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Laden der Lieferanten' });
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

  const loadDashboard = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      setDashboardData(data);
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Laden des Dashboards' });
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
        localStorage.setItem('admin-auth', 'true');
        setIsAuthenticated(true);
        await loadAllData();
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

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    setPassword('');
    setMessage(null);
  };

  // ──────────────────────────────────────────────────────────────
  // SAVE FUNCTIONS
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
          loadDashboard();
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
          loadDashboard();
        }
      } catch {
        setMessage({ type: 'error', text: 'Fehler beim Löschen' });
      } finally {
        setIsLoading(false);
      }
    },
    [password]
  );

  const addSupplier = useCallback(async () => {
    if (!newSupplier.name.trim()) {
      setMessage({ type: 'error', text: 'Name ist Pflichtfeld.' });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ action: 'add', ...newSupplier }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuppliers((prev) => [...prev, data.supplier]);
        setNewSupplier({ name: '', phone: '', category: '', note: '' });
        setMessage({ type: 'success', text: '✅ Lieferant hinzugefügt!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Hinzufügen' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Hinzufügen' });
    } finally {
      setIsLoading(false);
    }
  }, [newSupplier, password]);

  const deleteSupplier = useCallback(
    async (id: string) => {
      if (!confirm('Lieferant wirklich löschen?')) return;
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/suppliers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify({ action: 'delete', id }),
        });
        if (res.ok) {
          setSuppliers((prev) => prev.filter((s) => s.id !== id));
          setMessage({ type: 'success', text: '✅ Lieferant gelöscht!' });
        }
      } catch {
        setMessage({ type: 'error', text: 'Fehler beim Löschen' });
      } finally {
        setIsLoading(false);
      }
    },
    [password]
  );

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

  const saveRevenue = useCallback(async () => {
    const amount = parseFloat(dailyRevenue);
    if (isNaN(amount) || amount < 0) {
      setMessage({ type: 'error', text: 'Bitte gib einen gültigen Betrag ein.' });
      return;
    }
    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await fetch('/api/admin/revenue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ date: today, amount }),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: `✅ Umsatz €${amount.toFixed(2)} gespeichert!` });
        setDailyRevenue('');
        loadDashboard();
      } else {
        setMessage({ type: 'error', text: 'Fehler beim Speichern des Umsatzes' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Speichern' });
    } finally {
      setIsLoading(false);
    }
  }, [dailyRevenue, password]);

  // ──────────────────────────────────────────────────────────────
  // NAVIGATION
  // ──────────────────────────────────────────────────────────────

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, iconSolid: HomeIconSolid },
    { id: 'notfall', label: 'Notfall & Banner', icon: BellIcon, iconSolid: BellIconSolid },
    { id: 'betrieb', label: 'Betrieb & Kontakte', icon: PhoneIcon, iconSolid: PhoneIconSolid },
    { id: 'lieferanten', label: 'Lieferanten', icon: TruckIcon, iconSolid: TruckIconSolid },
    {
      id: 'einstellungen',
      label: 'Einstellungen',
      icon: Cog6ToothIcon,
      iconSolid: Cog6ToothIconSolid,
    },
  ];

  // ──────────────────────────────────────────────────────────────
  // LOGIN SCREEN
  // ──────────────────────────────────────────────────────────────

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full transition-colors duration-300">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6 text-center">
            Admin-Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Passwort
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
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
                className={`mt-4 p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'}`}
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
  // MAIN DASHBOARD WITH SIDEBAR
  // ──────────────────────────────────────────────────────────────

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return renderDashboard();
      case 'notfall':
        return renderNotfall();
      case 'betrieb':
        return renderBetrieb();
      case 'lieferanten':
        return renderLieferanten();
      case 'einstellungen':
        return renderEinstellungen();
      default:
        return null;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Heutiger Umsatz</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            €{dashboardData.revenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Offene Aufgaben</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {dashboardData.openTasks}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Kontakte</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {dashboardData.totalContacts}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Datum</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.today}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Umsatz der letzten 7 Tage
        </h3>
        <div className="flex items-end gap-2 h-32">
          {dashboardData.lastWeekRevenue.map((value, index) => {
            const max = Math.max(...dashboardData.lastWeekRevenue, 1);
            const height = (value / max) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-pink-100 dark:bg-pink-900/30 rounded-t-lg"
                  style={{ height: `${Math.max(height, 4)}%` }}
                >
                  <div
                    className="w-full bg-pink-500 dark:bg-pink-400 rounded-t-lg"
                    style={{ height: '100%' }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">-{6 - index}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          💶 Umsatz eintragen
        </h3>
        <div className="flex gap-3">
          <input
            type="number"
            step="0.01"
            placeholder="Betrag in €"
            value={dailyRevenue}
            onChange={(e) => setDailyRevenue(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={saveRevenue}
            disabled={isLoading}
            className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all disabled:opacity-50"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotfall = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🚨 Notfall & Banner</h2>

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Notfall-Modus</h3>
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

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">📢 Aktions-Banner</h3>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text für das Banner oben auf der Seite:
        </label>
        <input
          type="text"
          value={config.bannerText}
          onChange={(e) => setConfig({ ...config, bannerText: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="z.B. 🎉 Heute: Lotto Jackpot 45 Millionen!"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Leer lassen, um kein Banner anzuzeigen
        </p>
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
          className={`p-4 rounded-xl text-center font-medium ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}
        >
          {message.text}
        </div>
      )}
    </div>
  );

  const renderBetrieb = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📋 Betrieb & Kontakte</h2>

      {/* Contacts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📞 Notfall-Kontakte
        </h3>
        <div className="space-y-2 mb-4">
          {contacts.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Noch keine Kontakte hinterlegt.
            </p>
          )}
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-pink-600 dark:text-pink-400 text-sm hover:underline"
                >
                  {contact.phone}
                </a>
                {contact.note && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{contact.note}</p>
                )}
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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Telefon"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Notiz (optional)"
              value={newContact.note}
              onChange={(e) => setNewContact({ ...newContact, note: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={addContact}
              disabled={isLoading}
              className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all whitespace-nowrap disabled:opacity-50"
            >
              + Hinzufügen
            </button>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          ✅ Tages-Checkliste
        </h3>
        <div className="space-y-2 mb-4">
          {checklist.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Noch keine Aufgaben vorhanden.
            </p>
          )}
          {checklist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"
            >
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleTask(item.id)}
                  className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-pink-600 focus:ring-pink-500"
                />
                <span
                  className={
                    item.done
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-900 dark:text-white'
                  }
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
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={addTask}
            disabled={isLoading}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all disabled:opacity-50"
          >
            + Hinzufügen
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📝 Mitarbeiter-Notizen
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Notizen für die nächste Schicht:
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[120px]"
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
    </div>
  );

  const renderLieferanten = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🚚 Lieferanten</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Lieferanten verwalten
        </h3>
        <div className="space-y-2 mb-4">
          {suppliers.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Noch keine Lieferanten hinterlegt.
            </p>
          )}
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{supplier.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{supplier.category}</p>
                {supplier.phone && (
                  <a
                    href={`tel:${supplier.phone}`}
                    className="text-pink-600 dark:text-pink-400 text-sm hover:underline"
                  >
                    {supplier.phone}
                  </a>
                )}
                {supplier.note && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{supplier.note}</p>
                )}
              </div>
              <button
                onClick={() => deleteSupplier(supplier.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Name *"
            value={newSupplier.name}
            onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Telefon"
            value={newSupplier.phone}
            onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Kategorie"
            value={newSupplier.category}
            onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Notiz"
              value={newSupplier.note}
              onChange={(e) => setNewSupplier({ ...newSupplier, note: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={addSupplier}
              disabled={isLoading}
              className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all whitespace-nowrap disabled:opacity-50"
            >
              + Hinzufügen
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEinstellungen = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ Einstellungen</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🌙 Dark Mode</h3>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
        >
          {darkMode ? (
            <>
              <SunIcon className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-900 dark:text-white">Hell-Modus aktivieren</span>
            </>
          ) : (
            <>
              <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-900 dark:text-white">Dark-Modus aktivieren</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔐 Sicherheit</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Passwort kann in der .env.local Datei geändert werden.
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Abmelden
        </button>
      </div>
    </div>
  );

  // ──────────────────────────────────────────────────────────────
  // SIDEBAR LAYOUT
  // ──────────────────────────────────────────────────────────────

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} transition-colors duration-300`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-black text-gray-900 dark:text-white">🍭 Kiosk OS</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">v3.0 – Zero-Defect Edition</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const Icon = isActive ? item.iconSolid : item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setActivePage(
                      item.id as
                        'dashboard' | 'notfall' | 'betrieb' | 'lieferanten' | 'einstellungen'
                    )
                  }
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Eingeloggt</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 transition-colors duration-300">
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl text-center font-medium ${
                message.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}
            >
              {message.text}
            </div>
          )}
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
