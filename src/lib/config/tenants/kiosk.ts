// src/lib/config/tenants/kiosk.ts
import type { TenantConfig } from '@/types/config';
import { defaultTenantConfig } from '../defaults';

export const kioskTenant: TenantConfig = {
  ...defaultTenantConfig,
  tenantId: 'kiosk',
  url: 'https://kiosk-muster.de',
  brand: { ...defaultTenantConfig.brand, name: 'Kiosk Muster', slogan: 'Frisch. Schnell. Freundlich.', legalName: 'Kiosk Muster e.K.', primaryColor: 'green' },
  business: { type: 'kiosk', isSmallBusiness: true },
  theme: { ...defaultTenantConfig.theme, primaryColor: '#16a34a' },
  seo: { ...defaultTenantConfig.seo, defaultTitle: 'Kiosk Muster', description: 'Ihr Kiosk in Berlin.', keywords: ['kiosk', 'berlin'] },
  sections: { showHermes: true, showProducts: true, showJackpot: true },
  businessFeatures: { enableShoppingCart: true, enableAnalytics: true },
};