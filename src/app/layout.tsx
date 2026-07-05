import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best SIM | Find the Best Mobile Network",
  description: "Stop guessing which mobile network is best. Use Best SIM's interactive GIS maps and real-time performance data to find the most reliable operator in your specific area.",
};

import { Outfit } from "next/font/google";
import { LocationProvider } from "@/context/LocationContext";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <LocationProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LocationProvider>
      </body>
    </html>
  );
}
