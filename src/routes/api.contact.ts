import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";
import { enquiryPayload, enquirySubject, enquiryText } from "@/lib/enquiry";

// Contact-form endpoint: validates the enquiry and emails it over SMTP with Nodemailer.
// Needs these environment variables on the host:
//   SMTP_HOST           e.g. mail.example.com
//   SMTP_USER           mailbox login (usually the full address)
//   SMTP_PASS           mailbox password
//   CONTACT_TO_EMAIL    where enquiries are delivered
// Optional:
//   SMTP_PORT           default 465 (implicit TLS); 587 uses STARTTLS
//   CONTACT_FROM_EMAIL  default "LESBEST Website <SMTP_USER>"; most mail servers only accept the mailbox's own address
// Without the required variables it answers 503 and the form tells the visitor to use WhatsApp or phone.

const MAX_BODY_BYTES = 8_000;
const SMTP_TIMEOUT_MS = 15_000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

// Best-effort per-instance throttle. Add a Vercel firewall rate-limit rule on /api/contact for real protection.
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const readEnv = (name: string) => (typeof process !== "undefined" ? process.env?.[name] : undefined);

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      GET: () => json({ error: "method_not_allowed" }, 405),
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (origin) {
          try {
            if (new URL(origin).host !== new URL(request.url).host) return json({ error: "forbidden" }, 403);
          } catch {
            return json({ error: "forbidden" }, 403);
          }
        }

        let payload;
        try {
          const raw = await request.text();
          if (raw.length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);
          const parsed = enquiryPayload.safeParse(JSON.parse(raw));
          if (!parsed.success) return json({ error: "invalid" }, 400);
          payload = parsed.data;
        } catch {
          return json({ error: "bad_request" }, 400);
        }

        // Bots fill every field. Pretend it worked, send nothing.
        if (payload.website) return json({ ok: true });

        const host = readEnv("SMTP_HOST");
        const user = readEnv("SMTP_USER");
        const pass = readEnv("SMTP_PASS");
        const to = readEnv("CONTACT_TO_EMAIL");
        if (!host || !user || !pass || !to) return json({ error: "not_configured" }, 503);
        const port = Number(readEnv("SMTP_PORT")) || 465;

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        if (throttled(ip)) return json({ error: "rate_limited" }, 429);

        const { website: _ignored, ...enquiry } = payload;
        try {
          const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
            connectionTimeout: SMTP_TIMEOUT_MS,
            greetingTimeout: SMTP_TIMEOUT_MS,
            socketTimeout: SMTP_TIMEOUT_MS,
          });
          await transporter.sendMail({
            from: readEnv("CONTACT_FROM_EMAIL") || `LESBEST Website <${user}>`,
            to,
            replyTo: enquiry.email,
            subject: enquirySubject(enquiry),
            text: enquiryText(enquiry),
          });
          return json({ ok: true });
        } catch (err) {
          console.error("contact email error", err instanceof Error ? err.name : "unknown");
          return json({ error: "send_failed" }, 502);
        }
      },
    },
  },
});
