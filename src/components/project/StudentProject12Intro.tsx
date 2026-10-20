"use client";

import { useEffect, useRef } from "react";

const artworkBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/캐디`;
const artworks = [
  { file: "2.png" },
  { file: "1.png", caption: "심심해서 책장이나 구경하는 상상이 (상어 인형)" },
  { file: "3.png", caption: "심심하다..." },
  { file: "5.png", caption: "당당이와 코뿌리한테 놀자고 깨우는 상상이" },
  { file: "6.png", caption: "하지만 코뿌리와 당당이는 둘이서만 게임하고 놀고있다" },
  { file: "4.png", caption: "결국 잔뜩 삐져버린 상상이" },
];

export function StudentProject12Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollContainer.scrollLeft += event.deltaX !== 0 ? event.deltaX : event.deltaY;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[140px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">Character Design</h1>
            <div className="mt-7 max-w-[25rem] space-y-8 text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
              <p>캐릭터를 직접 디자인하고 리깅을 통해 다양한 동작을 구현한 아트워크를 제작했습니다.</p>
              <p>실제 제가 가지고 있는 상어 인형, 당근 인형, 코뿔소 인형을 바탕으로 캐릭터를 디자인했으며, 당근 인형과 코뿔소 인형에게 따돌림을 당해 쓸쓸해진 상어 인형이라는 간단한 스토리도 함께 설정했습니다.</p>
            </div>
          </section>
          {artworks.map((artwork, index) => (
            <div key={artwork.file} className={`group relative h-[calc(100svh-7rem)] shrink-0 overflow-visible ${index === 0 ? "-ml-[50px]" : ""}`}>
              <div className="h-full overflow-hidden">
                <img
                  src={`${artworkBasePath}/${artwork.file}`}
                  alt={`Character Design artwork ${index + 1}`}
                  className="h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
                />
              </div>
              {artwork.caption && (
                <p className="absolute left-0 top-full mt-2 max-w-full text-[12px] leading-[1.35] tracking-[-0.025em] text-neutral-600 [word-break:keep-all] [overflow-wrap:break-word]">
                  {artwork.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
