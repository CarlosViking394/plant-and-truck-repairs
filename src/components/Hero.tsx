"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  className,
}: HeroProps) {
  return (
    <section className={cn(
      "relative bg-black text-white py-24 min-h-[80vh] flex items-center",
      className
    )}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/70 z-10"></div>
        <Image
          src="/images/hero-bg.jpg"
          alt="Mobile diesel mechanic servicing truck"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-cyan-400">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#booking-widget" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-md text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1 hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Service
            </a>
            <a 
              href={ctaLink} 
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-md text-lg transition-all duration-300 inline-block text-center"
            >
              {ctaText}
            </a>
            <a 
              href="tel:+61468601750" 
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold py-3 px-8 rounded-md text-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Floating card with brand elements */}
      <div className="absolute bottom-0 right-0 mr-8 mb-8 hidden lg:block">
        <div className="bg-black/70 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30 shadow-xl transform rotate-2 max-w-xs">
          <div className="text-cyan-400 font-bold mb-2 text-xl">Professional Mobile Services</div>
          <div className="text-white text-sm">On-site repairs & maintenance for all heavy equipment</div>
        </div>
      </div>
    </section>
  );
} 