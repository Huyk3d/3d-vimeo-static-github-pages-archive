"use client";

import { useRef } from "react";
import { ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";
import { useInertialScroll } from "@/hooks/useInertialScroll";

const media = [{ type: "youtube" as const, src: "https://www.youtube.com/embed/ziCqA2gAtx4?rel=0&modestbranding=1&playsinline=1", title: "친환경 소비 숏폼 공모전 video", thumbnailSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/친환경 숏폼.png`, aspectRatio: "9 / 16" }];

export function StudentProject15Intro() {
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
              친환경 소비 숏폼 공모전
            </h1>
            <div className="mt-7 max-w-[25rem] space-y-4 text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
              <p>공모전 수업 때 제작한 친환경 소비 숏폼 영상 공모전입니다.</p>
              <p>수상에 대한 욕심보다는 제출에 의의를 두고 제작했습니다.</p>
            </div>
          </section>
          <ProjectVideoThumbnail {...media[0]} className="h-[calc(100svh-7rem)] aspect-[9/16] shrink-0 -translate-x-[170px] bg-black" onOpen={() => openMedia(0)} />
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
