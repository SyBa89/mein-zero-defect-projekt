'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useConfig } from '@/contexts/ConfigContext';

export default function Footer() {
  // ✅ ZERO-DEFECT: Hydration-sicheres Jahr (Server rendert null, Client setzt Jahr)
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const config = useConfig();
  const { brand, contact, features } = config;

  // ✅ ZERO-DEFECT: White-Label - Erste 4 Features für Services-Spalte
  const footerServices = features?.slice(0, 4) || [];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Spalte 1: Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">{brand.name}</h3>
            <p className="text-sm text-gray-300 mb-4">{brand.slogan}</p>
            <p className="text-xs text-gray-400">Mo - Sa für Sie geöffnet.</p>
          </div>

          {/* Spalte 2: Rechtliches */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Rechtliches
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-gray-300 hover:text-pink-400 transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-gray-300 hover:text-pink-400 transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Services (Dynamisch aus Config) */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {footerServices.length > 0 ? (
                footerServices.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <span aria-hidden="true">{service.icon}</span>
                    <span>{service.title}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Keine Services definiert</li>
              )}
            </ul>
          </div>

          {/* Spalte 4: Kontakt */}
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
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                  aria-label={`Adresse: ${contact.address.street}, ${contact.address.zip} ${contact.address.city}`}
                >
                  {contact.address.street}, {contact.address.zip} {contact.address.city}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📞</span>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                >
                  {contact.phone.replace('+49', '0').replace(/(\d{4})(\d{7})/, '$1 $2')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">✉️</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            ©{' '}
            {currentYear
              ? `${currentYear} ${brand.name}. Alle Rechte vorbehalten.`
              : `${brand.name}. Alle Rechte vorbehalten.`}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Nach oben scrollen"
            className="mt-4 md:mt-0 text-xs text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-1"
          >
            Nach oben ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
