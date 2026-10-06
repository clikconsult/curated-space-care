// Long-form content for the dedicated service pages (/services/<slug>).
// Short descriptions, images and the first three "included" items live in site-data.ts.
// Keep claims general: no prices, certifications, response times or guarantees unless confirmed by the company.

export type ServiceContent = {
  headline: string;
  overview: string[];
  alsoIncluded: string[];
  idealFor: string[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

const areas = "We serve Uyo, Eket, Akwa Ibom and surrounding areas.";
const pricing = "It depends on the size of the property, its condition, the frequency of visits and access. Use the instant estimate for an indicative range, and we confirm the details after understanding your space.";

export const serviceContent: Record<string, ServiceContent> = {
  industrial: {
    headline: "Production floors that stay clean, safe and ready for the next shift.",
    overview: [
      "Industrial spaces ask more of a cleaning team than shine. Floors carry heavy traffic, drainage channels need attention, and sanitation standards matter as much as appearance. Our industrial programme is built around how your facility actually runs.",
      "After a walkthrough of the site, we agree a schedule that works around your operating hours, the surfaces involved and the standard your inspectors or clients expect. From there, the same trained team returns on a steady rhythm, so quality stays consistent from one visit to the next.",
    ],
    alsoIncluded: ["Drain, channel and corner detailing", "Equipment-zone and surrounding-area wipe-down", "Programme review as your operation changes"],
    idealFor: ["Food and beverage production plants", "Warehouses and distribution centres", "Factories and processing facilities", "Workshops and industrial parks"],
    steps: [
      { title: "Site walkthrough", text: "We visit, look at floors, equipment zones and traffic, and ask about your shifts and the standards you follow." },
      { title: "Programme proposal", text: "You receive a clear recommendation covering scope, frequency and timing." },
      { title: "Scheduled execution", text: "A consistent team carries out the programme around your operating hours." },
      { title: "Review and adjust", text: "We check results with you and refine the programme as your operation changes." },
    ],
    faqs: [
      { q: "Can you work around our production schedule?", a: "Yes. The programme is planned around your operating hours, and timing is agreed after the site walkthrough." },
      { q: "Do you handle food and beverage environments?", a: "We tailor the programme to the environment, including sanitation-focused routines for food and beverage facilities. Share any standards you follow during the walkthrough." },
      { q: "How is industrial cleaning priced?", a: pricing },
      { q: "Which areas do you cover?", a: areas },
    ],
  },
  "deep-cleaning": {
    headline: "A full, top-to-bottom reset.",
    overview: [
      "Some properties need more than a routine visit: a new home before you move in, a space after renovation, or a house that has gone a season without a proper reset. Deep cleaning is our most thorough service, working through the property in detail from high surfaces to skirting boards.",
      "Humidity and seasonal dust settle into joinery, tracks and fittings that routine cleaning skips. We plan the sequence room by room so the finish is even and nothing is missed.",
    ],
    alsoIncluded: ["Window, track and frame detailing", "Kitchen and bathroom descaling and degreasing", "Final walkthrough to confirm the finish"],
    idealFor: ["Move-in and move-out cleans", "Post-renovation and post-construction dust", "Seasonal or annual resets", "Before hosting guests or events"],
    steps: [
      { title: "Brief and walkthrough", text: "Tell us about the property, its condition and any areas of concern." },
      { title: "Plan and scope", text: "We agree what is included and how long the clean should take." },
      { title: "Detailed clean", text: "The team works through the property top to bottom, room by room." },
      { title: "Final check", text: "We review the finish with you before we leave." },
    ],
    faqs: [
      { q: "How long does a deep clean take?", a: "It depends on the size and condition of the property. We give you a time estimate when we agree the scope." },
      { q: "Do you clean after renovation?", a: "Yes. Post-renovation dust and residue removal is part of the service. Tell us what work was done so we can plan the right approach." },
      { q: "Do I need to be at home?", a: "Not necessarily. Many clients arrange access in advance, and we confirm entry and security details before the visit." },
      { q: "Can I pair a deep clean with regular service?", a: "Yes. A deep clean works well as a starting point for home or resident cleaning, so ongoing visits keep the standard." },
    ],
  },
  home: {
    headline: "Immaculate, discreet care for your home.",
    overview: [
      "A well-run home feels effortless, and that takes quiet, consistent work. Our home cleaning service gives your residence tailored, room-by-room care, with methods chosen for each surface, from marble and polished wood to upholstery and glass.",
      "Our team is courteous and discreet, and works to a routine agreed with you so your home is ready when you are.",
    ],
    alsoIncluded: ["Floor, joinery and soft-furnishing care", "Bedroom and living-area detailing", "A routine that fits your household's schedule"],
    idealFor: ["Private homes and family residences", "Duplexes and larger properties", "Busy households that want a reliable routine", "Homes preparing for guests"],
    steps: [
      { title: "Tell us about your home", text: "Share the size, the finishes and what matters most to your household." },
      { title: "Agree a routine", text: "We set the scope and frequency, and confirm access and any house rules." },
      { title: "Care, visit after visit", text: "A uniformed team works through the home to the standard we agreed." },
      { title: "Adjust as you need", text: "Change the scope or the schedule whenever your household changes." },
    ],
    faqs: [
      { q: "How often can you visit?", a: "We can arrange a regular routine or one-off visits. The right frequency depends on your household and how you use the home." },
      { q: "Who will be in my home?", a: "We aim to send a consistent, uniformed team, and we are happy to discuss access, security and any house rules before the first visit." },
      { q: "Can you work with delicate surfaces?", a: "Yes. We choose methods and products to suit finishes such as marble, polished wood and upholstery. Tell us about anything delicate before the first visit." },
      { q: "How is home cleaning priced?", a: pricing },
    ],
  },
  resident: {
    headline: "A team that knows your property.",
    overview: [
      "Estates, residences and serviced apartments run on consistency. Resident cleaning places a familiar team on your property, so standards stay steady and residents and managers know who to expect.",
      "We look after private units and common areas alike, with a schedule that flexes around occupancy and the way the property operates.",
    ],
    alsoIncluded: ["Lobby, corridor and shared-space upkeep", "A clear point of contact for managers", "Programme review as occupancy changes"],
    idealFor: ["Gated estates and residential communities", "Serviced apartments", "Residential blocks and multi-unit properties", "Staff and guest accommodation"],
    steps: [
      { title: "Walk the property", text: "We look at the units, common areas and how the property is used day to day." },
      { title: "Design the schedule", text: "You receive a programme covering scope, team size and timing." },
      { title: "Place the team", text: "A familiar team takes on the property and learns its routines." },
      { title: "Review regularly", text: "We check in with you and adjust as occupancy and needs change." },
    ],
    faqs: [
      { q: "Can you cover several units or a whole estate?", a: "Yes. Tell us the number of units and common areas, and we shape a programme to fit." },
      { q: "Will the same people come each visit?", a: "Our aim is a consistent, familiar team, so the property and its routines are well understood." },
      { q: "Can the schedule change?", a: "Yes. Scheduling is flexible and can be adjusted as occupancy or needs change." },
      { q: "How do I get started?", a: "Request an estimate or message us on WhatsApp with the property details, and we will arrange a visit." },
    ],
  },
  fumigation: {
    headline: "Pest control, done safely and discreetly.",
    overview: [
      "Pests are more than a nuisance. They affect health, stored goods and how a space feels. Our fumigation service begins with a full inspection, so treatment is aimed at the real problem rather than guessed at.",
      "Technicians work in protective equipment, follow safe handling practices, and explain what to expect before, during and after treatment. Follow-up care is available on request.",
    ],
    alsoIncluded: ["Clear guidance before and after treatment", "Discreet, uniformed technicians", "Targeted treatment of the affected areas"],
    idealFor: ["Homes and apartments", "Offices, shops and restaurants", "Warehouses and storage areas", "Hospitality and rental properties"],
    steps: [
      { title: "Inspection", text: "A technician inspects the property to find the source and extent of the problem." },
      { title: "Treatment plan", text: "We explain the approach, what to prepare and how long the space should stay clear." },
      { title: "Treatment", text: "The treatment is carried out discreetly by technicians in protective equipment." },
      { title: "Follow-up", text: "Follow-up care is available on request to keep the problem from returning." },
    ],
    faqs: [
      { q: "Do I need to leave during treatment?", a: "Your technician will advise whether people, pets or food items should be moved out beforehand, based on the treatment used." },
      { q: "When can we go back in?", a: "Re-entry timing depends on the treatment used and is confirmed by your technician on the day." },
      { q: "Which pests do you treat?", a: "We inspect first, then treat what we find. Tell us what you have noticed, for example roaches, ants, rodents or mosquitoes, and we will confirm what we can treat." },
      { q: "Do you offer follow-up visits?", a: "Yes. Follow-up care is available on request." },
    ],
  },
  maintenance: {
    headline: "A standing arrangement, so your space stays exactly as it was left.",
    overview: [
      "Good spaces drift when no one is minding them: a loose hinge, a tired finish, a floor that has lost its shine. Our maintenance service keeps a scheduled, year-round eye on your property, so small issues are handled before they become expensive ones.",
      "You get a consistent team and consistent standards, visit after visit, with priority attention as a standing client.",
    ],
    alsoIncluded: ["Minor repairs and fixture attention", "Scheduled checks of finishes and fittings", "Clear notes on anything that needs a specialist"],
    idealFor: ["Offices and commercial suites", "Private residences and duplexes", "Estates and shared facilities", "Properties managed for owners who are away"],
    steps: [
      { title: "Property review", text: "We look over the property, its finishes and any recurring issues." },
      { title: "Maintenance schedule", text: "We agree the scope and the rhythm of visits." },
      { title: "Regular visits", text: "A consistent team carries out upkeep and attends to small repairs." },
      { title: "Report and refine", text: "We tell you what we found and adjust the programme as the property changes." },
    ],
    faqs: [
      { q: "What does maintenance include?", a: "Scheduled upkeep of finishes, fixtures and fittings, along with minor repairs. The scope is agreed after a property review." },
      { q: "Can you look after a property while I am away?", a: "Yes. A standing arrangement suits owners who are not on site. We agree how you would like to be updated, by WhatsApp or email." },
      { q: "How is it different from regular cleaning?", a: "Cleaning keeps surfaces fresh. Maintenance also watches over finishes, fixtures and small repairs, so the property holds its condition over time." },
      { q: "How do I get started?", a: "Request an estimate or message us on WhatsApp with the property details, and we will arrange a visit." },
    ],
  },
};
