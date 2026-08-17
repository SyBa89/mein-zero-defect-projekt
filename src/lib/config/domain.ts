// src/lib/config/domain.ts
export type DomainType = 'kiosk' | 'handwerker' | 'arzt' | 'friseur' | 'restaurant';

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
  friseur: {
    id: 'friseur',
    displayName: 'Friseur Salon',
    redisKeys: {
      dailyRevenue: (date: string) => `friseur:revenue:${date}`,
      tasks: 'friseur:appointments',
      contacts: 'friseur:clients',
    },
  },
  restaurant: {
    id: 'restaurant',
    displayName: 'Restaurant System',
    redisKeys: {
      dailyRevenue: (date: string) => `restaurant:revenue:${date}`,
      tasks: 'restaurant:orders',
      contacts: 'restaurant:guests',
    },
  },
};

// Liest die Umgebungsvariable. Standard ist Kiosk, kann aber via .env geändert werden.
const envDomain = (process.env.NEXT_PUBLIC_DOMAIN_TYPE as DomainType) || 'kiosk';
export const CURRENT_DOMAIN = domains[envDomain];

/**
 * ZERO-DEFECT: Domain-Resolution aus Host-Header
 * Ermöglicht Multi-Tenant basierend auf Subdomain/Domain
 */
export function getDomainFromHost(host: string | null): DomainType {
  if (!host) return 'kiosk'; // Fallback
  
  const h = host.toLowerCase();
  
  // Subdomain-basierte Resolution
  if (h.includes('handwerk') || h.includes('handwerker')) return 'handwerker';
  if (h.includes('arzt') || h.includes('praxis')) return 'arzt';
  if (h.includes('friseur') || h.includes('salon')) return 'friseur';
  if (h.includes('restaurant') || h.includes('bistro') || h.includes('cafe')) return 'restaurant';
  
  // Fallback: Kiosk
  return 'kiosk';
}

/**
 * Helper: Aktuelle Domain aus Request-Context holen
 */
export function getCurrentDomain(): DomainType {
  // Client-Side: window.location.host
  // Server-Side: headers().get('host')
  if (typeof window !== 'undefined') {
    return getDomainFromHost(window.location.host);
  }
  // Server-Side Fallback: ENV-Variable
  return (process.env.NEXT_PUBLIC_DOMAIN_TYPE as DomainType) || 'kiosk';
}
