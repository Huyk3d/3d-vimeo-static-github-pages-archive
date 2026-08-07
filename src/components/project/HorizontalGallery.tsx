import type { Project } from "@/types/archive";
import { ProjectThumbnail } from "./ProjectThumbnail";

export function HorizontalGallery({ eraSlug, projects }: { eraSlug: string; projects: Project[] }) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-5" aria-label="Project gallery">
      {projects.map((project) => <ProjectThumbnail key={project.slug} eraSlug={eraSlug} project={project} />)}
    </div>
  );
}
