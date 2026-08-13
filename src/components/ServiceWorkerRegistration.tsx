'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/logger';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    const registerSW = () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          logger.log('[SW] Registered:', registration.scope);
        })
        .catch((error) => {
          logger.warn('[SW] Registration failed:', error);
        });
    };

    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }
  }, []);

  return null;
}