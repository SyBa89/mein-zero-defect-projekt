import Link from 'next/link';
import { KIOSK_CONFIG } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ✅ ZERO-DEFECT: Prüft, ob ein Link aktiv ist (für aria-current)
  const isActiveLink = (href: string) => {
    if (typeof window === 'undefined') return false;
    // Exakter Pfad-Vergleich (ohne Hash)
    return window.location.pathname === href;
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 pb-28 md:pb-12 relative z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 1. Brand Section */}
          <div>
            <h3 id="footer-brand" className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <span aria-hidden="true">🍭</span> {KIOSK_CONFIG.name}
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              Ihr Kiosk und Hermes Paketshop in Erftstadt-Liblar.
            </p>
            <p className="text-sm text-gray-400">Mo - Sa für Sie geöffnet.</p>
          </div>

          {/* 2. Links Section (Rechtliches + Intern) */}
          <div aria-labelledby="footer-legal">
            <h3 id="footer-legal" className="text-white text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/impressum"
                  prefetch={true}
                  aria-current={isActiveLink('/impressum') ? 'page' : undefined}
                  className={`hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1 ${
                    isActiveLink('/impressum') ? 'text-pink-400' : ''
                  }`}
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  prefetch={true}
                  aria-current={isActiveLink('/datenschutz') ? 'page' : undefined}
                  className={`hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1 ${
                    isActiveLink('/datenschutz') ? 'text-pink-400' : ''
                  }`}
                >
                  Datenschutz
                </Link>
              </li>

              {/* ✅ PROAKTIV WIEDERHERGESTELLT: Diskreter, aber für Mitarbeiter leicht auffindbarer Login-Link */}
              <li className="pt-3 border-t border-gray-800 mt-3">
                <Link
                  href="/admin-login"
                  prefetch={true}
                  aria-current={isActiveLink('/intern') ? 'page' : undefined}
                  className={`text-gray-500 hover:text-pink-400 transition-colors text-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1 ${
                    isActiveLink('/intern') ? 'text-pink-400' : ''
                  }`}
                  aria-label="Zum Admin-Login"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Admin-Login
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Services Section */}
          <div aria-labelledby="footer-services">
            <h3 id="footer-services" className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span aria-hidden="true">📦</span> Hermes Paketshop
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">🎫</span> Lotto & Rubbellose
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">📱</span> Handy-Guthaben
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">💳</span> Geld abheben
              </li>
            </ul>
          </div>

          {/* 4. Contact Section */}
          <div aria-labelledby="footer-contact">
            <h3 id="footer-contact" className="text-white text-lg font-semibold mb-4">Kontakt</h3>
            <address className="not-italic text-sm text-gray-400 mb-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">📍</span>
                  <span>
                    {KIOSK_CONFIG.address}
                  </span>
                </li>
                <li>
                  <a
                    href={KIOSK_CONFIG.phoneHref}
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1"
                    aria-label={`${KIOSK_CONFIG.name} telefonisch kontaktieren`}
                  >
                    <span aria-hidden="true">📞</span> {KIOSK_CONFIG.phoneDisplay}
                  </a>
                </li>
              </ul>
            </address>

            <a
              href={KIOSK_CONFIG.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
              aria-label={`Besuchen Sie uns auf Facebook`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium">Folge uns auf Facebook</span>
            </a>

            {/* ✅ ZERO-DEFECT: Diskreter "Nach oben" Link für bessere Navigation */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1"
                aria-label="Zum Seitenanfang scrollen"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Nach oben
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} {KIOSK_CONFIG.name}. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}