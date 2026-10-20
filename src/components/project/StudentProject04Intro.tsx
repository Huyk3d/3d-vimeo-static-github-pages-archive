"use client";

import { useEffect, useRef, useState } from "react";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/3-2_젤다`;

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
  { large: "19" },
  { small: ["20", "21"] },
  { large: "22" },
  { small: ["23", "24"] },
  { large: "25" },
  { small: ["26", "27"] },
];

function ProjectImage({ number, className = "" }: { number: string; className?: string }) {
  return (
    <div className={`group overflow-hidden bg-black ${className}`}>
      <img
        src={`${imageBasePath}/3-1_중간PPT 젤다_${number}.png`}
        alt={`The Legend of Zelda presentation image ${number}`}
        className="h-full w-full object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
      />
    </div>
  );
}

export function StudentProject04Intro() {
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
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[110px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              The Legend of Zelda Movie Opening
            </h1>

            <div className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              <p>2024년 3학년 1학기 중간고사 이후부터 계속 제작한<br />프로젝트입니다. 주제는 가상의 드라마나 영화의 오프닝 시퀀스를 만드는 것이었고, 제가 가장 애정하는 게임<br />시리즈를 실사 영화로 제작한다면 어떤 오프닝 시퀀스가 나올지를 가정해 제작했습니다.</p>
              <p className="mt-4">제작 기간도 비교적 길었고, 대학 생활 동안 작업한<br />프로젝트 중에서도 가장 애정을 많이 쏟았던 작품 중 하나입니다.</p>
            </div>
          </section>

          <div
            ref={videoAreaRef}
            className="relative h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[12px] overflow-hidden bg-black"
            onPointerLeave={() => setIsVideoInteractive(false)}
          >
            <iframe
              src="https://www.youtube.com/embed/GV9UN18x1JU?rel=0&modestbranding=1&playsinline=1"
              title="The Legend of Zelda Movie Opening video"
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
              return <ProjectImage key={group.large} number={group.large} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[12px]" />;
            }

            return (
              <div
                key={group.small?.join("-")}
                className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[12px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]"
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
