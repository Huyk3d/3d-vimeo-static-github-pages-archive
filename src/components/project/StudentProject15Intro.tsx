"use client";

import { useEffect, useRef } from "react";

const d2CodingFontPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/fonts/D2Coding.ttf`;

export function StudentProject15Intro() {
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
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]" style={{ fontFamily: "D2Coding, monospace" }}>
              친환경 소비 숏폼 공모전
            </h1>
            <div className="mt-7 max-w-[25rem] space-y-4 text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]" style={{ fontFamily: "D2Coding, monospace" }}>
              <p>공모전 수업 때 제작한 친환경 소비 숏폼 영상 공모전입니다.</p>
              <p>수상에 대한 욕심보다는 제출에 의의를 두고 제작했습니다.</p>
            </div>
          </section>
          <div className="h-[calc(100svh-7rem)] aspect-[9/16] shrink-0 -translate-x-[170px] overflow-hidden bg-black">
            <iframe
              src="https://www.youtube.com/embed/ziCqA2gAtx4?rel=0&modestbranding=1&playsinline=1"
              title="친환경 소비 숏폼 공모전 video"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        @font-face {
          font-family: "D2Coding";
          src: url("${d2CodingFontPath}") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </section>
  );
}
