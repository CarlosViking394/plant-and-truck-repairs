"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE_PATHS } from '@/lib/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll events with throttling to improve performance
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine if user has scrolled enough (more than 10px) to trigger header behavior
    if (Math.abs(currentScrollY - lastScrollY) < 10) {
      return;
    }

    // Show/hide header based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down & not at the top - hide header
      setIsVisible(false);
    } else {
      // Scrolling up or at the top - show header
      setIsVisible(true);
    }

    // Apply different styling when scrolled
    setIsScrolled(currentScrollY > 20);

    // Save current position
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // Add throttling to avoid excessive calculations
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const throttledHandleScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 50);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out transform ${
        isScrolled
          ? 'bg-gradient-to-r from-gray-900/98 via-gray-900/95 to-gray-800/98 backdrop-blur-md shadow-xl py-2'
          : 'bg-gradient-to-r from-black via-gray-900 to-black py-4'
      } ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60"></div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src={IMAGE_PATHS.LOGO_SMALL}
              alt="SEQ Mobile Plant & Truck Repairs Logo"
              width={312}
              height={94}
              className="mr-3 w-[312px] h-[94px] md:w-[364px] md:h-[109px] transition-transform duration-300 group-hover:scale-[1.02]"
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
            <Link
              href="/"
              className="relative text-white hover:text-cyan-400 font-medium px-3 py-2 transition-all duration-300 group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#services"
              className="relative text-white hover:text-cyan-400 font-medium px-3 py-2 transition-all duration-300 group"
            >
              <span>Services</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#about"
              className="relative text-white hover:text-cyan-400 font-medium px-3 py-2 transition-all duration-300 group"
            >
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#contact"
              className="relative text-white hover:text-cyan-400 font-medium px-3 py-2 transition-all duration-300 group"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <a
              href="tel:+61468601750"
              className="ml-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-5 py-2.5 rounded-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 px-2 mt-2 bg-gradient-to-b from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="text-white hover:text-cyan-400 px-4 py-3 rounded-lg hover:bg-white/5 font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#services"
                className="text-white hover:text-cyan-400 px-4 py-3 rounded-lg hover:bg-white/5 font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#about"
                className="text-white hover:text-cyan-400 px-4 py-3 rounded-lg hover:bg-white/5 font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-white hover:text-cyan-400 px-4 py-3 rounded-lg hover:bg-white/5 font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-2 mt-2 border-t border-gray-700/50">
                <a
                  href="tel:+61468601750"
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-4 py-3 rounded-lg flex items-center transition-all duration-300 justify-center font-medium shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call +61468601750
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
