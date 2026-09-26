import living from "@/assets/lesbest-living.jpg";
import kitchen from "@/assets/lesbest-kitchen.jpg";
import office from "@/assets/lesbest-office.jpg";
import suite from "@/assets/lesbest-suite.jpg";

export const images = { living, kitchen, office, suite };

export const services = [
  { slug: "residential", name: "Residential Cleaning", short: "Immaculate, discreet care for exceptional homes.", image: living, included: ["Tailored room-by-room care", "Kitchen and bathroom detailing", "Surface and finish-specific methods"], suitable: "Private homes, penthouses and executive apartments across Ikoyi, Lekki and Victoria Island" },
  { slug: "commercial", name: "Commercial Cleaning", short: "Dependable standards for places where business happens.", image: office, included: ["Daily or scheduled programmes", "Workplace and shared-area care", "Out-of-hours attendance"], suitable: "Offices, studios, banks, showrooms and premium facilities" },
  { slug: "deep-cleaning", name: "Deep Cleaning", short: "Intensive attention that restores clarity to every surface.", image: kitchen, included: ["Detailed high and low-level clean", "Appliance and joinery attention", "Harmattan dust and residue removal"], suitable: "Seasonal resets, post-renovation spaces and special occasions" },
  { slug: "move", name: "Move-In / Move-Out", short: "Perfectly prepared spaces for effortless arrivals and handovers.", image: suite, included: ["Inside cupboards and appliances", "Fixtures, floors and glass", "Final inspection and handover"], suitable: "Homeowners, tenants, landlords and estate managers" },
  { slug: "upholstery", name: "Upholstery & Carpet Care", short: "Considered treatment for fine fabrics and soft surfaces.", image: living, included: ["Fibre assessment", "Low-moisture and extraction care", "Spot and odour treatment"], suitable: "Fine upholstery, rugs, carpets and hospitality seating" },
  { slug: "specialist", name: "Short-Let & Specialist Care", short: "A precise response to complex spaces and exacting briefs.", image: office, included: ["Guest-ready turnovers", "Post-project and event resets", "Delicate material protocols"], suitable: "Short-let apartments, show homes and specialist facilities" },
] as const;

export const CONTACT = {
  phoneDisplay: "+234 (0) 000 000 0000",
  whatsappNumber: "2340000000000",
  email: "hello@lesbest.ng",
};

export function whatsappEnquiry(service?: string) {
  const message = service
    ? `Hello LESBEST, I'd like to enquire about your ${service} service. Could you share availability and pricing?`
    : "Hello LESBEST, I'd like to enquire about your services.";
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const projects = [
  { slug: "ikoyi-residence", title: "Ikoyi Residence", location: "Ikoyi, Lagos", category: "Residential", service: "Residential care", image: living, summary: "A discreet weekly programme for an art-filled family residence." },
  { slug: "lekki-kitchen", title: "Lekki Phase 1 Home", location: "Lekki, Lagos", category: "Deep Cleaning", service: "Deep clean", image: kitchen, summary: "A precise post-harmattan reset across natural stone, timber and metal." },
  { slug: "vi-office", title: "Victoria Island Office", location: "Victoria Island, Lagos", category: "Commercial", service: "Commercial care", image: office, summary: "Out-of-hours care for an executive workplace and client suite." },
  { slug: "abuja-suite", title: "Maitama Suite", location: "Maitama, Abuja", category: "Specialist", service: "Specialist care", image: suite, summary: "A hospitality-standard preparation before the property launch." },
  { slug: "ikoyi-townhouse", title: "Banana Island Townhouse", location: "Banana Island, Lagos", category: "Residential", service: "Move-in care", image: kitchen, summary: "A complete handover clean before the owners returned home." },
  { slug: "short-let-retreat", title: "Oniru Short-Let", location: "Oniru, Lagos", category: "Specialist", service: "Upholstery care", image: living, summary: "Fine-fabric care throughout an extensively furnished short-let." },
] as const;

export const articles = [
  { slug: "quiet-art-of-property-care", category: "Property Care", date: "18 September 2026", title: "The quiet art of exceptional property care", excerpt: "Why the finest homes in Lagos are maintained through anticipation, consistency and an eye for what others miss.", image: living },
  { slug: "harmattan-dust", category: "Expert Advice", date: "02 September 2026", title: "Winning the quiet war against harmattan dust", excerpt: "A considered guide to protecting your home's surfaces through the dry season.", image: kitchen },
  { slug: "workplace-standard", category: "Business", date: "19 August 2026", title: "What a well-kept workplace says before you do", excerpt: "The subtle signals that shape a client's first impression.", image: office },
  { slug: "guest-ready-home", category: "Home", date: "05 August 2026", title: "The considered way to prepare a home for guests", excerpt: "A calm, room-by-room approach to creating an effortless welcome.", image: suite },
] as const;
