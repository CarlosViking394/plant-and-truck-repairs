import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMAGE_PATHS } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SEQ Mobile Plant & Truck Repairs | Professional Mobile Diesel Mechanic",
  description: "Professional mobile diesel mechanic specializing in plant repairs, earthmoving equipment, truck servicing, air conditioning and auto electrical repairs.",
  keywords: "diesel mechanic, mobile plant repairs, earthmoving repairs, truck repairs, air-conditioning service, auto electrical, mobile diesel mechanic",
  icons: {
    icon: [
      { url: IMAGE_PATHS.LOGO_SMALL, sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: IMAGE_PATHS.LOGO_SMALL },
    ],
    shortcut: [
      { url: IMAGE_PATHS.LOGO_SMALL },
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
        <link rel="icon" href={IMAGE_PATHS.LOGO_SMALL} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={IMAGE_PATHS.LOGO_SMALL} />
        <link rel="icon" type="image/png" sizes="16x16" href={IMAGE_PATHS.LOGO_SMALL} />
        <link rel="shortcut icon" href={IMAGE_PATHS.LOGO_SMALL} />
        <link rel="apple-touch-icon" sizes="180x180" href={IMAGE_PATHS.LOGO_SMALL} />
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
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 