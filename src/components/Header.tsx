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
        }, 50); // Reduced from 100ms to 50ms for more responsive feel
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
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg py-2' : 'bg-black py-4'
      } ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src={IMAGE_PATHS.LOGO_SMALL}
              alt="SEQ Mobile Plant & Truck Repairs Logo" 
              width={160} 
              height={48} 
              className="mr-3"
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-cyan-400 font-medium">
              Home
            </Link>
            <Link href="#services" className="text-white hover:text-cyan-400 font-medium">
              Services
            </Link>
            <Link href="#about" className="text-white hover:text-cyan-400 font-medium">
              About
            </Link>
            <Link href="#contact" className="text-white hover:text-cyan-400 font-medium">
              Contact
            </Link>
            
            <a 
              href="tel:+61468601750" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        {isMenuOpen && (
          <nav className="md:hidden py-4 px-2 mt-2 bg-gray-900 rounded-lg">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-white hover:text-cyan-400 px-3 py-2 rounded-md hover:bg-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#services" 
                className="text-white hover:text-cyan-400 px-3 py-2 rounded-md hover:bg-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="#about" 
                className="text-white hover:text-cyan-400 px-3 py-2 rounded-md hover:bg-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#contact" 
                className="text-white hover:text-cyan-400 px-3 py-2 rounded-md hover:bg-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <a 
                href="tel:+61468601750" 
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-3 rounded-md flex items-center transition-colors duration-300 justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (0468) 601-750
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 