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
        </Link>
        <div id="hero-work-02" className="relative aspect-video w-full snap-start snap-always scroll-mt-0 overflow-hidden bg-[#EDEDED]">
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/Main/hero_02.png`} alt="" fill sizes="100vw" className="scale-105 object-cover object-center brightness-[0.6] saturate-125 blur-[13px]" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative -translate-y-[6vh] h-[88%] w-[88%]">
              <div className="group relative mx-auto h-full aspect-[27/40] overflow-hidden">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/Main/hero_02.png`} alt="Hero Work 02" fill sizes="70vw" className="object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.06] group-hover:duration-[6000ms]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
