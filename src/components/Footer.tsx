import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Theodor-Heuss-Straße 35</li>
              <li className="ml-6">50374 Erftstadt-Liblar</li>
              <li>📞 +49 2235 9291160</li>
              <li>📧 info@kiosk-lollipop.de</li>
            </ul>
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
