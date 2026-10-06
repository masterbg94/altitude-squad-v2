import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Archivo({ subsets: ["latin", "latin-ext"], variable: "--font-display", weight: ["700", "800", "900"], display: "swap", preload: true });
const body = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Visinski radovi Beograd | Rad na užetu | Alpinistički timovi | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "visinski radovi",
    "radovi na visini",
    "visinski radovi Beograd",
    "alpinistički radovi",
    "rad na užetu",
    "pranje fasada Beograd",
    "sanacija krova Beograd",
    "bojenje konstrukcija",
    "montaža na visini",
    "industrijski alpinizam",
    "spašavanje na visini",
    "obuke rad na visini",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: `Visinski radovi Beograd | ${site.name}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "sr_RS",
    images: [
      {
        url: `${site.url}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: `${site.name} - Visinski radovi Beograd`,
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Visinski radovi Beograd | ${site.name}`,
    description: site.description,
    images: [`${site.url}/og-image.svg`],
    creator: "@dzonkula",
  },
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
  other: {
    "contact-email": site.email,
    "contact-phone": site.phone.replace(/\s/g, ""),
  },
};
export const viewport: Viewport = {
  themeColor: "#0e2a47",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    sameAs: [
      "https://www.google.com/maps/place/Beograd",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone.replace(/\s/g, ""),
      contactType: "customer service",
      availableLanguage: ["Serbian", "English"],
      areaServed: "RS",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "sr-RS",
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    areaServed: site.city,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beograd",
      addressCountry: "RS",
      addressRegion: "Beograd",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "44.7866",
      longitude: "20.4489",
    },
    priceRange: "€€",
    currenciesAccepted: "RSD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    makesOffer: site.services.map(([name, description]) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        description,
        provider: {
          "@type": "LocalBusiness",
          name: site.name,
        },
        areaServed: "Beograd, Srbija",
      },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "27",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Marko Petrović" },
        datePublished: "2024-11-15",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Odličan tim, profesionalno i brzo. Pranje fasade na visini odrađeno bez skele, u rekordnom vremenu.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Jelena Stojanović" },
        datePublished: "2024-10-22",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Sanacija krova na visokoj zgradi. Tim je bio precizan, siguran i poštovao rokove. Preporučujem.",
      },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Početna",
        item: site.url,
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  const serviceList = site.services.map(([name, description, items]) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
    },
    areaServed: "Beograd, Srbija",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} - usluge`,
      itemListElement: items.map((item, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: item,
          description: `${item} - ${name.toLowerCase()}`,
        },
      })),
    },
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      {serviceList.map((service, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      ))}
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.resend.com" />
        <link rel="preload" as="image" href="/altitude-worker2.png" />
        <link rel="preload" as="image" href="/og-image.svg" />
        <link rel="alternate" type="application/rss+xml" title={`${site.name} - Sitemap`} href="/sitemap.xml" />
      </head>
      <body>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
