import living from "@/assets/lesbest-living.jpg";
import kitchen from "@/assets/lesbest-kitchen.jpg";
import office from "@/assets/lesbest-office.jpg";
import suite from "@/assets/lesbest-suite.jpg";
import deepCleanTeam from "@/assets/lesbest-deep-cleaning.webp";

export const images = { living, kitchen, office, suite };

export const services = [
  { slug: "industrial", name: "Industrial Cleaning", short: "Planned cleaning for factories, warehouses, workshops and production areas.", image: industrialPlantImg, imageAlt: "A Lesbest cleaner wiping stainless-steel equipment beside a cleaning trolley in a food-and-beverage production plant", imagePos: "50% 10%", homeImage: homeCardIndustrialImg, homeImageAlt: "A Lesbest team cleaning a production plant, with a ride-on floor scrubber, vacuuming and a supervisor checking progress", homeImagePos: "50% 40%", included: ["Schedules that work around operations", "Heavy-duty floor and surface care", "Practical sanitation routines"], suitable: "Factories, warehouses, production floors and industrial facilities in Uyo, Eket and nearby areas" },
  { slug: "deep-cleaning", name: "Deep Cleaning", short: "A full, top-to-bottom reset for a property that needs more than your regular cleaning.", image: deepCleanTeam, imageAlt: "Two Lesbest cleaners buffing a marble floor and vacuuming a sofa in a luxury living room", imagePos: "50% 50%", homeImage: servicesHeroImg, homeImageAlt: "A Lesbest cleaner with a trolley and floor buffer resetting a duplex living room", homeImagePos: "100% 50%", included: ["Detailed high and low-level clean", "Appliance and joinery attention", "Post-renovation dust and residue removal"], suitable: "Move-ins, post-renovation spaces and seasonal resets" },
  { slug: "home", name: "Home Cleaning", short: "Reliable, room-by-room cleaning for homes that need to stay comfortable and presentable.", image: homeBathroomImg, imageAlt: "A Lesbest cleaner wiping the marble vanity of a luxury bathroom", imagePos: "0% 50%", homeImage: homeCardHomeKitchenImg, homeImageAlt: "A Lesbest cleaner wiping a marble kitchen counter in a modern open-plan home", homeImagePos: "0% 50%", included: ["Room-by-room cleaning plans", "Kitchen and bathroom detailing", "Care suited to your finishes"], suitable: "Apartments, family homes and private residences in Uyo, Eket and environs" },
  { slug: "resident", name: "Resident Cleaning", short: "Ongoing service for estates and residences, with a team who knows the property.", image: residentExteriorImg, imageAlt: "A Lesbest cleaner wiping a glass door beside a cleaning trolley at a modern residence", imagePos: "50% 20%", homeImage: homeCardResidentExteriorImg, homeImageAlt: "A Lesbest cleaner wiping a glass door of a modern residence", homeImagePos: "50% 50%", included: ["Consistent, familiar team on every visit", "Estate and common-area care", "Flexible scheduling"], suitable: "Estates, residences and serviced apartments" },
  { slug: "fumigation", name: "Fumigation", short: "Targeted pest treatment for homes, offices, shops and other occupied spaces.", image: fumigationImg, imageAlt: "A Lesbest technician in a respirator spraying a pest treatment along a skirting board", imagePos: "45% 50%", homeImage: homeCardFumigationImg, homeImageAlt: "A Lesbest technician in a respirator and safety goggles carrying a sprayer through a luxury suite", homeImagePos: "82% 50%", included: ["Inspection before treatment", "Clear preparation and re-entry guidance", "Follow-up visits on request"], suitable: "Homes, hospitality properties and commercial spaces in Uyo, Eket and environs" },
  { slug: "maintenance", name: "Maintenance Services", short: "Scheduled upkeep and minor repairs for homes, offices and estates, with a consistent team on regular visits.", image: maintenanceImg, imageAlt: "A Lesbest technician repairing a kitchen cabinet with a toolbox beside him", imagePos: "60% 50%", homeImage: homeCardMaintenanceImg, homeImageAlt: "A Lesbest maintenance technician fixing a cabinet hinge under a reception counter, with a toolbox on the floor", homeImagePos: "0% 50%", included: ["Year-round scheduled upkeep", "Consistent standards, visit after visit", "Priority attention for standing clients"], suitable: "Offices, residences and facilities that need ongoing care" },
] as const;

import fumigationImg from "@/assets/lesbest-fumigation-treatment.webp";
import maintenanceImg from "@/assets/lesbest-maintenance-technician.webp";
import industrialPlantImg from "@/assets/lesbest-services-industrial-plant.webp";
import residentExteriorImg from "@/assets/lesbest-services-resident-exterior.webp";
import homeBathroomImg from "@/assets/lesbest-services-home-bathroom.webp";
import servicesHeroImg from "@/assets/lesbest-services-hero-team.webp";
import servicesHeroBedroomImg from "@/assets/lesbest-services-hero-bedroom.webp";
import aboutHeroImg from "@/assets/lesbest-about-hero-living-room.webp";
import aboutDetailsImg from "@/assets/lesbest-about-details.webp";
import aboutTeamImg from "@/assets/lesbest-about-team-at-work.webp";
import portfolioHeroImg from "@/assets/lesbest-portfolio-hero-kitchen.webp";
import contactHeroImg from "@/assets/lesbest-contact-reception.webp";
import closingLivingImg from "@/assets/lesbest-home-closing-living-room.webp";
import consultImg from "@/assets/lesbest-home-consultation.webp";
import journalPropertyCareImg from "@/assets/lesbest-journal-property-care.webp";
import coverQuietArtImg from "@/assets/lesbest-journal-cover-quiet-art.webp";
import coverRainyImg from "@/assets/lesbest-journal-cover-rainy-season.webp";
import coverWorkplaceImg from "@/assets/lesbest-journal-cover-workplace.webp";
import coverGuestImg from "@/assets/lesbest-journal-cover-guest-ready.webp";
import homeCardIndustrialImg from "@/assets/lesbest-home-card-industrial.webp";
import homeCardHomeKitchenImg from "@/assets/lesbest-home-card-home-kitchen.webp";
import homeCardResidentExteriorImg from "@/assets/lesbest-home-card-resident-exterior.webp";
import homeCardFumigationImg from "@/assets/lesbest-home-card-fumigation.webp";
import homeCardMaintenanceImg from "@/assets/lesbest-home-card-maintenance.webp";

export const photos = {
  servicesHero: { src: servicesHeroBedroomImg, alt: "A Lesbest cleaner wiping a bedside table in a luxury master bedroom with louvre windows and palm trees outside" },
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
  phoneDisplay: "07018737460",
  phoneNumber: "+2347018737460",
  whatsappNumber: "2348162573736",
  whatsappDisplay: "08162573736",
  email: "contact@lesbest.com.ng",
  instagramUrl: "https://www.instagram.com/lesbestservices247/",
  instagramHandle: "@lesbestservices247",
  address: "No. 40 Ekpo Obot Street, off Brooks Street (by Oliver Twist), Uyo, Akwa Ibom State",
  // What Google Maps searches for. If the pin lands in the wrong place, paste a more exact query here.
  mapsQuery: "40 Ekpo Obot Street, off Brooks Street, Uyo, Akwa Ibom, Nigeria",
};

const mapsQ = encodeURIComponent(CONTACT.mapsQuery);
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQ}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQ}&output=embed`;

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
    title: "What good property care looks like between cleaning days",
    excerpt: "A practical approach to keeping a home, short-let or managed property clean, presentable and easier to maintain in Uyo and Eket.",
    image: coverQuietArtImg,
    imageAlt: "A Lesbest cleaner in black gloves polishing a marble coffee table in a warm, softly lit living room",
    intro: "A property does not need to look like a showroom to be well cared for. It should feel clean when people walk in, work properly from room to room and be ready for the family, visitor, tenant or client using it that day. That result usually comes from simple routines carried out consistently, not a frantic clean only when someone is expected.",
    sections: [
      { heading: "Start with how the property is actually used", text: "The useful question is not simply, ‘How many rooms are there?’ It is, ‘What happens here every day?’ A family home with children, a quiet apartment used for short lets and an office reception may have similar floor space, but they collect dirt in different places and need different attention. Entryways, kitchens, guest bathrooms, stair rails and frequently touched switches are usually where a routine shows first.\n\nIn Uyo and Eket, dust can settle quickly during dry weather, particularly in properties near unpaved roads or active building work. During the rains, the problem often changes to damp corners, marks from wet footwear and moisture around windows, cupboards and bathrooms. A good cleaning plan changes with the season instead of treating every visit as identical.\n\nWalk through the property at the time it is busiest. Notice where shoes are removed, where bags are dropped, which bathroom visitors use and where food is prepared. Those observations help decide what needs daily attention, what can wait for the weekly clean and what needs a periodic deep clean. It is a more sensible way to spend a cleaning budget than giving every room the same amount of time." },
      { heading: "Protect finishes before they become a repair job", text: "Many maintenance problems begin as small cleaning problems. Grit left on tiled floors can dull the surface. Water sitting around a tap can leave marks. Grease on kitchen fittings becomes harder to remove when it is ignored for months. Fabric and upholstery hold dust long before the room looks visibly dirty.\n\nThe answer is not aggressive products. In fact, strong or unsuitable chemicals can damage marble, polished wood, metal fittings and painted surfaces. Use methods that suit the material, and test unfamiliar products in an inconspicuous area. Microfibre cloths, the right mop head and regular vacuuming often protect a finish better than heavy scrubbing.\n\nFor owners who are away, a regular visit also creates a useful set of eyes on the property. A cleaner may spot a leaking pipe, a loose hinge, a blocked drain or early mould around a window before it grows into an expensive repair. Cleaning and property upkeep work best when they support each other." },
      { heading: "Keep the routine realistic", text: "A routine only works if it fits the household or team. Start with a manageable list: clear food and rubbish daily, wipe high-use surfaces, keep wet areas dry, vacuum or sweep according to traffic, and schedule a proper reset for bathrooms, kitchens and upholstery. For offices, agree who clears personal desks and when the cleaning team can work without interrupting staff.\n\nBefore a move-in, handover, event or tenant change, arrange a deeper clean rather than trying to squeeze detailed work into a normal visit. Post-construction dust, cupboard interiors, window tracks and appliances need time. Giving the team clear access and a realistic brief makes the final result much better.\n\nProfessional cleaning is most useful when it takes pressure off the people using the property. It should leave the space orderly, hygienic and ready for the next day, while helping the owner preserve the parts of the property that cost the most to replace." },
    ],
    quote: "The best routine is the one that keeps small issues from becoming big jobs.",
  },
  {
    slug: "rainy-season-care", category: "Expert Advice", date: "02 September 2026",
    title: "How to keep your property dry and fresh through the rainy season",
    excerpt: "Practical steps for managing wet entrances, humidity, mould and damp odours in homes and workplaces across Akwa Ibom.",
    image: coverRainyImg,
    imageAlt: "A Lesbest technician in a cap and black gloves clearing wet leaves from a roof gutter in the rain",
    intro: "Rainy weather changes the cleaning needs of a property. Wet shoes bring in grit, windows stay closed longer, towels take more time to dry and moisture settles where it is least obvious.",
    sections: [
      { heading: "Control water at the entrance", text: "Put practical mats at every entrance and clean them regularly. Wipe wet floors promptly, especially around tiled entrances and stairways where people can slip. In busy offices, shops, churches and short-let properties, someone should check the entrance during rain rather than waiting for the end of the day.\n\nLook beyond the floor. Rainwater can mark lower walls, doors and furniture placed near windows. If a window leaks, report it early and move soft furnishings away from the area. Cleaning the mark without fixing the source only means it will return. Outdoor drains, gutters and walkways also need attention, because blocked drainage can push water back toward the building." },
      { heading: "Check the places that do not get much air", text: "Mould often begins behind wardrobes, under sinks, inside cupboards and in bathrooms with poor ventilation. Pull furniture slightly away from walls when possible, dry wet surfaces after cleaning and avoid storing damp clothes, mops or towels in closed spaces.\n\nA musty smell is a useful warning. It may mean fabric, a rug or a hidden corner is holding moisture. Air the room when the weather allows, clean the area thoroughly and investigate the cause. Bathrooms deserve extra attention: dry fittings after use, check sealant and do not leave wet bath mats bunched up on the floor." },
      { heading: "Adjust the routine for the season", text: "During the rains, floors, bathrooms, glass and high-traffic entrances may need more attention than dry bedrooms or seldom-used rooms. Keep an eye on drainage points and outdoor areas that track mud indoors.\n\nFor property managers, this is a good time to confirm who reports leaks, who checks common areas and how quickly a wet-floor issue is handled. A clear routine keeps a small weather-related problem from disrupting tenants, staff or guests. The aim is not to clean more for the sake of it, but to focus time where rain and humidity create the most pressure." },
    ],
    quote: "During the rains, quick attention to water and moisture saves a great deal of work later.",
  },
  {
    slug: "workplace-standard", category: "Business", date: "19 August 2026",
    title: "What clients notice first in a well-kept workplace",
    excerpt: "A practical office-cleaning guide for keeping reception areas, workspaces and shared facilities ready for staff and visitors.",
    image: coverWorkplaceImg,
    imageAlt: "A Lesbest cleaner wiping a polished boardroom table in a bright office with a city view",
    intro: "A workplace can look tidy in the morning and still become noticeably dusty, untidy or uncomfortable by the end of the day. Reception areas, glass, floors, shared toilets and frequently used workstations tend to show it first.",
    sections: [
      { heading: "Begin with the customer-facing areas", text: "Visitors may not comment on a clean reception, but they notice a stained floor, dusty glass or a bathroom without basic supplies. Start with the route a visitor takes: the gate or entrance, reception, meeting area and guest toilet. These spaces should be checked through the day, not only cleaned after closing.\n\nKeep counters clear, remove waste before it becomes noticeable and clean fingerprints from glass doors and handles. In dusty weather, floors and window ledges may need more frequent attention. A small, regular routine makes the business feel organised without disrupting staff." },
      { heading: "Make shared spaces easier to use", text: "Kitchens, toilets, corridors and meeting rooms carry the pressure of many people using them. They need a clear restocking plan for tissue, soap, bin liners and drinking-water areas, as well as a cleaning schedule that staff understand.\n\nCleaning is more effective when employees know what they are responsible for. A professional team can handle floors, washrooms and shared surfaces, while staff clear personal desks and report spills or maintenance issues quickly. That simple division prevents last-minute confusion and helps the cleaner work properly." },
      { heading: "Choose a schedule that matches the business", text: "An office with visitors all day may need daytime checks and an after-hours clean. A workshop may need cleaning around shifts. A shop may need early-morning preparation before customers arrive. The right frequency depends on traffic, the type of work and the image the business needs to maintain.\n\nWhen choosing a provider, be clear about access, operating hours and areas that must not be interrupted. A site walkthrough makes it easier to agree a scope that is practical rather than generic. Consistent office cleaning helps staff work comfortably and gives visitors confidence from the moment they arrive." },
    ],
    quote: "A clean workplace does not replace good service, but it tells people you pay attention.",
  },
  {
    slug: "guest-ready-home", category: "Home", date: "05 August 2026",
    title: "A practical way to get your home or short-let ready for guests",
    excerpt: "A room-by-room checklist for preparing a comfortable, clean welcome without leaving everything until the last minute.",
    image: coverGuestImg,
    imageAlt: "A Lesbest cleaner placing a pillow and a welcome tray on a guest bed",
    intro: "Preparing for guests does not mean cleaning every corner of the house in one exhausting day. It means giving proper attention to the rooms people will use, removing the little things that make a space feel neglected and making sure the basics work.",
    sections: [
      { heading: "Start with the rooms people will use", text: "Focus first on the sitting room, guest bathroom, kitchen and the bedroom where someone will sleep. Clear visible clutter, empty bins, dust tables and wipe handles, switches and remotes. Vacuum or sweep under seating where crumbs and dust collect, then check that lighting and fans are working.\n\nThe guest bathroom deserves a separate check. Clean the toilet, basin, mirror and shower area properly. Provide tissue, hand soap, a clean towel and a bin. These are simple details, but they help a guest feel considered rather than accommodated at the last minute." },
      { heading: "Refresh the kitchen and sleeping area", text: "You do not need to prepare a full hotel setup. A clean fridge shelf, wiped worktops, dry sink and rubbish removed from the kitchen are usually enough. If guests will cook, make sure the essentials are easy to find.\n\nIn the bedroom, use fresh linen, check under the bed, clear a small surface for personal items and make sure there is somewhere to hang or place clothes. For a short-let, inspect the room after every checkout rather than relying on a quick visual scan. Hair in a bathroom, marks on a pillowcase and dust on bedside furniture can undo the effect of an otherwise tidy room." },
      { heading: "Plan the deeper work ahead of time", text: "If you are expecting a large family gathering, a tenant handover or an important visitor, schedule a deep clean before the week of the event. Window tracks, inside cupboards, upholstery, appliances and bathrooms need more time than a normal tidy-up.\n\nFor hospitality properties, a repeatable turnover checklist is useful. Include linen, bathroom supplies, kitchen equipment, waste removal, floor checks and a final walk-through. It keeps standards steady when bookings are busy and makes it easier to identify what needs repair.\n\nThe best welcome is not complicated. It is a clean, comfortable property that is ready when the guest arrives." },
    ],
    quote: "Guests remember comfort and care long after they forget the décor.",
  },
] as const;
