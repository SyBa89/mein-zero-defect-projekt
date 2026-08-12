'use client';

import { useMemo } from 'react';
import { useConfig } from '@/contexts/ConfigContext';

function formatPhoneForDisplay(phone: string): string {
  if (!phone) return '';
  return phone.replace(/(\+\d{2})\s?(\d{3,4})\s?(\d{4,8})/, '$1 $2 $3').trim() || phone;
}

interface ActionItem {
  id: string;
  label: string;
  ariaLabel: string;
  href: string;
  className: string;
  icon: string;
  isExternal?: boolean;
}

export function MobileActionBar() {
  const config = useConfig();
  const contact = config.contact;
  const uiFeatures = config.uiFeatures;

  // ✅ ZERO-DEFECT: useMemo IMMER vor early return (Rules of Hooks)
  const phoneFormatted = useMemo(
    () => formatPhoneForDisplay(contact?.phone || ''),
    [contact?.phone]
  );

  // Early return NACH allen Hooks
  if (!uiFeatures?.showMobileActionBar) return null;

  const actions: ActionItem[] = [
    contact?.phone && {
      id: 'call',
      label: '📞 Anrufen',
      ariaLabel: `Jetzt anrufen: ${phoneFormatted}`,
      href: `tel:${contact.phone.replace(/\s/g, '')}`,
      className: 'bg-[var(--theme-primary)] hover:opacity-90 text-white',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    contact?.mapsUrl && {
      id: 'route',
      label: '🗺️ Route',
      ariaLabel: 'Route in Google Maps öffnen',
      href: contact.mapsUrl,
      className: 'bg-[var(--theme-secondary)] hover:opacity-90 text-white',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      isExternal: true,
    },
    {
      id: 'contact',
      label: '✉️ Kontakt',
      ariaLabel: 'Kontaktseite öffnen',
      href: '/kontakt',
      className: 'bg-[var(--theme-accent)] hover:opacity-90 text-white',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
  ].filter((a): a is ActionItem => Boolean(a));

  if (actions.length === 0) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 md:hidden"
      aria-label="Schnellkontakt-Leiste"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-around gap-3">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            target={action.isExternal ? '_blank' : undefined}
            rel={action.isExternal ? 'noopener noreferrer' : undefined}
            aria-label={action.ariaLabel}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-primary)] ${action.className}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
            </svg>
            <span className="text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">{action.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

export default MobileActionBar;