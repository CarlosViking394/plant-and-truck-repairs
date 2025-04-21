"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Service } from '@/lib/services';
import { 
  Wrench, 
  Truck, 
  Tractor, 
  Construction, 
  Thermometer,
  Battery,
  Settings
} from 'lucide-react';

type ServiceCardProps = Omit<Service, 'id'> & {
  className?: string;
};

// Map icon string to Lucide component
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  wrench: Wrench,
  truck: Truck,
  tractor: Tractor,
  construction: Construction,
  thermometer: Thermometer,
  battery: Battery,
  // Add fallback
  default: Settings
};

export default function ServiceCard({
  title,
  description,
  icon,
  alt,
  backgroundImage,
  className,
}: ServiceCardProps) {
  // Get the proper icon component from the map or use the default
  const IconComponent = IconMap[icon] || IconMap.default;

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md hover:shadow-xl p-6 transition-all duration-300 group border border-gray-200 relative overflow-hidden h-full flex flex-col sm:hover:-translate-y-1",
      className
    )}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0 transition-all duration-300 group-hover:brightness-117">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-700/80 z-10 transition-opacity duration-300 group-hover:opacity-75 sm:opacity-80 sm:group-hover:opacity-75"></div>
          <Image 
            src={backgroundImage}
            alt={`${title} background`}
            fill
            className="object-cover object-center transition-transform duration-300 sm:group-hover:scale-105 md:scale-100 sm:scale-100 scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
          />
        </div>
      )}
      
      <div className={`${backgroundImage ? 'relative z-20' : ''} flex-1 flex flex-col`}>
        <div className="mb-4">
          <div className="bg-cyan-50 p-3 rounded-full inline-flex items-center justify-center mb-3 w-12 h-12">
            <IconComponent className="text-cyan-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-medium text-cyan-700 mb-2">{title}</h3>
        </div>
        <p className={`${backgroundImage ? 'text-gray-100' : 'text-gray-700'} mb-4 flex-1`}>{description}</p>
        <div className="mt-auto pt-2">
          <a 
            href="#contact" 
            className={`
              ${backgroundImage ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-600 hover:text-cyan-800'} 
              font-medium flex items-center hover:underline transition-colors
            `}
          >
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