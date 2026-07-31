'use client';

import Link from 'next/link';
import { CLIENT_CONFIG } from '@/lib/client.config';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { brand, contact } = CLIENT_CONFIG;

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Spalte 1: Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">{brand.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{brand.slogan}</p>
            <p className="text-xs text-gray-500">Mo - Sa für Sie geöffnet.</p>
          </div>

          {/* Spalte 2: Rechtliches */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Rechtliches
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-sm hover:text-pink-400 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm hover:text-pink-400 transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>📦 Hermes Paketshop</li>
              <li>🎫 Lotto & Rubbellose</li>
              <li>📱 Handy-Guthaben</li>
              <li>💳 Geld abheben</li>
            </ul>
          </div>

          {/* Spalte 4: Kontakt */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Kontakt
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  {contact.address.street}, {contact.address.zip} {contact.address.city}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href={`tel:${contact.phone}`} className="hover:text-pink-400 transition-colors">
                  {contact.phone.replace('+49', '0').replace(/(\d{4})(\d{7})/, '$1 $2')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-pink-400 transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {currentYear} {brand.name}. Alle Rechte vorbehalten.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 md:mt-0 text-xs text-gray-500 hover:text-pink-400 transition-colors flex items-center gap-1"
          >
            Nach oben ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
