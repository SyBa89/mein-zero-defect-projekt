// src/contexts/ConfigContext.tsx
'use client';

import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { TenantConfig } from '@/types/config';

const ConfigContext = createContext<TenantConfig | null>(null);

export interface ConfigProviderProps {
  children: ReactNode;
  initialConfig: TenantConfig;
}

export function ConfigProvider({ children, initialConfig }: ConfigProviderProps) {
  const [config, setConfig] = useState<TenantConfig>(initialConfig);

  // Stiller Live-Merge nach Mount (kein Skeleton-Flash, kein Layout-Shift)
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/config', { credentials: 'include', cache: 'no-store' });
        if (active && res.ok) {
          const live = (await res.json()) as TenantConfig;
          setConfig(live);
        }
      } catch {
        // Fallback: behalte statische Config
      }
    })();
    return () => { active = false; };
  }, []);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function useConfig(): TenantConfig {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('[Zero-Defect] useConfig() muss innerhalb eines <ConfigProvider> verwendet werden.');
  return ctx;
}

export type ConfigState = TenantConfig & { config: TenantConfig; isLoading: boolean };

export function useConfigState(): ConfigState {
  const config = useConfig();
  return useMemo(() => Object.assign({}, config, { config, isLoading: false }), [config]);
}