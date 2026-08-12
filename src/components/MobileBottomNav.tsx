'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Route } from 'next';
import {
  HomeIcon,
  BellIcon,
  PhoneIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BellIcon as BellIconSolid,
  PhoneIcon as PhoneIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from '@heroicons/react/24/solid';

// ✅ ZERO-DEFECT: Zentralisierte Navigation-Items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, iconSolid: HomeIconSolid },
  { id: 'notfall', label: 'Notfall', icon: BellIcon, iconSolid: BellIconSolid },
  { id: 'betrieb', label: 'Betrieb', icon: PhoneIcon, iconSolid: PhoneIconSolid },
  { id: 'lieferanten', label: 'Lieferanten', icon: UserIcon, iconSolid: UserIconSolid },
  {
    id: 'einstellungen',
    label: 'Einstellungen',
    icon: Cog6ToothIcon,
    iconSolid: Cog6ToothIconSolid,
  },
] as const;

type TabId = (typeof navItems)[number]['id'];

/**
 * ✅ ZERO-DEFECT: Type-sichere URL-Konstruktion für typedRoutes
 *
 * Baut einen typisierten Route-String für `/admin?tab=xxx`.
 * Vermeidet den TypeScript-Fehler "RouteImpl<string>" durch expliziten Route-Cast.
 */
function buildAdminRoute(tabId: TabId): Route {
  // Dashboard hat keinen Query-Parameter (saubere URL)
  if (tabId === 'dashboard') {
    return '/admin' as Route;
  }
  return `/admin?tab=${tabId}` as Route;
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Nur im Admin-Bereich rendern
  if (!pathname?.startsWith('/admin')) return null;

  const getActiveTab = (): TabId => {
    if (typeof window === 'undefined') return 'dashboard';
    const tab = new URLSearchParams(window.location.search).get('tab') as TabId | null;
    const validTabs: TabId[] = ['dashboard', 'notfall', 'betrieb', 'lieferanten', 'einstellungen'];
    return tab && validTabs.includes(tab) ? tab : 'dashboard';
  };

  const activeTab = getActiveTab();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe"
      role="navigation"
      aria-label="Admin-Navigation"
    >
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = isActive ? item.iconSolid : item.icon;
          const route = buildAdminRoute(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(route)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`${item.label}${isActive ? ' (aktiv)' : ''}`}
              className={`flex flex-col items-center justify-center gap-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-inset ${
                isActive
                  ? 'text-[var(--theme-primary)] dark:text-[var(--theme-primary)]'
                  : 'text-gray-500 dark:text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-6 h-6" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
