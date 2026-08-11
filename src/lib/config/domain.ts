// src/lib/config/domain.ts
export type DomainType = 'kiosk' | 'handwerker' | 'arzt';

export interface DomainConfig {
  id: DomainType;
  displayName: string;
  redisKeys: {
    dailyRevenue: (date: string) => string;
    tasks: string;
    contacts: string;
  };
}

const domains: Record<DomainType, DomainConfig> = {
  kiosk: {
    id: 'kiosk',
    displayName: 'Kiosk System',
    redisKeys: {
      dailyRevenue: (date: string) => `kiosk:revenue:${date}`,
      tasks: 'kiosk:tasks',
      contacts: 'kiosk:contacts',
    },
  },
  handwerker: {
    id: 'handwerker',
    displayName: 'Handwerker Portal',
    redisKeys: {
      dailyRevenue: (date: string) => `handwerker:invoices:${date}`,
      tasks: 'handwerker:projects',
      contacts: 'handwerker:clients',
    },
  },
  arzt: {
    id: 'arzt',
    displayName: 'Arzt Praxis',
    redisKeys: {
      dailyRevenue: (date: string) => `arzt:billing:${date}`,
      tasks: 'arzt:appointments',
      contacts: 'arzt:patients',
    },
  },
};

// Liest die Umgebungsvariable. Standard ist Kiosk, kann aber via .env auf Handwerker/Arzt geändert werden.
const envDomain = (process.env.NEXT_PUBLIC_DOMAIN_TYPE as DomainType) || 'kiosk';
export const CURRENT_DOMAIN = domains[envDomain];