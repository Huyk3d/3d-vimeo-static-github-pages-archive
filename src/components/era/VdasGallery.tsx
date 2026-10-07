"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function PlaceholderWork({ label, title, className = "" }: { label: string; title?: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-black text-sm text-white ${className}`}>
      {label}
      {title && <p className="absolute bottom-5 left-5 text-xs text-white md:bottom-6 md:left-6">{title}</p>}
    </div>
  );
}

function ThumbnailWork({ className = "" }: { className?: string }) {
  const imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-01/01-01_balmuda/Vdas_01_01-07.png`;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-black text-sm text-white ${className}`}>
      <img src={imageSrc} alt="Foundation Study 01 thumbnail" className="absolute inset-0 h-full w-full object-cover" />
      <p className="absolute bottom-5 left-5 z-10 text-xs text-white md:bottom-6 md:left-6">Balmuda Rain</p>
    </div>
  );
}

function ArtworkThumbnail({ className = "" }: { className?: string }) {
  const imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-01/01-02_Artworks/01-02_Artwokrs_01.png`;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-black text-sm text-white ${className}`}>
      <img src={imageSrc} alt="Foundation Study 02 thumbnail" className="absolute inset-0 h-full w-full object-cover" />
      <p className="absolute bottom-5 left-5 z-10 text-xs text-white md:bottom-6 md:left-6">Artworks</p>
    </div>
  );
}

function ToyRacingThumbnail({ className = "" }: { className?: string }) {
  const imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Vdas-01/01-03_Toy/ToyRacing_07.png`;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-black text-sm text-white ${className}`}>
      <img src={imageSrc} alt="TOY RACING thumbnail" className="absolute inset-0 h-full w-full object-cover" />
      <p className="absolute bottom-5 left-5 z-10 text-xs text-white md:bottom-6 md:left-6">TOY RACING</p>
    </div>
  );
}

export function VdasGallery() {
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
    <section aria-label="VDAS 01 works" className="vdas-gallery -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-gallery-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max -translate-y-px items-stretch gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <Link href="/era/vdas-01/project/vdas-01-01" className="h-[calc(100svh-3.5rem)] aspect-video shrink-0 self-start">
            <ThumbnailWork className="h-full w-full" />
          </Link>

          <div className="flex h-[calc(100svh-3.5rem)] w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8">
            <Link href="/era/vdas-01/project/vdas-01-02" className="aspect-video w-full">
              <ArtworkThumbnail className="h-full w-full" />
            </Link>
            <Link href="/era/vdas-01/project/vdas-01-03" className="aspect-video w-full">
              <ToyRacingThumbnail className="h-full w-full" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
