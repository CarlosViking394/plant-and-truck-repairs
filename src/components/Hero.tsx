"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IMAGE_PATHS } from '@/lib/constants';

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
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className={cn(
      "relative bg-gray-800 text-gray-100 py-24 min-h-[80vh] flex items-center",
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
              className="object-cover object-center"
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/70 to-gray-700/60 z-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-cyan-300">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#booking-widget" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-md text-lg inline-flex items-center justify-center gap-2 shadow-md btn-magnetic"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:rotate-12 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="relative z-10">Book a Service</span>
            </a>
            {ctaText && ctaLink && (
              <a 
                href={ctaLink} 
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-md text-lg inline-block text-center shadow-md btn-expand group"
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{ctaText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 inline-block -mt-1 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            <a 
              href="tel:+61468601750" 
              className="bg-transparent hover:bg-gray-700 text-gray-100 border border-gray-500 font-semibold py-3 px-8 rounded-md text-lg inline-flex items-center justify-center gap-2 btn-glow group overflow-hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="group-hover:text-cyan-300 transition-colors duration-300">Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating card with brand elements */}
      <div className="absolute bottom-0 right-0 mr-8 mb-8 hidden lg:block">
        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-600 shadow-lg transform rotate-2 max-w-xs">
          <div className="text-cyan-300 font-bold mb-2 text-xl">Professional Mobile Services</div>
          <div className="text-gray-200 text-sm">On-site repairs & maintenance for all heavy equipment</div>
        </div>
      </div>
    </section>
  );
} 