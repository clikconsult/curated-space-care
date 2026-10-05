import { createOpenAI } from "@ai-sdk/openai";

import { createLovableAiGatewayRunIdFetch } from "./ai-run-id.server";

/** Server-only: builds the Lovable AI Gateway Responses provider per request. */
export const ADVICE_MODEL = "openai/gpt-6-astra";
export const GATEWAY_BASE_URL = "https://ai.gateway.lovable.dev";

export function createLovableAiResponses(options: { apiKey: string; model: string }) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(undefined);
  const provider = createOpenAI({
    baseURL: `${GATEWAY_BASE_URL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: options.apiKey,
    headers: {
      "Lovable-API-Key": options.apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    fetch: runIdFetch.fetch,
  });
  return { provider, getRunId: runIdFetch.getRunId };
}
