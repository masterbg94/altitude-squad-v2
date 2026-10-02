import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Archivo({ subsets: ["latin", "latin-ext"], variable: "--font-display", weight: ["700", "800", "900"] });
const body = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Visinski radovi Beograd | Rad na užetu | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["visinski radovi", "radovi na visini", "visinski radovi Beograd", "alpinistički radovi", "rad na užetu", "pranje fasada", "sanacija krova", site.city],
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: site.name, description: site.description, url: site.url, siteName: site.name },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#0e2a47" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name, url: site.url, description: site.description,
    email: site.email, telephone: site.phone,
    areaServed: site.city, address: { "@type": "PostalAddress", addressLocality: site.city },
    makesOffer: site.services.map(([n]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
  };
  return (
    <html lang="sr" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
