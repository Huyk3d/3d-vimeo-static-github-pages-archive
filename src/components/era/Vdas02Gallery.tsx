"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const largeWorks = [
  { label: "01", title: "VDAS 02 Study 01" },
  { label: "04", title: "VDAS 02 Study 04" },
  { label: "05", title: "VDAS 02 Study 05" },
];

function PlaceholderWork({ label, title, className = "" }: { label: string; title?: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-black text-sm text-white ${className}`}>
      {label}
      {title && <p className="absolute bottom-5 left-5 text-xs text-white md:bottom-6 md:left-6">{title}</p>}
    </div>
  );
}

export function Vdas02Gallery() {
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
    <section aria-label="VDAS 02 works" className="vdas-gallery -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-gallery-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max -translate-y-px items-stretch gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <Link href="/era/vdas-02/project/vdas-02-01" className="h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start">
            <PlaceholderWork {...largeWorks[0]} className="h-full w-full" />
          </Link>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <PlaceholderWork label="02" title="VDAS 02 Study 02" className="aspect-video w-full" />
            <PlaceholderWork label="03" title="VDAS 02 Study 03" className="aspect-video w-full" />
          </div>

          {largeWorks.slice(1).map((work) => (
            <PlaceholderWork key={work.label} {...work} className="h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start" />
          ))}
        </div>
      </div>
    </section>
  );
}
