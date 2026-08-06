'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { validateClientConfig } from '../lib/schemas/client-config.schema';
import type { ClientConfig } from '../lib/schemas/client-config.schema';
import { CLIENT_CONFIG as FALLBACK_CONFIG } from '../lib/client.config';

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

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ClientConfig>(FALLBACK_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(function () {
    let mounted = true;

    async function loadConfig() {
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
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error('ConfigProvider: Failed to load config, using fallback:', errorMessage);
          setError(err instanceof Error ? err : new Error(errorMessage));
          setConfig(FALLBACK_CONFIG);
          setIsLoading(false);
        }
      }
    }

    loadConfig();

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
