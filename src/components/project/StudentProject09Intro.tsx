"use client";

import { useEffect, useRef } from "react";

export function StudentProject09Intro() {
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
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[140px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              My Day
            </h1>

            <p className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              예술과 지식재산 과목에서 ‘개인의 하루’를 주제로<br />제작한 영상입니다. 저작권과 라이선스에 유의하면서,<br />관련 개념을 정확히 이해하고 적용하는 것을 목표로<br />작업했습니다. 당시 저는 4학년이었고, 해당 과목은<br />1학년 과목이라 비교적 편하게 재미있게 들었던<br />기억이 납니다.
            </p>
          </section>

          <div className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[40px] overflow-hidden bg-black">
            <iframe
              src="https://www.youtube.com/embed/HcP2pG3AjRo?rel=0&modestbranding=1&playsinline=1"
              title="My Day video"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
