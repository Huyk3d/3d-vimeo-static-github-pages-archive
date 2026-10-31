"use client";

import { useEffect, useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Muzigae Masion AI Video`;
const aiImageNumbers = Array.from({ length: 12 }, (_, index) => index + 1);
const presentationNumbers = Array.from({ length: 16 }, (_, index) => index + 1);
const video = { type: "vimeo" as const, src: "https://player.vimeo.com/video/1231742460?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1", title: "Muzigae Masion AI Video", thumbnailSrc: `${imageBasePath}/권혁의_AI Img_5.png`, aspectRatio: "3712 / 4608" };
const media = [video, ...aiImageNumbers.map((number) => ({ type: "image" as const, src: `${imageBasePath}/권혁의_AI Img_${number}.png`, alt: `Muzigae Masion AI image ${number}` })), ...presentationNumbers.map((number) => ({ type: "image" as const, src: `${imageBasePath}/권혁의_AI hardwork_발표자료_${number}.jpg`, alt: `Muzigae Masion presentation ${number}` }))];

function ArtworkImage({ src, alt, className = "", onOpen }: { src: string; alt: string; className?: string; onOpen: () => void }) {
  return (
    <ProjectMediaButton label={`Open ${alt}`} className={`h-[calc(100svh-7rem)] shrink-0 -translate-x-[86px] ${className}`} onOpen={onOpen}>
      <img
        src={src}
        alt={alt}
        className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
        draggable={false}
      />
    </ProjectMediaButton>
  );
}

export function Vdas02Project02Intro() {
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
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[100px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Muzigae Masion AI Video</h1>
          </section>
          <ProjectVideoThumbnail {...video} className="h-[calc(100svh-7rem)] aspect-[3712/4608] shrink-0 -translate-x-[86px] bg-black" onOpen={() => openMedia(0)} />

          {aiImageNumbers.map((number) => (
            <ArtworkImage
              key={`ai-${number}`}
              src={`${imageBasePath}/권혁의_AI Img_${number}.png`}
              alt={`Muzigae Masion AI image ${number}`}
              onOpen={() => openMedia(number)}
            />
          ))}

          {presentationNumbers.map((number, index) => (
            <ArtworkImage
              key={`presentation-${number}`}
              src={`${imageBasePath}/권혁의_AI hardwork_발표자료_${number}.jpg`}
              alt={`Muzigae Masion presentation ${number}`}
              className={index === 0 ? "ml-[4vw]" : ""}
              onOpen={() => openMedia(aiImageNumbers.length + number)}
            />
          ))}
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
