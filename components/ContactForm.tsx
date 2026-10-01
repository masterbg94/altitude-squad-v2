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
    return <p className="form-ok" role="status">Thanks, we got your request. We'll reply within one working day.</p>;

  return (
    <form onSubmit={submit} className="form">
      <label>Name<input name="name" required maxLength={80} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
      <label>What do you need?
        <select name="service" defaultValue="">
          <option value="" disabled>Choose a service</option>
          {site.services.map(([t]) => <option key={t}>{t}</option>)}
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="wide">Tell us about the job
        <textarea name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Address, height, what needs doing, preferred dates" />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
      <button className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Send request"}</button>
      {state === "error" && <p className="form-err" role="alert">{msg} You can also email {site.email}.</p>}
    </form>
  );
}
