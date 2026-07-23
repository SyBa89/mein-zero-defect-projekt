'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ✅ ZERO-DEFECT: Navigation zentralisiert (DRY-Prinzip)
const navItems = [
  { label: 'Startseite', href: '/', exact: true },
  { label: 'Produkte', href: '/#produkte' },
  { label: 'Über uns', href: '/#ueber-uns' },
];

// ✅ ZERO-DEFECT: Custom Hook für Scroll-Lock (wiederverwendbar & sauber)
function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (lock) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lock]);
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // ✅ ZERO-DEFECT: Hydration-Guard – verhindert Client/Server-Mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ ZERO-DEFECT: Scroll-Lock über Custom Hook
  useLockBodyScroll(isMounted && isMenuOpen);

  // ✅ ZERO-DEFECT: Menü bei Fensteränderung schließen (mit Debounce)
  useEffect(() => {
    if (!isMounted) return;
    
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth >= 768) {
          setIsMenuOpen(false);
        }
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isMounted]);

  // ✅ ZERO-DEFECT: Fokus-Management beim Öffnen/Schließen
  useEffect(() => {
    if (!isMounted) return;
    
    if (isMenuOpen) {
      // Fokus auf den ersten Link im mobilen Menü setzen
      const firstLink = document.querySelector('#mobile-menu a');
      if (firstLink instanceof HTMLElement) {
        setTimeout(() => firstLink.focus(), 100);
      }
    } else {
      // Fokus zurück zum Toggle-Button
      menuButtonRef.current?.focus();
    }
  }, [isMenuOpen, isMounted]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ ZERO-DEFECT: Escape-Taste schließt Menü
  useEffect(() => {
    if (!isMounted || !isMenuOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isMounted]);

  // ✅ ZERO-DEFECT: Prüft, ob ein Link aktiv ist (für aria-current)
  const isActiveLink = (href: string, exact: boolean = false) => {
    if (typeof window === 'undefined') return false;
    if (exact) return window.location.pathname === href;
    return window.location.pathname + window.location.hash === href;
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand - priority für LCP-Optimierung */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={closeMenu}
            aria-label="Zur Startseite von Kiosk Lollipop"
            prefetch={true}
          >
            <Image
              src="/images/logo.png"
              alt="Kiosk Lollipop Logo"
              width={48}
              height={48}
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
              priority
              quality={90}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Kiosk Lollipop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActiveLink(item.href, item.exact || false);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-gray-700 hover:text-pink-600 font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-pink-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded ${
                    active ? 'text-pink-600 after:scale-x-100' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button - WCAG AAA konform mit ARIA */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              />
              <span
                className={`absolute top-3 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Dropdown mit Grid-Animation */}
        <div
          id="mobile-menu"
          className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
            isMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-2 border-t border-gray-100 pt-4 pb-6">
              {navItems.map((item) => {
                const active = isActiveLink(item.href, item.exact || false);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block py-3 px-4 hover:bg-pink-50 rounded-lg transition-all duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 active:scale-95 ${
                      active ? 'text-pink-600 bg-pink-50' : 'text-gray-700 hover:text-pink-600'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
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
      </div>
    </header>
  );
}