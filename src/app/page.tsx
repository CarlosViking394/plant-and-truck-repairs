import Image from "next/image";
import ContactSection from "../components/ContactSection";
import ServiceCard from "../components/ServiceCard";
import Hero from "../components/Hero";

export const metadata = {
  title: "SEQ Mobile Plant & Truck Repairs | Professional Mobile Diesel Mechanic",
  description: "Professional mobile diesel mechanic specializing in earthmoving repairs, truck servicing, air conditioning and auto electrical repairs. Available 24/7 for emergency mobile plant repairs.",
};

export default function Home() {
  const services = [
    {
      title: "Mobile Diesel Mechanic",
      description: "On-site diesel engine diagnostics, repairs, and maintenance for all makes and models. Our mobile mechanics come to your location, saving you time and reducing equipment downtime.",
      icon: "/icons/diesel-mechanic.svg",
      alt: "Mobile diesel mechanic servicing a truck engine"
    },
    {
      title: "Mobile Plant Repairs",
      description: "Comprehensive onsite earthmoving equipment and plant machinery repairs. We service excavators, bulldozers, loaders, and all heavy equipment at your worksite.",
      icon: "/icons/plant-repairs.svg",
      alt: "Mobile plant repair technician working on excavator"
    },
    {
      title: "Earthmoving Repairs and Servicing",
      description: "Specialized repairs and preventative maintenance for all earthmoving equipment. Keep your machinery running at peak performance with our expert servicing.",
      icon: "/icons/earthmoving.svg",
      alt: "Earthmoving equipment being serviced by mechanic"
    },
    {
      title: "Truck Repairs and Service",
      description: "Complete truck repair and maintenance services. From routine servicing to major repairs, we keep your trucks on the road and operating efficiently.",
      icon: "/icons/truck-repair.svg",
      alt: "Truck maintenance and repair service"
    },
    {
      title: "Air-conditioning Service and Repair",
      description: "Expert vehicle air-conditioning diagnostics, repair, and regas services. We ensure your AC systems work efficiently in all conditions.",
      icon: "/icons/air-conditioning.svg",
      alt: "Vehicle air conditioning repair and service"
    },
    {
      title: "Auto Electrical",
      description: "Comprehensive auto electrical repairs and diagnostics for all vehicles. We troubleshoot and fix everything from batteries to complex electronic systems.",
      icon: "/icons/auto-electrical.svg",
      alt: "Auto electrical repair service"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Hero 
        title="SEQ Mobile Plant & Truck Repairs" 
        subtitle="Professional mobile diesel mechanics at your service"
        ctaText="Learn More"
        ctaLink="#services"
      />
      
      <section id="services" className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-400">Our Services</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Specialized mobile repairs for all your diesel, plant, truck, and equipment needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                alt={service.alt}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section id="about" className="relative py-20 px-4 bg-black overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80 z-10"></div>
          <Image
            src="/images/mechanic.jpg"
            alt="Mechanic background"
            fill
            className="object-cover object-center opacity-20"
            sizes="100vw"
            quality={80}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="aspect-w-4 aspect-h-3 w-full">
                  <Image 
                    src="/images/mechanic.jpg" 
                    alt="Experienced mobile diesel mechanic working on a truck"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <span className="text-cyan-400 font-semibold text-lg">SEQ Mobile Plant & Truck Repairs</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">Experienced Mobile Mechanics</h2>
              <p className="text-gray-300 mb-4 text-lg">
                With over 15 years of experience in mobile plant repairs and truck servicing, 
                we provide fast, reliable service wherever you need it. Our team of qualified 
                diesel mechanics specializes in minimizing downtime for your equipment and vehicles.
              </p>
              <p className="text-gray-300 mb-6 text-lg">
                From emergency repairs to scheduled maintenance, we're equipped to handle 
                all aspects of mobile diesel mechanic work, earthmoving equipment repairs, 
                and truck servicing throughout the region.
              </p>
              
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 mb-6">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">Why Choose Us?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-orange-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Fast response times throughout South East Queensland</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-orange-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Fully equipped mobile workshop for on-site repairs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-orange-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Licensed technicians with extensive industry experience</span>
                  </li>
                </ul>
              </div>
              
              <a href="#contact" className="btn-primary bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-8 rounded-md transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:-translate-y-1">
                <span>Contact Us Today</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <ContactSection id="contact" />
    </div>
  );
} 