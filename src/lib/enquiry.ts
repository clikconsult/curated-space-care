import { z } from "zod";
import { SITE_URL } from "@/lib/seo";

/** One definition of a valid enquiry, used by the form (browser) and by /api/contact (server). */
export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  property: z.string().min(1).max(100),
  service: z.string().min(1).max(100),
  date: z.string().min(1).max(30),
  location: z.string().trim().min(2).max(150),
  details: z.string().trim().max(1500),
});

/** What the server accepts: the enquiry plus a hidden "website" field that real visitors never fill in. */
export const enquiryPayload = enquirySchema.extend({ website: z.string().max(200).optional() });

export type Enquiry = z.infer<typeof enquirySchema>;

const oneLine = (s: string) => s.replace(/[\r\n\u2028\u2029]+/g, " ").trim();

export function enquirySubject(e: Enquiry) {
  return oneLine(`New website enquiry: ${e.service} - ${e.name}`).slice(0, 150);
}

export function enquiryText(e: Enquiry) {
  return [
    "New website enquiry for LESBEST",
    "",
    `Name: ${oneLine(e.name)}`,
    `Email: ${oneLine(e.email)}`,
    `Phone: ${oneLine(e.phone)}`,
    `Property location: ${oneLine(e.location)}`,
    `Preferred service date: ${oneLine(e.date)}`,
    `Type of property: ${oneLine(e.property)}`,
    `Service needed: ${oneLine(e.service)}`,
    "",
    "Details:",
    e.details || "(none given)",
    "",
    "Reply to this email to answer the customer directly.",
    `Sent from the contact form at ${SITE_URL}/contact`,
  ].join("\n");
}
