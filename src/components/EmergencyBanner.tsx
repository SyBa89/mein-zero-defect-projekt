'use client';

import { useState, useEffect } from 'react';

interface SiteConfig {
  isClosed: boolean;
  bannerText: string;
  emergencyMessage: string;
  updatedAt: string;
}

export default function EmergencyBanner() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    loadConfig();
    const interval = setInterval(loadConfig, 30000); // Alle 30s aktualisieren
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;

  if (config?.isClosed) {
    return (
      <div className="bg-red-600 text-white px-4 py-3 text-center">
        <p className="font-bold text-lg">🚨 GESCHLOSSEN</p>
        {config.emergencyMessage && <p className="text-sm mt-1">{config.emergencyMessage}</p>}
      </div>
    );
  }

  if (config?.bannerText) {
    return (
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 text-center">
        <p className="font-bold">{config.bannerText}</p>
      </div>
    );
  }

  return null;
}
