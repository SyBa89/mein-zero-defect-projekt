export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Zero-Defect OS</h3>
            <p className="text-sm text-gray-400">
              Professionelle Webentwicklung mit automatischen Quality Gates und modernem Tech-Stack.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz" className="hover:text-white transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  Über uns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 kontakt@zero-defect-os.de</li>
              <li>🌐 www.zero-defect-os.de</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Zero-Defect OS. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
