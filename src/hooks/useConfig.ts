// src/hooks/useConfig.ts
'use client';

import { useState, useEffect } from 'react';
import { SiteConfig, DEFAULT_CONFIG } from '@/types/config';

export function useConfig() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  const loadConfig = async () => {
    try {
      const res = await fetch('/api/admin/config');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error loading config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async (newConfig: Partial<SiteConfig>) => {
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': localStorage.getItem('admin-password') || '',
        },
        body: JSON.stringify({ ...config, ...newConfig }),
      });
      if (res.ok) {
        const data = await res.json();
        setConfig(data.config);
        return { success: true };
      }
      return { success: false, error: 'Fehler beim Speichern' };
    } catch {
      return { success: false, error: 'Verbindungsfehler' };
    }
  };

  useEffect(() => {
    loadConfig();
    const interval = setInterval(loadConfig, 30000);
    return () => clearInterval(interval);
  }, []);

  return { config, isLoading, loadConfig, saveConfig };
}