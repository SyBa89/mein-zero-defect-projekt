'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-orange-600 tracking-tight hover:text-orange-700 transition-colors"
            >
              🍭 Kiosk Lollipop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/#produkte"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Produkte
            </Link>
            <Link
              href="/#ueber-uns"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Kontakt
            </Link>
          </nav>

          {/* Öffnungszeiten Badge (Desktop) */}
          <div className="hidden md:flex">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium text-sm">
              🕐 Täglich geöffnet
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-orange-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#produkte"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produkte
              </Link>
              <Link
                href="/#ueber-uns"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Über uns
              </Link>
              <Link
                href="/kontakt"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium py-2"
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
