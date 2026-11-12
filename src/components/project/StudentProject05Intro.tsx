"use client";

import { useRef } from "react";
import { ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";
import { useInertialScroll } from "@/hooks/useInertialScroll";

const media = [{ type: "youtube" as const, src: "https://www.youtube.com/embed/tT373rG5ZRk?rel=0&modestbranding=1&playsinline=1", title: "WELCOME TO TOY WORLD video", thumbnailSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/Toy World.png`, aspectRatio: "16 / 9" }];

export function StudentProject05Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openMedia, lightbox } = useProjectMediaLightbox(media);

  useInertialScroll(scrollContainerRef);

  return (
    <>
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[140px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              WELCOME TO TOY WORLD
            </h1>

            <p className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              2023년도 2학년 2학기 중간고사 과제물입니다.<br />처음으로 Blender를 사용해 제작한 작업물입니다.
            </p>
          </section>

          <ProjectVideoThumbnail {...media[0]} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[70px] bg-black" onOpen={() => openMedia(0)} />
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
