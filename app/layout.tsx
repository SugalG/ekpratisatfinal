import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { Providers } from "./provider";
import Analytics from "@/components/Analytics"; // Import the client-side component
import Script from "next/script";

export const metadata: Metadata = {
  title: "EkPratisat - Buy, Sell & Rent Properties in Nepal",
  description:
    "Find the best real estate deals in Nepal. Buy, sell, and rent properties easily with EkPratisat.",
  keywords:
    "real estate Nepal, buy house Nepal, rent apartment Kathmandu, property listings Nepal, land for sale",
  openGraph: {
    title: "EkPratisat - Buy, Sell & Rent Properties",
    description:
      "Find the best real estate deals in Nepal. Buy, sell, and rent properties easily with EkPratisat.",
    url: "https://ekpratisat.com",
    siteName: "EkPratisat",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EkPratisat - Real Estate Nepal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EkPratisat - Buy, Sell & Rent Properties",
    description:
      "Find the best real estate deals in Nepal. Buy, sell, and rent properties easily with EkPratisat.",
    images: ["https://ekpratisat.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Providers>
          <Analytics /> {/* Client component for Google Analytics */}
          <Script id="structured-data" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "EkPratisat",
              "url": "https://ekpratisat.com",
              "logo": "https://yourdomain.com/logo.png",
              "description": "Find the best real estate deals in Nepal.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Address",
                "addressLocality": "Kathmandu",
                "addressRegion": "Bagmati",
                "postalCode": "44600",
                "addressCountry": "NP",
              },
            })}
          </Script>
          <div className="flex-grow">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
