import { createFileRoute } from "@tanstack/react-router";
import { CONTACT, services } from "@/lib/site-data";
import { LIMITS, buildSystemPrompt, cleanTurns, replyTool, sanitizeReply } from "@/lib/assistant";

// Server endpoint for the site assistant. Needs the secret ANTHROPIC_API_KEY.
// Optional: ASSISTANT_MODEL (default below) and ANTHROPIC_BASE_URL (testing only).
// Without a key it answers 503 and the widget falls back to its built-in guided mode.

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const UPSTREAM_TIMEOUT_MS = 20_000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

// Best-effort per-isolate throttle. Add a Cloudflare rate-limiting rule on /api/chat for real protection.
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 30;
}

const readEnv = (name: string) => (typeof process !== "undefined" ? process.env?.[name] : undefined);

export const Route = createFileRoute("/api/chat")({
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

        const apiKey = readEnv("ANTHROPIC_API_KEY");
        if (!apiKey) return json({ error: "not_configured" }, 503);

        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        if (throttled(ip)) return json({ error: "rate_limited" }, 429);

        let turns;
        try {
          const raw = await request.text();
          if (raw.length > LIMITS.bodyBytes) return json({ error: "too_large" }, 413);
          turns = cleanTurns((JSON.parse(raw) as { messages?: unknown }).messages);
        } catch {
          return json({ error: "bad_request" }, 400);
        }
        if (!turns) return json({ error: "bad_request" }, 400);

        const base = (readEnv("ANTHROPIC_BASE_URL") || "https://api.anthropic.com").replace(/\/$/, "");
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
        try {
          const upstream = await fetch(`${base}/v1/messages`, {
            method: "POST",
            signal: controller.signal,
            headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
            body: JSON.stringify({
              model: readEnv("ASSISTANT_MODEL") || DEFAULT_MODEL,
              max_tokens: 700,
              temperature: 0.3,
              system: buildSystemPrompt({ services, contact: CONTACT }),
              messages: turns,
              tools: [replyTool],
              tool_choice: { type: "tool", name: replyTool.name },
            }),
          });
          if (!upstream.ok) {
            console.error(`assistant upstream error: ${upstream.status}`);
            return json({ error: "upstream" }, 502);
          }
          const data = (await upstream.json()) as { content?: Array<{ type: string; name?: string; input?: unknown; text?: string }> };
          const blocks = data.content ?? [];
          const tool = blocks.find((b) => b.type === "tool_use" && b.name === replyTool.name);
          const text = blocks.find((b) => b.type === "text")?.text;
          const reply = sanitizeReply(tool?.input ?? { message: text }, services);
          if (!reply) return json({ error: "empty" }, 502);
          return json({ mode: "ai", reply });
        } catch (error) {
          console.error("assistant request failed", error instanceof Error ? error.name : "unknown");
          return json({ error: "upstream" }, 502);
        } finally {
          clearTimeout(timer);
        }
      },
    },
  },
});
