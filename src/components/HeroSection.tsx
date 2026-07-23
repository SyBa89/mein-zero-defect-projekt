import Image from 'next/image';
import Link from 'next/link';
import { KIOSK_CONFIG } from '@/lib/config';

export default function HeroSection() {
  return (
    <section
      id="main-content"
      className="relative h-[85dvh] min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <Image
        src="/images/fassade.png"
        alt={`${KIOSK_CONFIG.name} Fassade am Bürgerplatz in Erftstadt-Liblar`}
        fill
        className="object-cover"
        priority
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_10%,rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
          Willkommen bei <br />
          <span className="text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
            {KIOSK_CONFIG.name}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-100 mb-4 drop-shadow-xl font-light">
          Ihr Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar
        </p>
        <a
          href={KIOSK_CONFIG.phoneHref}
          className="inline-flex items-center justify-center gap-2 text-lg text-gray-100 hover:text-white transition-colors mb-10 drop-shadow-xl group"
          aria-label={`Kiosk anrufen: ${KIOSK_CONFIG.phoneDisplay}`}
        >
          <svg
            className="w-5 h-5 group-hover:text-pink-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="underline decoration-pink-400/50 underline-offset-4 group-hover:decoration-pink-400">
            {KIOSK_CONFIG.phoneDisplay}
          </span>
        </a>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <a
            href={KIOSK_CONFIG.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Route zum Kiosk mit Google Maps planen"
            className="inline-flex items-center justify-center gap-3 bg-white/90 backdrop-blur-md hover:bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-pink-500/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Jetzt besuchen
          </a>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Nachricht senden
          </Link>
        </div>
      </div>
    </section>
  );
}
