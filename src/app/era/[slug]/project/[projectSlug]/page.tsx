import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { Vdas02ProjectIntro } from "@/components/project/Vdas02ProjectIntro";
import { Vdas01Project02Intro } from "@/components/project/Vdas01Project02Intro";
import { Vdas01Project03Intro } from "@/components/project/Vdas01Project03Intro";
import { VdasProjectIntro } from "@/components/project/VdasProjectIntro";
import { StudentProjectIntro } from "@/components/project/StudentProjectIntro";
import { eras } from "@/data/eras";
import { getEra, getProject } from "@/lib/archive";

export function generateStaticParams() {
  return [
    ...eras.flatMap((era) => era.projects.map((project) => ({ slug: era.slug, projectSlug: project.slug }))),
    { slug: "vdas-01", projectSlug: "vdas-01-01" },
    { slug: "vdas-01", projectSlug: "vdas-01-02" },
    { slug: "vdas-01", projectSlug: "vdas-01-03" },
    { slug: "vdas-02", projectSlug: "vdas-02-01" },
    { slug: "when-student-01", projectSlug: "student-01" },
    { slug: "when-student-02", projectSlug: "vdas-01-01" },
  ];
}

export default function ProjectPage({ params }: { params: { slug: string; projectSlug: string } }) {
  if (params.slug === "when-student-02" && params.projectSlug === "vdas-01-01") {
    redirect("/era/vdas-01/project/vdas-01-01");
  }

  if (params.slug === "vdas-01" && params.projectSlug === "vdas-01-01") {
    return <VdasProjectIntro />;
  }

  if (params.slug === "vdas-01" && params.projectSlug === "vdas-01-02") {
    return <Vdas01Project02Intro />;
  }

  if (params.slug === "vdas-01" && params.projectSlug === "vdas-01-03") {
    return <Vdas01Project03Intro />;
  }

  if (params.slug === "vdas-02" && params.projectSlug === "vdas-02-01") {
    return <Vdas02ProjectIntro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-01") {
    return <StudentProjectIntro />;
  }

  const era = getEra(params.slug);
  const project = getProject(params.slug, params.projectSlug);
  if (!era || !project) notFound();

  return <><div className="px-6 pt-8 md:px-10"><Link href={`/era/${era.slug}`} className="text-sm text-archive-muted hover:text-archive-text">← {era.title}</Link></div><ProjectDetail project={project} /></>;
}
