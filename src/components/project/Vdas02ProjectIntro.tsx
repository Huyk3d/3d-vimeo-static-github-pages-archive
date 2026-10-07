"use client";

import { useEffect, useRef } from "react";

const projectMedia = [
  { id: "video", label: "VDAS 02 Study 01 video placeholder" },
  { id: "image-01", label: "VDAS 02 Study 01 image 01 placeholder" },
  { id: "image-02", label: "VDAS 02 Study 01 image 02 placeholder" },
  { id: "image-03", label: "VDAS 02 Study 01 image 03 placeholder" },
  { id: "image-04", label: "VDAS 02 Study 01 image 04 placeholder" },
  { id: "image-05", label: "VDAS 02 Study 01 image 05 placeholder" },
];

export function Vdas02ProjectIntro() {
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
            <h1 className="text-[32px] font-bold leading-tight tracking-[-0.04em]">
              VDAS 02 Study 01
            </h1>

            <div className="mt-7 text-[24px] leading-tight tracking-[-0.03em]">
              <p>3D Motion Design</p>
            </div>

            <p className="mt-6 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              VDAS 02 과정에서 진행한 개인 작업입니다. 프로젝트의 구조와 움직임, 라이팅과 비주얼 완성도를 중심으로 작업했습니다.
            </p>
          </section>

          {projectMedia.map((media) => (
            <div
              key={media.id}
              aria-label={media.label}
              className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] bg-black"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
