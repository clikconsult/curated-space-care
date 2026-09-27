import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/pages";
import { projects } from "@/lib/site-data";
export const Route=createFileRoute("/portfolio_/$projectId")({head:({params})=>{const p=projects.find(x=>x.slug===params.projectId);const title=p?`${p.title} — LESBEST`:`Project — LESBEST`;const description=p?.summary??"A selected LESBEST property-care project.";return{meta:[{title},{name:"description",content:description},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"article"},{name:"twitter:card",content:"summary_large_image"}]};},component:ProjectRoute});
function ProjectRoute(){const {projectId}=Route.useParams();return <ProjectPage slug={projectId}/>}