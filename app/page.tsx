import { site } from "@/lib/site";
import HeroScene from "@/components/HeroScene";
import Reveal from "@/components/Reveal";
import RopeClimber from "@/components/RopeClimber";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: site.services.map(([name, description], index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name,
        description,
        provider: { "@type": "LocalBusiness", name: site.name, url: site.url },
        areaServed: "Beograd, Srbija",
      },
    })),
  };

  return (
    <>
      <RopeClimber />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <header className="nav" role="banner">
        <a href="#top" className="logo" aria-label={`${site.name} - Početna`}>{site.name}</a>
        <nav aria-label="Glavna navigacija">
          <a href="#services">Usluge</a>
          <a href="#industries">Industrije</a>
          <a href="#safety">Bezbednost</a>
          <a href="#team">Tim</a>
          <a href="#faq">Pitanja</a>
          <a href="#contact" className="btn sm">Zatraži ponudu</a>
        </nav>
      </header>

      <main id="top" role="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-text">
            <h1 id="hero-title">Visinski radovi u Beogradu — bez skele.</h1>
            <p className="lead">{site.tagline} Tim od četiri sertifikovana tehničara visinskih radova: čišćenje, pregledi, popravke i bojenje na visokim zgradama, mostovima i tornjevima.</p>
            <div className="cta">
              <a className="btn" href="#contact">Zatražite besplatnu ponudu</a>
              <a className="btn ghost" href="#services">Pogledajte šta radimo</a>
            </div>
          </div>
          <HeroScene />
        </section>

        <section id="services" className="section" aria-labelledby="services-title">
          <Reveal>
            <h2 id="services-title">Sve što radimo na visini</h2>
            <div className="svcs">
              {site.services.map(([t, d, items]) => (
                <article key={t} className="svc" itemScope itemType="https://schema.org/Service">
                  <div>
                    <h3 itemProp="name">{t}</h3>
                    <p itemProp="description">{d}</p>
                  </div>
                  <ul>
                    {items.map((i) => (
                      <li key={i} itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
                        <span itemProp="name">{i}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="industries" className="section band" aria-labelledby="industries-title">
          <Reveal>
            <h2 id="industries-title">Gde radimo</h2>
            <ul className="chips" role="list">
              {site.industries.map((i) => (
                <li key={i} itemProp="areaServed">{i}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="safety" className="section" aria-labelledby="safety-title">
          <Reveal>
            <h2 id="safety-title">Zašto mali tim radi bolje</h2>
            <div className="cols">
              {site.reasons.map(([t, d]) => (
                <div key={t} itemScope itemType="https://schema.org/FeatureList">
                  <h3 itemProp="name">{t}</h3>
                  <p itemProp="description">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="team" className="section" aria-labelledby="team-title">
          <Reveal>
            <h2 id="team-title">Upoznajte nas četvoricu</h2>
            <ul className="grid four" role="list">
              {site.team.map(([n, r, d]) => (
                <li key={n} itemScope itemType="https://schema.org/Person">
                  <div className="avatar" aria-hidden>{n[0]}</div>
                  <h3 itemProp="name">{n}</h3>
                  <p className="role" itemProp="jobTitle">{r}</p>
                  <p itemProp="description">{d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="process" className="section" aria-labelledby="process-title">
          <Reveal>
            <h2 id="process-title">Kako izgleda tok posla</h2>
            <ol className="steps" itemScope itemType="https://schema.org/HowTo">
              {site.steps.map(([t, d], index) => (
                <li key={t} itemProp="step" itemScope itemType="https://schema.org/HowToStep">
                  <h3 itemProp="name">{t}</h3>
                  <p itemProp="text">{d}</p>
                  <meta itemProp="position" content={String(index + 1)} />
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section id="faq" className="section" aria-labelledby="faq-title">
          <Reveal>
            <h2 id="faq-title">Pitanja koja često dobijamo</h2>
            <div className="faq" itemScope itemType="https://schema.org/FAQPage">
              {site.faq.map(([q, a]) => (
                <details key={q} itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
                  <summary itemProp="name">{q}</summary>
                  <p itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"><span itemProp="text">{a}</span></p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section band" aria-labelledby="contact-title">
          <Reveal>
            <h2 id="contact-title">Recite nam šta treba dostići</h2>
            <div className="contact-grid">
              <div itemScope itemType="https://schema.org/LocalBusiness">
                <p className="lead">Pošaljite adresu i nekoliko fotografija. Odgovaramo u roku od jednog radnog dana, a fiksnu cenu dajemo posle obilaska lokacije.</p>
                <p className="lines">
                  <a href={`mailto:${site.email}`} itemProp="email">{site.email}</a><br />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} itemProp="telephone">{site.phone}</a><br />
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressLocality">{site.city}</span>
                  </span>
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer" role="contentinfo">© {new Date().getFullYear()} {site.name}, {site.city}</footer>
    </>
  );
}
