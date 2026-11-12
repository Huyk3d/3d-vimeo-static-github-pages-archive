"use client";

import { useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";
import { useInertialScroll } from "@/hooks/useInertialScroll";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/2026/Xbox`;
const imageNumbers = [1, 2, 3, 4, 5] as const;
const video = {
  type: "vimeo" as const,
  src: "https://player.vimeo.com/video/1243673983?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1",
  title: "XBOX",
  thumbnailSrc: `${imageBasePath}/Xbox_02.png`,
  aspectRatio: "16 / 9",
};
const media = [
  video,
  ...imageNumbers.map((number) => ({
    type: "image" as const,
    src: `${imageBasePath}/Xbox_${String(number).padStart(2, "0")}.png`,
    alt: `XBOX artwork ${number}`,
  })),
];

function ArtworkImage({ number, onOpen }: { number: number; onOpen: () => void }) {
  return (
    <ProjectMediaButton label={`Open XBOX artwork ${number}`} className="h-[calc(100svh-7rem)] shrink-0 -translate-x-[20px]" onOpen={onOpen}>
      <img
        src={`${imageBasePath}/Xbox_${String(number).padStart(2, "0")}.png`}
        alt={`XBOX artwork ${number}`}
        draggable={false}
        className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
      />
    </ProjectMediaButton>
  );
}

export function Vdas01Project05Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openMedia, lightbox } = useProjectMediaLightbox(media);

  useInertialScroll(scrollContainerRef);

  return (
    <>
      <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
        <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
          <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
            <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[100px] flex-col justify-center">
              <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">XBOX</h1>
              <div className="mt-7 max-w-[26rem] text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
                <p>졸업작품이 끝나고 VDAS를 다니기 전, 중간에 짬을 내서 만든 개인작입니다.</p>
              </div>
            </section>

            <ProjectVideoThumbnail {...video} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[20px] bg-black" onOpen={() => openMedia(0)} />
            {imageNumbers.map((number) => <ArtworkImage key={number} number={number} onOpen={() => openMedia(number)} />)}
          </div>
        </div>
      </section>
      {lightbox}
    </>
  );
}
