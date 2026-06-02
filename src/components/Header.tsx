import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 tracking-tight hover:text-blue-700 transition-colors"
            >
              Zero-Defect OS
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Über uns
            </Link>
            <Link
              href="/#features"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="/kontakt"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Kontakt
            </Link>
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex">
            <Link href="/kontakt">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                Loslegen
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
