'use client';

import { usePathname, useRouter } from 'next/navigation';
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

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, iconSolid: HomeIconSolid, path: '/admin' },
  {
    id: 'notfall',
    label: 'Notfall',
    icon: BellIcon,
    iconSolid: BellIconSolid,
    path: '/admin?tab=notfall',
  },
  {
    id: 'betrieb',
    label: 'Betrieb',
    icon: PhoneIcon,
    iconSolid: PhoneIconSolid,
    path: '/admin?tab=betrieb',
  },
  {
    id: 'lieferanten',
    label: 'Lieferanten',
    icon: UserIcon,
    iconSolid: UserIconSolid,
    path: '/admin?tab=lieferanten',
  },
  {
    id: 'einstellungen',
    label: 'Einstellungen',
    icon: Cog6ToothIcon,
    iconSolid: Cog6ToothIconSolid,
    path: '/admin?tab=einstellungen',
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname?.startsWith('/admin')) return null;

  const getActiveTab = () => {
    if (typeof window === 'undefined') return 'dashboard';
    const tab = new URLSearchParams(window.location.search).get('tab');
    return tab || 'dashboard';
  };

  const activeTab = getActiveTab();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id || (item.id === 'dashboard' && !activeTab);
          const Icon = isActive ? item.iconSolid : item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set('tab', item.id);
                router.push(url.pathname + url.search);
              }}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? 'text-pink-600 dark:text-pink-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
