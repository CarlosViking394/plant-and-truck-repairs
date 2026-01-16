import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMAGE_PATHS } from "@/lib/constants";

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

export const metadata = {
  title: "M.P.T.R Mobile Plant & Truck Repairs | Professional Mobile Diesel Mechanic",
  description: "Professional mobile diesel mechanic in SEQ, plant repairs, earthmoving equipment, truck servicing, air conditioning and auto electrical repairs.",
  keywords: "diesel mechanic, mobile plant repairs, earthmoving repairs, truck repairs, air-conditioning service, auto electrical, mobile diesel mechanic",
  icons: {
    icon: [
      { url: `${IMAGE_PATHS.LOGO_SMALL}?v=2`, sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: [
      { url: `${IMAGE_PATHS.LOGO_SMALL}?v=2` },
    ],
    shortcut: [
      { url: `${IMAGE_PATHS.LOGO_SMALL}?v=2` },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/svg+xml" href={`${IMAGE_PATHS.LOGO_SMALL}?v=2`} />
        <link rel="icon" href={`${IMAGE_PATHS.LOGO_SMALL}?v=2`} sizes="any" />
        <link rel="shortcut icon" href={`${IMAGE_PATHS.LOGO_SMALL}?v=2`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${IMAGE_PATHS.LOGO_SMALL}?v=2`} />

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