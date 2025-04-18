"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CalendlyWidget from './CalendlyWidget';
import Image from 'next/image';
import { CONTACT, IMAGE_PATHS } from '@/lib/constants';

interface ContactSectionProps {
  id?: string;
  className?: string;
}

export default function ContactSection({ id, className }: ContactSectionProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    IMAGE_PATHS.OUTBACK_ROAD,
    IMAGE_PATHS.SOUTHEAST_TRUCK
  ];
  
  // Transition effect between images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 8000); // Change image every 8 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id={id} className={cn(
      "py-16 px-4 relative overflow-hidden", 
      className
    )}>
      {/* Background images with transition */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((src, index) => (
          <div 
            key={src}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image 
              src={src}
              alt={index === 0 ? "Australian outback road" : "Truck in South East Queensland"}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Book a Service</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Schedule your mobile plant or truck repair service online for fast, reliable service throughout South East Queensland.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto relative">
            {/* Floating card effect */}
            <div id="booking-widget" className="bg-gray-100/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border-2 border-orange-500 relative overflow-hidden scroll-mt-24 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl z-10">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm font-bold shadow-md">
                FAST BOOKING
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-cyan-700 text-center">Book a Service Online</h3>
              
              <div className="mb-8 p-4 bg-gray-200/80 rounded-lg border border-gray-300">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How it works:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-2">
                  <li>Select a service type and preferred date</li>
                  <li>Provide your contact information</li>
                  <li>Our team will confirm your booking</li>
                  <li>We'll arrive at your location at the scheduled time</li>
                </ol>
              </div>
              
              <CalendlyWidget />
              
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 text-center">Need Immediate Assistance?</h4>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <a 
                    href={`tel:${CONTACT.PHONE}`} 
                    className="flex-1 flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md transition-all duration-300 text-lg font-medium shadow-md hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call {CONTACT.PHONE_DISPLAY}
                  </a>
                  
                  <a 
                    href={`mailto:${CONTACT.EMAIL}`} 
                    className="flex-1 flex items-center justify-center gap-3 bg-cyan-700 hover:bg-cyan-800 text-white py-3 px-4 rounded-md transition-all duration-300 text-lg font-medium shadow-md hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                </div>
                
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Available 7 days for emergency mobile repairs in South East Queensland
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-24 bg-gray-100/90 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-300 relative">
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 h-16 w-16 bg-cyan-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-orange-500/10 rounded-full blur-xl"></div>
            
            <h3 className="text-xl font-semibold mb-4 text-cyan-700">South East Queensland Service Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-200/90 backdrop-blur-sm border border-gray-300 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Brisbane Region
                </h4>
                <ul className="text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Brisbane
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Logan
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Ipswich
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-200/90 backdrop-blur-sm border border-gray-300 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Gold Coast Region
                </h4>
                <ul className="text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Gold Coast
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Tweed Heads
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Northern NSW
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-200/90 backdrop-blur-sm border border-gray-300 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Sunshine Coast Region
                </h4>
                <ul className="text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Sunshine Coast
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Caboolture
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Gympie
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 