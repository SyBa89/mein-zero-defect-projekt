'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Navigation zentralisiert für wartbaren Code (DRY-Prinzip)
const navItems = [
  { label: 'Startseite', href: '/' },
  { label: 'Produkte', href: '/#produkte' },
  { label: 'Über uns', href: '/#ueber-uns' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Funktion zum Schließen des Menüs nach einem Klick (Mobile UX)
  const closeMenu = () => setIsMenuOpen(false);

  // ✅ PROAKTIVER FIX: Menü automatisch schließen, wenn Fenster auf Desktop-Größe skaliert wird
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // 'md' breakpoint in Tailwind
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="w-full border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand - priority für schnelles Laden (LCP Optimierung) */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={closeMenu}
            aria-label="Zur Startseite von Kiosk Lollipop"
          >
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
          <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-pink-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button - WCAG AAA konform mit ARIA */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}
              />
              <span
                className={`absolute top-3 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Dropdown - Smooth & Accessible */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 pb-6 pt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col gap-2 border-t border-gray-100 pt-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 px-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 active:scale-95"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="block py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold text-center mt-2 shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 active:scale-95"
              onClick={closeMenu}
            >
              Kontakt
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
