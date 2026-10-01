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
        <nav aria-label="Main">
          <a href="#services">Services</a><a href="#industries">Industries</a><a href="#safety">Safety</a><a href="#team">Team</a><a href="#faq">FAQ</a>
          <a href="#contact" className="btn sm">Get a quote</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <h1>We work where the ladder ends.</h1>
            <p className="lead">{site.tagline} Four rope access technicians in {site.city}: cleaning, inspection, repair and painting on tall buildings, bridges and towers.</p>
            <div className="cta">
              <a className="btn" href="#contact">Get a free quote</a>
              <a className="btn ghost" href="#services">See what we do</a>
            </div>
          </div>
          <HeroScene />
        </section>

        <section id="services" className="section">
          <Reveal>
            <h2>Everything we do at height</h2>
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
            <h2>Where we work</h2>
            <ul className="chips">{site.industries.map((i) => <li key={i}>{i}</li>)}</ul>
          </Reveal>
        </section>

        <section id="safety" className="section">
          <Reveal>
            <h2>Why a small team works better</h2>
            <div className="cols">
              {site.reasons.map(([t, d]) => (<div key={t}><h3>{t}</h3><p>{d}</p></div>))}
            </div>
          </Reveal>
        </section>

        <section id="team" className="section">
          <Reveal>
            <h2>Meet the four of us</h2>
            <ul className="grid four">
              {site.team.map(([n, r, d]) => (
                <li key={n}><div className="avatar" aria-hidden>{n[0]}</div><h3>{n}</h3><p className="role">{r}</p><p>{d}</p></li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="process" className="section">
          <Reveal>
            <h2>How a job works</h2>
            <ol className="steps">
              {site.steps.map(([t, d]) => (<li key={t}><h3>{t}</h3><p>{d}</p></li>))}
            </ol>
          </Reveal>
        </section>

        <section id="faq" className="section">
          <Reveal>
            <h2>Questions we get often</h2>
            <div className="faq">
              {site.faq.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section band">
          <Reveal>
            <h2>Tell us what needs reaching</h2>
            <div className="contact-grid">
              <div>
                <p className="lead">Send the address and a few photos. We reply within one working day and quote a fixed price after a site visit.</p>
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
