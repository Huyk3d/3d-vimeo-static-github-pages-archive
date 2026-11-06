"use client";

import { useEffect, useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/2026/Gameboy Classic`;
const video = {
  type: "vimeo" as const,
  src: "https://player.vimeo.com/video/1164739290?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1",
  title: "Play Again, GameBoy.",
  thumbnailSrc: `${imageBasePath}/GBC_비헨스_01.png`,
  aspectRatio: "16 / 9",
};

const mediaGroups = [
  { single: 1 },
  { pair: [2, 7] },
  { pair: [3, 10] },
  { single: 4 },
  { single: 6 },
  { single: 8 },
  { single: 9 },
  { pair: [11, 12] },
  { pair: [13, 14] },
  { single: 15 },
] as const;

const imageOrder: readonly number[] = mediaGroups.flatMap((group) => "single" in group ? [group.single] : group.pair);
const media = [
  video,
  { type: "image" as const, src: `${imageBasePath}/Wip Gif.gif`, alt: "Play Again, GameBoy. work in progress animation" },
  ...imageOrder.map((number) => ({
    type: "image" as const,
    src: `${imageBasePath}/GBC_비헨스_${String(number).padStart(2, "0")}.png`,
    alt: `Play Again, GameBoy. artwork ${number}`,
  })),
];

function ArtworkImage({ number, onOpen, className = "h-[calc(100svh-7rem)] shrink-0 -translate-x-[20px]" }: { number: number; onOpen: () => void; className?: string }) {
  return (
    <ProjectMediaButton label={`Open Play Again, GameBoy. artwork ${number}`} className={className} onOpen={onOpen}>
      <img
        src={`${imageBasePath}/GBC_비헨스_${String(number).padStart(2, "0")}.png`}
        alt={`Play Again, GameBoy. artwork ${number}`}
        draggable={false}
        className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
      />
    </ProjectMediaButton>
  );
}

export function Vdas02Project07Intro() {
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

  const imageMediaIndex = (number: number) => imageOrder.indexOf(number) + 2;

  return (
    <>
      <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
        <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
          <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
            <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[100px] flex-col justify-center">
              <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Play Again, GameBoy.</h1>
              <div className="mt-7 max-w-[26rem] space-y-6 text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
                <p>VDAS 인텐시브 시작 이전에 시간이 남아 진행한 개인 작업입니다. 졸업 작품은 개인적인 애정에 비해 결과물이 만족스럽지 않은 것 같아, 거의 1년 만에 비슷한 소재로 다시 진행했습니다.</p>
                <p>어린아이가 가지고 노는 닌텐도 게임보이와 어른들의 공간인 현대적인 사무실이라는 대비되는 요소에서 출발했습니다.</p>
                <p>보라색과 주황색, 낮과 밤의 대비를 강하게 활용해 작업했으며, Yambo Studio의 Xiaomi Redmi 5 영상을 많이 참고했습니다.</p>
              </div>
            </section>

            <ProjectVideoThumbnail {...video} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[20px] bg-black" onOpen={() => openMedia(0)} />

            <ProjectMediaButton label="Open Play Again, GameBoy. work in progress animation" className="h-[calc(100svh-7rem)] shrink-0 -translate-x-[20px]" onOpen={() => openMedia(1)}>
              <img
                src={`${imageBasePath}/Wip Gif.gif`}
                alt="Play Again, GameBoy. work in progress animation"
                draggable={false}
                className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
              />
            </ProjectMediaButton>

            {mediaGroups.map((group) => {
              if ("single" in group) {
                return <ArtworkImage key={group.single} number={group.single} onOpen={() => openMedia(imageMediaIndex(group.single))} />;
              }

              return (
                <div key={group.pair.join("-")} className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[20px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]">
                  {group.pair.map((number) => (
                    <ArtworkImage key={number} number={number} className="h-full w-full" onOpen={() => openMedia(imageMediaIndex(number))} />
                  ))}
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
