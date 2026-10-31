"use client";

import { useEffect, useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Galaxy S26 Ultra`;
const imageNumbers = Array.from({ length: 14 }, (_, index) => index + 1);
const imageGroups = [
  { large: 1 }, { small: [2, 3] }, { large: 4 }, { small: [5, 6] },
  { large: 7 }, { small: [8, 9] }, { large: 10 }, { small: [11, 12] },
  { large: 13 }, { small: [14] },
] as const;
const video = { type: "vimeo" as const, src: "https://player.vimeo.com/video/1241732169?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1", title: "Galaxy S26 Ultra", thumbnailSrc: `${imageBasePath}/Galaxy_11.png`, aspectRatio: "16 / 9" };
const media = [video, ...imageNumbers.map((number) => ({ type: "image" as const, src: `${imageBasePath}/Galaxy_${String(number).padStart(2, "0")}.png`, alt: `Galaxy S26 Ultra artwork ${number}` }))];

function ArtworkImage({ number, onOpen, className = "h-[calc(100svh-7rem)] shrink-0 -translate-x-[36px]" }: { number: number; onOpen: () => void; className?: string }) {
  return (
    <ProjectMediaButton label={`Open Galaxy S26 Ultra artwork ${number}`} className={className} onOpen={onOpen}>
      <img
        src={`${imageBasePath}/Galaxy_${String(number).padStart(2, "0")}.png`}
        alt={`Galaxy S26 Ultra artwork ${number}`}
        className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
        draggable={false}
      />
    </ProjectMediaButton>
  );
}

export function Vdas02Project03Intro() {
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
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Galaxy S26 Ultra</h1>
          </section>
          <ProjectVideoThumbnail {...video} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] bg-black" onOpen={() => openMedia(0)} />
          {imageGroups.map((group) => {
            if ("large" in group) {
              return <ArtworkImage key={group.large} number={group.large} onOpen={() => openMedia(group.large)} />;
            }

            return (
              <div key={group.small.join("-")} className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[36px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]">
                {group.small.map((number) => <ArtworkImage key={number} number={number} className="h-full w-full" onOpen={() => openMedia(number)} />)}
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
