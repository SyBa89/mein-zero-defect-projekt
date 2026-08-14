// src/lib/config/tenants/friseur.ts
// ✅ ZERO-DEFECT: Vollständige Friseur-Tenant-Config (White-Label-Demo)
// Nutzt ausschließlich Felder aus TenantConfig (siehe defaults.ts) - kein Type-Risiko
import type { TenantConfig } from '@/types/config';
import { defaultTenantConfig } from '../defaults';

export const friseurTenant: TenantConfig = {
  ...defaultTenantConfig,
  tenantId: 'friseur',
  url: 'https://friseur-muster.de',
  brand: {
    ...defaultTenantConfig.brand,
    name: 'Friseur Muster',
    slogan: 'Stil. Handwerk. Persönlichkeit.',
    legalName: 'Friseur Muster GmbH',
    primaryColor: 'purple',
  },
  contact: {
    address: { street: 'Hauptstraße 12', zip: '10827', city: 'Berlin', country: 'DE' },
    phone: '+49 30 55512345',
    email: 'termin@friseur-muster.de',
    mapsUrl: 'https://maps.google.com/?q=Hauptstra%C3%9Fe+12+Berlin',
    googlePlaceId: null,
  },
  business: { type: 'friseur', isSmallBusiness: true },
  theme: {
    ...defaultTenantConfig.theme,
    primaryColor: '#9333ea',
    accentColor: '#f0abfc',
  },
  seo: {
    ...defaultTenantConfig.seo,
    defaultTitle: 'Friseur Muster – Ihr Salon in Berlin',
    defaultDescription:
      'Friseur Muster in Berlin: Präzise Haarschnitte, moderne Farben & persönliche Beratung. Jetzt Termin sichern.',
    description: 'Friseur Muster in Berlin: Präzise Haarschnitte, moderne Farben & persönliche Beratung.',
    keywords: ['friseur', 'salon', 'berlin', 'haarschnitt', 'balayage'],
  },
  hero: {
    headline: 'Ihr Stil. Unser Handwerk.',
    subheadline: 'Moderne Haarschnitte, Color & Styling – persönlich beraten in Berlin.',
    primaryCta: { label: 'Termin anfragen', href: '/kontakt' },
    secondaryCta: { label: 'Unsere Leistungen', href: '#services' },
    emoji: '💇‍♀️',
  },
  features: [
    { icon: '✂️', title: 'Präzisionsschnitt', description: 'Klassisch bis modern – exakt auf Sie zugeschnitten.' },
    { icon: '🎨', title: 'Color & Balayage', description: 'Moderne Färbetechniken mit hochwertigen Produkten.' },
    { icon: '💆', title: 'Styling & Finish', description: 'Vom Business-Look bis zum Event-Styling.' },
    { icon: '🧔', title: 'Bart-Pflege', description: 'Konturen, Pflege & heiße Kompresse.' },
  ],
  featuresMeta: {
    sectionTitle: 'Unsere Leistungen',
    sectionSubtitle: 'Handwerk trifft Persönlichkeit – für Damen, Herren & Kids.',
  },
  services: [
    { id: 'cut', icon: '✂️', title: 'Damen-Haarschnitt', description: 'Beratung, Waschen, Schnitt & Finish – ab 45 €' },
    { id: 'cut-men', icon: '💈', title: 'Herren-Haarschnitt', description: 'Präziser Schnitt inkl. Styling – ab 25 €' },
    { id: 'color', icon: '🎨', title: 'Coloration & Balayage', description: 'Individuelle Farbberatung – ab 70 €' },
    { id: 'beard', icon: '🧔', title: 'Bart-Schnitt & Pflege', description: 'Konturen & Pflege – ab 15 €' },
  ],
  extraServices: [
    { icon: '📅', title: 'Termin-Service', sub: 'Online & telefonisch' },
    { icon: '🌿', title: 'Vegane Produkte', sub: 'Auf Wunsch' },
    { icon: '☕', title: 'Kaffee & Getränke', sub: 'Während des Termins' },
  ],
  sections: { showHermes: false, showProducts: false, showJackpot: false },
  hermes: { enabled: false, description: '' },
  products: { categories: [] },
  openingHours: {
    items: [
      { day: 'Montag', hours: 'Geschlossen', isOpen: false },
      { day: 'Dienstag', hours: '09:00–18:00', isOpen: true },
      { day: 'Mittwoch', hours: '09:00–18:00', isOpen: true },
      { day: 'Donnerstag', hours: '09:00–19:00', isOpen: true },
      { day: 'Freitag', hours: '09:00–19:00', isOpen: true },
      { day: 'Samstag', hours: '08:00–14:00', isOpen: true },
      { day: 'Sonntag', hours: 'Geschlossen', isOpen: false },
    ],
    showSection: true,
    emergencyMessage: null,
  },
  about: {
    sectionTitle: 'Über uns',
    introText: 'Friseur Muster – Ihr Salon für Handwerk mit Persönlichkeit in Berlin.',
    mainDescription:
      'Seit 2015 stehen wir für präzise Haarschnitte, moderne Farbtechniken und ehrliche Beratung. Bei uns bekommen Sie keine Massenabfertigung, sondern einen Termin, der sich um Sie dreht – mit Zeit für Beratung, Kaffee und ein gutes Gespräch.',
  },
  faq: [
    {
      question: 'Brauche ich einen Termin?',
      answer:
        'Wir arbeiten mit Terminen, um Wartezeiten zu vermeiden. Spontane Besuche sind möglich, wenn es die Auslastung erlaubt.',
    },
    { question: 'Wie kann ich bezahlen?', answer: 'Bar, EC-Karte und kontaktlos (Apple Pay, Google Pay).' },
    { question: 'Beraten Sie auch bei Haarproblemen?', answer: 'Ja – wir analysieren Haar & Kopfhaut und empfehlen passende Pflege.' },
  ],
  reviews: null,
  brands: null,
  social: null,
  tracking: { enabled: false },
  banners: { showJackpot: false, showEmergency: true },
  businessFeatures: { enableShoppingCart: false, enableAnalytics: false },
};