import Image from "next/image";
import ContactSection from "../components/ContactSection";
import ServiceCard from "../components/ServiceCard";
import Hero from "../components/Hero";
import { COMPANY, IMAGE_PATHS } from "@/lib/constants";
import { services } from "@/lib/services";

export const metadata = {
  title: "M.P.T.R Mobile Plant & Truck Repairs | Professional Mobile Diesel Mechanic",
  description: "Professional mobile diesel mechanic in earthmoving repairs, truck servicing, air conditioning and auto electrical repairs. Available 24/7 for emergency mobile plant repairs.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Hero
        title="M.P.T.R Mobile Plant & Truck Repairs"
        subtitle="Professional mobile diesel mechanics at your service"
        ctaText="Learn More"
        ctaLink="#services"
      />

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 px-4 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-800">Our </span>
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Mobile repairs for all your diesel, plant, truck, and equipment needs
            </p>
          </div>

          {/* Service cards grid */}
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

          {/* Last two services centered */}
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 md:py-32 px-4 bg-gray-900 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/75 z-10"></div>
          <Image
            src={IMAGE_PATHS.MECHANIC}
            alt=""
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
            quality={80}
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Content */}
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
                Experienced <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Mobile Mechanics</span>
              </h2>

              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                With over {COMPANY.YEARS_EXPERIENCE} years of experience in mobile plant repairs and truck servicing,
                we provide fast, reliable service wherever you need it. Our team of qualified
                diesel mechanics specialises in minimising downtime for your equipment and vehicles.
              </p>

              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                From emergency repairs to scheduled maintenance, we&apos;re equipped to handle
                all aspects of mobile diesel mechanic work, earthmoving equipment repairs,
                and truck servicing throughout the region.
              </p>

              {/* Why choose us card */}
              <div className="bg-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-xl mb-8">
                <h3 className="text-xl font-bold mb-5 text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  Why Choose Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Fast response times throughout South East Queensland',
                    'Fully equipped mobile workshop for on-site repairs',
                    'Licensed technicians with extensive industry experience'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-1"
                >
                  <span>Contact Us Today</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Video */}
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/20 aspect-square">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/mechanic-wheel.mp4" type="video/mp4" />
                  </video>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-3 rounded-xl shadow-xl font-bold hidden md:block">
                  {COMPANY.YEARS_EXPERIENCE}+ Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection id="contact" />
    </div>
  );
}
