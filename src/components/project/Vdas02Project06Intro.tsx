"use client";

import { useEffect, useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Citizen`;
const stillNumbers = Array.from({ length: 4 }, (_, index) => index + 1);
const planningNumbers = Array.from({ length: 8 }, (_, index) => index + 1);
const firstVideo = { type: "vimeo" as const, src: "https://player.vimeo.com/video/1241735762?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1", title: "Citizen Watch (AI)", thumbnailSrc: `${imageBasePath}/스틸_03.png`, aspectRatio: "16 / 9" };
const secondVideo = { type: "vimeo" as const, src: "https://player.vimeo.com/video/1241735884?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1", title: "Citizen Watch (AI) Previz", thumbnailSrc: `${imageBasePath}/스틸_03_Pre.png`, aspectRatio: "16 / 9" };
const media = [
  firstVideo,
  secondVideo,
  ...stillNumbers.map((number) => ({ type: "image" as const, src: `${imageBasePath}/스틸_${String(number).padStart(2, "0")}.png`, alt: `Citizen Watch (AI) still ${number}` })),
  ...planningNumbers.map((number) => ({ type: "image" as const, src: `${imageBasePath}/기획_${number}.jpg`, alt: `Citizen Watch (AI) planning image ${number}` })),
];

function ArtworkImage({ number, onOpen }: { number: number; onOpen: () => void }) {
  return (
    <ProjectMediaButton label={`Open Citizen Watch (AI) still ${number}`} className="h-[calc(100svh-7rem)] shrink-0 -translate-x-[36px]" onOpen={onOpen}>
      <img
        src={`${imageBasePath}/스틸_${String(number).padStart(2, "0")}.png`}
        alt={`Citizen Watch (AI) still ${number}`}
        className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
        draggable={false}
      />
    </ProjectMediaButton>
  );
}

function PlanningImage({ number, onOpen }: { number: number; onOpen: () => void }) {
  return (
    <ProjectMediaButton label={`Open Citizen Watch (AI) planning image ${number}`} className="h-[calc(100svh-7rem)] shrink-0 -translate-x-[36px]" onOpen={onOpen}>
      <img
        src={`${imageBasePath}/기획_${number}.jpg`}
        alt={`Citizen Watch (AI) planning image ${number}`}
        className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
        draggable={false}
      />
    </ProjectMediaButton>
  );
}

export function Vdas02Project06Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openMedia, lightbox } = useProjectMediaLightbox(media);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollContainer.scrollLeft += event.deltaX !== 0 ? event.deltaX : event.deltaY;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[27vw] min-w-[17rem] max-w-[27rem] shrink-0 translate-x-3 -translate-y-[120px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Citizen Watch (AI)</h1>
          </section>
          <ProjectVideoThumbnail {...firstVideo} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] bg-black" onOpen={() => openMedia(0)} />
          <div className="relative h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] overflow-visible">
            <ProjectVideoThumbnail {...secondVideo} className="h-full w-full bg-black" onOpen={() => openMedia(1)} />
            <p className="absolute left-0 top-full mt-2 text-[11px] leading-none tracking-[-0.02em]">Previz</p>
          </div>
          {stillNumbers.map((number) => <ArtworkImage key={number} number={number} onOpen={() => openMedia(number + 1)} />)}
          {planningNumbers.map((number) => <PlanningImage key={number} number={number} onOpen={() => openMedia(number + stillNumbers.length + 1)} />)}
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
