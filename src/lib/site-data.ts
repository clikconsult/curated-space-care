import living from "@/assets/lesbest-living.jpg";
import kitchen from "@/assets/lesbest-kitchen.jpg";
import office from "@/assets/lesbest-office.jpg";
import suite from "@/assets/lesbest-suite.jpg";

export const images = { living, kitchen, office, suite };

export const services = [
  { slug: "residential", name: "Residential Cleaning", short: "Immaculate, discreet care for exceptional homes.", image: living, included: ["Tailored room-by-room care", "Kitchen and bathroom detailing", "Surface and finish-specific methods"], suitable: "Private homes, penthouses and executive apartments" },
  { slug: "commercial", name: "Commercial Cleaning", short: "Dependable standards for places where business happens.", image: office, included: ["Daily or scheduled programmes", "Workplace and shared-area care", "Out-of-hours attendance"], suitable: "Offices, studios, hospitality and premium facilities" },
  { slug: "deep-cleaning", name: "Deep Cleaning", short: "Intensive attention that restores clarity to every surface.", image: kitchen, included: ["Detailed high and low-level clean", "Appliance and joinery attention", "Build-up and residue removal"], suitable: "Seasonal resets, neglected spaces and special occasions" },
  { slug: "move", name: "Move-In / Move-Out", short: "Perfectly prepared spaces for effortless arrivals and handovers.", image: suite, included: ["Inside cupboards and appliances", "Fixtures, floors and glass", "Final inspection and handover"], suitable: "Homeowners, tenants, landlords and property managers" },
  { slug: "upholstery", name: "Upholstery & Carpet Care", short: "Considered treatment for fine fabrics and soft surfaces.", image: living, included: ["Fibre assessment", "Low-moisture and extraction care", "Spot and odour treatment"], suitable: "Fine upholstery, rugs, carpets and hospitality seating" },
  { slug: "specialist", name: "Specialist Cleaning", short: "A precise response to complex spaces and exacting briefs.", image: office, included: ["Bespoke scope and method", "Post-project and event resets", "Delicate material protocols"], suitable: "Architectural properties, show homes and specialist facilities" },
] as const;

export const projects = [
  { slug: "belgravia-residence", title: "Belgravia Residence", location: "Central London", category: "Residential", service: "Residential care", image: living, summary: "A discreet weekly programme for an art-filled family residence." },
  { slug: "harbour-kitchen", title: "Harbour House", location: "South Coast", category: "Deep Cleaning", service: "Deep clean", image: kitchen, summary: "A precise seasonal reset across natural stone, timber and metal." },
  { slug: "mayfair-office", title: "Mayfair Office", location: "London W1", category: "Commercial", service: "Commercial care", image: office, summary: "Out-of-hours care for an executive workplace and client suite." },
  { slug: "cliffside-suite", title: "Cliffside Suite", location: "Dorset", category: "Specialist", service: "Specialist care", image: suite, summary: "A hospitality-standard preparation before the property launch." },
  { slug: "chelsea-townhouse", title: "Chelsea Townhouse", location: "London SW3", category: "Residential", service: "Move-in care", image: kitchen, summary: "A complete handover clean before the owners returned home." },
  { slug: "private-retreat", title: "Private Retreat", location: "Surrey", category: "Specialist", service: "Upholstery care", image: living, summary: "Fine-fabric care throughout an extensively furnished retreat." },
] as const;

export const articles = [
  { slug: "quiet-art-of-property-care", category: "Property Care", date: "18 September 2026", title: "The quiet art of exceptional property care", excerpt: "Why the finest homes are maintained through anticipation, consistency and an eye for what others miss.", image: living },
  { slug: "natural-stone", category: "Expert Advice", date: "02 September 2026", title: "Caring for natural stone without compromising its character", excerpt: "A considered guide to preserving marble, travertine and limestone.", image: kitchen },
  { slug: "workplace-standard", category: "Business", date: "19 August 2026", title: "What a well-kept workplace says before you do", excerpt: "The subtle signals that shape a client's first impression.", image: office },
  { slug: "guest-ready-home", category: "Home", date: "05 August 2026", title: "The considered way to prepare a home for guests", excerpt: "A calm, room-by-room approach to creating an effortless welcome.", image: suite },
] as const;