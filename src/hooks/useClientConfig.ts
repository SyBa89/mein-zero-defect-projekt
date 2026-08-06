'use client';

import { useState, useEffect } from 'react';
import { validateClientConfig } from '../lib/schemas/client-config.schema';
import type { ClientConfig } from '../lib/schemas/client-config.schema';
import { CLIENT_CONFIG as FALLBACK_CONFIG } from '../lib/client.config';

export type { ClientConfig };

export function useClientConfig(): {
  config: ClientConfig;
  isLoading: boolean;
  error: Error | null;
} {
  const [config, setConfig] = useState<ClientConfig>(FALLBACK_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(function () {
    let mounted = true;

    async function loadConfig() {
      try {
        const response = await fetch('/api/config', {
          cache: 'force-cache',
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error('HTTP ' + response.status + ': ' + response.statusText);
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
          console.error('useClientConfig: Failed to fetch config, using fallback:', errorMessage);
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

  return { config, isLoading, error };
}
