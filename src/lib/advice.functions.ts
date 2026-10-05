import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type RecommendedService = { slug: string; name: string; short: string };

export type AdviceRecommendation = {
  ok: boolean;
  error?: string;
  services?: RecommendedService[];
  frequency?: string;
  summary?: string;
  enquiry?: string;
};

const inputSchema = z.object({
  property: z.string().min(1).max(80),
  location: z.string().max(140),
  details: z.string().min(20).max(2000),
});

export const recommendServices = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { recommendBrief } = await import("./advice.server");
    return recommendBrief(data);
  });
