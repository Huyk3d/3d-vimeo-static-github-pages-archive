"use client";

import { useEffect, useRef } from "react";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/2025/천사와 악마`;
const imageNumbers = [1, 2, 3, 4] as const;
const video = {
  type: "vimeo" as const,
  src: "https://player.vimeo.com/video/1163880218?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&loop=1",
  title: "천사와 악마",
  thumbnailSrc: `${imageBasePath}/천사와악마_03.png`,
  aspectRatio: "16 / 9",
};
const media = [
  video,
  ...imageNumbers.map((number) => ({
    type: "image" as const,
    src: `${imageBasePath}/천사와악마_${String(number).padStart(2, "0")}.png`,
    alt: `천사와 악마 artwork ${number}`,
  })),
];

function ArtworkImage({ number, onOpen }: { number: number; onOpen: () => void }) {
  return (
    <ProjectMediaButton label={`Open 천사와 악마 artwork ${number}`} className="h-[calc(100svh-7rem)] shrink-0 -translate-x-[20px]" onOpen={onOpen}>
      <img
        src={`${imageBasePath}/천사와악마_${String(number).padStart(2, "0")}.png`}
        alt={`천사와 악마 artwork ${number}`}
        draggable={false}
        className="block h-full w-auto max-w-none object-contain transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]"
      />
    </ProjectMediaButton>
  );
}

export function StudentProject16Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openMedia, lightbox } = useProjectMediaLightbox(media);

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
    <>
      <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
        <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
          <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
            <section className="flex h-[calc(100svh-8rem)] w-[38vw] min-w-[28rem] max-w-[40rem] shrink-0 translate-x-3 -translate-y-2 flex-col justify-center">
              <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">천사와 악마</h1>
              <div className="mt-7 max-w-[38rem] text-[15px] leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
                <p>이 개인작은 졸업 작품 제작 도중 만들고 싶은 것들에 대한 욕구가 쌓여, 즉흥적으로 기획하고 제작한 작품입니다.</p>
                <p className="mt-6">제작의 이유는 다음과 같습니다.</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5">
                  <li>명암을 공부하기 위해 흑백의 요소만 이용해 영상을 만들고 싶었습니다.</li>
                  <li>당시 러시아-우크라이나 전쟁이 장기화되고 있었습니다.</li>
                  <li>도널드 트럼프 당선 이후 여러 국가에서 전쟁과 분쟁이 심화되는 모습을 보았습니다.</li>
                  <li>애니메이션 「진격의 거인」을 보고 작품이 전달하는 메시지에 깊은 인상을 받았습니다.</li>
                  <li>SEKAI NO OWARI의 「천사와 악마」라는 노래를 자주 들으며 그 메시지에도 깊은 인상을 받았습니다.</li>
                  <li>윤석열 전 대통령 탄핵 이후 대한민국의 정치적 양극화가 극심해지는 모습을 보았습니다.</li>
                </ol>
                <p className="mt-6">1번을 제외한 나머지 이유들은 모두 분쟁과 갈등, 갈라치기와 관련된 것이었습니다. 당시 이러한 사회적 분쟁과 갈등, 양극화 등에 정신적인 피로를 느꼈습니다.</p>
              </div>
            </section>

            <ProjectVideoThumbnail {...video} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-[20px] bg-black" onOpen={() => openMedia(0)} />
            {imageNumbers.map((number) => <ArtworkImage key={number} number={number} onOpen={() => openMedia(number)} />)}
          </div>
        </div>
      </section>
      {lightbox}
    </>
  );
}
