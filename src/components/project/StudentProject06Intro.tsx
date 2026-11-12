"use client";

import { useRef } from "react";
import { ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";
import { useInertialScroll } from "@/hooks/useInertialScroll";

const media = [{ type: "youtube" as const, src: "https://www.youtube.com/embed/h6ttgT_vaRc?rel=0&modestbranding=1&playsinline=1", title: "iMac (2023) video", thumbnailSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/Student/iMac.png`, aspectRatio: "16 / 9" }];

export function StudentProject06Intro() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openMedia, lightbox } = useProjectMediaLightbox(media);

  useInertialScroll(scrollContainerRef);

  return (
    <>
    <section className="vdas-project-page -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
      <div ref={scrollContainerRef} className="vdas-project-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-3 px-6 md:gap-[1.5vw] md:px-10">
          <section className="flex h-72 w-[34vw] min-w-[22rem] max-w-[34rem] shrink-0 translate-x-3 -translate-y-[140px] flex-col justify-center">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.04em]">
              iMac (2023)
            </h1>

            <div className="mt-7 max-w-[25rem] text-[15px] leading-[1.4] tracking-[-0.025em]">
              <p>3D를 처음 배운 2학년 1학기 기말고사 때 만든<br />프로젝트입니다.</p>
              <p className="mt-4">가상의 광고회사 Molin을 만든 후 Molin사의 인트로를 제작했고, 이후 iMac 광고 영상을 제작했습니다.</p>
              <p className="mt-4">생애 첫 3D 영상이었고,<br />당시 정말 열심히 만들었습니다.</p>
              <p className="mt-4">PPT는 소실되었습니다...</p>
            </div>
          </section>

          <ProjectVideoThumbnail {...media[0]} className="h-[calc(100svh-7rem)] aspect-video shrink-0 -translate-x-6 bg-black" onOpen={() => openMedia(0)} />
        </div>
      </div>
    </section>
    {lightbox}
    </>
  );
}
