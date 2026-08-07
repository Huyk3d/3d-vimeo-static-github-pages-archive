import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/archive";

export function ProjectThumbnail({ eraSlug, project }: { eraSlug: string; project: Project }) {
  return (
    <Link href={`/era/${eraSlug}/project/${project.slug}`} className="block w-[78vw] max-w-[720px] shrink-0 md:w-[56vw]">
      <div className="relative aspect-[4/3] overflow-hidden bg-archive-surface">
        <Image src={project.thumbnail} alt="" fill sizes="(max-width: 768px) 78vw, 56vw" className="object-cover" />
      </div>
      <div className="mt-3 flex justify-between gap-4 text-sm">
        <span className="font-medium">{project.title}</span>
        <span className="text-archive-muted">{project.year}</span>
      </div>
    </Link>
  );
}
