import { IMAGE_PATHS } from "./constants";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  backgroundImage?: string;
  alt: string;
}

export const services: Service[] = [
  {
    id: "mobile-diesel-mechanic",
    title: "Mobile Diesel Mechanic",
    description: "On-site diesel engine diagnostics, repairs, and maintenance for all makes and models. Our mobile mechanics come to your location, saving you time and reducing equipment downtime.",
    icon: "wrench",
    backgroundImage: "/images/mobile_diesel_mechanic_final.jpg",
    alt: "Mobile diesel mechanic servicing a truck engine"
  },
  {
    id: "mobile-plant-repairs",
    title: "Mobile Plant Repairs",
    description: "Comprehensive onsite earthmoving equipment and plant machinery repairs. We service excavators, bulldozers, loaders, and all heavy equipment at your worksite.",
    icon: "construction",
    backgroundImage: "/images/MobilePlantRepairs.png",
    alt: "Mobile plant repair technician working on excavator"
  },
  {
    id: "earthmoving-repairs",
    title: "Earthmoving Repairs and Servicing",
    description: "Specialized repairs and preventative maintenance for all earthmoving equipment. Keep your machinery running at peak performance with our expert servicing.",
    icon: "tractor",
    backgroundImage: "/images/pexels-radwanmenzer-14704776.jpg",
    alt: "Hitachi excavator at construction site"
  },
  {
    id: "truck-repairs",
    title: "Truck Repairs and Service",
    description: "Complete truck repair and maintenance services. From routine servicing to major repairs, we keep your trucks on the road and operating efficiently.",
    icon: "truck",
    backgroundImage: "/images/truck-repairs.png",
    alt: "Truck maintenance and repair service"
  },
  {
    id: "air-conditioning",
    title: "Air-conditioning Service and Repair",
    description: "Expert vehicle air-conditioning diagnostics, repair, and regas services. We ensure your AC systems work efficiently in all conditions.",
    icon: "thermometer",
    backgroundImage: "/images/airconditioner.png",
    alt: "Vehicle air conditioning repair and service"
  },
  {
    id: "auto-electrical",
    title: "Auto Electrical",
    description: "Comprehensive auto electrical repairs and diagnostics for all vehicles. We troubleshoot and fix everything from batteries to complex electronic systems.",
    icon: "battery",
    backgroundImage: "/images/autoelectrical.png",
    alt: "Auto electrical repair service"
  }
]; 