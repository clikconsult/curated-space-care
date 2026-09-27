import living from "@/assets/lesbest-living.jpg";
import kitchen from "@/assets/lesbest-kitchen.jpg";
import office from "@/assets/lesbest-office.jpg";
import suite from "@/assets/lesbest-suite.jpg";

export const images = { living, kitchen, office, suite };

export const services = [
  { slug: "industrial", name: "Industrial Cleaning", short: "Scheduled care for factories, warehouses and production floors.", image: office, included: ["Programmes built around your operating hours", "Heavy-duty floor and surface treatment", "Compliance-ready sanitation standards"], suitable: "Factories, warehouses, production floors and industrial facilities across Akwa Ibom" },
  { slug: "deep-cleaning", name: "Deep Cleaning", short: "A full, top-to-bottom reset for a property that needs more than a routine pass.", image: kitchen, included: ["Detailed high and low-level clean", "Appliance and joinery attention", "Post-renovation dust and residue removal"], suitable: "Move-ins, post-renovation spaces and seasonal resets" },
  { slug: "home", name: "Home Cleaning", short: "Immaculate, discreet care for exceptional homes.", image: living, included: ["Tailored room-by-room care", "Kitchen and bathroom detailing", "Surface and finish-specific methods"], suitable: "Private homes and family residences across Uyo and Akwa Ibom State" },
  { slug: "resident", name: "Resident Cleaning", short: "Ongoing service for estates and residences, with a team who knows the property.", image: suite, included: ["Consistent, familiar team on every visit", "Estate and common-area care", "Flexible scheduling"], suitable: "Estates, residences and serviced apartments" },
  { slug: "fumigation", name: "Fumigation", short: "Pest control and treatment, done safely and discreetly.", image: living, included: ["Full property inspection", "Treatment safe for people and pets once cleared", "Follow-up care on request"], suitable: "Homes and commercial spaces across Uyo, Akwa Ibom, Calabar and Port Harcourt" },
  { slug: "maintenance", name: "Maintenance Services", short: "A standing arrangement so your space stays exactly as it was left.", image: office, included: ["Year-round scheduled upkeep", "Consistent standards, visit after visit", "Priority attention for standing clients"], suitable: "Offices, residences and facilities that need ongoing care" },
] as const;

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

export const projects = [] as const;

export const articles = [
  { slug: "quiet-art-of-property-care", category: "Property Care", date: "18 September 2026", title: "The quiet art of exceptional property care", excerpt: "Why the finest homes in Uyo are maintained through anticipation, consistency and an eye for what others miss.", image: living },
  { slug: "rainy-season-care", category: "Expert Advice", date: "02 September 2026", title: "Guarding your property through the rainy season", excerpt: "A considered guide to protecting surfaces, fabrics and finishes against Akwa Ibom's humidity and rains.", image: kitchen },
  { slug: "workplace-standard", category: "Business", date: "19 August 2026", title: "What a well-kept workplace says before you do", excerpt: "The subtle signals that shape a client's first impression.", image: office },
  { slug: "guest-ready-home", category: "Home", date: "05 August 2026", title: "The considered way to prepare a home for guests", excerpt: "A calm, room-by-room approach to creating an effortless welcome.", image: suite },
] as const;
