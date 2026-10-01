import { NextResponse } from "next/server";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

export async function POST(req: Request) {
  const d = await req.json().catch(() => null);
  if (!d) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (d.website) return NextResponse.json({ ok: true }); // honeypot: bots fill this
  const name = String(d.name ?? "").trim().slice(0, 80);
  const email = String(d.email ?? "").trim().slice(0, 120);
  const message = String(d.message ?? "").trim().slice(0, 3000);
  const phone = String(d.phone ?? "").slice(0, 40);
  const service = String(d.service ?? "").slice(0, 80);
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 10)
    return NextResponse.json({ error: "Please check name, email and message." }, { status: 400 });

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.log("[contact form, email not configured]", { name, email, phone, service, message });
    if (process.env.NODE_ENV === "production")
      return NextResponse.json({ error: "The form is not set up yet." }, { status: 500 });
    return NextResponse.json({ ok: true });
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
      to, reply_to: email, subject: `Quote request from ${name}`,
      html: `<p><b>${esc(name)}</b> (${esc(email)}, ${esc(phone)})</p><p>Service: ${esc(service)}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Could not send the message." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
