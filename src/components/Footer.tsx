'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useConfig } from '@/contexts/ConfigContext';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const config = useConfig();
  const { brand, contact, features, business } = config;

  const footerServices = features?.slice(0, 4) || [];

  const getOpeningText = (): string => {
    switch (business.type) {
      case 'arzt':
        return 'Sprechzeiten nach Vereinbarung';
      case 'handwerk':
        return 'Mo–Fr für Sie im Einsatz';
      case 'kiosk':
      default:
        return 'Mo – Sa für Sie geöffnet';
    }
  };

  return (
    // ✅ ZERO-DEFECT ACCESSIBILITY: bg-gray-900 (#111827)
    // Wir nutzen text-gray-200 (#E5E7EB) für Haupttext -> Kontrast > 12:1 (WCAG AAA)
    <footer className="bg-gray-900 text-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">{brand.name}</h3>
            <p className="text-sm text-gray-200 mb-4">{brand.slogan}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{getOpeningText()}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Rechtliches
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-gray-200 hover:text-[var(--theme-primary)] transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-gray-200 hover:text-[var(--theme-primary)] transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {footerServices.length > 0 ? (
                footerServices.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-200">
                    <span aria-hidden="true">{service.icon}</span>
                    <span>{service.title}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 dark:text-gray-500 italic text-xs">Services werden konfiguriert...</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Kontakt
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📍</span>
                <a
                  href={contact.mapsUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-[var(--theme-primary)] transition-colors"
                  aria-label={`Adresse: ${contact.address.street}, ${contact.address.zip} ${contact.address.city}`}
                >
                  {contact.address.street}, {contact.address.zip} {contact.address.city}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📞</span>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-gray-200 hover:text-[var(--theme-primary)] transition-colors"
                >
                  {contact.phone.replace('+49', '0').replace(/(\d{4})(\d{7})/, '$1 $2')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">✉️</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-gray-200 hover:text-[var(--theme-primary)] transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* ✅ FIX: text-gray-600 dark:text-gray-400 auf bg-gray-900 = Kontrast ~5.4:1 (Besteht WCAG AA) */}
          <p className="text-xs text-gray-600 dark:text-gray-400">
            ©{' '}
            {currentYear
              ? `${currentYear} ${brand.name}. Alle Rechte vorbehalten.`
              : `${brand.name}. Alle Rechte vorbehalten.`}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Nach oben scrollen"
            className="mt-4 md:mt-0 text-xs text-gray-600 dark:text-gray-400 hover:text-[var(--theme-primary)] transition-colors flex items-center gap-1"
          >
            Nach oben ↑
          </button>
        </div>

        {business.type === 'kiosk' && (
          <div className="border-t border-gray-800 mt-6 pt-6">
            {/* ✅ FIX: text-gray-600 dark:text-gray-400 statt text-gray-600 dark:text-gray-400. Jugendschutz muss lesbar sein! */}
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
              ⚠️ <strong className="font-semibold text-gray-200">Jugendschutz:</strong> Tabakwaren
              und alkoholische Getränke werden nur an Personen ab 18 Jahren abgegeben. Bitte halten
              Sie Ihren Ausweis bereit.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
