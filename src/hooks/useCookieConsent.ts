'use client';

import { useState, useEffect, useCallback } from 'react';

export type ConsentPreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type CookieConsent = ConsentPreferences & {
  timestamp: string;
};

const CONSENT_KEY = 'zero-defect-cookie-consent';

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch (e) {
        console.error('[CookieConsent] Parse Error', e);
      }
    }
  }, []);

  const updateConsent = useCallback((prefs: ConsentPreferences) => {
    const newConsent: CookieConsent = {
      ...prefs,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    
    // ZERO-DEFECT: Event feuern für GTM, Sentry oder globale Skripte
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: newConsent }));
  }, []);

  const acceptAll = useCallback(() => updateConsent({ necessary: true, analytics: true, marketing: true }), [updateConsent]);
  const rejectAll = useCallback(() => updateConsent({ necessary: true, analytics: false, marketing: false }), [updateConsent]);

  return {
    consent,
    isHydrated,
    hasConsented: consent !== null,
    acceptAll,
    rejectAll,
    updateConsent,
  };
}