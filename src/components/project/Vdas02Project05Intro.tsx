"use client";

import { useRef } from "react";
import { ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";
import { useInertialScroll } from "@/hooks/useInertialScroll";

const media = [{ type: "vimeo" as const, src: "https://player.vimeo.com/video/1241733247?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1", title: "Character Training", thumbnailSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Cha_thum.png`, aspectRatio: "16 / 9" }];

export function Vdas02Project05Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openMedia, lightbox } = useProjectMediaLightbox(media);

  useInertialScroll(scrollContainerRef);

  return (
    <>
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[27vw] min-w-[17rem] max-w-[27rem] shrink-0 translate-x-3 -translate-y-[120px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Character Training</h1>
          </section>
          <ProjectVideoThumbnail {...media[0]} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] bg-black" onOpen={() => openMedia(0)} />
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
