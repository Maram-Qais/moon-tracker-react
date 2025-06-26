/**
 
 * Responsive navigation bar:
 * - Shows logo and links to Home, Calendar, and Phases pages
 * - Supports Arabic/English language switching (RTL/LTR layout)
 * - Mobile menu with toggle animation and outside click detection
 */

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moonlogo from '../assets/cele.png';

export default function Navbar() {
  // Get translation function and language data
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  // State to handle mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Ref to detect clicks outside the menu (for closing it)
  const menuRef = useRef(null);

  // Get current route (used to close menu on route change)
  const location = useLocation();

  // Effect: close menu if user clicks outside it
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Effect: close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  // Mobile menu animation helpers (based on current language direction)
  const slideOffset = isRTL ? '-translate-x-4' : 'translate-x-4';
  const originClass = isRTL ? 'origin-top-left' : 'origin-top-right';

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 h-16 border-b border-purple-400/20 backdrop-blur-md bg-black/20 text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-full">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={moonlogo} alt="logo" className="w-12 h-12 object-contain" />
        </NavLink>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {['home','calendar','phases'].map(key => (
            <NavLink
              key={key}
              to={ key === 'home' ? '/' : `/${key}` }
              className={({ isActive }) =>
                `hover:text-purple-300 transition-all ${
                  isActive ? 'text-purple-400 font-bold' : ''
                }`
              }
            >
              {t(key)}
            </NavLink>
          ))}
        </div>

        {/* MOBILE MENU BUTTON + MENU CONTENT */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            className="text-2xl focus:outline-none"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          {/* BACKDROP OVERLAY (closes menu on click) */}
          <div
            className={`
              fixed inset-0 bg-black/50 transition-opacity duration-300
              ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
            onClick={() => setMenuOpen(false)}
          />

          {/* MOBILE MENU PANEL */}
          <div
            className={`
              absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2
              w-56 bg-black backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50
              transform transition ease-out duration-300 ${originClass}
              ${menuOpen
                ? 'opacity-100 scale-100 translate-x-0'
                : `opacity-0 scale-95 ${slideOffset} pointer-events-none`
              }
            `}
          >
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 border-b border-purple-500/20 hover:bg-purple-600/30"
            >
              {t('home')}
            </NavLink>
            <NavLink
              to="/calendar"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 border-b border-purple-500/20 hover:bg-purple-600/30"
            >
              {t('calendar')}
            </NavLink>
            <NavLink
              to="/phases"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 hover:bg-purple-600/30"
            >
              {t('phases')}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
