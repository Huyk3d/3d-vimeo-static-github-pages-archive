"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/01-Grad`;

const largeWorks = [
  {
    label: "01",
    title: "GAMEBOY CLASSIC",
    imageSrc: `${imageBasePath}/GameBoy Classic_졸업작_01.png`,
  },
  {
    label: "04",
    title: "The Legend of Zelda Movie Opening",
    imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/3-2_젤다/Zelda Thum.png`,
  },
];

const stackedWorks = [
  {
    label: "05",
    title: "WELCOME TO TOY WORLD",
    imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/Toy World.png`,
    titleClassName: "text-black",
  },
  {
    label: "06",
    title: "iMac (2023)",
    imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/iMac.png`,
    titleClassName: "text-black",
  },
];

function PlaceholderWork({
  label,
  title,
  imageSrc,
  titleClassName = "text-white",
  titleContent,
  imageClassName = "",
  className = "",
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
}: {
  label: string;
  title?: string;
  imageSrc?: string;
  titleClassName?: string;
  titleContent?: ReactNode;
  imageClassName?: string;
  className?: string;
  onPointerEnter?: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave?: () => void;
}) {
  return (
    <div
      className={`group relative flex items-center justify-center overflow-hidden bg-black text-sm text-white ${className}`}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {imageSrc && <img src={imageSrc} alt={title ?? label} className={`absolute inset-0 block size-full min-h-full min-w-full max-w-none object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] group-hover:duration-[1900ms] ${imageClassName}`} />}
      {title && <p className={`absolute bottom-5 left-5 z-10 text-xs md:bottom-6 md:left-6 ${titleClassName}`}>{titleContent ?? title}</p>}
    </div>
  );
}

export function StudentGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState({ title: "", visible: false });

  const moveCursorLabel = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const label = cursorLabelRef.current;
    if (!label) return;

    const gapX = 16;
    const gapY = 18;
    const edge = 8;
    const x = Math.min(event.clientX + gapX, window.innerWidth - label.offsetWidth - edge);
    const y = Math.min(event.clientY + gapY, window.innerHeight - label.offsetHeight - edge);

    label.style.transform = `translate3d(${Math.max(edge, x)}px, ${Math.max(edge, y)}px, 0)`;
  };

  const showCursorLabel = (title: string, event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    setCursorLabel({ title, visible: true });
    moveCursorLabel(event);
    requestAnimationFrame(() => moveCursorLabel(event));
  };

  const hideCursorLabel = () => {
    setCursorLabel((current) => ({ ...current, visible: false }));
  };

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
    <>
      <section aria-label="Student works" className="vdas-gallery -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-gallery-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max -translate-y-px items-stretch gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-48 w-[calc(18vw+2rem)] min-w-[15rem] max-w-[20rem] shrink-0 self-center translate-x-3 -translate-y-10 flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Student</h1>
            <p className="mt-6 text-[15px] leading-[1.4] tracking-[-0.025em]">2022년도(2학년)부터 졸업작품까지의<br />잘했던 작품과 못했던 작품까지,<br />대학교 과제물을 모았습니다.</p>
          </section>

          <Link
            href="/era/when-student-01/project/student-01"
            className="group -ml-4 h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel(largeWorks[0].title, event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork {...largeWorks[0]} className="h-full w-full" />
          </Link>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <Link
              href="/era/when-student-01/project/student-02"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("THE NATURE", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork
                label="02"
                title="THE NATURE"
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/The nature.png`}
                className="h-full w-full"
              />
            </Link>
            <Link
              href="/era/when-student-01/project/student-03"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("HELLO!", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork
                label="03"
                title="HELLO!"
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/3-1 HELLO/HELLO THUM.png`}
                titleClassName="text-black"
                className="h-full w-full"
              />
            </Link>
          </div>

          {largeWorks.slice(1).map((work) => (
            <Link
              key={work.label}
              href="/era/when-student-01/project/student-04"
              className="group h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start"
              onPointerEnter={(event) => showCursorLabel(work.title, event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork {...work} className="h-full w-full" />
            </Link>
          ))}

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            {stackedWorks.map((work) => (
              work.label === "05" || work.label === "06" ? (
                <Link
                  key={work.label}
                  href={`/era/when-student-01/project/student-${work.label}`}
                  className="group aspect-video w-full"
                  onPointerEnter={(event) => showCursorLabel(work.title, event)}
                  onPointerMove={moveCursorLabel}
                  onPointerLeave={hideCursorLabel}
                >
                  <PlaceholderWork {...work} className="h-full w-full" />
                </Link>
              ) : (
                <PlaceholderWork
                  key={work.label}
                  {...work}
                  className="aspect-video w-full"
                  onPointerEnter={(event) => showCursorLabel(work.title, event)}
                  onPointerMove={moveCursorLabel}
                  onPointerLeave={hideCursorLabel}
                />
              )
            ))}
          </div>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <Link
              href="/era/when-student-01/project/student-07"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("Can be Anything", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork
                label="07"
                title="Can be Anything"
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/Can be.png`}
                className="h-full w-full"
              />
            </Link>
            <Link
              href="/era/when-student-01/project/student-08"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("가스수소 안전공모전", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork
                label="08"
                title="가스수소 안전공모전"
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/GAS.png`}
                titleClassName="text-black"
                className="h-full w-full"
              />
            </Link>
          </div>

          <Link
            href="/era/when-student-01/project/student-12"
            className="group h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel("Character Design", event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork
              label="12"
              title="Character Design"
              imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/캐디/2.png`}
              className="h-full w-full"
            />
          </Link>

          <Link
            href="/era/when-student-01/project/student-09"
            className="group h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel("My Day", event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork
              label="09"
              title="My Day"
              imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/My Day.png`}
              titleClassName="text-black"
              imageClassName="scale-[1.01] translate-y-[2px]"
              className="h-full w-full"
            />
          </Link>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <Link
              href="/era/when-student-01/project/student-10"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("LG 공모전", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork
                label="10"
                title="LG 공모전"
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/LG.png`}
                className="h-full w-full"
              />
            </Link>
            <Link
              href="/era/when-student-01/project/student-11"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("Bounce Ball", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork
                label="11"
                title="Bounce Ball"
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/Ball.png`}
                className="h-full w-full"
              />
            </Link>
          </div>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <Link
              href="/era/when-student-01/project/student-13"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("Loopse Lives, Silent Escape", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork
                label="13"
                title="Loopse Lives, Silent Escape"
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/Loopse Lives, Silent Escape.png`}
                className="h-full w-full"
              />
            </Link>
            <Link
              href="/era/when-student-01/project/student-14"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("Apple Brand Artwork", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork
                label="14"
                title="Apple Brand Artwork"
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/Apple.png`}
                className="h-full w-full"
              />
            </Link>
          </div>

          <Link
            href="/era/when-student-01/project/student-15"
            className="group h-[calc(100svh-3.5rem)] aspect-[9/16] shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel("친환경 소비 숏폼 공모전", event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork
              label="15"
              title="친환경 소비 숏폼 공모전"
              imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/친환경 숏폼.png`}
              className="h-full w-full"
            />
          </Link>
        </div>
      </div>
      </section>
      <div
        ref={cursorLabelRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] whitespace-nowrap rounded-[2px] bg-black px-[9px] py-[6px] text-[11px] leading-none text-white transition-[opacity,transform] duration-[180ms] ease-out"
        style={{
          opacity: cursorLabel.visible ? 1 : 0,
          transform: "translate3d(-200px, -200px, 0)",
          transitionDuration: "180ms, 55ms",
          willChange: "transform, opacity",
        }}
      >
        {cursorLabel.title}
      </div>
    </>
  );
}
