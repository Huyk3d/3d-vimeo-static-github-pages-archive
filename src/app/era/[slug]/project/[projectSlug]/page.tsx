import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { eras } from "@/data/eras";
import { getEra, getProject } from "@/lib/archive";

export function generateStaticParams() {
  return eras.flatMap((era) => era.projects.map((project) => ({ slug: era.slug, projectSlug: project.slug })));
}

export default function ProjectPage({ params }: { params: { slug: string; projectSlug: string } }) {
  const era = getEra(params.slug);
  const project = getProject(params.slug, params.projectSlug);
  if (!era || !project) notFound();

  return <><div className="px-6 pt-8 md:px-10"><Link href={`/era/${era.slug}`} className="text-sm text-archive-muted hover:text-archive-text">← {era.title}</Link></div><ProjectDetail project={project} /></>;
}
