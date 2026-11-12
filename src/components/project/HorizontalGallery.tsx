"use client";

import { useRef } from "react";
import type { Project } from "@/types/archive";
import { useInertialScroll } from "@/hooks/useInertialScroll";
import { ProjectThumbnail } from "./ProjectThumbnail";

export function HorizontalGallery({ eraSlug, projects }: { eraSlug: string; projects: Project[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useInertialScroll(scrollContainerRef);

  return (
    <div ref={scrollContainerRef} className="flex gap-5 overflow-x-auto pb-5" aria-label="Project gallery">
      {projects.map((project) => <ProjectThumbnail key={project.slug} eraSlug={eraSlug} project={project} />)}
    </div>
  );
}
