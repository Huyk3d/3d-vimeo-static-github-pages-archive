"use client";

import type { Project } from "@/types/archive";
import { ProjectMediaButton, ProjectVideoThumbnail, useProjectMediaLightbox } from "./ProjectMediaLightbox";
import type { ProjectMediaItem } from "./ProjectMediaLightbox";

export function ProjectDetail({ project }: { project: Project }) {
  const media: ProjectMediaItem[] = [];
  project.blocks.forEach((block) => {
    if (block.type === "image") media.push({ type: "image", src: block.src, alt: block.alt });
    if (block.type === "vimeo") media.push({ type: "vimeo", src: `https://player.vimeo.com/video/${block.videoId}?loop=1`, title: block.title, thumbnailSrc: project.thumbnail, aspectRatio: "16 / 9" });
  });
  const { openMedia, lightbox } = useProjectMediaLightbox(media);
  const mediaIndexAt = (blockIndex: number) => project.blocks.slice(0, blockIndex).filter((block) => block.type !== "text").length;

  return (
    <>
    <article className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-20">
      <header className="mb-12">
        <p className="text-sm text-archive-muted">{project.client} · {project.year}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
      </header>
      <div className="space-y-10">
        {project.blocks.map((block, index) => {
          if (block.type === "image") return <figure key={index}><ProjectMediaButton label={`Open ${block.alt}`} className="w-full" onOpen={() => openMedia(mediaIndexAt(index))}><img src={block.src} alt={block.alt} draggable={false} className="h-auto w-full transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]" /></ProjectMediaButton>{block.caption && <figcaption className="mt-2 text-sm text-archive-muted">{block.caption}</figcaption>}</figure>;
          if (block.type === "vimeo") {
            const video = media[mediaIndexAt(index)];
            return video.type === "vimeo" ? <ProjectVideoThumbnail key={index} {...video} onOpen={() => openMedia(mediaIndexAt(index))} /> : null;
          }
          return <section key={index} className="max-w-2xl">{block.heading && <h2 className="mb-3 text-xl font-bold">{block.heading}</h2>}<p className="leading-7 text-archive-muted">{block.body}</p></section>;
        })}
      </div>
    </article>
    {lightbox}
    </>
  );
}
