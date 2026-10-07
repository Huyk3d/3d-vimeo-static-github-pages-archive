"use client";

import { useEffect, useRef } from "react";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-01/01-02_Artworks`;

const artworkNumbers = ["01", "02", "03", "04", "05"];

export function Vdas01Project02Intro() {
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
        <div className="flex h-full min-w-max items-center gap-[46px] px-6 md:gap-[calc(4.5vw+10px)] md:px-10">
          {artworkNumbers.map((number) => (
            <img
              key={number}
              src={`${imageBasePath}/01-02_Artwokrs_${number}.png`}
              alt={`Foundation Study 02 artwork ${number}`}
              className={`block h-[calc(100svh-7rem)] w-auto max-w-none shrink-0 object-contain ${number >= "03" ? "-translate-x-[15px]" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
