import { normalise, validate } from "@/lib/enquiry";
import { site } from "@/content/site";

/**
 * Enquiry endpoint. Delivers the enquiry by email through Resend.
 *
 * Required environment variables (see .env.example):
 *   RESEND_API_KEY     — API key from resend.com
 *   ENQUIRY_TO_EMAIL   — inbox that receives enquiries
 *   ENQUIRY_FROM_EMAIL — verified sender, e.g. "Website <enquiries@yourdomain.co.uk>"
 *
 * If delivery is not configured the endpoint says so (503) rather than
 * pretending the message was sent; the form then offers the phone number.
 */

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many enquiries from this connection. Please try again later or call us." }, { status: 429 });
  }

  const input = normalise(body);
  const errors = validate(input);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    console.error("[enquiry] Email delivery is not configured (RESEND_API_KEY / ENQUIRY_TO_EMAIL / ENQUIRY_FROM_EMAIL).");
    return Response.json(
      { ok: false, error: `Online enquiries are temporarily unavailable. Please call us on ${site.phone.display}.` },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["Project type", input.projectType || "—"],
    ["Project location", input.location || "—"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${input.message}`;
  const html = `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#63676d">${k}</td><td style="padding:4px 0">${escape(v)}</td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escape(input.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL,
        to: ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: input.email,
        subject: `Website enquiry — ${input.projectType || "General"} — ${input.name}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend error", res.status, await res.text());
      throw new Error("send failed");
    }
  } catch {
    return Response.json(
      { ok: false, error: `Sorry, your enquiry could not be sent. Please try again or call us on ${site.phone.display}.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
