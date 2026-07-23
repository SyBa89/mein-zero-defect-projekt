// src/app/admin/dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const [stats, setStats] = useState({ visits: 0, contacts: 0, calls: 0, lastUpdate: '', isClosed: false });

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/admin/stats').then(r => r.json()).then(setStats);
    }
  }, [isAuthenticated]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Lade...</div>;
  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Zugriff verweigert</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8">📊 Admin-Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Besucher (heute)</p><p className="text-2xl font-bold text-gray-900">{stats.visits}</p></div>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl">👥</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Kontaktanfragen</p><p className="text-2xl font-bold text-gray-900">{stats.contacts}</p></div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">✉️</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">Anrufe (klick)</p><p className="text-2xl font-bold text-gray-900">{stats.calls}</p></div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">📞</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}