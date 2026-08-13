'use client';

import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useConfig } from '@/contexts/ConfigContext';
import { logger } from '@/lib/logger';

export default function TrackingManager() {
  const config = useConfig();
  const { consent, isHydrated } = useCookieConsent();

  useEffect(() => {
    if (!isHydrated || !consent) return;

    // 1. Google Analytics laden
    if (consent.analytics && config?.tracking?.googleAnalyticsId) {
      logger.log('[TrackingManager] Initializing Google Analytics...');
      // Hier dein GA4 Script injizieren oder gtag('consent', 'update', {...}) aufrufen
    }

    // 2. Sentry laden
    if (consent.analytics && config?.tracking?.sentryDsn) {
      logger.log('[TrackingManager] Initializing Sentry Error Tracking...');
      // Hier Sentry.init() aufrufen, falls es nicht schon im Layout passiert
    }

  }, [consent, isHydrated, config]);

  return null; // Rendert kein UI
}