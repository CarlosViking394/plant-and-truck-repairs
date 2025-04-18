"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IMAGE_PATHS } from "@/lib/constants";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  alt: string;
  backgroundImage?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  alt,
  backgroundImage,
  className,
}: ServiceCardProps) {
  return (
    <div className={cn(
      "bg-gray-100 rounded-lg shadow-md p-6 transition-transform duration-300 hover:translate-y-[-5px] border border-gray-300 relative overflow-hidden",
      className
    )}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-700/70 z-10"></div>
          <Image 
            src={backgroundImage}
            alt={`${title} background`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      
      <div className={`${backgroundImage ? 'relative z-20' : ''}`}>
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 p-3 rounded-full mr-4 border border-gray-300">
            <Image 
              src={icon} 
              width={32} 
              height={32} 
              alt={alt}
              className="text-cyan-700"
            />
          </div>
          <h3 className="text-xl font-semibold text-cyan-700">{title}</h3>
        </div>
        <p className={`${backgroundImage ? 'text-gray-100' : 'text-gray-700'}`}>{description}</p>
        <div className="mt-4 pt-4 border-t border-gray-300">
          <a href="#contact" className={`${backgroundImage ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-700 hover:text-cyan-800'} font-medium flex items-center`}>
            Request Service
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 