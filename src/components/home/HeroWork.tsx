import Image from "next/image";
import Link from "next/link";
import type { Era, Project } from "@/types/archive";

export function HeroWork({ era, project }: { era: Era; project: Project }) {
  return (
    <section id="hero-work" className="scroll-mt-8 px-0 py-0">
      <div className="mx-auto max-w-[1920px]">
        <div className="mb-5 flex items-center justify-between text-sm text-archive-muted"><span>FEATURED WORK</span><span>{project.year}</span></div>
        <Link href={`/era/${era.slug}/project/${project.slug}`} className="group block">
          <div className="relative h-[100svh] overflow-hidden bg-archive-surface">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/Main/hero_01.png`} alt="" fill priority sizes="100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
          </div>
          <div className="px-6 py-5 md:px-10"><div className="flex items-baseline justify-between gap-4"><h2 className="text-3xl font-medium tracking-tight md:text-5xl">{project.title}</h2><span className="text-sm text-archive-muted">{project.client}</span></div></div>
        </Link>
      </div>
    </section>
  );
}
