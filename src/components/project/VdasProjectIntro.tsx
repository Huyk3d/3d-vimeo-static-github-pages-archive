"use client";

import { useEffect, useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-01/01-01_balmuda`;
const balmudaImageNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] as const;
const balmudaVideo = {
  type: "vimeo" as const,
  src: "https://player.vimeo.com/video/1192152930?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1",
  title: "Balmuda Rain video",
  thumbnailSrc: `${imageBasePath}/Vdas_01_01-07.png`,
  aspectRatio: "16 / 9",
};
const balmudaLightboxContents = [
  balmudaVideo,
  ...balmudaImageNumbers.map((number) => ({
    type: "image" as const,
    src: `${imageBasePath}/Vdas_01_01-${number}.png`,
    alt: `Foundation Study 01 image ${number}`,
  })),
];

function ProjectImage({ number, className = "", onOpen }: { number: string; className?: string; onOpen: () => void }) {
  return (
    <ProjectMediaButton label={`Open Balmuda Rain image ${number}`} className={`bg-black ${className}`} onOpen={onOpen}>
      <img
        src={`${imageBasePath}/Vdas_01_01-${number}.png`}
        alt={`Foundation Study 01 image ${number}`}
        draggable={false}
        className="h-full w-full object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
      />
    </ProjectMediaButton>
  );
}

export function VdasProjectIntro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openMedia, lightbox } = useProjectMediaLightbox(balmudaLightboxContents);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const horizontalDelta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
      scrollContainer.scrollLeft += horizontalDelta;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[100px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              Balmuda Rain
            </h1>

            <div className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              <p>Vdas Intensive 19th</p>
              <p className="mt-6">
                &quot;가장 자연스러운 방식의 가습은 무엇일까?&quot;라는 질문에서 시작했습니다. 발뮤다 레인의 항아리 형상을 현대적이고 차분한 공간 디자인과 결합하여, 가전이 아닌 하나의 오브제로서 공간과 어우러지는 모습을 연출했습니다.
              </p>
            </div>
          </section>

          <ProjectVideoThumbnail {...balmudaVideo} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[20px] bg-black" onOpen={() => openMedia(0)} />

          <div className="grid h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*1.7777778+0.75rem)] shrink-0 -translate-x-[20px] grid-cols-2 grid-rows-2 gap-3 md:w-[calc((100svh-7rem-1.5vw)*1.7777778+1.5vw)] md:gap-[1.5vw]">
            <ProjectImage number="01" className="aspect-video w-full" onOpen={() => openMedia(1)} />
            <ProjectImage number="02" className="aspect-video w-full" onOpen={() => openMedia(2)} />
            <ProjectImage number="03" className="aspect-video w-full" onOpen={() => openMedia(3)} />
            <ProjectImage number="04" className="aspect-video w-full" onOpen={() => openMedia(4)} />
          </div>

          <ProjectImage number="05" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[20px]" onOpen={() => openMedia(5)} />

          <div className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[20px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]">
            <ProjectImage number="06" className="aspect-video w-full" onOpen={() => openMedia(6)} />
            <ProjectImage number="07" className="aspect-video w-full" onOpen={() => openMedia(7)} />
          </div>

          <ProjectImage number="08" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[20px]" onOpen={() => openMedia(8)} />
          <ProjectImage number="09" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[20px]" onOpen={() => openMedia(9)} />

          <div className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[20px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]">
            <ProjectImage number="10" className="aspect-video w-full" onOpen={() => openMedia(10)} />
            <ProjectImage number="11" className="aspect-video w-full" onOpen={() => openMedia(11)} />
          </div>

          <ProjectImage number="12" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[20px]" onOpen={() => openMedia(12)} />
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
