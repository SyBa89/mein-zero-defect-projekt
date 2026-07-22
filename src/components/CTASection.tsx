import Image from 'next/image';
import Link from 'next/link';
import { KIOSK_CONFIG } from '@/app/(home)/page';

export default function CTASection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      <Image
        src="/images/fassade.png"
        alt="Hintergrund Kiosk Lollipop"
        fill
        className="object-cover opacity-10 mix-blend-overlay"
        sizes="100vw"
        quality={75}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight drop-shadow-lg">
          Besuchen Sie uns!
        </h2>
        <p className="text-2xl text-pink-100 mb-4 font-light">{KIOSK_CONFIG.address}</p>
        <p className="text-lg text-gray-300 mb-10">Wir freuen uns auf Ihren Besuch!</p>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <a
            href={KIOSK_CONFIG.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Exakte Route mit Google Maps planen"
            className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
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
            Exakte Route planen
          </a>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-500 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-pink-500/40 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
          >
            Kontaktformular
          </Link>
        </div>
      </div>
    </section>
  );
}
