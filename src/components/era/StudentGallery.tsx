"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/01-Grad`;

const largeWorks = [
  {
    label: "01",
    title: "GAMEBOY CLASSIC",
    imageSrc: `${imageBasePath}/GameBoy Classic_졸업작_01.png`,
  },
  { label: "04", title: "Student Study 04" },
  { label: "05", title: "Student Study 05" },
];

function PlaceholderWork({
  label,
  title,
  imageSrc,
  className = "",
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
}: {
  label: string;
  title?: string;
  imageSrc?: string;
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
      {imageSrc && <img src={imageSrc} alt={title ?? label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] group-hover:duration-[1600ms]" />}
      {title && <p className="absolute bottom-5 left-5 z-10 text-xs text-white md:bottom-6 md:left-6">{title}</p>}
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
          <Link
            href="/era/when-student-01/project/student-01"
            className="group h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel(largeWorks[0].title, event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork {...largeWorks[0]} className="h-full w-full" />
          </Link>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <Link
              href="/era/when-student-01/project/airbnb"
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("Student Study 02", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork label="02" title="Student Study 02" className="h-full w-full" />
            </Link>
            <PlaceholderWork
              label="03"
              title="Student Study 03"
              className="aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel("Student Study 03", event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            />
          </div>

          {largeWorks.slice(1).map((work) => (
            <PlaceholderWork
              key={work.label}
              {...work}
              className="h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start"
              onPointerEnter={(event) => showCursorLabel(work.title, event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            />
          ))}
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
