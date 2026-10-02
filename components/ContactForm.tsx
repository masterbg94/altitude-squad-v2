"use client";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("ok"); form.reset();
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "ok")
    return <p className="form-ok" role="status">Hvala, primili smo vaš zahtev. Odgovaramo u roku od jednog radnog dana.</p>;

  return (
    <form onSubmit={submit} className="form">
      <label>Ime<input name="name" required maxLength={80} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Telefon (opciono)<input name="phone" type="tel" autoComplete="tel" /></label>
      <label>Šta vam treba?
        <select name="service" defaultValue="">
          <option value="" disabled>Izaberite uslugu</option>
          {site.services.map(([t]) => <option key={t}>{t}</option>)}
          <option>Jos ne znam</option>
        </select>
      </label>
      <label className="wide">Opišite posao
        <textarea name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Adresa, visina, šta treba uraditi, željeni datumi" />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
      <button className="btn" disabled={state === "sending"}>{state === "sending" ? "Šaljemo..." : "Pošaljite zahtev"}</button>
      {state === "error" && <p className="form-err" role="alert">{msg} Možete nam se javiti i na {site.email}.</p>}
    </form>
  );
}
