// src/lib/config/tenants/medical.ts
import type { TenantConfig } from '@/types/config';
import { defaultTenantConfig } from '../defaults';

export const medicalTenant: TenantConfig = {
  ...defaultTenantConfig,
  tenantId: 'medical',
  url: 'https://praxis-example.de',
  brand: { ...defaultTenantConfig.brand, name: 'Praxis Dr. Muster', slogan: 'Ihre Gesundheit in besten Händen.', legalName: 'Dr. med. Max Muster', primaryColor: 'blue' },
  business: { type: 'arzt', isSmallBusiness: true },
  theme: { ...defaultTenantConfig.theme, primaryColor: '#0284c7' },
  seo: { ...defaultTenantConfig.seo, defaultTitle: 'Praxis Dr. Muster', description: 'Ihre Hausarztpraxis in München.', keywords: ['arzt', 'praxis', 'münchen'] },
  businessFeatures: { enablePatientLogin: true, enableBookingSystem: true },
};