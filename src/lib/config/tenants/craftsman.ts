// src/lib/config/tenants/craftsman.ts
import type { TenantConfig } from '@/types/config';
import { defaultTenantConfig } from '../defaults';

export const craftsmanTenant: TenantConfig = {
  ...defaultTenantConfig,
  tenantId: 'craftsman',
  url: 'https://handwerk-muster.de',
  brand: { ...defaultTenantConfig.brand, name: 'Handwerk Muster GmbH', slogan: 'Qualität, die man sieht.', legalName: 'Handwerk Muster GmbH', primaryColor: 'orange' },
  business: { type: 'handwerk', isSmallBusiness: false },
  theme: { ...defaultTenantConfig.theme, primaryColor: '#ea580c' },
  seo: { ...defaultTenantConfig.seo, defaultTitle: 'Handwerk Muster GmbH', description: 'Ihr Handwerksbetrieb in Köln.', keywords: ['handwerk', 'köln'] },
  businessFeatures: { enableBookingSystem: true, enableAnalytics: true },
};