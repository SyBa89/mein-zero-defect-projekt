'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍭</span>
            <span className="text-xl font-bold text-pink-600 tracking-tight">Kiosk Lollipop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Home
            </Link>
            <a
              href="#produkte"
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Produkte
            </a>
            <a
              href="#ueber-uns"
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Über uns
            </a>
            <Link
              href="/kontakt"
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            aria-label="Menü öffnen"
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
          <div className="md:hidden pb-4">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-3 rounded-md transition-colors"
            >
              Home
            </Link>
            <a
              href="#produkte"
              className="block py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-3 rounded-md transition-colors"
            >
              Produkte
            </a>
            <a
              href="#ueber-uns"
              className="block py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-3 rounded-md transition-colors"
            >
              Über uns
            </a>
            <Link
              href="/kontakt"
              className="block py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-3 rounded-md transition-colors"
            >
              Kontakt
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
