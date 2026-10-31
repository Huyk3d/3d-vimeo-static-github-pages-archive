"use client";

import { useEffect, useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Air BnB UIUX`;
const imageNumbers = Array.from({ length: 4 }, (_, index) => index + 1);
const video = { type: "vimeo" as const, src: "https://player.vimeo.com/video/1241732845?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1", title: "Air BnB UI/UX", thumbnailSrc: `${imageBasePath}/AirBnb_04.png`, aspectRatio: "16 / 9" };
const media = [video, ...imageNumbers.map((number) => ({ type: "image" as const, src: `${imageBasePath}/AirBnb_${String(number).padStart(2, "0")}.png`, alt: `Air BnB UI/UX artwork ${number}` }))];

function ArtworkImage({ number, onOpen }: { number: number; onOpen: () => void }) {
  return (
    <ProjectMediaButton label={`Open Air BnB UI/UX artwork ${number}`} className="h-[calc(100svh-7rem)] shrink-0 -translate-x-[36px]" onOpen={onOpen}>
      <img
        src={`${imageBasePath}/AirBnb_${String(number).padStart(2, "0")}.png`}
        alt={`Air BnB UI/UX artwork ${number}`}
        className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
        draggable={false}
      />
    </ProjectMediaButton>
  );
}

export function Vdas02Project04Intro() {
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
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Air BnB UI/UX</h1>
          </section>
          <ProjectVideoThumbnail {...video} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[116px] bg-black" onOpen={() => openMedia(0)} />
          {imageNumbers.map((number) => <ArtworkImage key={number} number={number} onOpen={() => openMedia(number)} />)}
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
