"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

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
}: {
  label: string;
  title?: string;
  imageSrc?: string;
  className?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center bg-black text-sm text-white ${className}`}>
      {imageSrc && <img src={imageSrc} alt={title ?? label} className="absolute inset-0 h-full w-full object-cover" />}
      {title && <p className="absolute bottom-5 left-5 z-10 text-xs text-white md:bottom-6 md:left-6">{title}</p>}
    </div>
  );
}

export function StudentGallery() {
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
    <section aria-label="Student works" className="vdas-gallery -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-gallery-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max -translate-y-px items-stretch gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <Link href="/era/when-student-01/project/student-01" className="h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start">
            <PlaceholderWork {...largeWorks[0]} className="h-full w-full" />
          </Link>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <Link href="/era/when-student-01/project/airbnb" className="aspect-video w-full">
              <PlaceholderWork label="02" title="Student Study 02" className="h-full w-full" />
            </Link>
            <PlaceholderWork label="03" title="Student Study 03" className="aspect-video w-full" />
          </div>

          {largeWorks.slice(1).map((work) => (
            <PlaceholderWork key={work.label} {...work} className="h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start" />
          ))}
        </div>
      </div>
    </section>
  );
}
