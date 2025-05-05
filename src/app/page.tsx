import Image from "next/image";
import ContactSection from "../components/ContactSection";
import ServiceCard from "../components/ServiceCard";
import Hero from "../components/Hero";
import { COMPANY, IMAGE_PATHS } from "@/lib/constants";
import { services } from "@/lib/services";

export const metadata = {
  title: "SEQ Mobile Plant & Truck Repairs | Professional Mobile Diesel Mechanic",
  description: "Professional mobile diesel mechanic specializing in earthmoving repairs, truck servicing, air conditioning and auto electrical repairs. Available 24/7 for emergency mobile plant repairs.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Hero 
        title="SEQ Mobile Plant & Truck Repairs" 
        subtitle="Professional mobile diesel mechanics at your service"
        ctaText="Learn More"
        ctaLink="#services"
      />
      
      <section id="services" className="py-16 px-4 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-700">Our Services</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Specialized mobile repairs for all your diesel, plant, truck, and equipment needs
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
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
        </div>
      </section>
      
      <section id="about" className="relative py-20 px-4 bg-gray-100 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/70 to-gray-700/60 z-10"></div>
          <Image
            src={IMAGE_PATHS.MECHANIC}
            alt=""
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
            quality={80}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Experienced Mobile Mechanics</h2>
              <p className="text-gray-200 mb-4 text-lg">
                With over {COMPANY.YEARS_EXPERIENCE} years of experience in mobile plant repairs and truck servicing, 
                we provide fast, reliable service wherever you need it. Our team of qualified 
                diesel mechanics specializes in minimizing downtime for your equipment and vehicles.
              </p>
              <p className="text-gray-200 mb-6 text-lg">
                From emergency repairs to scheduled maintenance, we're equipped to handle 
                all aspects of mobile diesel mechanic work, earthmoving equipment repairs, 
                and truck servicing throughout the region.
              </p>
              
              <div className="bg-gray-800/80 p-6 rounded-lg border border-gray-700 shadow-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-200">Fast response times throughout South East Queensland</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-200">Fully equipped mobile workshop for on-site repairs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-200">Licensed technicians with extensive industry experience</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <a href="#contact" className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-cyan-500/30 transform hover:translate-y-[-2px]">
                  <span>Contact Us Today</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-600/30 aspect-[4/3]">
                <Image
                  src={IMAGE_PATHS.WHO_WE_ARE}

                  alt="Emergency truck repairs in rainy conditions"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ContactSection id="contact" />
    </div>
  );
} 