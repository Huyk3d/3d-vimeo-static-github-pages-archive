import Image from "next/image";
import Link from "next/link";
import type { Era, Project } from "@/types/archive";

export function HeroWork({ era, project }: { era: Era; project: Project }) {
  return (
    <section id="hero-work" className="scroll-mt-[-8vh] bg-[#EDEDED] px-0 py-0">
      <div className="w-full">
        <Link href={`/era/${era.slug}/project/${project.slug}`} className="group block">
          <div className="relative aspect-video w-full overflow-hidden bg-[#EDEDED]">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/Main/hero_01.png`} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          </div>
          <div className="px-6 py-5 md:px-10"><div className="flex items-baseline justify-between gap-4"><h2 className="text-3xl font-medium tracking-tight md:text-5xl">{project.title}</h2><span className="text-sm text-archive-muted">{project.client}</span></div></div>
        </Link>
      </div>
    </section>
  );
}
