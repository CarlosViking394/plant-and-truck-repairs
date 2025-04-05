"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import ContactForm from './ContactForm';
import CalendlyWidget from './CalendlyWidget';
import Image from 'next/image';

interface ContactSectionProps {
  id?: string;
  className?: string;
}

export default function ContactSection({ id, className }: ContactSectionProps) {
  return (
    <section id={id} className={cn(
      "py-16 px-4 bg-gray-900 relative overflow-hidden", 
      className
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#00b5d8"></circle>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">Book a Service</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Schedule your mobile plant or truck repair service online, or reach out to us directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 md:order-2">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Send Us a Message</h3>
              <ContactForm />
            </div>
            
            <div id="booking-widget" className="bg-gray-800 p-6 rounded-lg shadow-md border-2 border-orange-500 md:order-1 relative overflow-hidden scroll-mt-24">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm font-bold shadow-md">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Book a Service Online</h3>
              <CalendlyWidget />
              
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-medium mb-3 text-white">Need Immediate Assistance?</h4>
                <a 
                  href="tel:+61468601750" 
                  className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md transition-all duration-300 text-lg font-medium shadow-lg hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call (0468) 601-750
                </a>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  Available 7 days for emergency mobile repairs
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 relative">
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 h-16 w-16 bg-cyan-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-orange-500/10 rounded-full blur-xl"></div>
            
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">South East Queensland Service Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <h4 className="font-medium text-white mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Brisbane Region
                </h4>
                <ul className="text-gray-400 space-y-1">
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
              <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <h4 className="font-medium text-white mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Gold Coast Region
                </h4>
                <ul className="text-gray-400 space-y-1">
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
              <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <h4 className="font-medium text-white mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Sunshine Coast Region
                </h4>
                <ul className="text-gray-400 space-y-1">
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