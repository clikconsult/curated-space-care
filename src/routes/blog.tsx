import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { BlogPage } from "@/components/pages";
export const Route=createFileRoute("/blog")({head:()=>seo({title:"Cleaning & Property Care Tips for Uyo | LESBEST Journal",description:"Practical cleaning and property-care advice for homes and businesses in Uyo, Eket and Akwa Ibom.",ogDescription:"Ideas and expertise for maintaining exceptional spaces.",path:"/blog",image:"blog",imageAlt:"A double-height duplex living room with polished floors and garden views"}),component:BlogPage});