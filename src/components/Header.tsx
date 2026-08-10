import Link from 'next/link';
import { getClientConfig } from '@/lib/config-loader';

const config = getClientConfig();

// ✅ ZERO-DEFECT: Type definition with null support (PowerShell JSON compat)
type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean | null;
};

// ✅ ZERO-DEFECT: Fallback Navigation für Backward-Compatibility
const FALLBACK_NAV: NavItem[] = [
  { label: 'Startseite', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Sortiment', href: '/#products' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function Header() {
  const { brand, header } = config;

  const navigation: NavItem[] =
    header.navigation && header.navigation.length > 0 ? header.navigation : FALLBACK_NAV;

  const showAdminLink = header.showAdminLink !== false;
  const adminLabel = header.adminLabel || 'Admin Cockpit';

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Name */}
          <Link href="/" className="flex items-center gap-3">
            {header.showLogo && header.logo && (
              <img src={header.logo} alt={brand.name} className="h-10 w-auto" />
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{brand.name}</h1>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-gray-700 dark:text-gray-300 hover:text-[var(--theme-primary)] dark:hover:text-[var(--theme-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Admin Link */}
          {showAdminLink && (
            <Link
              href="/admin"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[var(--theme-primary)] hover:brightness-110 text-white rounded-lg transition-colors"
            >
              {adminLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
