// src/lib/config/defaults.ts
// ✅ ZERO-DEFECT: Vollständige Default-Konfiguration (alle Pflichtfelder)

import type { TenantConfig } from '@/types/config';

export const defaultTenantConfig: TenantConfig = {
  tenantId: 'default',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
  brand: {
    name: 'Mein Zero-Defekt Projekt',
    slogan: 'Premium. Perfekt. Zuverlässig.',
    legalName: 'Musterfirma GmbH',
    primaryColor: 'blue',
  },
  contact: {
    address: { street: 'Musterstraße 1', zip: '12345', city: 'Berlin', country: 'DE' },
    phone: '+49 30 12345678',
    email: 'kontakt@example.com',
    mapsUrl: 'https://maps.google.com/?q=Berlin',
    googlePlaceId: null,
  },
  business: { type: 'kiosk', isSmallBusiness: true, vatId: null },
  seo: {
    description: 'Eine Premium-Webanwendung nach Zero-Defect-Prinzipien.',
    keywords: ['premium', 'zero-defect', 'webapp', 'nextjs'],
    defaultTitle: 'Mein Zero-Defekt Projekt',
    defaultDescription: 'Eine Premium-Webanwendung nach Zero-Defect-Prinzipien.',
  },
  theme: {
    primaryColor: '#0055ff',
    secondaryColor: '#0ea5e9',
    accentColor: '#22c55e',
    borderRadius: 'md',
    fontHeading: 'Inter',
    fontBody: 'Inter',
  },
  hero: {
    headline: 'Willkommen',
    subheadline: 'Qualität ohne Kompromisse.',
    primaryCta: { label: 'Mehr erfahren', href: '#features' },
    secondaryCta: { label: 'Kontakt', href: '/kontakt' },
    emoji: '🚀',
  },
  features: [
    { icon: '⚡', title: 'Schnell', description: 'Optimierte Ladezeiten.' },
    { icon: '🛡️', title: 'Sicher', description: 'Zero-Defect-Prinzipien.' },
  ],
  featuresMeta: { sectionTitle: 'Unsere Leistungen', sectionSubtitle: 'Qualität, die überzeugt.' },
  extraServices: [{ icon: '📞', title: 'Support', sub: 'Mo–Fr erreichbar' }],
  sections: { showHermes: false, showProducts: false, showJackpot: false },
  header: { showLogo: true, navigation: [], showAdminLink: false, adminLabel: 'Admin' },
  hermes: { enabled: false, description: '' },
  products: { categories: [] },
  faq: [],
  brands: null,
  reviews: null,
  tracking: { enabled: false },
  openingHours: {
    items: [
      { day: 'Montag', hours: '09:00–18:00', isOpen: true },
      { day: 'Dienstag', hours: '09:00–18:00', isOpen: true },
      { day: 'Mittwoch', hours: '09:00–18:00', isOpen: true },
      { day: 'Donnerstag', hours: '09:00–18:00', isOpen: true },
      { day: 'Freitag', hours: '09:00–18:00', isOpen: true },
      { day: 'Samstag', hours: '10:00–14:00', isOpen: true },
      { day: 'Sonntag', hours: 'Geschlossen', isOpen: false },
    ],
    showSection: true,
    emergencyMessage: null,
  },
  about: { introText: 'Über uns', mainDescription: 'Wir stehen für Qualität.' },
  banners: { showJackpot: false, showEmergency: true },
  social: null,
  uiFeatures: { showMobileActionBar: true, showCookieBanner: true, showDarkModeToggle: true },
  businessFeatures: { enableAnalytics: false },
  services: [
    { id: 'consulting', icon: '💼', title: 'Beratung', description: 'Professionelle Beratung.' },
  ],
};