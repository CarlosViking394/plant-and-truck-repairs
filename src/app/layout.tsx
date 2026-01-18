import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMAGE_PATHS, CONTACT, COMPANY } from "@/lib/constants";
import { Metadata } from "next";

// Google Analytics and Tag Manager IDs
const GA_MEASUREMENT_ID = "G-F9G4VQW769";
const GTM_ID = "GTM-MHJQMJ68";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://plantandtruckrepairs.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "M.P.T.R Mobile Plant & Truck Repairs | Mobile Diesel Mechanic SEQ",
    template: "%s | M.P.T.R Mobile Plant & Truck Repairs",
  },
  description: "Professional mobile diesel mechanic servicing South East Queensland. On-site plant repairs, earthmoving equipment, truck servicing, air conditioning & auto electrical. Fast response, 7 days for emergencies. Call 0468-601-750.",
  keywords: [
    "mobile diesel mechanic",
    "mobile diesel mechanic Brisbane",
    "mobile diesel mechanic Gold Coast",
    "mobile plant repairs",
    "earthmoving repairs",
    "truck repairs Brisbane",
    "truck servicing SEQ",
    "mobile mechanic South East Queensland",
    "heavy machinery repairs",
    "on-site diesel mechanic",
    "emergency truck repairs",
    "plant and truck repairs",
    "agricultural machinery repairs",
    "forklift repairs Brisbane",
    "auto electrical repairs",
    "air conditioning service trucks",
  ],
  authors: [{ name: COMPANY.NAME }],
  creator: COMPANY.NAME,
  publisher: COMPANY.NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: `${IMAGE_PATHS.LOGO_SMALL}?v=2`, sizes: "any", type: "image/svg+xml" },
    ],
    apple: [{ url: `${IMAGE_PATHS.LOGO_SMALL}?v=2` }],
    shortcut: [{ url: `${IMAGE_PATHS.LOGO_SMALL}?v=2` }],
  },
  // Open Graph for Facebook, LinkedIn, etc.
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: COMPANY.NAME,
    title: "M.P.T.R Mobile Plant & Truck Repairs | Mobile Diesel Mechanic SEQ",
    description: "Professional mobile diesel mechanic servicing South East Queensland. On-site plant repairs, earthmoving equipment, truck servicing. Fast response, 7 days for emergencies.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "M.P.T.R Mobile Plant & Truck Repairs - Professional Mobile Diesel Mechanics",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "M.P.T.R Mobile Plant & Truck Repairs | Mobile Diesel Mechanic SEQ",
    description: "Professional mobile diesel mechanic servicing South East Queensland. Fast response, 7 days for emergencies. Call 0468-601-750.",
    images: ["/images/og-image.jpg"],
  },
  // Verification (add your codes when you have them)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  // Alternate languages (if needed in future)
  alternates: {
    canonical: siteUrl,
  },
  // Category
  category: "Automotive Services",
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: COMPANY.NAME,
      alternateName: "MPTR Mobile Plant & Truck Repairs",
      description: "Professional mobile diesel mechanic servicing South East Queensland. Specializing in on-site plant repairs, earthmoving equipment, truck servicing, air conditioning and auto electrical repairs.",
      url: siteUrl,
      telephone: CONTACT.PHONE,
      email: CONTACT.EMAIL,
      image: `${siteUrl}/images/og-image.jpg`,
      logo: `${siteUrl}${IMAGE_PATHS.LOGO_SMALL}`,
      priceRange: "$$",
      currenciesAccepted: "AUD",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      areaServed: [
        {
          "@type": "City",
          name: "Brisbane",
          "@id": "https://www.wikidata.org/wiki/Q34932"
        },
        {
          "@type": "City",
          name: "Gold Coast",
          "@id": "https://www.wikidata.org/wiki/Q140075"
        },
        {
          "@type": "City",
          name: "Sunshine Coast"
        },
        {
          "@type": "City",
          name: "Ipswich"
        },
        {
          "@type": "City",
          name: "Logan"
        },
        {
          "@type": "City",
          name: "Tweed Heads"
        },
        {
          "@type": "AdministrativeArea",
          name: "South East Queensland"
        }
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "QLD",
        addressCountry: "AU",
        addressLocality: "South East Queensland"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -27.4698,
        longitude: 153.0251
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "07:00",
          closes: "17:30"
        }
      ],
      sameAs: [],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mobile Mechanic Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile Diesel Mechanic",
              description: "On-site diesel engine diagnostics, repairs, and maintenance for all makes and models."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Plant Repairs & Maintenance",
              description: "Repairs and maintenance for earthmoving equipment, generators, and heavy machinery."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Truck Servicing",
              description: "Complete truck repair and maintenance services."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Auto Electrical",
              description: "Comprehensive auto electrical repairs and diagnostics."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Air Conditioning Service",
              description: "Vehicle air-conditioning diagnostics, repair, and regas services."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: COMPANY.NAME,
      publisher: {
        "@id": `${siteUrl}/#business`
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "M.P.T.R Mobile Plant & Truck Repairs | Mobile Diesel Mechanic SEQ",
      isPartOf: {
        "@id": `${siteUrl}/#website`
      },
      about: {
        "@id": `${siteUrl}/#business`
      },
      description: "Professional mobile diesel mechanic servicing South East Queensland."
    }
  ]
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-AU" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="format-detection" content="telephone=yes" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="AU-QLD" />
        <meta name="geo.placename" content="South East Queensland" />
        <meta name="geo.position" content="-27.4698;153.0251" />
        <meta name="ICBM" content="-27.4698, 153.0251" />

        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href={`${IMAGE_PATHS.LOGO_SMALL}?v=2`} />
        <link rel="icon" href={`${IMAGE_PATHS.LOGO_SMALL}?v=2`} sizes="any" />
        <link rel="shortcut icon" href={`${IMAGE_PATHS.LOGO_SMALL}?v=2`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${IMAGE_PATHS.LOGO_SMALL}?v=2`} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />

        <style dangerouslySetInnerHTML={{ __html: `
          /* Hide Vercel development indicator */
          #__next-build-watcher,
          .__next-build-watcher,
          #__next-prerender-indicator {
            display: none !important;
          }
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
