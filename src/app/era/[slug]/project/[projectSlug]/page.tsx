import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { Vdas02ProjectIntro } from "@/components/project/Vdas02ProjectIntro";
import { Vdas01Project02Intro } from "@/components/project/Vdas01Project02Intro";
import { Vdas01Project03Intro } from "@/components/project/Vdas01Project03Intro";
import { Vdas01Project04Intro } from "@/components/project/Vdas01Project04Intro";
import { VdasProjectIntro } from "@/components/project/VdasProjectIntro";
import { StudentProjectIntro } from "@/components/project/StudentProjectIntro";
import { StudentProject02Intro } from "@/components/project/StudentProject02Intro";
import { StudentProject03Intro } from "@/components/project/StudentProject03Intro";
import { StudentProject04Intro } from "@/components/project/StudentProject04Intro";
import { StudentProject05Intro } from "@/components/project/StudentProject05Intro";
import { StudentProject06Intro } from "@/components/project/StudentProject06Intro";
import { StudentProject07Intro } from "@/components/project/StudentProject07Intro";
import { StudentProject08Intro } from "@/components/project/StudentProject08Intro";
import { StudentProject09Intro } from "@/components/project/StudentProject09Intro";
import { StudentProject10Intro } from "@/components/project/StudentProject10Intro";
import { StudentProject11Intro } from "@/components/project/StudentProject11Intro";
import { StudentProject12Intro } from "@/components/project/StudentProject12Intro";
import { StudentProject13Intro } from "@/components/project/StudentProject13Intro";
import { StudentProject14Intro } from "@/components/project/StudentProject14Intro";
import { StudentProject15Intro } from "@/components/project/StudentProject15Intro";
import { eras } from "@/data/eras";
import { getEra, getProject } from "@/lib/archive";

export function generateStaticParams() {
  return [
    ...eras.flatMap((era) => era.projects.map((project) => ({ slug: era.slug, projectSlug: project.slug }))),
    { slug: "vdas-01", projectSlug: "vdas-01-01" },
    { slug: "vdas-01", projectSlug: "vdas-01-02" },
    { slug: "vdas-01", projectSlug: "vdas-01-03" },
    { slug: "vdas-01", projectSlug: "vdas-01-04" },
    { slug: "vdas-02", projectSlug: "vdas-02-01" },
    { slug: "when-student-01", projectSlug: "student-01" },
    { slug: "when-student-01", projectSlug: "student-02" },
    { slug: "when-student-01", projectSlug: "student-03" },
    { slug: "when-student-01", projectSlug: "student-04" },
    { slug: "when-student-01", projectSlug: "student-05" },
    { slug: "when-student-01", projectSlug: "student-06" },
    { slug: "when-student-01", projectSlug: "student-07" },
    { slug: "when-student-01", projectSlug: "student-08" },
    { slug: "when-student-01", projectSlug: "student-09" },
    { slug: "when-student-01", projectSlug: "student-10" },
    { slug: "when-student-01", projectSlug: "student-11" },
    { slug: "when-student-01", projectSlug: "student-12" },
    { slug: "when-student-01", projectSlug: "student-13" },
    { slug: "when-student-01", projectSlug: "student-14" },
    { slug: "when-student-01", projectSlug: "student-15" },
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

  if (params.slug === "vdas-01" && params.projectSlug === "vdas-01-04") {
    return <Vdas01Project04Intro />;
  }

  if (params.slug === "vdas-02" && params.projectSlug === "vdas-02-01") {
    return <Vdas02ProjectIntro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-01") {
    return <StudentProjectIntro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-02") {
    return <StudentProject02Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-03") {
    return <StudentProject03Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-04") {
    return <StudentProject04Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-05") {
    return <StudentProject05Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-06") {
    return <StudentProject06Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-07") {
    return <StudentProject07Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-08") {
    return <StudentProject08Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-09") {
    return <StudentProject09Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-10") {
    return <StudentProject10Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-11") {
    return <StudentProject11Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-12") {
    return <StudentProject12Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-13") {
    return <StudentProject13Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-14") {
    return <StudentProject14Intro />;
  }

  if (params.slug === "when-student-01" && params.projectSlug === "student-15") {
    return <StudentProject15Intro />;
  }

  const era = getEra(params.slug);
  const project = getProject(params.slug, params.projectSlug);
  if (!era || !project) notFound();

  return <><div className="px-6 pt-8 md:px-10"><Link href={`/era/${era.slug}`} className="text-sm text-archive-muted hover:text-archive-text">← {era.title}</Link></div><ProjectDetail project={project} /></>;
}
