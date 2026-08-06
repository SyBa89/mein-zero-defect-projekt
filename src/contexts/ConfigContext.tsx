'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { validateClientConfig } from '../lib/schemas/client-config.schema';
import type { ClientConfig } from '../lib/schemas/client-config.schema';

export type { ClientConfig };

// ═══════════════════════════════════════════════════════════════
// ConfigContext — Single Source of Truth für Client Components
// ═══════════════════════════════════════════════════════════════

interface ConfigContextType {
  config: ClientConfig;
  isLoading: boolean;
  error: Error | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// ═══════════════════════════════════════════════════════════════
// ConfigProvider — Wrappt die gesamte App
// ═══════════════════════════════════════════════════════════════
// ✅ ZERO-DEFECT: initialConfig Prop für Hydration-Safety
//
// Warum initialConfig?
// - Server rendert mit getClientConfig() (kiosk.json)
// - Client MUSS mit derselben Config hydraten (kein Mismatch!)
// - initialConfig wird vom Server übergeben (layout.tsx)
// - Danach optionaler Refresh vom /api/client-config für Live-Updates

interface ConfigProviderProps {
  children: React.ReactNode;
  initialConfig: ClientConfig; // ✅ REQUIRED: Server-rendered config
}

export function ConfigProvider({ children, initialConfig }: ConfigProviderProps) {
  // ✅ ZERO-DEFECT: Initial state = Server state (kein Hydration-Mismatch!)
  const [config, setConfig] = useState<ClientConfig>(initialConfig);
  const [isLoading, setIsLoading] = useState(false); // ✅ false! Wir haben schon Config
  const [error, setError] = useState<Error | null>(null);

  useEffect(function () {
    let mounted = true;

    async function refreshConfig() {
      try {
        const response = await fetch('/api/client-config', {
          cache: 'force-cache',
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }

        const data = await response.json();
        const validated = validateClientConfig(data);

        if (mounted) {
          setConfig(validated);
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error('ConfigProvider: Failed to refresh config, keeping initial:', errorMessage);
          setError(err instanceof Error ? err : new Error(errorMessage));
          // ✅ KEIN Fallback auf client.config.ts - wir behalten initialConfig
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    // ✅ Optional refresh für Live-Updates (nicht kritisch für erste Render)
    refreshConfig();

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <ConfigContext.Provider value={{ config, isLoading, error }}>{children}</ConfigContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════
// useConfig — Hook für Client Components
// ═══════════════════════════════════════════════════════════════

export function useConfig(): ClientConfig {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  return context.config;
}

// ═══════════════════════════════════════════════════════════════
// useConfigState — Hook für Loading/Error States
// ═══════════════════════════════════════════════════════════════

export function useConfigState(): { isLoading: boolean; error: Error | null } {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error('useConfigState must be used within a ConfigProvider');
  }

  return { isLoading: context.isLoading, error: context.error };
}
