import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ContactPage } from "@/components/pages";
export const Route=createFileRoute("/contact")({head:()=>(seo({title:"Request a Cleaning Quote in Uyo & Eket | LESBEST",description:"Tell LESBEST about your property in Uyo, Eket or elsewhere in Akwa Ibom and receive a considered cleaning recommendation.",ogDescription:"Let’s care for your space.",path:"/contact",image:"contact",imageAlt:"A bright marble reception area with a sofa and palm trees beyond the glass doors"})),component:ContactPage});