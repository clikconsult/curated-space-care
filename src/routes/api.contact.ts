import { createFileRoute } from "@tanstack/react-router";
import { enquiryPayload, enquirySubject, enquiryText } from "@/lib/enquiry";

// Contact-form endpoint: validates the enquiry and emails it through Resend.
// Needs two environment variables on the host:
//   RESEND_API_KEY      secret key from resend.com
//   CONTACT_TO_EMAIL    where enquiries are delivered
// Optional:
//   CONTACT_FROM_EMAIL  default "LESBEST Website <onboarding@resend.dev>" (Resend's test sender, which can only
//                       deliver to the address that owns the Resend account). Switch to an address on a verified domain later.
//   RESEND_API_URL      testing only
// Without the two required variables it answers 503 and the form tells the visitor to use WhatsApp or phone.

const MAX_BODY_BYTES = 8_000;
const UPSTREAM_TIMEOUT_MS = 15_000;

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

        const apiKey = readEnv("RESEND_API_KEY");
        const to = readEnv("CONTACT_TO_EMAIL");
        if (!apiKey || !to) return json({ error: "not_configured" }, 503);

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        if (throttled(ip)) return json({ error: "rate_limited" }, 429);

        const { website: _ignored, ...enquiry } = payload;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
        try {
          const res = await fetch(readEnv("RESEND_API_URL") || "https://api.resend.com/emails", {
            method: "POST",
            headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
            body: JSON.stringify({
              from: readEnv("CONTACT_FROM_EMAIL") || "LESBEST Website <onboarding@resend.dev>",
              to: [to],
              reply_to: enquiry.email,
              subject: enquirySubject(enquiry),
              text: enquiryText(enquiry),
            }),
            signal: controller.signal,
          });
          if (!res.ok) {
            console.error("contact email failed", res.status);
            return json({ error: "send_failed" }, 502);
          }
          return json({ ok: true });
        } catch (err) {
          console.error("contact email error", err instanceof Error ? err.name : "unknown");
          return json({ error: "send_failed" }, 502);
        } finally {
          clearTimeout(timer);
        }
      },
    },
  },
});
