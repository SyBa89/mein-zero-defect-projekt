'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Kiosk Lollipop Logo"
              width={48}
              height={48}
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Kiosk Lollipop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Startseite
            </Link>
            <Link
              href="/#produkte"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Produkte
            </Link>
            <Link
              href="/#ueber-uns"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü öffnen"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="block py-3 px-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Startseite
              </Link>
              <Link
                href="/#produkte"
                className="block py-3 px-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Produkte
              </Link>
              <Link
                href="/#ueber-uns"
                className="block py-3 px-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Über uns
              </Link>
              <Link
                href="/kontakt"
                className="block py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
