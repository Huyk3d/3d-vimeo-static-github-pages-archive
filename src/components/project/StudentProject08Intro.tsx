"use client";

import { useEffect, useRef } from "react";

const d2CodingFontPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/fonts/D2Coding.ttf`;

export function StudentProject08Intro() {
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
            <h1 className="student-08-korean text-[28px] font-medium leading-tight tracking-[-0.04em]">
              가스수소 안전공모전
            </h1>

            <p className="student-08-korean mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              공모전 수업 때 제작한 가스·수소 안전 인포그래픽입니다. 인포그래픽 형식의 영상과 성우를 고용해 제작한 작업은 처음이라 재미있는 경험이었습니다. 아쉽게도 공모전에서 수상하지는 못했습니다.
            </p>
          </section>

          <div className="h-[calc(100svh-7rem)] aspect-video shrink-0 overflow-hidden bg-black">
            <iframe
              src="https://www.youtube.com/embed/yu4UiAof4OI?rel=0&modestbranding=1&playsinline=1"
              title="가스수소 안전공모전 video"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        @font-face {
          font-family: "Student08D2Coding";
          src: url("${d2CodingFontPath}") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .student-08-korean {
          font-family: "Student08D2Coding", monospace;
        }
      `}</style>
    </section>
  );
}
