"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { useInertialScroll } from "@/hooks/useInertialScroll";
import Link from "next/link";

const works = [
  { label: "01", title: "Muzigae Masion Artworks", href: "/era/vdas-02/project/vdas-02-01" },
  { label: "02", title: "Muzigae Masion AI Video", href: "/era/vdas-02/project/vdas-02-02", titleClassName: "text-black" },
  { label: "03", title: "Galaxy S26 Ultra", href: "/era/vdas-02/project/vdas-02-03" },
  { label: "04", title: "Air BnB UI/UX", href: "/era/vdas-02/project/vdas-02-04", titleClassName: "text-black" },
  { label: "05", title: "Character Training", href: "/era/vdas-02/project/vdas-02-05" },
  { label: "06", title: "Citizen Watch (AI)", href: "/era/vdas-02/project/vdas-02-06" },
] as const;

const muzigaeThumbnailSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Muzigae Artworks/무지개맨션.png`;
const muzigaeAiThumbnailSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Muzigae Masion AI Video/권혁의_AI Img_3.png`;
const galaxyThumbnailSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Galaxy S26 Ultra/Galaxy_11.png`;
const airBnbThumbnailSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Air BnB UIUX/AirBnb_04.png`;
const characterTrainingThumbnailSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Cha_thum.png`;
const citizenThumbnailSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-02/Citizen/스틸_03.png`;

function PlaceholderWork({
  title,
  titleClassName = "text-white",
  imageSrc,
  className = "",
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
}: {
  label: string;
  title?: string;
  titleClassName?: string;
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
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${title} thumbnail`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] group-hover:duration-[1900ms]"
        />
      ) : (
        <div className="absolute inset-0 bg-black transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] group-hover:duration-[1900ms]" />
      )}
      {title && <p className={`absolute bottom-5 left-5 z-10 text-xs md:bottom-6 md:left-6 ${titleClassName}`}>{title}</p>}
    </div>
  );
}

export function Vdas02Gallery() {
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

  useInertialScroll(scrollContainerRef);

  return (
    <>
      <section aria-label="VDAS 02 works" className="vdas-gallery -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-gallery-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max -translate-y-px items-stretch gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-48 w-[calc(18vw+2rem)] min-w-[15rem] max-w-[20rem] shrink-0 self-center translate-x-3 -translate-y-10 flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">VDAS_02</h1>
            <p className="mt-6 text-[15px] leading-[1.4] tracking-[-0.025em]">모션디자이너 86기 과정 동안의<br />모든 작업물들을 모아봤습니다.</p>
          </section>

          <Link
            href={works[0].href}
            className="group -ml-4 h-[calc(100svh-3.5rem)] aspect-[4/5] shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel(works[0].title, event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork {...works[0]} imageSrc={muzigaeThumbnailSrc} className="h-full w-full" />
          </Link>

          <Link
            href={works[1].href}
            className="group h-[calc(100svh-3.5rem)] aspect-[3712/4608] shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel(works[1].title, event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork {...works[1]} imageSrc={muzigaeAiThumbnailSrc} className="h-full w-full" />
          </Link>

          <Link
            href={works[2].href}
            className="group h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel(works[2].title, event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork {...works[2]} imageSrc={galaxyThumbnailSrc} className="h-full w-full" />
          </Link>

          <Link
            href={works[3].href}
            className="group h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start"
            onPointerEnter={(event) => showCursorLabel(works[3].title, event)}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <PlaceholderWork {...works[3]} imageSrc={airBnbThumbnailSrc} className="h-full w-full" />
          </Link>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <Link
              href={works[5].href}
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel(works[5].title, event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork {...works[5]} imageSrc={citizenThumbnailSrc} className="h-full w-full" />
            </Link>
            <Link
              href={works[4].href}
              className="group aspect-video w-full"
              onPointerEnter={(event) => showCursorLabel(works[4].title, event)}
              onPointerMove={moveCursorLabel}
              onPointerLeave={hideCursorLabel}
            >
              <PlaceholderWork {...works[4]} imageSrc={characterTrainingThumbnailSrc} className="h-full w-full" />
            </Link>
          </div>
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
