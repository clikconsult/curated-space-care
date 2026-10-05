import living from "@/assets/lesbest-living.jpg";
import kitchen from "@/assets/lesbest-kitchen.jpg";
import office from "@/assets/lesbest-office.jpg";
import suite from "@/assets/lesbest-suite.jpg";
import deepCleanTeam from "@/assets/lesbest-deep-cleaning.webp";

export const images = { living, kitchen, office, suite };

export const services = [
  { slug: "industrial", name: "Industrial Cleaning", short: "Scheduled care for factories, warehouses and production floors.", image: industrialFloor, imageAlt: "A Lesbest cleaner squeegeeing the wet floor of a food-and-beverage production plant", imagePos: "50% 50%", homeImage: homeCardIndustrialImg, homeImageAlt: "A Lesbest team cleaning a production plant, with a ride-on floor scrubber, vacuuming and a supervisor checking progress", homeImagePos: "50% 40%", included: ["Programmes built around your operating hours", "Heavy-duty floor and surface treatment", "Compliance-ready sanitation standards"], suitable: "Factories, warehouses, production floors and industrial facilities across Akwa Ibom" },
  { slug: "deep-cleaning", name: "Deep Cleaning", short: "A full, top-to-bottom reset for a property that needs more than a routine pass.", image: deepCleanTeam, imageAlt: "Two Lesbest cleaners buffing a marble floor and vacuuming a sofa in a luxury living room", imagePos: "50% 50%", homeImage: servicesHeroImg, homeImageAlt: "A Lesbest cleaner with a trolley and floor buffer resetting a duplex living room", homeImagePos: "100% 50%", included: ["Detailed high and low-level clean", "Appliance and joinery attention", "Post-renovation dust and residue removal"], suitable: "Move-ins, post-renovation spaces and seasonal resets" },
  { slug: "home", name: "Home Cleaning", short: "Immaculate, discreet care for exceptional homes.", image: homeCleaningImg, imageAlt: "A Lesbest cleaner vacuuming the marble floor of an open-plan living room", imagePos: "55% 50%", homeImage: homeCardHomeImg, homeImageAlt: "A Lesbest cleaner dusting a wooden console in a bright living room", homeImagePos: "55% 50%", included: ["Tailored room-by-room care", "Kitchen and bathroom detailing", "Surface and finish-specific methods"], suitable: "Private homes and family residences across Uyo and Akwa Ibom State" },
  { slug: "resident", name: "Resident Cleaning", short: "Ongoing service for estates and residences, with a team who knows the property.", image: residentImg, imageAlt: "A smiling Lesbest cleaner in uniform standing in a bright residence lobby", imagePos: "30% 50%", homeImage: homeCardResidentImg, homeImageAlt: "A Lesbest cleaner dusting a console table in a residence living room", homeImagePos: "55% 50%", included: ["Consistent, familiar team on every visit", "Estate and common-area care", "Flexible scheduling"], suitable: "Estates, residences and serviced apartments" },
  { slug: "fumigation", name: "Fumigation", short: "Pest control and treatment, done safely and discreetly.", image: fumigationImg, imageAlt: "A Lesbest technician in a respirator spraying a pest treatment along a skirting board", imagePos: "45% 50%", homeImage: homeCardFumigationImg, homeImageAlt: "A Lesbest technician in a respirator and safety goggles carrying a sprayer through a luxury suite", homeImagePos: "82% 50%", included: ["Full property inspection", "Treatment safe for people and pets once cleared", "Follow-up care on request"], suitable: "Homes and commercial spaces across Uyo, Akwa Ibom, Calabar and Port Harcourt" },
  { slug: "maintenance", name: "Maintenance Services", short: "A standing arrangement so your space stays exactly as it was left.", image: maintenanceImg, imageAlt: "A Lesbest technician repairing a kitchen cabinet with a toolbox beside him", imagePos: "60% 50%", homeImage: homeCardMaintenanceImg, homeImageAlt: "A Lesbest maintenance technician fixing a cabinet hinge under a reception counter, with a toolbox on the floor", homeImagePos: "0% 50%", included: ["Year-round scheduled upkeep", "Consistent standards, visit after visit", "Priority attention for standing clients"], suitable: "Offices, residences and facilities that need ongoing care" },
] as const;

import industrialFloor from "@/assets/lesbest-industrial-cleaning.webp";
import homeCleaningImg from "@/assets/lesbest-home-cleaning-vacuum.webp";
import residentImg from "@/assets/lesbest-resident-cleaning-lobby.webp";
import fumigationImg from "@/assets/lesbest-fumigation-treatment.webp";
import maintenanceImg from "@/assets/lesbest-maintenance-technician.webp";
import servicesHeroImg from "@/assets/lesbest-services-hero-team.webp";
import aboutHeroImg from "@/assets/lesbest-about-hero-living-room.webp";
import aboutDetailsImg from "@/assets/lesbest-about-details.webp";
import aboutTeamImg from "@/assets/lesbest-about-team-at-work.webp";
import portfolioHeroImg from "@/assets/lesbest-portfolio-hero-kitchen.webp";
import contactHeroImg from "@/assets/lesbest-contact-reception.webp";
import closingLivingImg from "@/assets/lesbest-home-closing-living-room.webp";
import consultImg from "@/assets/lesbest-home-consultation.webp";
import journalPropertyCareImg from "@/assets/lesbest-journal-property-care.webp";
import journalRainyImg from "@/assets/lesbest-journal-rainy-season.webp";
import journalWorkplaceImg from "@/assets/lesbest-journal-workplace.webp";
import journalGuestImg from "@/assets/lesbest-journal-guest-ready.webp";
import homeCardIndustrialImg from "@/assets/lesbest-home-card-industrial.webp";
import homeCardHomeImg from "@/assets/lesbest-home-card-home-cleaning.webp";
import homeCardResidentImg from "@/assets/lesbest-home-card-resident.webp";
import homeCardFumigationImg from "@/assets/lesbest-home-card-fumigation.webp";
import homeCardMaintenanceImg from "@/assets/lesbest-home-card-maintenance.webp";
import cardQuietArtImg from "@/assets/lesbest-journal-card-quiet-art.webp";
import cardRainyImg from "@/assets/lesbest-journal-card-rainy-season.webp";
import cardWorkplaceImg from "@/assets/lesbest-journal-card-workplace.webp";
import cardGuestImg from "@/assets/lesbest-journal-card-guest-ready.webp";

export const photos = {
  servicesHero: { src: servicesHeroImg, alt: "Two Lesbest cleaners polishing the marble floor of a duplex living room with a floor buffer and cleaning trolley" },
  aboutHero: { src: aboutHeroImg, alt: "A wide luxury living room with polished marble floors and a view of palm trees" },
  aboutDetails: { src: aboutDetailsImg, alt: "A stone ledge in a Nigerian home with a tea tray, books and plants beside a garden window" },
  aboutTeam: { src: aboutTeamImg, alt: "Three Lesbest cleaners dusting, vacuuming and restocking a cleaning cart in a living room" },
  portfolioHero: { src: portfolioHeroImg, alt: "A Lesbest cleaner wiping a marble kitchen island in a modern Nigerian home" },
  contactHero: { src: contactHeroImg, alt: "A bright marble reception area with a sofa and palm trees beyond the glass doors" },
  closingLiving: { src: closingLivingImg, alt: "A calm marble living room with palm trees outside the sliding doors" },
  consult: { src: consultImg, alt: "A Lesbest cleaner walking a client through a sunlit living room before a clean" },
  journalHero: { src: journalPropertyCareImg, alt: "A double-height duplex living room with polished floors and garden views" },
};

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
    image: journalPropertyCareImg,
    imageAlt: "A double-height duplex living room with polished floors and garden views",
    cardImage: cardQuietArtImg,
    cardImageAlt: "A Lesbest cleaner in black gloves polishing a marble table in a warm, softly lit living room",
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
    image: journalRainyImg,
    imageAlt: "A Lesbest cleaner wiping the floor by sliding doors while rain falls outside",
    cardImage: cardRainyImg,
    cardImageAlt: "A Lesbest technician in a cap and black gloves clearing leaves from a roof gutter in the rain",
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
    image: journalWorkplaceImg,
    imageAlt: "A Lesbest cleaner polishing a marble reception desk in an office lobby",
    cardImage: cardWorkplaceImg,
    cardImageAlt: "A Lesbest cleaner wiping a boardroom table in a bright open-plan office",
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
    image: journalGuestImg,
    imageAlt: "A Lesbest cleaner finishing a guest bedroom with a white and burnt-orange bed",
    cardImage: cardGuestImg,
    cardImageAlt: "A Lesbest cleaner placing a pillow and a welcome tray on a guest bed",
    intro: "Preparing a home for guests shouldn't mean a frantic weekend of catching up on everything that's been postponed. It should be a calm, deliberate pass through the spaces that matter most.",
    sections: [
      { heading: "Start with where people gather", text: "Living areas, guest bathrooms and the kitchen carry the most attention during a visit. Beginning there, rather than working room by room in order, makes the biggest difference for the least effort." },
      { heading: "The small touches that finish the job", text: "Fresh linens, uncluttered surfaces and a home that smells the way it should complete the impression. These details are quick to arrange once the deeper clean is already done." },
    ],
    quote: "A guest-ready home isn't about perfection everywhere. It's about care exactly where it will be noticed.",
  },
] as const;
