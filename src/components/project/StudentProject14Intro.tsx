"use client";

import { useEffect, useRef } from "react";

export function StudentProject14Intro() {
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
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Apple Brand Artwork</h1>
            <div className="mt-7 max-w-[25rem] space-y-4 text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
              <p>졸업작품에 들어가기 전인 3학년 2학기 슬럼프 기간에 과제로 제작한 영상입니다. 메탈릭 소재의 조명과 아트워크 레이아웃에 대한 이해가 부족한 상태에서 작업했고,</p>
              <p>슬럼프 기간에 거의 억지로 완성한 영상이라 여러 부분에서 아쉬움이 크게 남습니다. 개인적으로는 지금 다시 보면 부끄럽다고 느끼는 과제물이기도 합니다.</p>
            </div>
          </section>
          <div className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[70px] overflow-hidden bg-black">
            <iframe src="https://www.youtube.com/embed/YEw43tZj0V0?rel=0&modestbranding=1&playsinline=1" title="Apple Brand Artwork video" className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
