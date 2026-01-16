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
      "group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-500 border border-gray-100 relative overflow-hidden h-full flex flex-col",
      "sm:hover:-translate-y-2 hover:border-orange-200/50",
      className
    )}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/75 to-gray-900/85 z-10 transition-all duration-500 group-hover:from-gray-900/70 group-hover:via-gray-800/65 group-hover:to-gray-900/75"></div>
          <Image
            src={backgroundImage}
            alt={`${title} background`}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
          />
        </div>
      )}

      <div className={`${backgroundImage ? 'relative z-20' : ''} flex-1 flex flex-col`}>
        {/* Icon container with gradient background */}
        <div className="mb-5">
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
            backgroundImage
              ? "bg-gradient-to-br from-orange-500/30 to-orange-600/20 backdrop-blur-sm border border-orange-400/30 group-hover:from-orange-500/40 group-hover:to-orange-600/30"
              : "bg-gradient-to-br from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200"
          )}>
            <IconComponent className={cn(
              "w-7 h-7 transition-all duration-300",
              backgroundImage
                ? "text-orange-300 group-hover:text-orange-200 group-hover:scale-110"
                : "text-orange-600 group-hover:text-orange-700 group-hover:scale-110"
            )} />
          </div>
        </div>

        {/* Title */}
        <h3 className={cn(
          "text-xl font-bold mb-3 transition-colors duration-300",
          backgroundImage
            ? "text-white group-hover:text-orange-200"
            : "text-gray-800 group-hover:text-orange-700"
        )}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn(
          "mb-5 flex-1 leading-relaxed",
          backgroundImage
            ? "text-gray-200"
            : "text-gray-600"
        )}>
          {description}
        </p>

        {/* CTA Link */}
        <div className="mt-auto pt-4 border-t border-gray-200/20">
          <a
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 font-semibold transition-all duration-300 group/link",
              backgroundImage
                ? "text-orange-300 hover:text-orange-200"
                : "text-orange-600 hover:text-orange-700"
            )}
          >
            <span>Request Service</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-1"
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

      {/* Decorative gradient on hover */}
      {!backgroundImage && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>
      )}
    </div>
  );
}
