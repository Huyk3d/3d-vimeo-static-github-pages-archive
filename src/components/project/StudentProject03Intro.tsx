"use client";

import { useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";
import { useInertialScroll } from "@/hooks/useInertialScroll";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/3-1 HELLO`;
const video = { type: "youtube" as const, src: "https://www.youtube.com/embed/DsG2NxF65TM?rel=0&modestbranding=1&playsinline=1", title: "HELLO! video", thumbnailSrc: `${imageBasePath}/HELLO THUM.png`, aspectRatio: "16 / 9" };
const media = [video, ...Array.from({ length: 18 }, (_, index) => ({ type: "image" as const, src: `${imageBasePath}/3-1_기말PPT_${index + 1}.png`, alt: `HELLO! presentation image ${index + 1}` }))];

const imageGroups = [
  { large: "1" },
  { small: ["2", "3"] },
  { large: "4" },
  { small: ["5", "6"] },
  { large: "7" },
  { small: ["8", "9"] },
  { large: "10" },
  { small: ["11", "12"] },
  { large: "13" },
  { small: ["14", "15"] },
  { large: "16" },
  { small: ["17", "18"] },
];

function ProjectImage({ number, className = "", onOpen }: { number: string; className?: string; onOpen: () => void }) {
  return (
    <ProjectMediaButton label={`Open HELLO! presentation image ${number}`} className={`bg-black ${className}`} onOpen={onOpen}>
      <img
        src={`${imageBasePath}/3-1_기말PPT_${number}.png`}
        alt={`HELLO! presentation image ${number}`}
        className="h-full w-full object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
        draggable={false}
      />
    </ProjectMediaButton>
  );
}

export function StudentProject03Intro() {
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
              HELLO!
            </h1>

            <div className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              <p>2024년 1학기 모션그래픽 과제로 제작했습니다.</p>
              <p className="mt-4">2020년 초반에 유행했던 HELLO 모션그래픽들을<br />레퍼런스로 삼아 제작했습니다.</p>
            </div>
          </section>

          <ProjectVideoThumbnail {...video} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] bg-black" onOpen={() => openMedia(0)} />

          {imageGroups.map((group) => {
            if (group.large) {
              return <ProjectImage key={group.large} number={group.large} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" onOpen={() => openMedia(Number(group.large))} />;
            }

            return (
              <div
                key={group.small?.join("-")}
                className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[36px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]"
              >
                {group.small?.map((number) => <ProjectImage key={number} number={number} className="h-full w-full" onOpen={() => openMedia(Number(number))} />)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
