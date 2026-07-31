import Link from 'next/link';
import { CLIENT_CONFIG } from '@/lib/client.config';

export default function Header() {
  const { brand, header } = CLIENT_CONFIG;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Name */}
          <Link href="/" className="flex items-center gap-3">
            {header.showLogo && header.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={header.logo} alt={brand.name} className="h-10 w-auto" />
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{brand.name}</h1>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Startseite
            </Link>
            <Link
              href="/#services"
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#products"
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Sortiment
            </Link>
            <Link
              href="/kontakt"
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Kontakt
            </Link>
          </nav>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
          >
            Admin Cockpit
          </Link>
        </div>
      </div>
    </header>
  );
}
