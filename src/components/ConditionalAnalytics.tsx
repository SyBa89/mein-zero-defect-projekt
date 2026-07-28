'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function ConditionalAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent-v1');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.analytics) setHasConsent(true);
      } catch {}
    }
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setHasConsent(!!detail?.analytics);
    };
    window.addEventListener('cookie-consent', handler);
    return () => window.removeEventListener('cookie-consent', handler);
  }, []);

  if (!hasConsent) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
