import { NoObjectGeneratedError, Output, streamText, type ModelMessage } from "ai";

import { frequencies } from "@/lib/quote";
import { services } from "@/lib/site-data";
import type { AdviceRecommendation } from "@/lib/advice.functions";
import { ADVICE_MODEL, createLovableAiResponses } from "@/lib/ai-gateway.server";

const outputSchema = z.strictObject({
  services: z.array(z.string()),
  frequency: z.string(),
  summary: z.string(),
  enquiry: z.string(),
});

const catalogue = services
  .map((s) => `- ${s.slug} — ${s.name}: ${s.short} Suitable for: ${s.suitable}`)
  .join("\n");
const frequencyOptions = frequencies.map((f) => f.label).join(", ");

const systemPrompt = `You are the client advisor for LESBEST, a professional cleaning and property-care company serving private homes, estates, offices, industrial facilities and short-let apartments in Uyo, Eket, Akwa Ibom and surrounding areas.

A prospective client describes their property and what it needs. Do four things:
1. Pick between one and three services, using slugs copied exactly from this catalogue:
${catalogue}
2. Suggest a service frequency, choosing one of: ${frequencyOptions}. If the brief does not clearly suggest one, return an empty string.
3. Write a summary of at most two sentences in a warm, confident, plain-spoken voice — how LESBEST would approach this brief. It must read as if written by the company, not a chatbot.
4. Draft a WhatsApp-ready enquiry in the client's own voice, at most 90 words. It must state the property type and location, the needs, the suggested frequency if any, and ask for availability and pricing. Never invent prices, dates, promises or contact details.

Rules: never recommend a service outside the catalogue; British spelling; no emoji; no markdown.`;

type AdviceBrief = { property: string; location: string; details: string };

function friendlyError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("402") || m.includes("credit")) {
    return "Our advisor is taking a short break. You can still reach us instantly on WhatsApp.";
  }
  if (m.includes("401") || m.includes("apikey") || m.includes("api key")) {
    return "Our advisor isn't connected right now. Please send us a WhatsApp enquiry instead.";
  }
  return "Our advisor couldn't be reached just now. Please try again, or send us a WhatsApp enquiry.";
}

export async function recommendBrief(input: AdviceBrief): Promise<AdviceRecommendation> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    return { ok: false, error: "Our advisor isn't connected right now. Please send us a WhatsApp enquiry instead." };
  }

  const messages: ModelMessage[] = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `Property type: ${input.property}\nLocation: ${input.location || "not given"}\nBrief: ${input.details}`,
    },
  ];

  try {
    const { provider } = createLovableAiResponses({ apiKey, model: ADVICE_MODEL });
    const result = streamText({
      model: provider.responses(ADVICE_MODEL),
      messages,
      output: Output.object({ schema: outputSchema }),
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "medium",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    let parsed: z.infer<typeof outputSchema>;
    try {
      parsed = await result.output;
    } catch (error) {
      if (!NoObjectGeneratedError.isInstance(error)) throw error;
      try {
        parsed = outputSchema.parse(JSON.parse(error.text ?? ""));
      } catch {
        return { ok: false, error: friendlyError("review") };
      }
    }

    const bySlug = new Map<string, (typeof services)[number]>(services.map((s) => [s.slug, s]));
    const recommended = [...new Set(parsed.services)]
      .map((slug) => bySlug.get(slug))
      .filter((s): s is (typeof services)[number] => Boolean(s))
      .slice(0, 3)
      .map((s) => ({ slug: s.slug, name: s.name, short: s.short }));

    if (!recommended.length) {
      return { ok: false, error: friendlyError("review") };
    }

    const frequencyLabel = frequencies.find((f) => f.label === parsed.frequency)?.label ?? "";
    return {
      ok: true,
      services: recommended,
      frequency: frequencyLabel,
      summary: parsed.summary.trim().slice(0, 400),
      enquiry: parsed.enquiry.trim().slice(0, 700),
    };
  } catch (error) {
    console.error("advice brief failed:", error);
    const message = error instanceof Error ? error.message : "";
    return { ok: false, error: friendlyError(message) };
  }
}

import { z } from "zod";
