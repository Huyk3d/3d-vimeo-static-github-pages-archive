"use client";

import { useEffect, useRef, useState } from "react";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/3-1 HELLO`;

const imageGroups = [
  { large: "1" },
  { small: ["2", "3"] },
  { large: "4" },
  { small: ["5", "6"] },
  { large: "7" },
  { small: ["8", "9"] },
  { large: "10" },
  { small: ["11", "12"] },
  { large: "13" },
  { small: ["14", "15"] },
  { large: "16" },
  { small: ["17", "18"] },
];

function ProjectImage({ number, className = "" }: { number: string; className?: string }) {
  return (
    <div className={`group overflow-hidden bg-black ${className}`}>
      <img
        src={`${imageBasePath}/3-1_기말PPT_${number}.png`}
        alt={`HELLO! presentation image ${number}`}
        className="h-full w-full object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
      />
    </div>
  );
}

export function StudentProject03Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoAreaRef = useRef<HTMLDivElement>(null);
  const [isVideoInteractive, setIsVideoInteractive] = useState(false);

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

  useEffect(() => {
    const restoreScrollPriority = (event: PointerEvent) => {
      const videoArea = videoAreaRef.current;
      if (!videoArea || videoArea.contains(event.target as Node)) return;

      setIsVideoInteractive(false);
    };

    window.addEventListener("pointerdown", restoreScrollPriority, true);
    return () => window.removeEventListener("pointerdown", restoreScrollPriority, true);
  }, []);

  return (
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[140px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              HELLO!
            </h1>

            <div className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              <p>2024년 1학기 모션그래픽 과제로 제작했습니다.</p>
              <p className="mt-4">2020년 초반에 유행했던 HELLO 모션그래픽들을<br />레퍼런스로 삼아 제작했습니다.</p>
            </div>
          </section>

          <div
            ref={videoAreaRef}
            className="relative h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] overflow-hidden bg-black"
            onPointerLeave={() => setIsVideoInteractive(false)}
          >
            <iframe
              src="https://www.youtube.com/embed/DsG2NxF65TM?rel=0&modestbranding=1&playsinline=1"
              title="HELLO! video"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            {!isVideoInteractive && (
              <button
                type="button"
                aria-label="Enable YouTube controls"
                onClick={() => setIsVideoInteractive(true)}
                className="absolute inset-0 z-10 cursor-pointer bg-transparent"
              />
            )}
          </div>

          {imageGroups.map((group) => {
            if (group.large) {
              return <ProjectImage key={group.large} number={group.large} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />;
            }

            return (
              <div
                key={group.small?.join("-")}
                className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[36px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]"
              >
                {group.small?.map((number) => <ProjectImage key={number} number={number} className="h-full w-full" />)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
