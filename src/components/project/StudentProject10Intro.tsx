"use client";

import { useEffect, useRef } from "react";

export function StudentProject10Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[140px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">LG 공모전</h1>
            <p className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
              2024년 여름방학 때 친구 두 명과 함께 제작한 LG 구미 제2회 공모전 브랜드 필름입니다. 기획과 모델링, 성우 컨택, 최종 후작업을 맡아 작업했습니다. 아쉽게도 수상하지는 못했습니다.
            </p>
          </section>
          <div className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[70px] overflow-hidden bg-black">
            <iframe src="https://www.youtube.com/embed/l8Q2pxAAem0?rel=0&modestbranding=1&playsinline=1" title="LG 공모전 video" className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
