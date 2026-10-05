import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ServicesPage } from "@/components/pages";
export const Route=createFileRoute("/services")({head:()=>seo({title:"Premium Cleaning Services — LESBEST",description:"Tailored residential, commercial, deep and specialist property-care services.",ogDescription:"Thoughtful cleaning solutions tailored to the spaces we care for.",path:"/services",image:"services",imageAlt:"A Lesbest cleaner wiping a bedside table in a luxury master bedroom with palm trees outside"}),component:ServicesPage});