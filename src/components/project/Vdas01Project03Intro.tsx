"use client";

import { useEffect, useRef } from "react";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-01/01-03_Toy`;

function ProjectImage({ number, className = "" }: { number: string; className?: string }) {
  return (
    <div className={`overflow-hidden bg-black ${className}`}>
      <img
        src={`${imageBasePath}/ToyRacing_${number}.png`}
        alt={`TOY RACING image ${number}`}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function Vdas01Project03Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const horizontalDelta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
      scrollContainer.scrollLeft += horizontalDelta;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[100px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              TOY RACING
            </h1>

            <div className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              <p>VDAS Foundation 85-3th</p>
              <p className="mt-6">장난감 상자 안에는 어떤 일이 벌어지고 있을까?</p>
              <p className="mt-3">
                아이들의 상상력이 만들어낸 책상 위 레이싱 월드를<br />테마로, 장난감 특유의 질감과 아기자기한 디테일을<br />3D로 시각화한 프로젝트입니다.
              </p>
            </div>
          </section>

          <div className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] overflow-hidden bg-black">
            <iframe
              src="https://player.vimeo.com/video/1163883894?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0"
              title="TOY RACING video"
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

          <ProjectImage number="01" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />

          <div className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[36px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]">
            <ProjectImage number="02" className="aspect-video w-full" />
            <ProjectImage number="03" className="aspect-video w-full" />
          </div>

          <ProjectImage number="04" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />

          <div className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[36px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]">
            <ProjectImage number="05" className="aspect-video w-full" />
            <ProjectImage number="06" className="aspect-video w-full" />
          </div>

          <ProjectImage number="07" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />
        </div>
      </div>
    </section>
  );
}
