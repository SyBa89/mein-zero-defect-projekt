import { CLIENT_CONFIG } from '@/lib/client.config';

export default function HeroSection() {
  const { brand, hero } = CLIENT_CONFIG;

  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="mb-6 text-7xl">🍭</div>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-2 font-medium">
          Willkommen bei
        </p>

        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 leading-tight">
          {brand.name}
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          {hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a11 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {hero.primaryCta.label}
          </a>

          <a
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-gray-200 dark:border-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
