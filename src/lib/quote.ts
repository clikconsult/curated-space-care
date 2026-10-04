import { CONTACT, services } from "@/lib/site-data";

/*
 * Indicative rate card. Every figure here is a PLACEHOLDER pending the
 * company's real rate card — swap the numbers, not the structure.
 */

export const propertyTypes = [
  { slug: "apartment", label: "Apartment / flat", note: "A single home, up to three bedrooms", multiplier: 1 },
  { slug: "residence", label: "Private residence", note: "Duplex, family home or garden house", multiplier: 1.15 },
  { slug: "estate", label: "Estate / multiple units", note: "Blocks, serviced apartments or gated estates", multiplier: 1.05 },
  { slug: "office", label: "Office / workplace", note: "Suites, floors and corporate headquarters", multiplier: 1.1 },
  { slug: "commercial", label: "Retail / commercial", note: "Showrooms, banks, clinics and hospitality fronts", multiplier: 1.1 },
  { slug: "industrial", label: "Industrial facility", note: "Warehouses, plants and production floors", multiplier: 1.2 },
  { slug: "shortlet", label: "Short-let / hospitality", note: "Guest-ready apartments and turnover units", multiplier: 1.25 },
] as const;

export const frequencies = [
  { slug: "one-off", label: "One-off visit", visitsPerMonth: 1, multiplier: 1 },
  { slug: "weekly", label: "Weekly", visitsPerMonth: 4, multiplier: 0.82 },
  { slug: "fortnightly", label: "Fortnightly", visitsPerMonth: 2, multiplier: 0.88 },
  { slug: "monthly", label: "Monthly", visitsPerMonth: 1, multiplier: 0.95 },
  { slug: "daily", label: "Daily turnover", visitsPerMonth: 22, multiplier: 0.72 },
] as const;

export const addOns = [
  { slug: "upholstery", label: "Upholstery & carpet refresh", price: 15000 },
  { slug: "cupboards", label: "Inside cupboards & appliances", price: 9000 },
  { slug: "glass", label: "Interior glass & fittings", price: 7000 },
  { slug: "renovation", label: "Post-renovation finish", price: 22000 },
  { slug: "presentation", label: "Linen & fragrance presentation", price: 6000 },
] as const;

const rates: Record<string, { perSqm: number; min: number }> = {
  home: { perSqm: 180, min: 35000 },
  "deep-cleaning": { perSqm: 420, min: 85000 },
  fumigation: { perSqm: 90, min: 25000 },
  resident: { perSqm: 150, min: 40000 },
  maintenance: { perSqm: 120, min: 30000 },
  industrial: { perSqm: 200, min: 150000 },
};

const DEFAULT_RATE = { perSqm: 180, min: 35000 };

export type EstimateInput = {
  propertySlug: string;
  serviceSlug: string;
  sqm: number;
  frequencySlug: string;
  addOnSlugs: string[];
};

export type Estimate = {
  visitLow: number;
  visitHigh: number;
  monthlyLow: number;
  monthlyHigh: number;
  visitsPerMonth: number;
  recurring: boolean;
  extrasTotal: number;
  frequencyLabel: string;
  propertyLabel: string;
  serviceLabel: string;
};

const round1000 = (n: number) => Math.round(n / 1000) * 1000;

export function buildEstimate({ propertySlug, serviceSlug, sqm, frequencySlug, addOnSlugs }: EstimateInput): Estimate {
  const rate = rates[serviceSlug] ?? rates.home;
  const property = propertyTypes.find((p) => p.slug === propertySlug) ?? propertyTypes[0];
  const frequency = frequencies.find((f) => f.slug === frequencySlug) ?? frequencies[0];
  const service = services.find((s) => s.slug === serviceSlug) ?? services[0];

  const base = Math.max(rate.min, sqm * rate.perSqm) * property.multiplier * frequency.multiplier;
  const extras = addOns
    .filter((a) => addOnSlugs.includes(a.slug))
    .reduce((total, a) => total + a.price, 0);

  const visitLow = round1000(base * 0.9 + extras);
  const visitHigh = round1000(base * 1.25 + extras);
  const recurring = frequency.visitsPerMonth > 1;

  return {
    visitLow,
    visitHigh,
    monthlyLow: round1000(visitLow * frequency.visitsPerMonth),
    monthlyHigh: round1000(visitHigh * frequency.visitsPerMonth),
    visitsPerMonth: frequency.visitsPerMonth,
    recurring,
    extrasTotal: extras,
    frequencyLabel: frequency.label,
    propertyLabel: property.label,
    serviceLabel: service.name,
  };
}

export function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

export function estimateWhatsAppLink(input: EstimateInput) {
  const e = buildEstimate(input);
  const extras = addOns.filter((a) => input.addOnSlugs.includes(a.slug)).map((a) => a.label);
  const headline = e.recurring
    ? `${formatNaira(e.monthlyLow)} – ${formatNaira(e.monthlyHigh)} per month`
    : `${formatNaira(e.visitLow)} – ${formatNaira(e.visitHigh)} for the visit`;

  const message = [
    "Hello LESBEST, I've built an estimate on your website and I'd like to take it further.",
    "",
    `Property: ${e.propertyLabel}`,
    `Service: ${e.serviceLabel}`,
    `Size: about ${input.sqm} m²`,
    `Frequency: ${e.frequencyLabel}`,
    `Extras: ${extras.length ? extras.join(", ") : "None"}`,
    `Indicative range shown: ${headline}`,
    "",
    "Could you confirm availability and a firm price?",
  ].join("\n");

  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
