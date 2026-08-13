import ServiceCard from "./ServiceCard";
import { services } from "@/lib/services";

/**
 * Static services layout — used as the reduced-motion fallback for the
 * 3D deck. Mirrors the original two-grid arrangement.
 */
export default function ServicesGrid() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.slice(0, 6).map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            alt={service.alt}
            backgroundImage={service.backgroundImage}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-8 lg:w-2/3 mx-auto">
        {services.slice(6).map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            alt={service.alt}
            backgroundImage={service.backgroundImage}
          />
        ))}
      </div>
    </>
  );
}
