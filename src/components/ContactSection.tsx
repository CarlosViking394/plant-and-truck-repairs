"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CalendlyWidget from './CalendlyWidget';
import Image from 'next/image';
import { CONTACT } from '@/lib/constants';

interface ContactSectionProps {
  id?: string;
  className?: string;
}

export default function ContactSection({ id, className }: ContactSectionProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [gradientImageIndex, setGradientImageIndex] = useState(0);
  const images = [
    "/images/inthemiddleofoz.png",
    "/images/southEastQTruck.png",
    "/images/front-page.jpg"
  ];

  // Transition effect between images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Transition effect for mobile gradient
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientImageIndex(prev => prev === 0 ? 1 : 0);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id={id} className={cn(
      "py-20 md:py-28 px-4 relative overflow-hidden",
      className
    )}>
      {/* Desktop Background images with transition */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={index === 0 ? "Australian outback road" :
                  index === 1 ? "Truck in South East Queensland" :
                  "Heavy equipment servicing"}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/50 to-gray-900/70"></div>
      </div>

      {/* Mobile Gradient Background */}
      <div className="absolute inset-0 overflow-hidden md:hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${
            gradientImageIndex === 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: 'opacity 3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #164e63 100%)'
          }}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${
            gradientImageIndex === 1 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: 'opacity 3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'linear-gradient(135deg, #164e63 0%, #1e3a5f 50%, #1e293b 100%)'
          }}
        />
        <div className={`absolute inset-0 ${gradientImageIndex === 0 ? 'bg-black/20' : 'bg-black/30'} transition-colors duration-3000`}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              Book a <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Service</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              Schedule your mobile plant or truck repair service online for fast, reliable service throughout South East Queensland.
            </p>
          </div>

          {/* Booking widget card */}
          <div className="max-w-2xl mx-auto relative mb-16 sm:mb-20">
            <div id="booking-widget" className="bg-white/95 backdrop-blur-md p-5 sm:p-8 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden scroll-mt-24 transition-all duration-500 hover:shadow-amber-500/10 z-10">
              {/* Badge */}
              <div className="absolute -top-px -right-px">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1.5 text-xs sm:text-sm font-bold rounded-bl-xl rounded-tr-2xl shadow-lg">
                  FAST BOOKING
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">
                Book a Service Online
              </h3>

              {/* How it works */}
              <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  How it works:
                </h4>
                <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 pl-11">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                    <span>Select a service type and preferred date</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                    <span>Provide your contact information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                    <span>Our team will confirm your booking by phone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                    <span>We&apos;ll arrive at your location at the scheduled date</span>
                  </li>
                </ol>
              </div>

              <CalendlyWidget />

              {/* Contact options */}
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
                <h4 className="text-base sm:text-lg font-bold mb-4 text-gray-800 text-center">Need Immediate Assistance?</h4>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={`tel:${CONTACT.PHONE}`}
                    className="flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 text-base sm:text-lg font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call {CONTACT.PHONE_DISPLAY}
                  </a>

                  <a
                    href={`mailto:${CONTACT.EMAIL}`}
                    className="flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 text-base sm:text-lg font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 mt-4 text-center">
                  Available 7 days for emergency mobile repairs in South East Queensland
                </p>
              </div>
            </div>
          </div>

          {/* Service areas */}
          <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>

            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
              Northern New South Wales & South East Queensland <span className="text-amber-600">Service Areas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative">
              {[
                { region: 'Brisbane Region', areas: ['Brisbane', 'Logan', 'Ipswich'] },
                { region: 'Gold Coast Region', areas: ['Gold Coast'] },
                { region: 'Northern New South Wales Region', areas: ['Ballina', 'Byron Bay', 'Lismore', 'Tweed Heads'] }
              ].map((location, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {location.region}
                  </h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    {location.areas.map((area) => (
                      <li key={area} className="flex items-center">
                        <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full mr-3"></span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
