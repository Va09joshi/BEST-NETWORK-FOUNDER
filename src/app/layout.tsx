import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best SIM | Find the Best Mobile Network",
  description: "Compare Jio, Airtel, Vi and BSNL using real performance, nearby towers and community reports.",
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
