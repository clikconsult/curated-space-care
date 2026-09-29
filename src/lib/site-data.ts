import living from "@/assets/lesbest-living.jpg";
import kitchen from "@/assets/lesbest-kitchen.jpg";
import office from "@/assets/lesbest-office.jpg";
import suite from "@/assets/lesbest-suite.jpg";

export const images = { living, kitchen, office, suite };

export const services = [
  { slug: "industrial", name: "Industrial Cleaning", short: "Scheduled care for factories, warehouses and production floors.", image: industrialFloor, included: ["Programmes built around your operating hours", "Heavy-duty floor and surface treatment", "Compliance-ready sanitation standards"], suitable: "Factories, warehouses, production floors and industrial facilities across Akwa Ibom" },
  { slug: "deep-cleaning", name: "Deep Cleaning", short: "A full, top-to-bottom reset for a property that needs more than a routine pass.", image: kitchen, included: ["Detailed high and low-level clean", "Appliance and joinery attention", "Post-renovation dust and residue removal"], suitable: "Move-ins, post-renovation spaces and seasonal resets" },
  { slug: "home", name: "Home Cleaning", short: "Immaculate, discreet care for exceptional homes.", image: living, included: ["Tailored room-by-room care", "Kitchen and bathroom detailing", "Surface and finish-specific methods"], suitable: "Private homes and family residences across Uyo and Akwa Ibom State" },
  { slug: "resident", name: "Resident Cleaning", short: "Ongoing service for estates and residences, with a team who knows the property.", image: suite, included: ["Consistent, familiar team on every visit", "Estate and common-area care", "Flexible scheduling"], suitable: "Estates, residences and serviced apartments" },
  { slug: "fumigation", name: "Fumigation", short: "Pest control and treatment, done safely and discreetly.", image: living, included: ["Full property inspection", "Treatment safe for people and pets once cleared", "Follow-up care on request"], suitable: "Homes and commercial spaces across Uyo, Akwa Ibom, Calabar and Port Harcourt" },
  { slug: "maintenance", name: "Maintenance Services", short: "A standing arrangement so your space stays exactly as it was left.", image: office, included: ["Year-round scheduled upkeep", "Consistent standards, visit after visit", "Priority attention for standing clients"], suitable: "Offices, residences and facilities that need ongoing care" },
] as const;

import industrialFloor from "@/assets/lesbest-industrial-floor.webp";

export const CONTACT = {
  phoneDisplay: "+234 808 718 6804",
  whatsappNumber: "2348087186804",
  email: "info@lesbestcleaning.ng",
};

export function whatsappEnquiry(service?: string) {
  const message = service
    ? `Hello LESBEST, I'd like to enquire about your ${service} service. Could you share availability and pricing?`
    : "Hello LESBEST, I'd like to enquire about your services.";
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

type Project = { slug: string; title: string; location: string; category: string; service: string; image: string; summary: string };
export const projects: Project[] = [];

export const articles = [
  {
    slug: "quiet-art-of-property-care", category: "Property Care", date: "18 September 2026",
    title: "The quiet art of exceptional property care",
    excerpt: "Why the finest homes in Uyo are maintained through anticipation, consistency and an eye for what others miss.",
    image: living,
    intro: "The most beautifully maintained properties rarely feel managed. They simply feel composed: surfaces are clear, materials retain their character and every room is ready for the life that happens within it.",
    sections: [
      { heading: "Begin with the character of the space", text: "Exceptional care starts with observation. Natural stone asks for a different approach from timber; fine upholstery needs a different rhythm from a busy entrance. The right standard is never one-size-fits-all." },
      { heading: "Consistency creates calm", text: "A thoughtful routine protects both the finish of a property and the experience of living or working within it. Clear methods, dependable timing and careful final checks transform cleaning into genuine stewardship." },
    ],
    quote: "The best property care is precise enough to be seen, and discreet enough to feel effortless.",
  },
  {
    slug: "rainy-season-care", category: "Expert Advice", date: "02 September 2026",
    title: "Guarding your property through the rainy season",
    excerpt: "A considered guide to protecting surfaces, fabrics and finishes against Akwa Ibom's humidity and rains.",
    image: kitchen,
    intro: "Uyo's rainy season brings months of heavy, persistent rainfall — and with it, humidity that settles into every room, fabric and surface if it isn't managed with intention.",
    sections: [
      { heading: "Moisture finds what you miss", text: "Damp collects quietly in corners, behind furniture and inside cupboards long before it's visible. A considered programme checks these spaces on every visit, not just once a problem has already taken hold." },
      { heading: "Protecting materials, not just appearances", text: "Timber, upholstery and metal fittings all respond differently to sustained humidity. The right treatment slows deterioration and keeps a property feeling as considered in October as it does in January." },
    ],
    quote: "The rains test a property's care the way nothing else does — what looks fine in the dry season shows everything once the humidity sets in.",
  },
  {
    slug: "workplace-standard", category: "Business", date: "19 August 2026",
    title: "What a well-kept workplace says before you do",
    excerpt: "The subtle signals that shape a client's first impression.",
    image: office,
    intro: "Clients and staff form an impression of a business within seconds of walking in — long before a meeting starts or a pitch is made.",
    sections: [
      { heading: "The details people register without noticing", text: "Clear glass, unmarked floors and a reception area that feels attended to all signal the same thing: a business that takes care seriously, in ways both visible and unspoken." },
      { heading: "A standard that holds under pressure", text: "The real test isn't the first impression — it's whether that same standard holds on an ordinary Tuesday afternoon, mid-quarter, when no one is expecting a visitor. Scheduled, dependable care is what keeps it there." },
    ],
    quote: "A well-kept workplace makes its case before anyone says a word.",
  },
  {
    slug: "guest-ready-home", category: "Home", date: "05 August 2026",
    title: "The considered way to prepare a home for guests",
    excerpt: "A calm, room-by-room approach to creating an effortless welcome.",
    image: suite,
    intro: "Preparing a home for guests shouldn't mean a frantic weekend of catching up on everything that's been postponed. It should be a calm, deliberate pass through the spaces that matter most.",
    sections: [
      { heading: "Start with where people gather", text: "Living areas, guest bathrooms and the kitchen carry the most attention during a visit. Beginning there, rather than working room by room in order, makes the biggest difference for the least effort." },
      { heading: "The small touches that finish the job", text: "Fresh linens, uncluttered surfaces and a home that smells the way it should complete the impression. These details are quick to arrange once the deeper clean is already done." },
    ],
    quote: "A guest-ready home isn't about perfection everywhere. It's about care exactly where it will be noticed.",
  },
] as const;
