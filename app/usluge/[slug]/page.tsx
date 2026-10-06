import { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getService(slug: string) {
  return site.services.find(([name]) => slugify(name) === slug);
}

export async function generateStaticParams() {
  return site.services.map(([name]) => ({
    slug: slugify(name),
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getService(resolvedParams.slug);
  if (!service) return { title: "Usluga nije pronađena" };

  const [name, description, items] = service;
  return {
    title: `${name} | ${site.name}`,
    description: `${description} ${site.name} - sertifikovani tim za visinske radove u Beogradu. Besplatna ponuda.`,
    keywords: [
      name.toLowerCase(),
      "visinski radovi Beograd",
      "rad na visini",
      "alpinistički radovi",
      "bez skele",
    ],
    openGraph: {
      title: `${name} | ${site.name}`,
      description: `${description} Pozovite nas za besplatnu procenu.`,
      type: "website",
      locale: "sr_RS",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${site.name}`,
      description: `${description} Pozovite nas za besplatnu procenu.`,
    },
    alternates: {
      canonical: `${site.url}/usluge/${resolvedParams.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = getService(resolvedParams.slug);

  if (!service) notFound();

  const [name, description, items] = service;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Beograd",
        addressCountry: "RS",
      },
    },
    areaServed: "Beograd, Srbija",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} - detaljne usluge`,
      itemListElement: items.map((item, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: item,
          description: `${item} - deo usluge ${name.toLowerCase()}`,
          provider: { "@type": "LocalBusiness", name: site.name },
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "27",
      bestRating: "5",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Početna",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Usluge",
        item: `${site.url}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: name,
        item: `${site.url}/usluge/${resolvedParams.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main id="top" role="main">
        <section className="hero" aria-labelledby="service-title">
          <div className="hero-text">
            <h1 id="service-title">{name}</h1>
            <p className="lead">
              {description} Iskustvo, sertifikati i oprema za svaki izazov na
              visini.
            </p>
            <div className="cta">
              <a className="btn" href="#contact">
                Zatražite besplatnu ponudu
              </a>
              <a className="btn ghost" href="#services">
                Sve usluge
              </a>
            </div>
          </div>
          <div className="scene" aria-hidden="true">
            <svg
              viewBox="0 0 400 300"
              className="service-icon"
              role="img"
              aria-label={`Ikona za uslugu ${name}`}
            >
              <rect width="400" height="300" fill="#eaf4fa" rx="12" />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="system-ui"
                fontSize="24"
                fill="#0e2a47"
                fontWeight="700"
              >
                {name}
              </text>
            </svg>
          </div>
        </section>

        <section className="section" aria-labelledby="details-title">
          <Reveal>
            <h2 id="details-title">Šta obuhvata</h2>
            <ul className="chips" role="list">
              {items.map((item) => (
                <li key={item} itemScope itemType="https://schema.org/Service">
                  <span itemProp="name">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="section" aria-labelledby="why-title">
          <Reveal>
            <h2 id="why-title">
              Zašto {site.name} za {name.toLowerCase()}?
            </h2>
            <div className="cols">
              {site.reasons.map(([t, d]) => (
                <div
                  key={t}
                  itemScope
                  itemType="https://schema.org/FeatureList"
                >
                  <h3 itemProp="name">{t}</h3>
                  <p itemProp="description">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="section" aria-labelledby="process-title">
          <Reveal>
            <h2 id="process-title">Kako izgleda proces</h2>
            <ol className="steps" itemScope itemType="https://schema.org/HowTo">
              {site.steps.map(([t, d], index) => (
                <li
                  key={t}
                  itemProp="step"
                  itemScope
                  itemType="https://schema.org/HowToStep"
                >
                  <h3 itemProp="name">{t}</h3>
                  <p itemProp="text">{d}</p>
                  <meta itemProp="position" content={String(index + 1)} />
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section
          id="contact"
          className="section"
          aria-labelledby="contact-title"
        >
          <Reveal>
            <h2 id="contact-title">Zatražite ponudu za {name.toLowerCase()}</h2>
            <div className="contact-grid">
              <div itemScope itemType="https://schema.org/LocalBusiness">
                <p className="lead">
                  Pošaljite adresu i fotografije objekta. Odgovaramo u roku od
                  jednog radnog dana sa fiksnom cenom posle obilaska.
                </p>
                <p className="lines">
                  <a
                    href={`mailto:${site.email}?subject=Ponuda: ${encodeURIComponent(name)}`}
                    itemProp="email"
                  >
                    {site.email}
                  </a>
                  <br />
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    itemProp="telephone"
                  >
                    {site.phone}
                  </a>
                  <br />
                  <span
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span itemProp="addressLocality">{site.city}</span>
                  </span>
                </p>
              </div>
              <ContactForm defaultService={name} />
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
