import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">🍭 Kiosk Lollipop</h3>
            <p className="text-sm text-gray-400 mb-2">
              Ihr Kiosk und Hermes Paketshop in Erftstadt-Liblar.
            </p>
            <p className="text-sm text-gray-400">Täglich für Sie geöffnet (außer sonntags).</p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/intern"
                  className="text-gray-600 hover:text-gray-400 transition-colors text-xs"
                >
                  Mitarbeiter-Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li> Hermes Paketshop</li>
              <li>🎫 Lotto & Rubbellose</li>
              <li>📱 Handy-Guthaben</li>
              <li>💳 Geld abheben</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-4">
              <li>📍 Theodor-Heuss-Str. 35</li>
              <li className="ml-6">50374 Erftstadt</li>
              <li>📞 02235 9291160</li>
            </ul>
            <a
              href="https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm">Folge uns auf Facebook</span>
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
