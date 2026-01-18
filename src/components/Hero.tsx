"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  className,
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [
    "/images/inthemiddleofoz.png",
    "/images/southEastQTruck.png",
    "/images/front-page.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className={cn(
      "relative bg-gray-900 text-gray-100 pt-40 pb-28 md:pt-44 md:pb-32 min-h-[85vh] flex items-center overflow-hidden",
      className
    )}>
      {/* Background images with transition */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              zIndex: index === currentImageIndex ? 0 : -1,
              transition: 'opacity 1.5s ease-in-out'
            }}
          >
            <Image
              src={image}
              alt={`SEQ Mobile Plant & Truck Repairs - ${
                index === 0 ? "Outback Road" :
                index === 1 ? "South East Queensland Truck" :
                "Heavy Equipment Servicing"
              }`}
              fill
              priority
              className="object-cover object-center scale-105"
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-800/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl">
          {/* Title with gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">{title.split(' ').slice(0, 2).join(' ')}</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              {title.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl leading-relaxed">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#booking-widget"
              className="group bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg inline-flex items-center justify-center gap-3 shadow-lg shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Book a Service</span>
            </a>

            {ctaText && ctaLink && (
              <a
                href={ctaLink}
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 font-semibold py-4 px-8 rounded-xl text-lg inline-flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1"
              >
                <span>{ctaText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            )}

            <a
              href="tel:+61468601750"
              className="group bg-transparent hover:bg-amber-500/10 text-white border-2 border-amber-500/50 hover:border-amber-400 font-semibold py-4 px-8 rounded-xl text-lg inline-flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 transition-all duration-300 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="group-hover:text-amber-300 transition-colors duration-300">Call Now</span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Licensed Mechanics</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">On-Site Service</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Fast Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating card with brand elements */}
      <div className="absolute bottom-8 right-8 hidden lg:block z-20">
        <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 shadow-2xl transform rotate-2 max-w-xs hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-amber-300 font-bold text-lg">Professional Service</div>
          </div>
          <div className="text-gray-300 text-sm">On-site repairs & maintenance for all heavy equipment throughout SEQ</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <a href="#services" className="flex flex-col items-center text-gray-400 hover:text-amber-400 transition-colors">
          <span className="text-xs mb-2">Scroll to explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
