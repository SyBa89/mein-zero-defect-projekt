'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

interface DashboardStats {
  totalContacts: number;
  unreadContacts: number;
  systemStatus: 'healthy' | 'degraded' | 'offline';
  lastUpdate: string;
}

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/admin/stats', { credentials: 'include' })
        .then((r) => {
          if (!r.ok) throw new Error('Unauthorized');
          return r.json();
        })
        .then((data: DashboardStats) => setStats(data))
        .catch((err) => setError(err.message));
    }
  }, [isAuthenticated]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--theme-primary)]"></div>
      </div>
    );

  if (!isAuthenticated)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600 font-bold">
        Zugriff verweigert
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
        Fehler beim Laden der Statistiken: {error}
      </div>
    );

  const statusColors = {
    healthy: 'bg-green-100 text-green-800 border-green-200',
    degraded: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    offline: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusLabels = {
    healthy: '🟢 Alle Systeme laufen',
    degraded: '🟠 Redis antwortet nicht',
    offline: '🔴 Offline-Modus (Kein Redis)',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">📊 Business Cockpit</h1>
          <p className="text-gray-500 mt-1">
            Echtzeit-Status & Kontaktanfragen (DSGVO-konform, Zero-Tracking)
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* KARTE 1: GESAMT KONTAKTE */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Kontaktanfragen</p>
                  <p className="text-3xl font-black text-gray-900 mt-1">{stats.totalContacts}</p>
                  <p className="text-xs text-gray-400 mt-1">Gesamt im System</p>
                </div>
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">
                  ✉️
                </div>
              </div>
            </div>

            {/* KARTE 2: UNGELESEN (ACTION REQUIRED) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Ungelesen</p>
                  <p
                    className={`text-3xl font-black mt-1 ${stats.unreadContacts > 0 ? 'text-[var(--theme-primary)]' : 'text-gray-900'}`}
                  >
                    {stats.unreadContacts}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Warten auf Antwort</p>
                </div>
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-3xl">
                  🔔
                </div>
              </div>
            </div>

            {/* KARTE 3: SYSTEM HEALTH */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">System-Status</p>
                  <p
                    className={`text-lg font-bold mt-2 px-3 py-1 rounded-full border inline-block ${statusColors[stats.systemStatus]}`}
                  >
                    {statusLabels[stats.systemStatus]}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl">
                  🛡️
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-sm text-blue-800">
          <strong>💡 Zero-Tracking USP:</strong> Diese Plattform trackt keine Besucher oder
          IP-Adressen (100% DSGVO / TDDDG konform). Stattdessen sehen Sie hier echte, relevante
          Business-Metriken aus Ihrem System.
        </div>
      </div>
    </div>
  );
}
