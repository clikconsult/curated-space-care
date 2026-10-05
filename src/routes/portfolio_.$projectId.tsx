import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ProjectPage } from "@/components/pages";
import { projects } from "@/lib/site-data";
export const Route=createFileRoute("/portfolio_/$projectId")({head:({params})=>{const p=projects.find(x=>x.slug===params.projectId);const title=p?`${p.title} — LESBEST`:`Project — LESBEST`;const description=p?.summary??"A selected LESBEST property-care project.";return seo({title,description,path:`/portfolio/${params.projectId}`,image:"portfolio",imageAlt:"A Lesbest cleaner wiping a marble kitchen island in a modern Nigerian home",type:"article"});},component:ProjectRoute});
function ProjectRoute(){const {projectId}=Route.useParams();return <ProjectPage slug={projectId}/>}