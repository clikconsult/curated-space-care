import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { CONTACT, mapsSearchUrl } from "@/lib/site-data";

// LocalBusiness structured data, rendered site-wide from the root route.
// Only facts that exist elsewhere in the site are included. Add openingHoursSpecification,
// and geo coordinates once the Google Business Profile pin is confirmed to sit on the street address.
export const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  description: "Professional home, office, commercial and deep cleaning, fumigation and property care in Uyo, Eket and Akwa Ibom.",
  image: `${SITE_URL}/og/default.jpg`,
  telephone: CONTACT.phoneNumber,
  email: CONTACT.email,
  sameAs: [CONTACT.instagramUrl, "https://maps.app.goo.gl/HwG3wB3Dyi2KgUfg8"],
  hasMap: mapsSearchUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 40 Ekpo Obot Street, off Brooks Street",
    addressLocality: "Uyo",
    addressRegion: "Akwa Ibom",
    addressCountry: "NG",
  },
  areaServed: [
    { "@type": "City", name: "Uyo" },
    { "@type": "City", name: "Eket" },
    { "@type": "AdministrativeArea", name: "Akwa Ibom State" },
  ],
};
