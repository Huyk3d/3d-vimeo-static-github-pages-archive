"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { YearEra, YearProject } from "@/data/yearEras";

function ProjectCard({ project }: { project: YearProject }) {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-black text-sm text-white">
      {project.thumbnail && <img
        src={project.thumbnail}
        alt={project.title}
        className={`absolute inset-0 block size-full min-h-full min-w-full max-w-none object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] group-hover:duration-[1900ms] ${project.imageClassName ?? ""}`}
      />}
      <p className={`absolute bottom-5 left-5 z-10 text-xs md:bottom-6 md:left-6 ${project.titleClassName ?? "text-white"}`}>{project.title}</p>
    </div>
  );
}

function projectHref(project: YearProject) {
  return `/era/${project.legacyEraSlug}/project/${project.projectSlug}`;
}

export function YearGallery({ year }: { year: YearEra }) {
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
      scrollContainer.scrollLeft += event.deltaX !== 0 ? event.deltaX : event.deltaY;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  const fullHeight = "h-[calc(100svh-3.5rem)]";

  return (
    <>
      <section aria-label={`${year.title} works`} className="vdas-gallery -mt-7 -translate-x-[6px] h-[calc(100svh-3rem)] overflow-hidden bg-[#EDEDED]">
        <div ref={scrollContainerRef} className="vdas-gallery-scroll h-full overflow-x-auto overflow-y-hidden">
          <div className="flex h-full min-w-max -translate-y-px items-stretch gap-3 px-6 md:gap-[1.5vw] md:px-10">
            <section className="flex min-h-48 w-[24vw] min-w-[20rem] max-w-[27rem] shrink-0 self-center translate-x-3 -translate-y-[10.8rem] flex-col justify-center">
              <h1 className="text-[28px] font-bold leading-tight tracking-[-0.04em]">{year.title}</h1>
              <div className={`mt-6 text-[15px] font-normal leading-[1.4] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word] ${year.descriptionUsesLineBreaks ? "space-y-0" : "space-y-4"}`}>
                {year.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
            {year.items.map((item) => {
              if (item.type === "stack") {
                return (
                  <div key={`${item.projects[0].projectSlug}-${item.projects[1].projectSlug}`} className={`flex ${fullHeight} w-[calc((100svh-5rem)*0.8888889)] shrink-0 self-start flex-col gap-6 md:w-[calc((100svh-5.5rem)*0.8888889)] md:gap-8`}>
                    {item.projects.map((project) => (
                      project.isPlaceholder ? (
                        <div key={project.projectSlug} className="group aspect-video w-full">
                          <ProjectCard project={project} />
                        </div>
                      ) : (
                        <Link
                          key={project.projectSlug}
                          href={projectHref(project)}
                          className="group aspect-video w-full"
                          onPointerEnter={(event) => showCursorLabel(project.title, event)}
                          onPointerMove={moveCursorLabel}
                          onPointerLeave={hideCursorLabel}
                        >
                          <ProjectCard project={project} />
                        </Link>
                      )
                    ))}
                  </div>
                );
              }

              const project = item.project;
              const aspectClassName = project.aspectClassName ?? (project.cardSize === "vertical" ? "aspect-[9/16]" : "aspect-video");

              return (
                <Link
                  key={project.projectSlug}
                  href={projectHref(project)}
                  className={`group ${fullHeight} ${aspectClassName} shrink-0 self-start`}
                  onPointerEnter={(event) => showCursorLabel(project.title, event)}
                  onPointerMove={moveCursorLabel}
                  onPointerLeave={hideCursorLabel}
                >
                  <ProjectCard project={project} />
                </Link>
              );
            })}
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
