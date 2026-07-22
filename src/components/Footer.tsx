import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // ✅ FIX: pb-28 auf Mobile (damit die MobileActionBar nichts verdeckt), md:pb-12 auf Desktop
    // z-40 stellt sicher, dass der Footer unter der MobileActionBar (z-50) bleibt
    <footer className="bg-gray-900 text-gray-300 mt-20 pb-28 md:pb-12 relative z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 1. Brand Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <span aria-hidden="true">🍭</span> Kiosk Lollipop
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              Ihr Kiosk und Hermes Paketshop in Erftstadt-Liblar.
            </p>
            <p className="text-sm text-gray-400">Mo - Sa für Sie geöffnet.</p>
          </div>

          {/* 2. Links Section (Rechtliches + Intern) */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/impressum"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1"
                >
                  Datenschutz
                </Link>
              </li>

              {/* ✅ PROAKTIV WIEDERHERGESTELLT: Diskreter, aber für Mitarbeiter leicht auffindbarer Login-Link */}
              <li className="pt-3 border-t border-gray-800 mt-3">
                <Link
                  href="/intern"
                  className="text-gray-500 hover:text-pink-400 transition-colors text-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1"
                  aria-label="Zum Mitarbeiter-Login"
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
                  Mitarbeiter-Login
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Services Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
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
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-4">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📍</span>
                <span>
                  Theodor-Heuss-Str. 35
                  <br />
                  <span className="ml-6">50374 Erftstadt</span>
                </span>
              </li>
              <li>
                {/* ✅ FIX: Telefonnummer klickbar für maximale mobile Conversion */}
                <a
                  href="tel:+4922359291160"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1"
                  aria-label="Kiosk Lollipop telefonisch kontaktieren"
                >
                  <span aria-hidden="true">📞</span> 02235 9291160
                </a>
              </li>
            </ul>

            <a
              href="https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
              aria-label="Besuchen Sie uns auf Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium">Folge uns auf Facebook</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Kiosk Lollipop. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
