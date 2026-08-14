import Link from 'next/link';
import { getTenantConfig } from '@/lib/config-loader';

export default function NotFound() {
  const config = getTenantConfig();
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4"
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-lg w-full text-center">
        <p className="text-8xl font-black bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] bg-clip-text text-transparent" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Seite nicht gefunden</h1>
        <p className="mt-4 text-gray-600">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <p className="mt-4 text-gray-600">
          Kontaktieren Sie {config.brand.name}:{' '}
          <a 
            href={`tel:${config.contact.phone}`} 
            className="text-theme-primary font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-theme-primary"
          >
            {config.contact.phoneDisplay || config.contact.phone}
          </a>
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-theme-primary hover:brightness-110 text-white font-semibold rounded-[var(--theme-radius)] transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary"
          >
            ← Zur Startseite
          </Link>
          <Link
            href="/kontakt"
            className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-theme-primary text-gray-700 font-semibold rounded-[var(--theme-radius)] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </div>
  );
}