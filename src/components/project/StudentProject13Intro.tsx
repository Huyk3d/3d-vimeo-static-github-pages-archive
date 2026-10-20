"use client";

import { useEffect, useRef } from "react";

export function StudentProject13Intro() {
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
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Loopse Lives, Silent Escape</h1>
            <div className="mt-7 max-w-[25rem] space-y-4 text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
              <p>졸업작품에 들어가기 전인 3학년 2학기 슬럼프 기간에 과제로 제작한 영상입니다. 순천시 공모전에 출품한 작품이기도 합니다.</p>
              <p>평소에 잘 하지 않던 애니메이션 장르를 작업했고, 극심한 작업 슬럼프 기간에 만든 작품이라 전체적인 퀄리티가 좋지 않은 편입니다. 러닝타임을 억지로 늘린 흔적도 많이 보여 개인적으로 아쉬움이 크게 남는 작업물입니다.</p>
            </div>
          </section>
          <div className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[70px] overflow-hidden bg-black">
            <iframe src="https://www.youtube.com/embed/2JN0Zc2WymA?rel=0&modestbranding=1&playsinline=1" title="Loopse Lives, Silent Escape video" className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
