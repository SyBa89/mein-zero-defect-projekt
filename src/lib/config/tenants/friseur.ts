// src/lib/config/tenants/friseur.ts
import type { TenantConfig } from '@/types/config';
import { defaultTenantConfig } from '../defaults';

export const friseurTenant: TenantConfig = {
  ...defaultTenantConfig,
  tenantId: 'friseur',
  url: 'https://friseur-muster.de',
  brand: { ...defaultTenantConfig.brand, name: 'Friseur Muster', slogan: 'Stil. Handwerk. Persönlichkeit.', legalName: 'Friseur Muster GmbH', primaryColor: 'purple' },
  business: { type: 'friseur', isSmallBusiness: true },
  theme: { ...defaultTenantConfig.theme, primaryColor: '#9333ea' },
  seo: { ...defaultTenantConfig.seo, defaultTitle: 'Friseur Muster', description: 'Ihr Friseur-Salon in Berlin.', keywords: ['friseur', 'salon', 'berlin'] },
  sections: { showHermes: false, showProducts: false, showJackpot: false },
  businessFeatures: { enableShoppingCart: false, enableAnalytics: true },
};