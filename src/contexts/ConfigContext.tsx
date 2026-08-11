// src/contexts/ConfigContext.tsx
'use client';

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { TenantConfig } from '@/types/config';

const ConfigContext = createContext<TenantConfig | null>(null);

export interface ConfigProviderProps {
  children: ReactNode;
  initialConfig: TenantConfig;
}

export function ConfigProvider({ children, initialConfig }: ConfigProviderProps) {
  return <ConfigContext.Provider value={initialConfig}>{children}</ConfigContext.Provider>;
}

export function useConfig(): TenantConfig {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error('[Zero-Defect] useConfig() muss innerhalb eines <ConfigProvider> verwendet werden.');
  }
  return ctx;
}

// ✅ ZERO-DEFECT: Kompatibilitäts-Hook für bestehende Komponenten.
// Funktioniert für BEIDE Nutzungsmuster:
//   const config = useConfigState()        ODER
//   const { config } = useConfigState()
export type ConfigState = TenantConfig & { config: TenantConfig; isLoading: boolean };

export function useConfigState(): ConfigState {
  const config = useConfig();
  return useMemo(
    () => Object.assign({}, config, { config, isLoading: false }),
    [config]
  );
}