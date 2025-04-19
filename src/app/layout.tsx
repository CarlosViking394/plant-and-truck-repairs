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
      { url: '/Images/VSMALL PNG-min FAVICON.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/Images/VSMALL PNG-min FAVICON.png' },
    ],
    shortcut: [
      { url: '/Images/VSMALL PNG-min FAVICON.png' },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/Images/VSMALL PNG-min FAVICON.png" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Images/VSMALL PNG-min FAVICON.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Images/VSMALL PNG-min FAVICON.png" />
        <link rel="shortcut icon" href="/Images/VSMALL PNG-min FAVICON.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Images/VSMALL PNG-min FAVICON.png" />
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