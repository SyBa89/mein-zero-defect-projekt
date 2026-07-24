'use client';

import useSWR from 'swr';
import { SkeletonLoader } from './SkeletonLoader';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DashboardData {
  today: string;
  revenue: number;
  openTasks: number;
  totalContacts: number;
  lastWeekRevenue: number[];
}

export function DashboardStats() {
  const { data, error, isLoading } = useSWR<DashboardData>('/api/admin/dashboard', fetcher, {
    refreshInterval: 30000, // Alle 30 Sekunden automatisch aktualisieren
  });

  if (isLoading) return <SkeletonLoader />;
  if (error || !data) return <p className="text-red-500">Fehler beim Laden des Dashboards</p>;

  const maxRevenue = Math.max(...data.lastWeekRevenue, 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Heutiger Umsatz</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            €{data.revenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Offene Aufgaben</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.openTasks}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Kontakte</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.totalContacts}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Datum</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.today}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Umsatz der letzten 7 Tage
        </h3>
        <div className="flex items-end gap-2 h-32">
          {data.lastWeekRevenue.map((value, index) => {
            const height = (value / maxRevenue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div
                  className="w-full bg-pink-100 dark:bg-pink-900/30 rounded-t-lg transition-all duration-300 group-hover:bg-pink-200 dark:group-hover:bg-pink-800/50"
                  style={{ height: `${Math.max(height, 4)}%` }}
                >
                  <div
                    className="w-full bg-pink-500 dark:bg-pink-400 rounded-t-lg transition-all duration-300"
                    style={{ height: '100%' }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {value > 0 ? `€${value.toFixed(0)}` : '-'}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">-{6 - index}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
