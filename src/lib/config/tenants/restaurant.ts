// src/lib/config/tenants/restaurant.ts
import type { TenantConfig } from '@/types/config';
import { defaultTenantConfig } from '../defaults';

export const restaurantTenant: TenantConfig = {
  ...defaultTenantConfig,
  tenantId: 'restaurant',
  url: 'https://restaurant-muster.de',
  brand: { ...defaultTenantConfig.brand, name: 'Restaurant Muster', slogan: 'Genuss. Atmosphäre. Gastfreundschaft.', legalName: 'Restaurant Muster GmbH', primaryColor: 'orange' },
  business: { type: 'restaurant', isSmallBusiness: false },
  theme: { ...defaultTenantConfig.theme, primaryColor: '#ea580c' },
  seo: { ...defaultTenantConfig.seo, defaultTitle: 'Restaurant Muster', description: 'Gute Küche in Berlin.', keywords: ['restaurant', 'berlin', 'essen'] },
  sections: { showHermes: false, showProducts: true, showJackpot: false },
  businessFeatures: { enableShoppingCart: false, enableAnalytics: true },
};