import { site } from "@/lib/site";
import HeroScene from "@/components/HeroScene";
import Reveal from "@/components/Reveal";
import RopeClimber from "@/components/RopeClimber";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <RopeClimber />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: site.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }) }} />
      <header className="nav">
        <a href="#top" className="logo">{site.name}</a>
        <nav aria-label="Glavna navigacija">
          <a href="#services">Usluge</a><a href="#industries">Industrije</a><a href="#safety">Bezbednost</a><a href="#team">Tim</a><a href="#faq">Pitanja</a>
          <a href="#contact" className="btn sm">Zatraži ponudu</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <h1>Visinski radovi u Beogradu — bez skele.</h1>
            <p className="lead">{site.tagline} Tim od četiri sertifikovana tehničara visinskih radova: čišćenje, pregledi, popravke i bojenje na visokim zgradama, mostovima i tornjevima.</p>
            <div className="cta">
              <a className="btn" href="#contact">Zatražite besplatnu ponudu</a>
              <a className="btn ghost" href="#services">Pogledajte šta radimo</a>
            </div>
          </div>
          <HeroScene />
        </section>

        <section id="services" className="section">
          <Reveal>
            <h2>Sve što radimo na visini</h2>
            <div className="svcs">
              {site.services.map(([t, d, items]) => (
                <article key={t} className="svc">
                  <div><h3>{t}</h3><p>{d}</p></div>
                  <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="industries" className="section band">
          <Reveal>
            <h2>Gde radimo</h2>
            <ul className="chips">{site.industries.map((i) => <li key={i}>{i}</li>)}</ul>
          </Reveal>
        </section>

        <section id="safety" className="section">
          <Reveal>
            <h2>Zašto mali tim radi bolje</h2>
            <div className="cols">
              {site.reasons.map(([t, d]) => (<div key={t}><h3>{t}</h3><p>{d}</p></div>))}
            </div>
          </Reveal>
        </section>

        <section id="team" className="section">
          <Reveal>
            <h2>Upoznajte nas četvoricu</h2>
            <ul className="grid four">
              {site.team.map(([n, r, d]) => (
                <li key={n}><div className="avatar" aria-hidden>{n[0]}</div><h3>{n}</h3><p className="role">{r}</p><p>{d}</p></li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="process" className="section">
          <Reveal>
            <h2>Kako izgleda tok posla</h2>
            <ol className="steps">
              {site.steps.map(([t, d]) => (<li key={t}><h3>{t}</h3><p>{d}</p></li>))}
            </ol>
          </Reveal>
        </section>

        <section id="faq" className="section">
          <Reveal>
            <h2>Pitanja koja često dobijamo</h2>
            <div className="faq">
              {site.faq.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section band">
          <Reveal>
            <h2>Recite nam šta treba dostići</h2>
            <div className="contact-grid">
              <div>
                <p className="lead">Pošaljite adresu i nekoliko fotografija. Odgovaramo u roku od jednog radnog dana, a fiksnu cenu dajemo posle obilaska lokacije.</p>
                <p className="lines"><a href={`mailto:${site.email}`}>{site.email}</a><br /><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a><br />{site.city}</p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} {site.name}, {site.city}</footer>
    </>
  );
}
