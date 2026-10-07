"use client";

import { useEffect, useRef } from "react";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/01-Grad`;

function ProjectImage({ number, className = "" }: { number: string; className?: string }) {
  return (
    <div className={`overflow-hidden bg-black ${className}`}>
      <img
        src={`${imageBasePath}/GameBoy Classic_졸업작_${number}.png`}
        alt={`Graduation project image ${number}`}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function StudentProjectIntro() {
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
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[60px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              GAMEBOY CLASSIC
            </h1>

            <div className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              <p>국립순천대학교 영상디자인학과 졸업작품</p>
              <p className="mt-6">
                Gameboy Classic은 1991년에 발매된 닌텐도사의 Game Boy 시리즈를 현대적으로 재해석한 가상의 제품이다. &apos;만약 닌텐도가 클래식한 감성을 유지한 채, 오늘날의<br />기술과 디자인 언어를 활용해 Game Boy 시리즈를 복각 출시한다면 어떨까?&apos;라는 가정에서 출발하였다.
              </p>
              <p className="mt-4">
                작품은 과거의 책상에서 시작해 다채로운 컬러와<br />장르별로 기본 제공되는 세 가지 합팩, 그리고 통신<br />기능의 구현, TV로 확장되는 기능을 시각적으로 보여준 이후, 다시 현대적인 배경의 책상으로 떨어지는 수미상관의 구조를 가지고 있다. 이러한 기능적 요소와 더불어, 닌텐도 브랜드가 지닌 가치와 방향성을 시각적으로 표현하여 &apos;과거의 감성과 현대적 기술의 조화&apos;라는 주제를<br />모션그래픽으로 풀어냈다.
              </p>
            </div>
          </section>

          <div className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px] overflow-hidden bg-black">
            <iframe
              src="https://player.vimeo.com/video/1163879333?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0"
              title="GAMEBOY CLASSIC video"
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

          <ProjectImage number="01" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />

          <div className="grid h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*1.7777778+0.75rem)] shrink-0 -translate-x-[36px] grid-cols-2 grid-rows-2 gap-3 md:w-[calc((100svh-7rem-1.5vw)*1.7777778+1.5vw)] md:gap-[1.5vw]">
            {["02", "03", "04", "06"].map((number) => (
              <ProjectImage key={number} number={number} className="h-full w-full" />
            ))}
          </div>

          <ProjectImage number="05" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />

          <ProjectImage number="07" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />

          <ProjectImage number="08" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />

          <div className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[36px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]">
            <ProjectImage number="09" className="h-full w-full" />
            <ProjectImage number="10" className="h-full w-full" />
          </div>

          <div className="flex h-[calc(100svh-7rem)] w-[calc((100svh-7rem-0.75rem)*0.8888889)] shrink-0 -translate-x-[36px] flex-col gap-3 md:w-[calc((100svh-7rem-1.5vw)*0.8888889)] md:gap-[1.5vw]">
            <ProjectImage number="11" className="h-full w-full" />
            <ProjectImage number="12" className="h-full w-full" />
          </div>

          <ProjectImage number="13" className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[36px]" />
        </div>
      </div>
    </section>
  );
}
