import { createFileRoute } from "@tanstack/react-router";
import { seo, SITE_NAME, SITE_URL } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { ContactPage } from "@/components/pages";
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: CONTACT.phoneNumber,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 40 Ekpo Obot Street, off Brooks Street",
    addressLocality: "Uyo",
    addressRegion: "Akwa Ibom",
    addressCountry: "NG",
  },
};
export const Route=createFileRoute("/contact")({head:()=>({...seo({title:"Request a Quote — LESBEST",description:"Tell LESBEST about your property and receive a considered cleaning recommendation.",ogDescription:"Let’s care for your space.",path:"/contact",image:"contact",imageAlt:"A bright marble reception area with a sofa and palm trees beyond the glass doors"}),scripts:[{type:"application/ld+json",children:JSON.stringify(localBusiness)}]}),component:ContactPage});