"use client";

import { useRef } from "react";
import { ProjectMediaButton, useProjectMediaLightbox } from "./ProjectMediaLightbox";
import { useInertialScroll } from "@/hooks/useInertialScroll";

const artworkBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Muzigae Artworks`;
const copyArtworks = [
  { file: "01_모작.png", alt: "Muzigae Masion copy artwork 01" },
  { file: "02_모작.png", alt: "Muzigae Masion copy artwork 02" },
  { file: "03_모작.png", alt: "Muzigae Masion copy artwork 03", caption: "미완성된 연습 모작입니다." },
  { file: "04_모작.png", alt: "Muzigae Masion copy artwork 04" },
];
const media = [
  { type: "image" as const, src: `${artworkBasePath}/무지개맨션.png`, alt: "Muzigae Masion main artwork" },
  ...copyArtworks.map((artwork) => ({ type: "image" as const, src: `${artworkBasePath}/${artwork.file}`, alt: artwork.alt })),
];

export function Vdas02ProjectIntro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openMedia, lightbox } = useProjectMediaLightbox(media);

  useInertialScroll(scrollContainerRef);

  return (
    <>
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[250px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              Muzigae Masion Artworks
            </h1>
          </section>

          <ProjectMediaButton
            label="Open Muzigae Masion main artwork"
            className="h-[calc(100svh-7rem)] shrink-0 -translate-x-[136px]"
            onOpen={() => openMedia(0)}
          >
            <img
              src={`${artworkBasePath}/무지개맨션.png`}
              alt="Muzigae Masion main artwork"
              draggable={false}
              className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
            />
          </ProjectMediaButton>

          <section className="ml-[14vw] flex h-72 w-[18rem] shrink-0 -translate-x-[300px] -translate-y-[250px] flex-col justify-center">
            <h2 className="text-[24px] font-bold leading-tight tracking-[-0.04em]">모작 과제들</h2>
          </section>

          {copyArtworks.map((artwork, index) => (
            <div
              key={artwork.file}
              className={`group relative h-[calc(100svh-7rem)] shrink-0 -translate-x-[450px] overflow-visible ${index === 0 ? "ml-[3vw]" : ""}`}
            >
              <ProjectMediaButton label={`Open ${artwork.alt}`} className="h-full bg-transparent" onOpen={() => openMedia(index + 1)}>
                <img
                  src={`${artworkBasePath}/${artwork.file}`}
                  alt={artwork.alt}
                  draggable={false}
                  className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
                />
              </ProjectMediaButton>
              {artwork.caption && (
                <p className="absolute left-0 top-full mt-2 text-[12px] leading-[1.35] tracking-[-0.025em] text-archive-muted">
                  {artwork.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
