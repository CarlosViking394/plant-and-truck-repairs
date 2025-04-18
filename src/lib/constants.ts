/**
 * Image paths
 * Centralized location for all image paths to ensure consistency and easy updates
 */
export const IMAGE_PATHS = {
  HERO_BANNER: "/images/hero-banner.jpg",
  MECHANIC: "/images/mechanic.jpg",
  LOGO: "/logo-seq.svg",
  LOGO_WHITE: "/logo-white.svg",
  HERO_BG: "/images/hero-bg.jpg",
  FRONT_PAGE: "/images/hero-image.jpg",
  EARTHMOVING: "/images/Earthmoving.jpg",
} as const;

/**
 * Contact information
 */
export const CONTACT = {
  PHONE: "+61468601750",
  PHONE_DISPLAY: "(0468) 601-750",
  EMAIL: "contact@plantandtruckrepairs.com.au",
  ADDRESS: "South East Queensland, Australia",
} as const;

/**
 * Company information
 */
export const COMPANY = {
  NAME: "SEQ Mobile Plant & Truck Repairs",
  TAGLINE: "Professional mobile diesel mechanics at your service",
  YEARS_EXPERIENCE: 15,
  SERVICE_AREAS: ["Brisbane", "Gold Coast", "Sunshine Coast", "Ipswich", "Logan", "Tweed Heads"]
} as const; 